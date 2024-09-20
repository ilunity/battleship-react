import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useDispatch } from 'react-redux';
import { SCREEN_TYPE, setScreen, setUserName as setStoreUserName } from '../../store/reducers/app-slice';
import { Form } from './UserNameForm.styles.ts';


export const UserNameForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();

  const handleUserNameChange = (value: string) => {
    setErrorMessage('');
    setUserName(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      startGame();
    }
  };

  const validateForm = () => {
    if (userName.length > 0) {
      return true;
    }

    setErrorMessage('Введите имя пользователя!');
    return false;
  };

  const startGame = () => {
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
        errorMessage={ errorMessage }
      />
      <Button
        type={ 'submit' }
      >
        Начать игру
      </Button>
    </Form>
  );
};
