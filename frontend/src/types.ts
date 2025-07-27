export type Category = 'country' | 'capital' | 'landmark' | 'mixed';

export type BBox = [number, number, number, number];

export type Question = {
  id: number;
  text: string;
  lat: number;
  lng: number;
  hint: string;
  category: 'country' | 'capital' | 'landmark';
  bbox?: BBox;
  radiusKm?: number;
};

export type AnswerResponse = {
  correct: boolean;
  correctLat: number;
  correctLng: number;
  distanceKm: number;
  strike: number;
};

