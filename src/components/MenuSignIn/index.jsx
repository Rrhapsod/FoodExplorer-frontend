import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { Container } from "./styles";

import { LabelInput } from "../LabelInput";
import { Button } from "../Button";
import { ButtonTransparent } from "../ButtonTransparent";

export function MenuSignIn({ title, ...rest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = () => {
    !email || !password
      ? alert("Preencha todos os campos")
      : signIn({ email, password: String(password) });
  };

  return (
    <Container {...rest}>
      <h1>{title}</h1>

      <LabelInput
        text="Email"
        placeholder="Exemplo: exemplo@exemplo.com.br"
        id="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <LabelInput
        text="Senha"
        placeholder="No mínimo 6 caracteres"
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button title="Entrar" onClick={handleSignIn} />

      <ButtonTransparent
        title="Criar uma conta"
        onClick={() => navigate("/signup")}
      />
    </Container>
  );
}
