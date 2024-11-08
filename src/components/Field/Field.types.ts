import { PLAYER_TYPE } from '../../store/reducers/field-slice';

export interface FieldProps {
    fieldType: PLAYER_TYPE;
    draggableShips?: boolean;
}
