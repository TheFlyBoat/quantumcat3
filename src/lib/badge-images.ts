import type { StaticImageData } from 'next/image';

import aliveAndKicking from '@/assets/badges/alive_and_kicking.svg';
import archivist from '@/assets/badges/archivist.svg';
import curiousKitten from '@/assets/badges/curious_kitten.svg';
import firstPeek from '@/assets/badges/first_peek.svg';
import messageKeeper from '@/assets/badges/message_keeper.svg';
import paradoxSeeker from '@/assets/badges/paradox_seeker.svg';
import quantumEcho from '@/assets/badges/quantum_echo.svg';
import restInPieces from '@/assets/badges/rest_in_pieces.svg';
import storyteller from '@/assets/badges/storyteller.svg';
import viralCat from '@/assets/badges/viral_cat.svg';

const toSrc = (asset: StaticImageData | string) =>
  typeof asset === 'string' ? asset : asset.src;

export const badgeImageMap: Record<string, string> = {
  'alive-kicking': toSrc(aliveAndKicking),
  'the-archivist': toSrc(archivist),
  'curious-kitten': toSrc(curiousKitten),
  'first-peek': toSrc(firstPeek),
  'message-keeper': toSrc(messageKeeper),
  'paradox-seeker': toSrc(paradoxSeeker),
  'quantum-echo': toSrc(quantumEcho),
  'rest-in-pieces': toSrc(restInPieces),
  'storyteller': toSrc(storyteller),
  'viral-cat': toSrc(viralCat),
};

export const defaultBadgeImage = badgeImageMap['first-peek'];
