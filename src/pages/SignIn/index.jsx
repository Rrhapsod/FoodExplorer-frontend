import { BsHexagonFill } from "react-icons/bs";

import { Container, Content } from "./styles";

import { MenuSignIn } from "../../components/MenuSignIn";

export function SignIn() {
  return (
    <Container>
      <Content>
        <BsHexagonFill size={40} color="#065E7C" />
        <h1>food explorer</h1>
      </Content>
      <MenuSignIn title="Faça login" />
    </Container>
  );
}
