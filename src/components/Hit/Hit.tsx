/// <reference types="vite-plugin-svgr/client" />
import HitIcon from '../../assets/game/hit.svg?react';
import { HitContainer, HitExplosion, HitIconWrapper } from './Hit.styles.ts';

export const Hit: React.FC = () => (
  <HitContainer>
    <HitExplosion />
    <HitIconWrapper>
      <HitIcon />
    </HitIconWrapper>
  </HitContainer>
);
