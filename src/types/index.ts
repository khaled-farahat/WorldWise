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

export type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: City[] }
  | { type: "city/loaded"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: City }
  | { type: "rejected"; payload: string };
