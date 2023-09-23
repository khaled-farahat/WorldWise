import { createContext, useCallback, useEffect, useReducer } from "react";

import db from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import type { City, CitiesAction as Action } from "../types";

type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string;
  getCity: (id: string) => void;
  createCity: (city: City) => void;
  deleteCity: (id: string) => void;
};

type State = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string;
};

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload.id),
        currentCity: null,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    default:
      // throw new Error(`Unhandled action type: ${action.type}`);
      return state;
  }
  // return state;
}

export const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    const getCities = async () => {
      const citiesCol = collection(db, "cities");
      const citiesSnapshot = await getDocs(citiesCol);
      const citiesList = citiesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // setCities(citiesList as City[]);
      dispatch({ type: "cities/loaded", payload: citiesList as City[] });
    };
    try {
      getCities();
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem loading the cities.",
      });
    }
  }, []);

  const getCity = useCallback(
    async (id: string) => {
      if (currentCity?.id === id) return;

      dispatch({ type: "loading" });
      try {
        const cityRef = doc(db, "cities", id!);
        const citySnapshot = await getDoc(cityRef);
        const cityData = citySnapshot.data();
        dispatch({
          type: "city/loaded",
          payload: { ...cityData, id: citySnapshot.id } as City,
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was a problem loading the city.",
        });
      }
    },
    [currentCity?.id]
  );

  const createCity = async (city: City) => {
    dispatch({ type: "loading" });
    try {
      const docRef = await addDoc(collection(db, "cities"), city);
      dispatch({
        type: "city/created",
        payload: { ...city, id: docRef.id } as City,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem creating the city.",
      });
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({ type: "loading" });
    try {
      await deleteDoc(doc(db, "cities", id));
      dispatch({
        type: "city/deleted",
        payload: { id } as City,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem deleting the city.",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
