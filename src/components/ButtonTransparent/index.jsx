import { Container } from "./styles";

export function ButtonTransparent({
  name = "",
  onClick,
  Icon = false,
  iconSize = false,
  iconColor = "",
  ...rest
}) {
  return (
    <Container onClick={onClick} {...rest}>
      {Icon && <Icon size={iconSize} color={iconColor} />}
      {name}
    </Container>
  );
}
