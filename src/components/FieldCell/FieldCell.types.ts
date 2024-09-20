import { FIELD_CELL_TYPE } from "../../store/reducers/game-slice";

export interface FieldCellProps {
    x: number;
    y: number;
    type: `${FIELD_CELL_TYPE}`;
}
