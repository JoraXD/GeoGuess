import { haversineDistanceKm } from './haversine';
import assert from 'assert';

// Eiffel Tower
const eiffel = { lat: 48.8584, lng: 2.2945 };
// Louvre Museum
const louvre = { lat: 48.8606, lng: 2.3376 };

const distance = haversineDistanceKm(eiffel.lat, eiffel.lng, louvre.lat, louvre.lng);

console.log('Distance Eiffel -> Louvre:', distance.toFixed(2), 'km');
assert(Math.abs(distance - 3) < 0.5);
console.log('Test passed');
