import { CELL_STATUS, PLAYER_TYPE } from '../../store/reducers/field-slice';

export interface FieldCellProps {
  x: number;
  y: number;
  fieldType: PLAYER_TYPE;
  cellType: CELL_STATUS;
}
