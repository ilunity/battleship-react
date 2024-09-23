import styled from "styled-components";

export const CELL_SIZE = 36;

export const CellWrapper = styled.div`
    height: ${CELL_SIZE}px;
    width: ${CELL_SIZE}px;
    background-color: ${(props) => props.theme.backgroundTransparent};
    border: 1px solid ${(props) => props.theme.borderColor};

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const IconWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MissIconWrapper = styled(IconWrapper)`
    & svg {
        width: 4px;
        height: 4px;
    }
`;

export const HitIconWrapper = styled(IconWrapper)`
    & svg {
        width: 24px;
        height: 24px;
        fill: ${props => props.theme.dangerColor};
    }
`;
