import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useDispatch } from 'react-redux';
import { SCREEN_TYPE, setScreen, setUserName as setStoreUserName } from '../../store/reducers/app-slice';
import { setTime as setStoreTime } from '../../store/reducers/field-slice';
import { Form } from './StartGameForm.styles.ts';
import { Time } from '@internationalized/date';
import './StartGameForm.styles.css';
import { TimeInput } from '../TimeInput';


interface ErrorState {
  time: string;
  name: string;
}

export const StartGameForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [time, setTime] = useState<Time>(new Time(undefined, 5));
  const [errorMessage, setErrorMessage] = useState<ErrorState>({
    time: '',
    name: '',
  });
  const dispatch = useDispatch();

  const handleUserNameChange = (value: string) => {
    setErrorMessage(prev => ({ ...prev, name: '' }));
    setUserName(value);
  };

  const handleTimerChange = (time: Time) => {
    setErrorMessage(prev => ({ ...prev, time: '' }));
    setTime(time);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    return startGame();
  };

  const validateForm = () => {
    let valid = true;
    valid = valid && validateName();
    valid = valid && validateTime();
    return valid;
  };

  const validateName = () => {
    const result = userName.length > 0;
    if (!result) {
      setErrorMessage(prev => ({ ...prev, name: 'Введите имя пользователя!' }));
    }

    return result;
  };

  const validateTime = () => {
    const result = !!time;
    if (!result) {
      setErrorMessage(prev => ({ ...prev, time: 'Введите время игры!' }));
    }

    return result;
  };

  const startGame = () => {
    dispatch(setStoreTime((time.minute * 60 + time.second) * 1000));
    dispatch(setStoreUserName(userName));
    dispatch(setScreen(SCREEN_TYPE.MAIN));
  };

  return (
    <Form
      onSubmit={ handleSubmit }
      noValidate
    >
      <Input
        value={ userName }
        onChange={ handleUserNameChange }
        name={ 'username' }
        id={ 'username' }
        placeholder={ 'username' }
        errorMessage={ errorMessage.name }
      />
      <TimeInput
        value={ time }
        onChange={ handleTimerChange }
        errorMessage={ errorMessage.time }
      />
      <Button
        type={ 'submit' }
      >
        Начать игру
      </Button>
    </Form>
  );
};
