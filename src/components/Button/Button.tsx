import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from "./Button.styles.ts";


export const Button: React.FC<ButtonProps> = ({ ...buttonProps }) => {
  return (
    <StyledButton { ...buttonProps }/>
  );
};
