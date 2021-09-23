import React, {useRef} from 'react';
import { Map, TileLayer, Popup } from 'react-leaflet';
import { useState } from 'react';
import osm from './osmProvider';
import '../../style/map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import '../../style/pinMap.css';
import {Link} from 'react-router-dom';

export default function PinMap(){
    const [center, setCenter] = useState( { lat: 6.927079, lng: 79.861244} );
    const [newPlace, setNewPlace] = useState(null);
    const [name, setName] = useState(null);
    const [district, setDistrict] = useState(null);
    const [country, setCountry] = useState(null);
    const ZOOM_LEVEL = 8;
    const mapRef = useRef();

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });

    const handleAddClick = (e) => {
        //console.log(e.latlng);
        const {lat, lng} = e.latlng;
        setNewPlace({lat, lng});
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newPin = {
    //         name,
    //         district,
    //         country,
    //         lat: newPlace.lat,
    //         lng: newPlace.lng
    //     }
    //     setNewPlace(null);
    // }

    return(
        <div className="map">
            <Map center = {center} zoom = {ZOOM_LEVEL} ref = {mapRef} ondblclick={handleAddClick}>
                {/* <Marker position={center}>
                        <Popup>
                            <div className="card">
                                <label>Forest Name</label>
                                <label>District</label>
                                <label>Country</label>
                                <label>Description</label>
                                <span className="username">Created by <b>Thushan</b></span>
                                <span className="date">{format()}</span>
                            </div>
                        </Popup>
                       
                </Marker> */}
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>

                {newPlace && (
                    <Popup position={newPlace} >
                        <div className="card">
                            <form className="detailsForm">
                                <label className="details">Forest Name</label>
                                <input className="detailsInput" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
                                <label className="details">District</label>
                                <input className="detailsInput" placeholder="Enter District" onChange={(e) => setDistrict(e.target.value)}/>
                                <label className="details">Country</label>
                                <input className="detailsInput" placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)}/>
                                
                                {/* <Link to={`/systemAdmin/createForest/${name}`}>
                                    <button className="submitButton" type="submit">Add Pin</button>
                                </Link> */}

                                <Link to={{
                                            pathname:'/systemAdmin/createForest',
                                            state: {name, district, country, newPlace}  
                                }}>
                                    <button className="submitButton" type="submit">Add Pin</button>
                                </Link>

                            </form>
                            
                        </div>
                    </Popup>
                )}    
            </Map>
        </div>
    )
}
