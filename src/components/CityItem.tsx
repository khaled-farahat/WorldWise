import { Link } from "react-router-dom";

import type { City } from "../types";
import styles from "./CityItem.module.css";

type Props = {
  city: City;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }: Props) => {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${position.latitude}&lng=${position.longitude}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date.toDate())}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
