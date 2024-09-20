import React from 'react';
import { ScoreContainer, ScoreContent } from "./Score.styles.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


export const Score: React.FC = () => {
  const { user, enemy } = useSelector((state: RootState) => state.game.score);

  return (
    <ScoreContainer>
            Очки:
      <ScoreContent>
        { user }|{ enemy }
      </ScoreContent>
    </ScoreContainer>
  );
};
