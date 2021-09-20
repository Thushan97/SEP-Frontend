import React, {useRef} from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import osm from './osmProvider';
import '../../style/map.css';
import 'leaflet/dist/leaflet.css';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import PinMap from './pinMap';
import {useLocation} from 'react-router-dom'
import {api} from '../../services/api';

export default function RenderMap(){
    let location = useLocation();
      //console.log(location.state.newPlace)
    const [center, setCenter] = useState( { lat: 6.927079, lng: 79.861244} );
    const [mapLayers, setMapLayers] = useState([]);
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

        //api.systemAdmin.getCordinates(mapLayers[0]);

    }; 

    const _onEdited = (e) => {
        const { layers: {_layers}} = e;
        Object.values( _layers ).map( ({ _leaflet_id, editing }) => {
            setMapLayers((layers) => layers.map((l) => l.id === _leaflet_id ? { ...l, latlngs: { ...editing.latlngs[0]}} : l));
        });

        //api.systemAdmin.editCordinates(mapLayers[0]);

    };

    const _onDeleted = (e) => {
        const { layers: {_layers} } = e;
        Object.values(_layers).map(({_leaflet_id}) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id ));
        });

        //api.systemAdmin.deleteCordinates(mapLayers[0]);
    };

    const arrayMap = () => {
        if(mapLayers[0]){
            const content = mapLayers[0].latlngs.map( (cordinates) => 
                [cordinates.lat, cordinates.lng]
            );
            return content;
        }
    }
    

    const handleClick = (e) => {
        e.preventDefault();

        const newForest = {
            "name" : location.state.name,
            "district": location.state.district,
            "country": location.state.country,
            "location": [location.state.newPlace.lat, location.state.newPlace.lng],
            "forest_boundry": {
                "type" : "Feature Collection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                arrayMap()
                            ] 
                        }
                    }
                ]
            }
        }

        try{
            const response = api.systemAdmin.registerForest(newForest);
        }
        catch(ex) {
            console.log(ex);
        }   
    }

    return(
        <div className="map">
            <Map center = {center} zoom = {ZOOM_LEVEL} ref = {mapRef} >
                <FeatureGroup>
                    <EditControl position="topright" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted} 
                        draw={{
                            circle: false,
                            circlemarker: false,
                            marker: false,
                        }}
                    />
                </FeatureGroup>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>
            </Map>
            <pre className="text-left">{JSON.stringify(mapLayers,0,2)}</pre>
            <button className="mapSubmitButton" type="submit" onClick={handleClick} >Submit</button>
        </div>
    )
}
