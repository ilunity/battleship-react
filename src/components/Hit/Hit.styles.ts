import styled, { keyframes } from 'styled-components';
import explosion1 from '../../assets/explosions/ship-explosion/ship-explosion-1.png';
import explosion2 from '../../assets/explosions/ship-explosion/ship-explosion-2.png';
import explosion3 from '../../assets/explosions/ship-explosion/ship-explosion-3.png';
import explosion4 from '../../assets/explosions/ship-explosion/ship-explosion-4.png';
import explosion5 from '../../assets/explosions/ship-explosion/ship-explosion-5.png';
import explosion6 from '../../assets/explosions/ship-explosion/ship-explosion-6.png';
import explosion7 from '../../assets/explosions/ship-explosion/ship-explosion-7.png';
import explosion8 from '../../assets/explosions/ship-explosion/ship-explosion-8.png';

const explosion = keyframes`
    10% {
        background-image: url(${explosion1});
    }

    20% {
        background-image: url(${explosion2});
    }

    30% {
        background-image: url(${explosion3});
    }

    40% {
        background-image: url(${explosion4});
    }

    50% {
        background-image: url(${explosion5});
    }

    65% {
        background-image: url(${explosion6});
    }

    80% {
        background-image: url(${explosion7});
    }

    95% {
        background-image: url(${explosion8});
    }

    100% {
        background-image: none;
    }
`;

const showHitIcon = keyframes`
    to {
        opacity: 1;
    }
`;

export const HitContainer = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    z-index: 2;
`;

export const HitExplosion = styled.div`
    width: 100%;
    height: 100%;
    animation: 2s ${explosion} linear forwards;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export const HitIconWrapper = styled.span`
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    animation: 0.01s ${showHitIcon} 2s forwards;

    & svg {
        width: 100%;
        height: 100%;
        fill: #c30000;
    }
`;
