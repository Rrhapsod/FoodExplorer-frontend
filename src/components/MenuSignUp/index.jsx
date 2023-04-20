import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "./styles";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

import { LabelInput } from "../LabelInput";
import { Button } from "../Button";
import { ButtonTransparent } from "../ButtonTransparent";

export function MenuSignUp({ title, ...rest }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  async function handleSignUp() {
    if (!email || !name || !password) {
      return alert("Preencha todos os campos");
    }
    if (password.length < 6) {
      return alert("A senha deve ter pelo menos 6 caracteres");
    }
    try {
      await api.post("/users", { name, email, password: String(password) });
      alert("Usuário cadastrado com sucesso");

      handleBack();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Nao foi possivel realizar o cadastro");
      }
    }
  }

  return (
    <Container {...rest}>
      <h1>{title}</h1>
      <LabelInput
        text="Seu nome"
        placeholder="Exemplo: Maria da Silva"
        id="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />

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

      <Button title="Criar conta" onClick={handleSignUp} />

      <ButtonTransparent title="Já tenho uma conta" onClick={handleBack} />
    </Container>
  );
}
