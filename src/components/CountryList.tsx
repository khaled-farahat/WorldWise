import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import type { City } from "../types";

type Props = {
  cities: City[];
  isLoading: boolean;
};

const CountryList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add you first city by clicking on a city on the map" />
    );

  const countries = [...new Set(cities.map((city) => ({
    country: city.country,
    emoji: city.emoji,
  })))];

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
