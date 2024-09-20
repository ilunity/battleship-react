import styled from "styled-components";
import startScreenImage from "../../assets/backgrounds/start_screen_bg.jpg";
import { BGBase } from '../../styles';

export const StartScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
    gap: ${props => props.theme.marginLG};
    background-color: ${props => props.theme.backgroundTransparent};
    border-radius: ${props => props.theme.borderRadiusMD};
    border: 1px solid ${props => props.theme.borderColor};
`;

export const StartScreenBG = styled(BGBase)`
    background-image: url(${startScreenImage});
`;

export const GameName = styled.span`
    font-size: 40px;
    margin: 0 auto 50px;
`;
