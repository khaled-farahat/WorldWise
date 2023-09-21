import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import type { City } from "../types";
import CityItem from "./CityItem";
import Message from "./Message";

type Props = {
  cities: City[];
  isLoading: boolean;
};

const CityList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add you first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
