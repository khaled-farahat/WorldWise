import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import styles from "./City.module.css";
import type { City } from "../types";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();

  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    const getCity = async () => {
      if (!id) return;
      const cityRef = doc(db, "cities", id!);
      const citySnapshot = await getDoc(cityRef);
      const cityData = citySnapshot.data();
      setCity(cityData as City);
    };
    try {
      getCity();
    } catch {
      alert("There was a problem loading the city.");
    }
  }, [id]);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{city?.emoji}</span> {city?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {city?.cityName} on</h6>
        {city?.date.toDate() && <p>{formatDate(city.date.toDate())}</p>}
      </div>

      {city?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{city?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${city?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {city?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
