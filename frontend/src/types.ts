export type Question = {
  id: number;
  text: string;
  lat: number;
  lng: number;
  hint: string;
  category: 'country' | 'capital' | 'landmark';
};

export type AnswerResponse = {
  correct: boolean;
  correctLat: number;
  correctLng: number;
  distanceKm: number;
  strike: number;
};

