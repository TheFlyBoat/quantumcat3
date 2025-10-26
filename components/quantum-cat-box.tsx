
'use client';

import { cn } from '@/lib/utils';
import { BoxIcon, ShinyBoxIcon, CardboardBoxIcon } from '@/components/icons';
import { CatState } from '@/lib/types';
import { CatDisplay } from './cat-display';
import { useBoxSkin } from '@/context/box-skin-context';
import { useSound } from '@/context/sound-context';

interface QuantumCatBoxProps {
  onClick: () => void;
  isLoading: boolean;
  isAmbientShaking?: boolean;
  catState: CatState;
}

export function QuantumCatBox({ onClick, isLoading, catState, isAmbientShaking }: QuantumCatBoxProps) {
  const { selectedSkin } = useBoxSkin();
  const { reduceMotion } = useSound();
  const isOpen = catState.outcome !== 'initial' && !isLoading;
  const isGravityCat = catState.catId === 'gravity';

  let BoxComponent;
  switch (selectedSkin) {
    case 'shiny':
      BoxComponent = ShinyBoxIcon;
      break;
    case 'cardboard':
      BoxComponent = CardboardBoxIcon;
      break;
    default:
      BoxComponent = BoxIcon;
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading || isOpen}
      className={cn(
        'relative group transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl',
        !isOpen && !isLoading && 'hover:scale-105',
        isLoading && !reduceMotion && 'animate-shake',
        isAmbientShaking && !reduceMotion && 'animate-subtle-shake',
        (isLoading || isOpen) ? 'cursor-default' : 'cursor-pointer'
      )}
      aria-label="Open the quantum cat box"
    >
      <BoxComponent className="w-52 h-52 md:w-56 md:h-56" isOpen={isOpen} />
      
      {catState.outcome !== 'initial' && catState.catId && !isGravityCat && (
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="w-full h-full scale-[0.6] translate-y-[25%]">
            <CatDisplay state={catState} />
          </div>
        </div>
      )}
      {isOpen && isGravityCat && (
          <div className={cn("absolute inset-x-0 top-0 flex justify-center transition-transform duration-300", isOpen && "-translate-y-4")}>
              <div className="w-full h-full scale-[0.6] -translate-y-[15%]">
                 <CatDisplay state={catState} />
              </div>
          </div>
      )}
    </button>
  );
}
