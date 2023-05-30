import { useNavigate } from "react-router-dom";
import { BsPencil } from "react-icons/bs";

import { Container } from "./styles";
import { api } from "../../services/api";

import { ButtonTransparent } from "../ButtonTransparent";

export function CardsAdmin({ name, image, id, description, price, ...rest }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/dish/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container {...rest}>
      <ButtonTransparent
        Icon={BsPencil}
        className="icon"
        iconSize={20}
        iconColor="white"
        onClick={() => handleEdit(id)}
      />

      <img src={`${api.defaults.baseURL}/files/${image}`} alt="dish img" />

      <ButtonTransparent className="name" title={name} onClick={handleDetails} />
      <p>{description}</p>

      <h4>R$ {(price / 100).toFixed(2)}</h4>
    </Container>
  );
}
