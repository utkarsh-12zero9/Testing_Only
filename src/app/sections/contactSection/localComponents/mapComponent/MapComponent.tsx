"use client";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

interface MapComponentProps {
  location: [number, number];
}

const MapComponent = ({ location }: MapComponentProps) => {
  useEffect(() => {
    L.Icon.Default.prototype.options.iconUrl = undefined;
    L.Icon.Default.prototype.options.iconRetinaUrl = undefined;
    L.Icon.Default.prototype.options.shadowUrl = undefined;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);
  
  
  return (
    <MapContainer
      center={location}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;