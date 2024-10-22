import styled from 'styled-components';
import { CELL_SIZE } from '../FieldCell/FieldCell.styles.ts';

export const ShipsArrangementContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: ${props => props.theme.marginLG};
`;

export const ButtonsPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.marginSM};
`;

export const UnplacedShipsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.backgroundTransparent};
    border: ${CELL_SIZE}px solid ${props => props.theme.borderColorTransparent};
    width: ${CELL_SIZE * 10}px;
    height: ${CELL_SIZE * 10}px;
    position: relative;
`;
