
'use client';

import { cn } from '@/lib/utils';
import { BoxIcon, ShinyBoxIcon, CardboardBoxIcon } from '@/components/icons';
import { CatState } from '@/lib/types';
import { CatDisplay } from './cat-display';
import { useBoxSkin } from '@/context/box-skin-context';
import { useSound } from '@/context/sound-context';
<<<<<<< HEAD
import { Lock } from 'lucide-react';
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

interface QuantumCatBoxProps {
  onClick: () => void;
  isLoading: boolean;
<<<<<<< HEAD
  isRevealing?: boolean;
  isAmbientShaking?: boolean;
  catState: CatState;
  isLocked?: boolean;
  lockMessage?: string;
}

export function QuantumCatBox({ onClick, isLoading, isRevealing = false, catState, isAmbientShaking, isLocked = false, lockMessage }: QuantumCatBoxProps) {
=======
  isAmbientShaking?: boolean;
  catState: CatState;
}

export function QuantumCatBox({ onClick, isLoading, catState, isAmbientShaking }: QuantumCatBoxProps) {
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  console.log('--- In QuantumCatBox: Received prop catState:', catState, '---');
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
<<<<<<< HEAD
      disabled={isLoading || isOpen || isLocked}
      className={cn(
        'relative group transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl',
        !isOpen && !isLoading && !isLocked && 'hover:scale-105',
        isLoading && !reduceMotion && 'animate-shake',
        isAmbientShaking && !reduceMotion && 'animate-subtle-shake',
        (isLoading || isOpen) ? 'cursor-default' : isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      )}
      aria-label={isLocked ? 'Quantum cat box locked until tomorrow' : 'Open the quantum cat box'}
      aria-disabled={isLoading || isOpen || isLocked}
=======
      disabled={isLoading || isOpen}
      className={cn(
        'relative group transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl',
        !isOpen && !isLoading && 'hover:scale-105',
        isLoading && !reduceMotion && 'animate-shake',
        isAmbientShaking && !reduceMotion && 'animate-subtle-shake',
        (isLoading || isOpen) ? 'cursor-default' : 'cursor-pointer'
      )}
      aria-label="Open the quantum cat box"
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
<<<<<<< HEAD
      {isLocked && !isOpen && !isLoading && !isRevealing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm px-4 text-center">
          <Lock className="mb-2 h-8 w-8 text-primary" />
          <p className="text-sm font-semibold text-foreground">Quantum flux stabilizing</p>
          {lockMessage && (
            <p className="mt-1 text-xs text-muted-foreground">{lockMessage}</p>
          )}
        </div>
      )}
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    </button>
  );
}
