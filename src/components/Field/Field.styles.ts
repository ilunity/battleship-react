import styled from "styled-components";

export const FieldOuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.marginSM};
`;

export const FieldInnerContainer = styled.div`
    border: 1px solid ${(props) => props.theme.primaryColor};
`;

export const FieldTitle = styled.h3`
    font-size: ${props => props.theme.fontSizeLG};
    color: ${props => props.theme.secondaryColor};
`;

export const FieldRow = styled.div`
    display: flex;
`;
