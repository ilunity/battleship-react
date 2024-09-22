import styled from 'styled-components';
import { cellSize } from '../FieldCell/FieldCell.styles.ts';
import { SHIP_POSITION, ShipState } from '../../store/reducers/game-slice';

interface StyledShipProps extends Pick<ShipState, 'x' | 'y' | 'size'> {
  shipPosition: ShipState['position'];
  draggable: boolean;
}

export const StyledShip = styled.div<StyledShipProps>`
    width: ${props => props.shipPosition === SHIP_POSITION.HORIZONTAL ? cellSize * +props.size : cellSize}px;
    height: ${props => props.shipPosition === SHIP_POSITION.VERTICAL ? cellSize * +props.size : cellSize}px;
    border: ${({ theme }) => `${theme.borderLineWidthLG} solid ${theme.shipColor}`};
    position: absolute;
    top: ${props => cellSize * props.x}px;
    left: ${props => cellSize * props.y}px;
    cursor: ${props => props.draggable ? 'pointer' : 'auto'};
    z-index: 1;
`;
