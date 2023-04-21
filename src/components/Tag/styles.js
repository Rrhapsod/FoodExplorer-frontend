import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  input {
    width: 100%;
    padding: 8px;
    color: ${({ theme }) => theme.COLORS.WHITE_DARK};
    background: ${({ isNew }) => (isNew ? "transparent" : "#76797B")};
    font-size: 1.2rem;
    line-height: 16px;
    border: ${({ theme, isNew }) =>
      isNew ? `1px dashed ${theme.COLORS.GRAY_TEXT}` : "none"};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 0;
  }
  button {
    background: ${({ isNew }) => (isNew ? "transparent" : "#76797B")};
    color: ${({ theme }) => theme.COLORS.WHITE_DARK};
    padding: 8px;
    border: ${({ theme, isNew }) =>
      isNew ? `1px dashed ${theme.COLORS.GRAY_TEXT}` : "none"};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: 0;
  }
`;
