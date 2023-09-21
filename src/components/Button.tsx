import { MouseEvent } from "react";

import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  type: string;
};

const Button = ({ children, onClick, type }: Props) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
