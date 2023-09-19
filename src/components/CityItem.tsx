import type { City } from "../types";

type Props = {
  city: City;
};

const CityItem = ({ city }: Props) => {
  return <li>CityItem</li>;
};

export default CityItem;
