import { createContext, useEffect, useState } from "react";

import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import type { City } from "../types";

type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
};

export const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
});

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};


export default CitiesProvider ;
