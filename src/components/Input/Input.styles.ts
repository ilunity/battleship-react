import styled from 'styled-components';

export const InputContainer = styled.div`
    margin-bottom: ${props => props.theme.marginMD};
`;

export const StyledLabel = styled.label`
    font-size: 22px;
    display: block;
    margin-bottom: 5px;
`;

export const StyledInput = styled.input`
    display: block;
    width: 100%;
    height: 40px;
    padding: 10px 15px;
    font-size: 20px;
    line-height: 1.5;
    color: #212529;
    background-color: ${props => props.theme.background};
    border: ${props => props.theme.borderLineWidthMD} solid ${props => props.theme.borderColor};
    border-radius: ${props => props.theme.borderRadiusMD};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const ErrorMessage = styled.span`
    color: ${props => props.theme.dangerColor};
    font-size: ${props => props.theme.fontSizeSM};
`;
