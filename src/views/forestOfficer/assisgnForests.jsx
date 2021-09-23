import React, {useRef, useState, useEffect} from 'react';
import { Map, TileLayer, Rectangle, Popup} from 'react-leaflet';
import osm from '../systemAdmin/osmProvider';
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
    const [center, setCenter] = useState( { lat: 6.927079, lng: 79.861244} );
    const [tiles, setTiles] = useState([]);
    const [forestId, setForestId] = useState(null);
    const [date, setDate] = useState(null);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    useEffect(() => {
        async function getTiles(){
            const officer = localStorage.getItem("email");
            if(selectedDate){
                let year = selectedDate.getFullYear();
                let month = selectedDate.getMonth();
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
                            const lat = response.data.forest_tiles[0].bbox[0][0];
                            const lng = response.data.forest_tiles[0].bbox[0][1];
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
            "_id" : forestId,
            "tile_id" : id,
            "date" : date
        }
        try{
            const response = await api.forestOfficer.getTileDataByTileId(data);    
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
                                <h4 className="place">{}</h4>
                                <label className="details">Tile Number</label>
                                <h4 className="place">{}</h4>
                                <label className="details">Tile Coordinates</label>
                                <h4 className="place">{}</h4>
                                <label className="details">Mask</label>
                                <input className="detailsInput" placeholder="Enter Country" />
                                <label className="details">Tile Updated Date</label>
                                <h4 className="place">{}</h4>
                                <label className="details">Sattelite Image</label>
                                <input className="detailsInput" placeholder="Enter Country" />
                                <label className="details">Options</label>
                                <input className="detailsInput" placeholder="Enter Country" />
                        </div>
                    </Popup>
                )}
            </Map>
            
        </div>  
        </>
    )
}
