import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { Container } from "./styles";
import { api } from "../../services/api";

import { ButtonTransparent } from "../ButtonTransparent";

export function CardsAdmin({ name, image, id, description, price, ...rest }) {
  const navigate = useNavigate();

  // Change to page details using route params
  const handleDetails = () => {
    navigate(`/att/${id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/dishes/${id}`);
      return alert("Prato excluído");
    } catch {
      return alert("ERROR, favor tentar novamente");
    }
  };

  return (
    <Container {...rest}>
      <ButtonTransparent
        Icon={AiOutlineClose}
        className="icon"
        iconSize={20}
        iconColor="red"
        onClick={handleDelete}
      />

      <img src={`${api.defaults.baseURL}/files/${image}`} alt="dish img" />

      <ButtonTransparent className="name" name={name} onClick={handleDetails} />
      <p>{description}</p>

      <h4>R$ {price}</h4>
    </Container>
  );
}
