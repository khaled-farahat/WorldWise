import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import type { City } from "../types";
import CityItem from "./CityItem";

type Props = {
  cities: City[];
  isLoading: boolean;
};

const CityList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem key={i} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
