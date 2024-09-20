import styled from "styled-components";

export const BGBase = styled.div`
    filter: blur(1px);

    height: 100vh;
    width: 100vw;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
