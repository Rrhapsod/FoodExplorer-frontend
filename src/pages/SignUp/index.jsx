import { BsHexagonFill } from "react-icons/bs";

import { Container, Content } from "./styles";

import { MenuSignUp } from "../../components/MenuSignUp";

export function SignUp() {
  return (
    <Container>
      <Content>
        <BsHexagonFill size={40} color="#065E7C" />
        <h1>food explorer</h1>
      </Content>
      <MenuSignUp title="Crie sua conta" />
    </Container>
  );
}
