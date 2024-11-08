import { PLAYER_TYPE } from '../../store/reducers/field-slice';

export interface ShipDragSourceProps {
  unplaced: boolean;
  id: string;
}

export interface ShipDragReturnProps {
  isDragging: boolean;
}

export interface ShipProps {
  id: string;
  fieldType: PLAYER_TYPE;
  draggable?: boolean;
  x: number;
  y: number;
}
