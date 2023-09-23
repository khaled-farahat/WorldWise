import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";

import useCities from "../hooks/useCities";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add you first city by clicking on a city on the map" />
    );

  const countries: { country: string; emoji: string }[] = cities.reduce(
    (acc: { country: string; emoji: string }[], city) => {
      const existingCountry = acc.find(
        (country) => country.country === city.country
      );
      if (!existingCountry) {
        acc.push({
          country: city.country,
          emoji: city.emoji,
        });
      }
      return acc;
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
