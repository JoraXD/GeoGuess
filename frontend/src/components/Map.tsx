import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';
import { useEffect, useRef } from 'react';


interface ClickHandlerProps {
  onClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onClick }: ClickHandlerProps) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
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
  answerCorrect?: boolean;
}

export default function GameMap({
  onMapClick,
  correctPoint,
  clickedPoint,
  lineColor = 'blue',
  answerCorrect,
}: MapProps) {
  const clickedRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (!clickedRef.current || clickedPoint === undefined) return;
    const el = clickedRef.current.getElement();
    if (!el) return;
    const cls = answerCorrect ? 'marker-bounce-correct' : 'marker-bounce-wrong';
    el.classList.add(cls);
    const remove = () => el.classList.remove(cls);
    el.addEventListener('animationend', remove, { once: true });
  }, [clickedPoint, answerCorrect]);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
    <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=ru" />
      <ClickHandler onClick={onMapClick} />

      {correctPoint && clickedPoint && (
        <>
          <Marker position={correctPoint} />
          <Marker ref={clickedRef} position={clickedPoint} />
          <Polyline pathOptions={{ color: lineColor }} positions={[clickedPoint, correctPoint]} />

        </>
      )}
    </MapContainer>
  );
}
