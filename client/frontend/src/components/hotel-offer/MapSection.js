import React from 'react'

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";

// Startpoint of map
const center = {
    lat: 39.613342,
    lng: 2.956849
}

const MapSection = ({ name }) => {


    const markerIcon = L.icon({
        iconSize: [30, 45],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    });

    return (
        <MapContainer
            className="map"
            center={[center.lat, center.lng]}
            zoom={9}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center} icon={markerIcon}>
                <Popup>
                    {name}
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapSection;