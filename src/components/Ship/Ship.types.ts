import { PLAYER_TYPE, ShipState } from '../../store/reducers/game-slice';

export interface ShipDragSourceProps {
  unplaced: boolean;
  index: number | undefined;
  size: number | undefined;
}

export interface ShipDragReturnProps {
  isDragging: boolean;
}

export interface ShipProps {
  unplaced?: boolean;
  index?: number | undefined;
  fieldType: `${PLAYER_TYPE}`;
  shipState: ShipState;
  draggable?: boolean;
}
