import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface ClickHandlerProps {
  onClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  correctPoint?: LatLngTuple;
  clickedPoint?: LatLngTuple;
  lineColor?: string;
}

export default function GameMap({ onMapClick, correctPoint, clickedPoint, lineColor = 'blue' }: MapProps) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onClick={onMapClick} />
      {correctPoint && clickedPoint && (
        <>
          <Marker position={correctPoint} />
          <Marker position={clickedPoint} />
          <Polyline pathOptions={{ color: lineColor }} positions={[clickedPoint, correctPoint]} />
        </>
      )}
    </MapContainer>
  );
}
