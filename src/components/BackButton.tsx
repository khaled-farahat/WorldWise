import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        navigate(-1);
      }}
      type="back"
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
