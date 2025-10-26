
import { type CatState } from '@/lib/types';
import { GingerCatIcon, GhostCatIcon, ShadowCatIcon, BonesCatIcon, IdentityCrisisCatIcon, AltCat, BreuCatIcon, ZumbiCatIcon, BlizzardCatIcon, VoodooCatIcon, SleepyCatIcon, HologramCatIcon, GravityCatIcon, GlitchCatIcon } from '@/components/cats';

interface CatDisplayProps {
  state: CatState;
}

const catComponentMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'ginger': GingerCatIcon,
    'ghost': GhostCatIcon,
    'shadow': ShadowCatIcon,
    'bones': BonesCatIcon,
    'identity-crisis': IdentityCrisisCatIcon,
    'alt': AltCat,
    'breu': BreuCatIcon,
    'zumbi': ZumbiCatIcon,
    'blizzard': BlizzardCatIcon,
    'voodoo': VoodooCatIcon,
    'sleepy': SleepyCatIcon,
    'hologram': HologramCatIcon,
    'gravity': GravityCatIcon,
    'paradox': GlitchCatIcon,
    'glitch': GlitchCatIcon,
};


export function CatDisplay({ state }: CatDisplayProps) {
  const { outcome, catId } = state;

  if (outcome === 'initial' || !catId) return null;

  const CatComponent = catComponentMap[catId];

  return CatComponent ? (
      <div className="animate-bounce-in">
        <CatComponent className="w-52 h-52 md:w-56 md:h-56" />
      </div>
  ) : null;
}
