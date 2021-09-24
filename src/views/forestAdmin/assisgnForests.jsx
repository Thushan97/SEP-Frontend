import React, {useRef, useState, useEffect} from 'react';
import { Map, TileLayer, Rectangle, Popup} from 'react-leaflet';
import osm from './osmProvider';
import '../../style/map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import '../../style/pinMap.css';
import '../../style/date.css';
import {api} from '../../services/api';
import '../../style/assignForest.css';

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
    const [selectedImage, setSelectedImage] = useState("");

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
        setCurrentPlaceId(id);
        const data = {
            "forest_id" : forestId,
            "tile_id" : id,
            "date" : date
        }
        console.log(data);
        try{
            const response = await api.forestOfficer.getTileDataByTileId(data);
            const result = response.data;
            //console.log(result)
            if(result){
                setSaveTime(result.save_time);
                setImage(result.image.$binary.base64);
                // console.log(result.image.$binary.base64)
                //console.log(saveTime)
            }    
        }
        catch(ex){
            console.log(ex);
        }
    }

    const ZOOM_LEVEL = 10;
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
                        return (tiles && <Rectangle key={index} bounds={[i.bbox[0],i.bbox[1]]} onClick={() => handleAddClick(i.tile_id)}/>)   
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
                                <label className="details">Sattelite Image</label>
                                <img src={`data:image/png;base64,${image}`} />
                                {image}
                                <label className="details">Image Type</label>
                                <select className="custom-select" onChange={(e) => {
                                    const selectedType = e.target.value
                                    setSelectedImage(selectedType)
                                }}>
                                    <option value="NONE">NONE</option>
                                    <option value="FM">FM</option>
                                    <option value="NDWI">NDWI</option>
                                    <option value="MNDWI">MNDWI</option>
                                    <option value="VARI">VARI</option>
                                    <option value="SAVI">SAVI</option>
                                    <option value="NDVI">NDVI</option>
                                </select>
                                <label className="details">Image</label>
                                <img src={`data:image/jpeg;base64,${selectedImage}`} />
                        </div>
                    </Popup>
                )}
            </Map>
            
        </div>  
        </>
    )
}
