
import { type CatState } from '@/lib/types';
<<<<<<< HEAD
import {
    GingerCatIcon,
    GhostCatIcon,
    ShadowCatIcon,
    BonesCatIcon,
    IdentityCrisisCatIcon,
    AltCat,
    BreuCatIcon,
    ZumbiCatIcon,
    BlizzardCatIcon,
    VoodooCatIcon,
    SleepyCatIcon,
    HologramCatIcon,
    GravityCatIcon,
    GlitchCatIcon,
    VampyCatIcon,
    WonderCatIcon,
    AnomalyCatIcon,
    CatankhamunCatIcon,
    CloudCatIcon,
    CosmicCatIcon,
    DominoCatIcon,
    MysticCatIcon,
    ParadoxCatIcon,
    PixelCatIcon,
    SharkCatIcon,
    SneekyCatIcon,
    SnowballCatIcon,
} from '@/components/cats';
=======
import { GingerCatIcon, GhostCatIcon, ShadowCatIcon, BonesCatIcon, IdentityCrisisCatIcon, AltCat, BreuCatIcon, ZumbiCatIcon, BlizzardCatIcon, VoodooCatIcon, SleepyCatIcon, HologramCatIcon, GravityCatIcon, GlitchCatIcon } from '@/components/cats';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

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
<<<<<<< HEAD
    'vampy': VampyCatIcon,
    'wonder': WonderCatIcon,
    'paradox': ParadoxCatIcon,
    'glitch': GlitchCatIcon,
    'anomaly': AnomalyCatIcon,
    'catankhamun': CatankhamunCatIcon,
    'cloud': CloudCatIcon,
    'cosmic': CosmicCatIcon,
    'domino': DominoCatIcon,
    'mystic': MysticCatIcon,
    'pixel': PixelCatIcon,
    'shark': SharkCatIcon,
    'sneeky': SneekyCatIcon,
    'snowball': SnowballCatIcon,
=======
    'paradox': GlitchCatIcon,
    'glitch': GlitchCatIcon,
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
