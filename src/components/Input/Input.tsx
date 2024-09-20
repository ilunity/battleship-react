import React, { ChangeEventHandler } from 'react';
import { InputProps } from './Input.types';
import { ErrorMessage, InputContainer, StyledInput, StyledLabel } from './Input.styles.ts';


export const Input: React.FC<InputProps> = ({ onChange, errorMessage, ...inputProps }) => {
  const handleClick: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.currentTarget.value);
  };

  return (
    <InputContainer>
      <StyledLabel htmlFor="username">
        Введите имя пользователя:
      </StyledLabel>
      <StyledInput
        type="text"
        onChange={ handleClick }
        { ...inputProps }
      />
      <ErrorMessage>
        { errorMessage }
      </ErrorMessage>
    </InputContainer>
  );
};
