import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>lat: {lat}</p>
      <p>lng: {lng}</p>
    </div>
  );
};

export default Map;
