import styled from "styled-components";
import gameWonImage from "../../assets/backgrounds/game_won_bg.jpg";
import gameLostImage from "../../assets/backgrounds/game_lost_bg.jpg";
import { BGBase } from '../../styles';

export const GameOverContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.marginLG};
    margin-top: 150px;
`;

export const GameWonBG = styled(BGBase)`
    background-image: url(${gameWonImage});
`;

export const GameLostBG = styled(BGBase)`
    background-image: url(${gameLostImage});
`;

export const WinnerPanel = styled.div`
    background-color: ${props => props.theme.backgroundTransparent};
    border-radius: ${props => props.theme.borderRadiusMD};
    border: 1px solid ${props => props.theme.borderColor};
    padding: 10px ${props => props.theme.marginMD};
`;
