import styled from "styled-components";


export const StyledButton = styled.button`
    padding: 7px 15px;
    color: #fff;
    font-size: 20px;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.primaryColor};;
    border: ${props => props.theme.borderLineWidthMD} solid ${props => props.theme.borderColor};;
    border-radius: ${props => props.theme.borderRadiusMD};

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        opacity: 1;
    }
`;
