import styled from 'styled-components';
import { CELL_SIZE } from '../FieldCell/FieldCell.styles.ts';
import { SHIP_DIRECTION, ShipState } from '../../store/reducers/game-slice';

interface StyledShipProps extends Pick<ShipState, 'x' | 'y' | 'size'> {
  direction: ShipState['direction'];
  draggable: boolean;
  isDragging: boolean;
}

export const StyledShip = styled.div<StyledShipProps>`
    display: ${props => props.isDragging ? 'none' : 'block'};
    width: ${props => props.direction === SHIP_DIRECTION.HORIZONTAL ? CELL_SIZE * +props.size : CELL_SIZE}px;
    height: ${props => props.direction === SHIP_DIRECTION.VERTICAL ? CELL_SIZE * +props.size : CELL_SIZE}px;
    border: ${({ theme }) => `${theme.borderLineWidthLG} solid ${theme.shipColor}`};
    position: absolute;
    top: ${props => CELL_SIZE * props.x}px;
    left: ${props => CELL_SIZE * props.y}px;
    cursor: ${props => props.draggable ? 'pointer' : 'auto'};
    z-index: 1;
`;
