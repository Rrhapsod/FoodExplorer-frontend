import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "./styles";
import { api } from "../../services/api";

import { ButtonTransparent } from "../ButtonTransparent";
import { Button } from "../Button";

export function Cards({ name, image, id, description, price, ...rest }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const handleDetails = () => {
    navigate(`/details/${id}`);
  };

  const handleAddQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleRemoveQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
      return alert("Quantidade mínima é 1");
    }
    setQuantity((prevState) => prevState - 1);
  };

  return (
    <Container {...rest}>
      <img src={`${api.defaults.baseURL}/files/${image}`} alt="plate img" />

      <ButtonTransparent className="name" name={name} onClick={handleDetails} />
      <p>{description}</p>

      <h4>R$ {price}</h4>

      <div className="quantity">
        <div>
          <button onClick={handleRemoveQuantity}>&minus;</button>
          <span>{quantity.toString().padStart(2, 0)}</span>
          <button onClick={handleAddQuantity}>&#43;</button>
        </div>
        <Button title="incluir" onClick={handleDetails} />
      </div>
    </Container>
  );
}
