import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    //Firefox
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) => theme.COLORS.BACKGROUND_FORM} transparent;
}

//Chrome, Edge e Safari
*::-webkit-scrollbar {
    width: 8px;
}
*::-webkit-scrollbar-track {
    background: transparent;
}
*::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_FORM};
    border-radius: 20px;
}

:root{
    font-size: 62.5%;
}

body{
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    color: ${({ theme }) => theme.COLORS.WHITE};
}

body, button {
    font-family: "Poppins", sans-serif;
}

input {
    font-family: "Roboto", sans-serif;
}

a {
    text-decoration: none;
}

button, a {
    cursor: pointer;
    transition: filter 0.2s;
} 

button:hover, a:hover {
    filter: brightness(0.9);
}
`;
