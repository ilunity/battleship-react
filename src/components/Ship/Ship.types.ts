import { PLAYER_TYPE, ShipState } from '../../store/reducers/game-slice';

export interface ShipProps {
  index: number;
  fieldType: `${PLAYER_TYPE}`;
  shipState: ShipState;
  fixed?: boolean;
}
