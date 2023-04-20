import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 14px;
  margin-bottom: 1rem;
  label {
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
  input {
    color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 1rem 0.5rem;
    background: transparent;
    border: 2px solid ${({ theme }) => theme.COLORS.GRAY_TEXT};
    border-radius: 5px;
    outline: none;
  }
`;
