import { CELL_STATUS } from '../../store/reducers/field-slice';

export interface FieldCellProps {
    x: number;
    y: number;
    type: CELL_STATUS;
}
