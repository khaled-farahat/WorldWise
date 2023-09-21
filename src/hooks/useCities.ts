import { useContext } from "react";

import { CitiesContext } from "../contexts/CitiesContext";

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export default useCities;
