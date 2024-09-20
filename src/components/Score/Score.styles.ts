import styled from "styled-components";

export const ScoreContainer = styled.div`
    display: flex;
    font-size: ${props => props.theme.fontSizeLG};
    gap: ${props => props.theme.marginSM}
`;

export const ScoreContent = styled.p`
    text-align: center;
    width: 30px;
`;
