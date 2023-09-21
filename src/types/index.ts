import { GeoPoint, Timestamp } from "firebase/firestore";

export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: Timestamp;
  notes: string;
  position: GeoPoint;
  id: string;
};
