import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { Container } from "./styles";

export function Tag({ name, isNew = false, click, ...rest }) {
  return (
    <Container isNew={isNew}>
      <input type="text" name={name} readOnly={!isNew} {...rest} />
      <button type="button" onClick={click}>
        {isNew ? <AiOutlinePlus size={14} /> : <AiOutlineClose size={14} />}
      </button>
    </Container>
  );
}
