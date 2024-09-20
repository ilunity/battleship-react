import { GameName, StartScreenBG, StartScreenContainer } from './StartScreen.styles.ts';
import { UserNameForm } from '../../components/UserNameForm';


export const StartScreen: React.FC = () => {
  return (
    <StartScreenContainer>
      <StartScreenBG />
      <GameName>
        Морской бой
      </GameName>
      <UserNameForm />
    </StartScreenContainer>
  );
};
