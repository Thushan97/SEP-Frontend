import React, {useRef} from 'react';
import { Map, TileLayer, Polygon, FeatureGroup, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import osm from '../systemAdmin/osmProvider';
import '../../style/map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../../style/restrictionLevel.css';
import { api } from '../../services/api';
import { EditControl } from 'react-leaflet-draw';
import { toast } from 'react-toastify';

toast.configure()

export default function RestictionLevels(){
    const [center, setCenter] = useState( { lat: 7.291418, lng: 80.636696 } );
    const [coordinates, setCoordinates] = useState([]);
    const [mapLayers, setMapLayers] = useState([]);
    const [newPlace, setNewPlace] = useState(null);
    const [restriction, setRestriction] = useState('');
    const [forestId, setForestId] = useState('');
    const [subAreas, setSubAreas] = useState([]);
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    useEffect(() => {
        const data = {
            "username" : localStorage.getItem("email")
        }
        async function getForestId(){
            const response = await api.forestAdmin.getForestId(data);  
            setForestId(response.data.forest_id);
            const result = await api.forestAdmin.getForestArea(response.data.forest_id);
            setCoordinates(result.data.boundary.features[0].geometry.coordinates);
            setSubAreas(result.data.sub_areas)
            //console.log(result.data.boundary.features[0].geometry.coordinates)
        }
        getForestId();
    },[])

    // if(subAreas[0].sub_area[0]){
    //     console.log(subAreas[0].sub_area[0].latlngs)
    // }
    if(subAreas){
        console.log(subAreas);
    }
    
    const arrayMap = () => {
        if(coordinates[0]){
            const content = coordinates[0].map( (coordinate) => 
                [coordinate[1], coordinate[0]]
            );
            return content;
        }
    }
    
    const _onCreate = async (e) => {

        const {layerType, layer} = e;
        if( layerType === "polygon"){
            const {_leaflet_id} = layer;
            setMapLayers( (layers) => [...layers, {id: _leaflet_id, latlngs: layer.getLatLngs()[0]}]);
        }

        if( layerType === "rectangle"){
            const {_leaflet_id} = layer;
            setMapLayers( (layers) => [...layers, {id: _leaflet_id, latlngs: layer.getLatLngs()[0]}]);
        }

        if( layerType === "polyline"){
            const {_leaflet_id} = layer;
            setMapLayers( (layers) => [...layers, {id: _leaflet_id, latlngs: layer.getLatLngs()[0]}]);
        }

    }; 

    // console.log(mapLayers)

    const handleAddClick = (e) => {
        //console.log(e.latlng);
        const {lng, lat} = e.latlng;
        setNewPlace({lng, lat});
    }

    const handleClick = async () => {
        
        try{
            const data = {
                "sub_area" : mapLayers,
                "restriction_level" : restriction,
                "forest_id" : forestId
            }
            console.log(data);
            const response = await api.forestAdmin.addRestrictionAreas(data); 
            if(response.status === 200){
                toast.success("Restriction Area Added Successfully");
            }
        }
        catch(ex){
            toast.error("Something Went Wrong");
        }
        
    }

    return(
        <div className="map">
            <Map center = {center} zoom = {ZOOM_LEVEL} ref = {mapRef} ondblclick={handleAddClick} doubleClickZoom={false}>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>
                { coordinates[0] && (<Polygon color="magenta" positions={arrayMap()} />)}
                { subAreas && subAreas.map((i,index) => {
                    return (subAreas && (<Polygon key={index} positions={[i.sub_area[0].latlngs]}/>))                     
                })}
                <FeatureGroup>
                    <EditControl position="topright" onCreated={_onCreate}
                        draw={{
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false
                        }}
                    />
                </FeatureGroup>
                {newPlace && (
                    <Popup position={newPlace} >
                        <div className="card1">
                            <form className="detailsForm1">
                            <label><h5>Restriction Level</h5></label>
                                <select className="newUserSelect1" name="active" id="active" onChange={(e) => setRestriction(e.target.value)}>
                                    <option value="none">None</option>
                                    <option value="public_visit_area">Public Visit Areas</option>
                                    <option value="camping_area">Camping Areas</option>
                                    <option value="restricted_area">Restricted Areas</option>
                                    <option value="highly_restricted_area">Highly Restricted Areas</option>
                                </select>
                                <button className="submitButton1" type="submit" onClick={handleClick}>Add Restriction</button>
                            </form>    
                        </div>
                    </Popup>
                )}    
            </Map> 
        </div>
    )
}
