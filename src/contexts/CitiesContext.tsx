import { createContext, useEffect, useState } from "react";

import db from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import type { City } from "../types";

type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: string) => void;
};

export const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: () => {},
});

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const getCities = async () => {
      const citiesCol = collection(db, "cities");
      const citiesSnapshot = await getDocs(citiesCol);
      const citiesList = citiesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCities(citiesList as City[]);
    };
    try {
      getCities();
    } catch {
      alert("There was a problem loading the cities.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCity = async (id: string) => {
    try {
      setIsLoading(true);
      const cityRef = doc(db, "cities", id!);
      const citySnapshot = await getDoc(cityRef);
      const cityData = citySnapshot.data();
      setCurrentCity({ ...cityData, id: citySnapshot.id } as City);
    } catch {
      alert("There was a problem loading the city.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
