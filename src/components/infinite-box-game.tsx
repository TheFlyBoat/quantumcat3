'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Apple,
  TreePine,
  Atom,
  Zap,
  FlameKindling,
  Gamepad2,
  Trophy,
  Crown,
  Rocket,
  Star,
  Sparkles,
  Ghost,
  Fish,
  Heart,
  KeyRound,
  Gift,
  Gem,
  Candy,
  CandyCane,
  Drumstick,
  Bolt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';

export type InfiniteBoxGameResult = {
  totalClicks: number;
  applesCollected: number;
  atomsActivated: number;
  treesTriggered: number;
  pointsAwarded: number;
};

interface InfiniteBoxGameProps {
  onComplete: (result: InfiniteBoxGameResult) => void;
  onDismiss: () => void;
}

const TOTAL_TIME_MS = 25_000;
const TIMER_STEP_MS = 100;
const ICON_ROTATE_MS = 1_000;
const TREE_PENALTY_MS = 5_000;
const ATOM_BONUS_MS = 3_000;
const APPLE_POINTS = 10;
const NEUTRAL_POINTS = 2;

type IconEffect = 'apple' | 'tree' | 'atom' | 'neutral';

type IconConfig = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  effect: IconEffect;
  color: string;
  label: string;
};

const ICONS: IconConfig[] = [
  { id: 'apple', icon: Apple, effect: 'apple', color: 'text-[#ff3838]', label: 'Quantum Apple' },
  { id: 'tree', icon: TreePine, effect: 'tree', color: 'text-[#2ed573]', label: 'Temporal Tree' },
  { id: 'atom', icon: Atom, effect: 'atom', color: 'text-[#17c0eb]', label: 'Atomic Surge' },
  { id: 'zap', icon: Zap, effect: 'neutral', color: 'text-[#ffa801]', label: 'Voltage Spark' },
  { id: 'flame', icon: FlameKindling, effect: 'neutral', color: 'text-[#ff4757]', label: 'Plasma Flame' },
  { id: 'gamepad', icon: Gamepad2, effect: 'neutral', color: 'text-[#ffaf40]', label: 'Game Loop' },
  { id: 'trophy', icon: Trophy, effect: 'neutral', color: 'text-[#ffd32a]', label: 'Mini Trophy' },
  { id: 'crown', icon: Crown, effect: 'neutral', color: 'text-[#ffa502]', label: 'Royal Shift' },
  { id: 'rocket', icon: Rocket, effect: 'neutral', color: 'text-[#1e90ff]', label: 'Rocket Jump' },
  { id: 'star', icon: Star, effect: 'neutral', color: 'text-[#f9ca24]', label: 'Nova Star' },
  { id: 'sparkles', icon: Sparkles, effect: 'neutral', color: 'text-[#be2edd]', label: 'Spark Swirl' },
  { id: 'ghost', icon: Ghost, effect: 'neutral', color: 'text-[#5352ed]', label: 'Ghost Echo' },
  { id: 'fish', icon: Fish, effect: 'neutral', color: 'text-[#1abc9c]', label: 'Fish Byte' },
  { id: 'heart', icon: Heart, effect: 'neutral', color: 'text-[#ff6b81]', label: 'Heart Pulse' },
  { id: 'key', icon: KeyRound, effect: 'neutral', color: 'text-[#0abde3]', label: 'Chrono Key' },
  { id: 'gift', icon: Gift, effect: 'neutral', color: 'text-[#ef5777]', label: 'Gift Drop' },
  { id: 'gem', icon: Gem, effect: 'neutral', color: 'text-[#7efff5]', label: 'Gem Shard' },
  { id: 'candy', icon: Candy, effect: 'neutral', color: 'text-[#ff9f43]', label: 'Candy Burst' },
  { id: 'candycane', icon: CandyCane, effect: 'neutral', color: 'text-[#ff4757]', label: 'Peppermint Spin' },
  { id: 'drumstick', icon: Drumstick, effect: 'neutral', color: 'text-[#ffa801]', label: 'Snack Attack' },
  { id: 'bolt', icon: Bolt, effect: 'neutral', color: 'text-[#0fbcf9]', label: 'Lightning Loop' },
];

const getRandomIcon = (excludeId?: string): IconConfig => {
  const pool = excludeId ? ICONS.filter(icon => icon.id !== excludeId) : ICONS;
  return pool[Math.floor(Math.random() * pool.length)];
};

export function InfiniteBoxGame({ onComplete, onDismiss }: InfiniteBoxGameProps) {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_MS);
  const [totalClicks, setTotalClicks] = useState(0);
  const [points, setPoints] = useState(0);
  const [applesCollected, setApplesCollected] = useState(0);
  const [treesTriggered, setTreesTriggered] = useState(0);
  const [atomsActivated, setAtomsActivated] = useState(0);
  const [currentIcon, setCurrentIcon] = useState<IconConfig>(() => getRandomIcon());
  const [phase, setPhase] = useState<'playing' | 'result'>('playing');
  const [statusMessage, setStatusMessage] = useState('Tap the box to chase vibrant possibilities!');
  const [result, setResult] = useState<InfiniteBoxGameResult | null>(null);

  const progressPercent = useMemo(
    () => Math.max(0, Math.min(100, (timeLeft / TOTAL_TIME_MS) * 100)),
    [timeLeft],
  );

  const finalizeGame = useCallback(() => {
    if (phase !== 'playing') return;

    playSound('celebration-magic');
    setResult({
      totalClicks,
      applesCollected,
      atomsActivated,
      treesTriggered,
      pointsAwarded: Math.max(0, points),
    });
    setPhase('result');
  }, [phase, totalClicks, applesCollected, atomsActivated, treesTriggered, points]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const tick = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        const next = prev - TIMER_STEP_MS;
        if (next <= 0) {
          finalizeGame();
          return 0;
        }
        return next;
      });
    }, TIMER_STEP_MS);

    return () => window.clearInterval(tick);
  }, [phase, finalizeGame]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const rotate = window.setInterval(() => {
      setCurrentIcon(prev => getRandomIcon(prev.id));
    }, ICON_ROTATE_MS);

    return () => window.clearInterval(rotate);
  }, [phase]);

  const applyIconEffect = useCallback((icon: IconConfig) => {
    switch (icon.effect) {
      case 'apple':
        setPoints(prev => prev + APPLE_POINTS);
        setApplesCollected(prev => prev + 1);
        setStatusMessage('Crunch! Quantum apple scored +10 points.');
        break;
      case 'tree':
        setTreesTriggered(prev => prev + 1);
        setTimeLeft(prev => Math.max(0, prev - TREE_PENALTY_MS));
        setStatusMessage('Oops! Festive tree stole 5 seconds.');
        break;
      case 'atom':
        setAtomsActivated(prev => prev + 1);
        setTimeLeft(prev => Math.min(TOTAL_TIME_MS, prev + ATOM_BONUS_MS));
        setStatusMessage('Atomic surge! Bonus time unlocked.');
        break;
      default:
        setPoints(prev => prev + NEUTRAL_POINTS);
        setStatusMessage(`${icon.label} adds a tiny spark (+2 points). Keep tapping!`);
        break;
    }
  }, []);

  const handleBoxClick = useCallback(() => {
    if (phase !== 'playing') return;
    playSound('box-shake');
    setTotalClicks(prev => prev + 1);
    applyIconEffect(currentIcon);
    setCurrentIcon(prev => getRandomIcon(prev.id));
  }, [phase, currentIcon, applyIconEffect]);

  const handleDismiss = useCallback(() => {
    playSound('haptic-3');
    onDismiss();
  }, [onDismiss]);

  const handleCollectReward = useCallback(() => {
    if (!result) return;
    onComplete(result);
  }, [onComplete, result]);

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4 backdrop-blur-2xl"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#ff4757] via-[#3742fa] to-[#1e90ff] shadow-[0_40px_220px_rgba(16,16,16,0.8)]"
        onClick={event => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.25),_transparent_70%)]" />
        </div>

        <div className="relative space-y-8 px-8 py-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/70">
                Infinite Box Challenge
              </p>
              <h2 className="font-headline text-4xl drop-shadow-lg">
                Vibrant Velocity Mode
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="text-white/70 transition hover:text-white"
            >
              ✕
            </Button>
          </div>

          {phase === 'playing' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Time Remaining</span>
                  <span className="font-semibold text-white">
                    {(timeLeft / 1000).toFixed(1)}s
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#ffdd59] via-[#ffd32a] to-[#ffa801] transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-lg">
                  <div className="text-xs uppercase tracking-[0.45em] text-white/60">
                    Current Icon
                  </div>
                  <div
                    className={cn(
                      'flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white/40 bg-white/10 shadow-2xl transition-transform duration-200',
                      'hover:scale-105 active:scale-95 cursor-pointer'
                    )}
                    onClick={handleBoxClick}
                  >
                    <currentIcon.icon className={cn('h-20 w-20 drop-shadow-[0_0_22px_rgba(255,255,255,0.45)]', currentIcon.color)} strokeWidth={1.25} />
                  </div>
                  <div className="text-sm uppercase tracking-[0.3em] text-white/70">
                    {currentIcon.label}
                  </div>
                  <p className="text-sm text-white/85">{statusMessage}</p>
                  <Button
                    onClick={handleBoxClick}
                    className="mt-2 w-full bg-gradient-to-r from-[#ff3f34] via-[#ff5e57] to-[#ff9f1a] font-semibold text-white shadow-lg transition hover:brightness-110"
                  >
                    Tap the Quantum Box
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div className="rounded-2xl border border-white/20 bg-[#ff4757]/40 p-4 shadow-lg">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Points</p>
                      <p className="mt-2 text-3xl font-bold text-white drop-shadow-lg">{points}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-[#1e90ff]/40 p-4 shadow-lg">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Clicks</p>
                      <p className="mt-2 text-3xl font-bold text-white drop-shadow-lg">{totalClicks}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-[#2ed573]/40 p-4 shadow-lg">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Apples</p>
                      <p className="mt-2 text-3xl font-bold text-white drop-shadow-lg">{applesCollected}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-[#ff9f43]/40 p-4 shadow-lg">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Atoms</p>
                      <p className="mt-2 text-3xl font-bold text-white drop-shadow-lg">{atomsActivated}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-[#ff4757]/60 p-4 shadow-lg">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Trees Hit</p>
                      <p className="mt-2 text-3xl font-bold text-white drop-shadow-lg">{treesTriggered}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-[#1e272e]/60 p-4 text-left text-sm text-white/75">
                    <p className="font-semibold uppercase tracking-[0.35em] text-white/60">
                      Quick Rules
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs leading-relaxed">
                      <li>• Apples give +10 points instantly.</li>
                      <li>• Christmas trees steal 5 seconds — wait for a new icon if you spot one.</li>
                      <li>• Atom icons grant a 3 second time refund.</li>
                      <li>• All other icons add a small +2 point spark.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {phase === 'result' && result && (
            <div className="space-y-6 rounded-2xl border border-white/15 bg-black/40 p-6 text-white/90 backdrop-blur-xl">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                  Run Complete
                </p>
                <h3 className="mt-2 font-headline text-4xl text-white drop-shadow-lg">
                  Vivid Spoils Secured
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  You tapped {result.totalClicks} times, caught {result.applesCollected} apples,
                  dodged {result.treesTriggered} trees, and activated {result.atomsActivated} atoms for a total of {result.pointsAwarded} points.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/20 bg-[#ff4757]/40 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Points</p>
                  <p className="mt-2 text-4xl font-bold text-white drop-shadow-lg">{result.pointsAwarded}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-[#1e90ff]/40 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Clicks</p>
                  <p className="mt-2 text-4xl font-bold text-white drop-shadow-lg">{result.totalClicks}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-[#2ed573]/40 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Apples</p>
                  <p className="mt-2 text-4xl font-bold text-white drop-shadow-lg">{result.applesCollected}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-[#ff9f43]/40 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">Atoms</p>
                  <p className="mt-2 text-4xl font-bold text-white drop-shadow-lg">{result.atomsActivated}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="flex-1 bg-gradient-to-r from-[#ff3f34] via-[#ff5e57] to-[#ff9f1a] font-semibold text-white shadow-xl transition hover:brightness-110"
                  onClick={handleCollectReward}
                >
                  Collect Reward
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                  onClick={handleDismiss}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
