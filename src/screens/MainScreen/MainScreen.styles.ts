import styled from "styled-components";
import mainScreenImage from '../../assets/backgrounds/sea_battle_bg.jpg';
import { BGBase } from '../../styles';

export const MainScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.marginLG};
`;

export const MainScreenBG = styled(BGBase)`
    background-image: url(${mainScreenImage});
`;

export const MainScreenInfo = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${props => props.theme.marginLG};
    background-color: ${props => props.theme.backgroundTransparent};
    border-radius: ${props => props.theme.borderRadiusMD};
    border: 1px solid ${props => props.theme.borderColor};
    padding: 4px ${props => props.theme.marginMD};
`;

export const FieldsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: ${props => props.theme.marginLG};
`;
