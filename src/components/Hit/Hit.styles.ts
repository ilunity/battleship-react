import styled, { keyframes } from 'styled-components';
import explosion1 from '../../assets/explosions/ship-explosion/ship-explosion-1.png';
import explosion2 from '../../assets/explosions/ship-explosion/ship-explosion-2.png';
import explosion3 from '../../assets/explosions/ship-explosion/ship-explosion-3.png';
import explosion4 from '../../assets/explosions/ship-explosion/ship-explosion-4.png';
import explosion5 from '../../assets/explosions/ship-explosion/ship-explosion-5.png';
import explosion6 from '../../assets/explosions/ship-explosion/ship-explosion-6.png';
import explosion7 from '../../assets/explosions/ship-explosion/ship-explosion-7.png';
import explosion8 from '../../assets/explosions/ship-explosion/ship-explosion-8.png';
import hitImage from '../../assets/game/hit.svg';

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
        background-image: url(${hitImage});
    }
`;


export const Hit = styled.div`
    animation: 2s ${explosion} linear forwards;

    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 2;
`;
