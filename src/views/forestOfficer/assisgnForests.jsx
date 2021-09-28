import React, {useRef, useState, useEffect} from 'react';
import { Map, TileLayer, Rectangle, Popup} from 'react-leaflet';
import osm from '../forestAdmin/osmProvider';
import '../../style/map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import '../../style/pinMap.css';
import '../../style/date.css';
import {api} from '../../services/api';
import '../../style/assignForest.css';
import { toast } from 'react-toastify';

toast.configure();

export default function AssignForest(){
    const [selectedDate, setSelectedDate] = useState(null);
    const [center, setCenter] = useState( { lat: 7.291418, lng: 80.636696} );
    const [tiles, setTiles] = useState([]);
    const [forestId, setForestId] = useState(null);
    const [date, setDate] = useState(null);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [forestName, setForestName] = useState();
    const [saveTime, setSaveTime] = useState(null);
    const [image, setImage] = useState();
    const [selectedImage, setSelectedImage] = useState("none");
    const [inferedThreatPresent, setInferedThreatPresent] = useState([]);

    useEffect(() => {
        async function getTiles(){
            const officer = localStorage.getItem("email");
            if(selectedDate){
                let year = selectedDate.getFullYear();
                let month = selectedDate.getMonth();
                month = month + 1
                console.log(month);
                let dt = selectedDate.getDate();
                if(dt < 10){
                    dt = '0'+ dt;
                }

                if(month <10){
                    month = '0'+ month;
                }

                const date = (year + '-' + month + '-' + dt);
                setDate(date);
                const data = {
                    "email": officer,
                    "date": date
                }
                try{
                    const response = await api.forestOfficer.sendDate(data);
                        if(response.data.forest_tiles){
                            setTiles(response.data.forest_tiles);
                            setForestId(response.data._id);
                            setForestName(response.data.forest_name);
                            setSaveTime(response.data.forest_tiles[0].inference_updated_date)
                            const lat = response.data.location[0];
                            const lng = response.data.location[1];
                            setCenter({ lat, lng });
                        }   
                }catch(ex){
                    console.log(ex);
                }
                
            }
        }
        getTiles();
    },[selectedDate] )

    const handleAddClick = async (id, e) => {
        setImage("none");
        setCurrentPlaceId(id);
        const data = {
            "forest_id" : forestId,
            "tile_id" : id,
            "date" : date
        }
        try{
            const response = await api.forestOfficer.getTileDataByTileId(data);
            if(response.data === null){
                setCurrentPlaceId(null);
                toast.warning("There are no details available");

            }
            // const result = await api.forestOfficer.getImageByID(`${response.data._id}/rgb`);
            if(response.data._id){
                setImage(response.data._id);
            }
            if(response.data.infered_threat_present){
                setInferedThreatPresent(response.data.infered_threat_present);
            }
            
        }
        catch(ex){
            console.log(ex);
        }
    }

    const ZOOM_LEVEL = 8;
    const mapRef = useRef();

    return(
        <>
        <div className="date">   
        <h4>Select Date Here</h4>        
            <DatePicker
            selected = {selectedDate}
            onChange = { date => setSelectedDate(date)}
            dateFormat = 'yyyy/MM/dd'
            maxDate = {new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
            />
        </div>
        <div className="map">
            <Map center = {center} zoom = {ZOOM_LEVEL} ref = {mapRef} >
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>  
                <div>
                    {tiles.map((i,index) => {
                        if(i.infered_threat_present){
                            return (tiles && <Rectangle key={index} color="red" bounds={[i.bbox[0],i.bbox[1]]} onClick={() => handleAddClick(i.tile_id)}/>)   
                        }else{
                            return (tiles && <Rectangle key={index} bounds={[i.bbox[0],i.bbox[1]]} onClick={() => handleAddClick(i.tile_id)}/>)
                        }
                        
                    })}            
                </div>
                {currentPlaceId && (
                    <Popup position={center} closeButton={true} closeOnClick={false} onClose={() => setCurrentPlaceId(null)}>
                        <div className="forestCard">
                                <label className="details">Forest Name</label>
                                <h5 className="place">{forestName}</h5>
                                <label className="details">Tile Number</label>
                                <h5 className="place">{currentPlaceId}</h5>
                                <label className="details">Tile Updated Date Time</label>
                                <h5 className="place">{saveTime}</h5>
                                <label className="details">InferedThreatPresent</label>
                                <h5 className="place">{inferedThreatPresent}</h5>
                                {/* <label className="details">Sattelite Image</label>
                                { image && (<img src={`http://127.0.0.1:5000/forest/get_tile_view/${image}/rgb`} style={{ width: 300, height: 190 }}/>)} */}
                                <label className="details">Image Type</label>
                                <select className="custom-select" onChange={(e) => {
                                    const selectedType = e.target.value
                                    setSelectedImage(selectedType)
                                }}>
                                    <option value="none">NONE</option>
                                    <option value="rgb">RGB</option>
                                    <option value="fm">FM</option>
                                    <option value="ndwi">NDWI</option>
                                    <option value="mndwi">MNDWI</option>
                                    <option value="vari">VARI</option>
                                    <option value="savi">SAVI</option>
                                    <option value="nvdi">NDVI</option>
                                    <option value="masked_rgb">Masked RGB</option>
                                </select>
                                <label className="details">Image</label>
                                {selectedImage !== "none" && (<img src={`http://127.0.0.1:5000/forest/get_tile_view/${image}/${selectedImage}`} style={{ width: 300, height: 500 }} alt=""/>)}
                        </div>
                    </Popup>
                )}
            </Map>
            
        </div>  
        </>
    )
}
