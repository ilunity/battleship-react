import { GameName, StartScreenBG, StartScreenContainer } from './StartScreen.styles.ts';
import { StartGameForm } from '../../components/StartGameForm';


export const StartScreen: React.FC = () => {
  return (
    <StartScreenContainer>
      <StartScreenBG />
      <GameName>
        Морской бой
      </GameName>
      <StartGameForm />
    </StartScreenContainer>
  );
};
