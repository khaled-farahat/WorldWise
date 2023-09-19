import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import type { City } from "./types";

const App = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getCities = async () => {
      const citiesCol = collection(db, "cities");
      const citiesSnapshot = await getDocs(citiesCol);
      const citiesList = citiesSnapshot.docs.map((doc) => doc.data());
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<h1>Countries</h1>} />
          <Route path="form" element={<h1>Form</h1>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
