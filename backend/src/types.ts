export type Question = {
  id: number;
  text: string;
  lat: number;
  lng: number;
  hint: string;
  category: 'country' | 'capital' | 'landmark';
};

export type AnswerRequest = {
  questionId: number;
  clickedLat: number;
  clickedLng: number;
  sessionId: string;
};

export type AnswerResponse = {
  correct: boolean;
  correctLat: number;
  correctLng: number;
  distanceKm: number;
  strike: number;
};
