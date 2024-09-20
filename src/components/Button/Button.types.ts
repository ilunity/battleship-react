import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;
import { FastOmit } from "styled-components";

type StyledButtonProps =
    IntrinsicAttributes
    & FastOmit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, never>;

export type ButtonProps = StyledButtonProps;
