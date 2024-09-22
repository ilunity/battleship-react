import { PLAYER_TYPE } from "../../store/reducers/game-slice";

export interface FieldProps {
    fieldType: `${PLAYER_TYPE}`;
    draggableShips?: boolean;
}
