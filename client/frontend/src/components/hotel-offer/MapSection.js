import "./Map.css";

import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// map marker
function mapMarker(marker) {
    return {
        lat: marker.latitude,
        lng: marker.longitude
    }
}


// startpoint of map
const center = {
    lat: 39.613342,
    lng: 2.956849
}

const MapSection = ({ name, marker }) => {

    // custom marker icon
    const markerIcon = L.icon({
        iconSize: [30, 45],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    });


    return (
        <div style={{height: "100%", width: "100%"}}>
        {  marker !== undefined && (
            <MapContainer
                className="map"
                center={[center.lat, center.lng]}
                zoom={9}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={mapMarker(marker)} icon={markerIcon}>
                    <Popup>
                        {name}
                    </Popup>
                </Marker>
            </MapContainer>
        )}
        </div>
    );
}

export default MapSection;