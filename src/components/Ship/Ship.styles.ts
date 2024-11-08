import styled, { keyframes } from 'styled-components';
import { CELL_SIZE } from '../FieldCell/FieldCell.styles.ts';
import { SHIP_DIRECTION } from '../../store/reducers/field-slice';

interface StyledShipProps {
  draggable: boolean;
  isDragging: boolean;
  x: number;
  y: number;
  direction: SHIP_DIRECTION;
  size: number;
}

export const StyledShip = styled.div<StyledShipProps>`
    display: ${props => props.isDragging ? 'none' : 'block'};
    width: ${props => props.direction === SHIP_DIRECTION.HORIZONTAL ? CELL_SIZE * +props.size : CELL_SIZE}px;
    height: ${props => props.direction === SHIP_DIRECTION.VERTICAL ? CELL_SIZE * +props.size : CELL_SIZE}px;
    border: ${({ theme }) => `${theme.borderLineWidthLG} solid ${theme.shipColor}`};
    position: absolute;
    top: ${props => CELL_SIZE * props.y}px;
    left: ${props => CELL_SIZE * props.x}px;
    cursor: ${props => props.draggable ? 'pointer' : 'auto'};
    z-index: 1;
    overflow: hidden;
`;

const sunkAnimation = keyframes`
    from {
        background-color: #0097e6;
        transform: translateY(100%);
    }
    to {
        background-color: #0097e6;
        transform: translateY(0px);
    }
`;

export const Water = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    animation: 4s ${sunkAnimation} 2s linear forwards;
`;
