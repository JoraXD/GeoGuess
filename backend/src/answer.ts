import { haversineDistanceKm } from './haversine';
import { Question } from './types';

export function checkAnswer(
  question: Question,
  clickedLat: number,
  clickedLng: number
): { correct: boolean; distance: number } {
  const distance = haversineDistanceKm(
    clickedLat,
    clickedLng,
    question.lat,
    question.lng
  );

  let correct = false;
  if (question.bbox) {
    const [minLat, minLng, maxLat, maxLng] = question.bbox;
    correct =
      clickedLat >= minLat &&
      clickedLat <= maxLat &&
      clickedLng >= minLng &&
      clickedLng <= maxLng;
  } else {
    const radius = question.radiusKm ?? 200;
    correct = distance <= radius;
  }

  return { correct, distance };
}
