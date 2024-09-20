import styled from "styled-components";

export const TimerContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const TimerClock = styled.span`
    width: 180px;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizeLG};
`;

