import { Container } from "./styles";

export function Input({ title, type, placeholder, name, value, ...rest }) {
  return (
    <Container {...rest}>
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        id={name}
      />
    </Container>
  );
}
