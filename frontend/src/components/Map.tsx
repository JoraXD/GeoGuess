import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';

export interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  correctPoint?: LatLngTuple;
  clickedPoint?: LatLngTuple;
}

export default function GameMap({ onMapClick, correctPoint, clickedPoint }: MapProps) {
  const [position] = useState<LatLngTuple>([20, 0]);

  return (
    <MapContainer center={position} zoom={2} style={{ height: '100%', width: '100%' }}
      onclick={(e: any) => onMapClick(e.latlng.lat, e.latlng.lng)}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {correctPoint && clickedPoint && (
        <>
          <Marker position={correctPoint} />
          <Marker position={clickedPoint} />
          <Polyline positions={[clickedPoint, correctPoint]} />
        </>
      )}
    </MapContainer>
  );
}
