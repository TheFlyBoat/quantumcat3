'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SPLASH_STYLES = `
.quantum-splash {
  background:
    radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.28), transparent 48%),
    radial-gradient(circle at 80% 25%, rgba(34, 211, 238, 0.24), transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(244, 114, 182, 0.2), transparent 55%),
    linear-gradient(135deg, #09011a 0%, #170738 45%, #020617 100%);
  color: rgba(255, 255, 255, 0.92);
}

.quantum-splash__backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.quantum-splash__aurora {
  position: absolute;
  inset: -28%;
  background:
    radial-gradient(circle at 32% 22%, rgba(56, 189, 248, 0.25), transparent 58%),
    radial-gradient(circle at 68% 76%, rgba(236, 72, 153, 0.22), transparent 60%),
    conic-gradient(from 140deg, rgba(14, 165, 233, 0.28), rgba(147, 51, 234, 0.28), rgba(15, 118, 110, 0.24), rgba(14, 165, 233, 0.28));
  filter: blur(68px);
  mix-blend-mode: screen;
  opacity: 0.34;
  animation: aurora-shift 18s ease-in-out infinite;
}

.quantum-splash__aurora::after {
  content: '';
  position: absolute;
  inset: 18%;
  border-radius: 9999px;
  background: radial-gradient(circle at 60% 40%, rgba(248, 250, 255, 0.22), rgba(14, 165, 233, 0));
  filter: blur(72px);
  opacity: 0.42;
  animation: aurora-breathe 12s ease-in-out infinite;
}

.quantum-splash__grid {
  position: absolute;
  inset: -35% -24%;
  background-image:
    repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0px, rgba(56, 189, 248, 0.08) 1px, transparent 1px, transparent 70px),
    repeating-linear-gradient(0deg, rgba(168, 85, 247, 0.08) 0px, rgba(168, 85, 247, 0.08) 1px, transparent 1px, transparent 70px);
  transform: perspective(1200px) rotateX(68deg);
  transform-origin: center;
  opacity: 0.22;
  mix-blend-mode: screen;
  animation: grid-warp 14s cubic-bezier(0.36, 0, 0.2, 1) infinite;
}

.quantum-splash__grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.32), transparent 75%);
  mix-blend-mode: overlay;
  opacity: 0.42;
  animation: grid-flare 11s ease-in-out infinite;
}

.quantum-splash__portal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(66vw, 44rem);
  height: min(66vw, 44rem);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.quantum-splash__portal-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 0 45px rgba(56, 189, 248, 0.24);
  mix-blend-mode: screen;
  animation: portal-pulse 9s ease-in-out infinite;
}

.quantum-splash__portal-ring--outer {
  border-color: rgba(14, 165, 233, 0.34);
  animation: portal-pulse 9s ease-in-out infinite, portal-spin 38s linear infinite;
}

.quantum-splash__portal-ring--mid {
  inset: 18%;
  border-style: dashed;
  border-color: rgba(59, 130, 246, 0.28);
  animation: portal-pulse 10s ease-in-out infinite, portal-spin 26s linear infinite;
}

.quantum-splash__portal-ring--inner {
  inset: 32%;
  border-color: rgba(236, 72, 153, 0.32);
  animation: portal-pulse 13s ease-in-out infinite, portal-spin 32s linear infinite reverse;
}

.quantum-splash__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.75rem, 4vw, 3rem);
  padding: 0 clamp(1.5rem, 4vw, 3.5rem);
  text-align: center;
}

.quantum-text {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  max-width: min(26rem, 86vw);
}

.quantum-text__eyebrow {
  font-size: clamp(0.65rem, 0.8vw + 0.4rem, 0.85rem);
  letter-spacing: 0.48em;
  text-transform: uppercase;
  color: rgba(224, 231, 255, 0.55);
}

.quantum-text__title {
  font-family: var(--font-headline, inherit);
  font-size: clamp(2rem, 4vw + 1.3rem, 3.1rem);
  line-height: 1.1;
  color: rgba(248, 250, 255, 0.96);
  text-shadow: 0 6px 28px rgba(59, 130, 246, 0.18);
  position: relative;
}

.quantum-text__body {
  font-size: clamp(0.95rem, 0.5vw + 0.85rem, 1.1rem);
  color: rgba(226, 232, 240, 0.72);
}

.quantum-text__eyebrow,
.quantum-text__title,
.quantum-text__body {
  opacity: 0;
  transform: translate3d(0, 16px, 0);
  animation: text-rise 0.9s ease-out forwards;
}

.quantum-text__title {
  animation-delay: 0.22s;
}

.quantum-text__body {
  animation-delay: 0.42s;
}

.quantum-text__title::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0.08) 55%, transparent 100%);
  transform: translateX(-100%);
  animation: title-sheen 5.5s ease-in-out 1.2s infinite;
  mix-blend-mode: screen;
  pointer-events: none;
}

.quantum-particle {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  opacity: 0;
  transform: translate3d(0, 0, 0) scale(0.4);
  animation-name: particle-float;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-duration: var(--duration, 9s);
  animation-delay: var(--delay, 0s);
}

.quantum-particle--static {
  animation: none;
  opacity: 0.35;
}

@keyframes aurora-shift {
  0%, 100% {
    transform: translate3d(-2%, -3%, 0) scale(1.05);
    opacity: 0.3;
  }
  45% {
    transform: translate3d(3%, 2%, 0) scale(1.12);
    opacity: 0.42;
  }
  75% {
    transform: translate3d(-1%, 3%, 0) scale(1.08);
    opacity: 0.35;
  }
}

@keyframes aurora-breathe {
  0%, 100% { opacity: 0.32; transform: scale(0.95); }
  50% { opacity: 0.55; transform: scale(1.08); }
}

@keyframes grid-warp {
  0%, 100% {
    transform: perspective(1200px) rotateX(68deg) rotateZ(-2deg);
    background-position: 0px 0px, 0px 0px;
  }
  45% {
    transform: perspective(1200px) rotateX(68deg) rotateZ(3deg);
    background-position: 28px 28px, -28px -28px;
  }
  75% {
    transform: perspective(1200px) rotateX(68deg) rotateZ(-1deg);
    background-position: -24px -24px, 24px 24px;
  }
}

@keyframes grid-flare {
  0%, 100% { opacity: 0.28; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}

@keyframes portal-pulse {
  0%, 100% { opacity: 0.35; box-shadow: 0 0 45px rgba(56, 189, 248, 0.24); }
  45% { opacity: 0.7; box-shadow: 0 0 80px rgba(236, 72, 153, 0.45); }
  70% { opacity: 0.5; box-shadow: 0 0 60px rgba(53, 162, 242, 0.3); }
}

@keyframes portal-spin {
  to { transform: rotate(360deg); }
}

@keyframes text-rise {
  0% { opacity: 0; transform: translate3d(0, 16px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes title-sheen {
  0% { transform: translateX(-120%); }
  15%, 35% { transform: translateX(120%); }
  100% { transform: translateX(120%); }
}

@keyframes particle-float {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.35);
  }
  10% {
    opacity: 0.85;
  }
  45% {
    opacity: 0.6;
    transform: translate3d(var(--drift-x, 0px), var(--drift-y, 0px), 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(calc(var(--drift-x, 0px) * 1.25), calc(var(--drift-y, 0px) * 1.25), 0) scale(0.15);
  }
}

.quantum-vortex {
  position: absolute;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.2), transparent 65%);
  filter: blur(48px);
}

.quantum-vortex--one {
  width: min(70vw, 50rem);
  height: min(70vw, 50rem);
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: vortex-pulse 11s ease-in-out infinite;
}

.quantum-vortex--two {
  width: min(95vw, 68rem);
  height: min(95vw, 68rem);
  top: 55%;
  left: 52%;
  transform: translate(-50%, -50%);
  opacity: 0.45;
  animation: vortex-pulse 16s ease-in-out infinite reverse;
}

@keyframes vortex-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.38; }
  45% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.55; }
}

.quantum-cat {
  position: relative;
  width: clamp(11.5rem, 24vw, 18.5rem);
  aspect-ratio: 3006.46 / 2591.98;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 28px rgba(168, 85, 247, 0.35)) drop-shadow(0 12px 24px rgba(15, 118, 110, 0.25));
}

.quantum-cat__svg {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
}

.quantum-cat__halo {
  position: absolute;
  inset: -18%;
  border-radius: 9999px;
  background: conic-gradient(from 90deg, rgba(20, 184, 166, 0.25), rgba(251, 191, 36, 0.18), rgba(191, 219, 254, 0));
  filter: blur(42px);
  opacity: 0.32;
  z-index: 0;
}

.quantum-cat__halo--secondary {
  inset: -26%;
  background: conic-gradient(from 180deg, rgba(168, 85, 247, 0.25), rgba(30, 64, 175, 0.22), rgba(251, 191, 36, 0.15), rgba(168, 85, 247, 0.25));
  opacity: 0.28;
}

.quantum-cat__orbit {
  position: absolute;
  inset: -30%;
  border-radius: 50%;
  border: 1px dashed rgba(226, 232, 240, 0.18);
  transform: rotate(-16deg);
}

.quantum-cat__orbit::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -4%;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.9);
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.7), 0 0 30px rgba(252, 211, 77, 0.45);
}

.quantum-cat__orbit--two {
  inset: -38%;
  transform: rotate(22deg);
  border-style: solid;
  border-color: rgba(148, 163, 184, 0.16);
}

.quantum-cat__split {
  position: absolute;
  top: -12%;
  bottom: -12%;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, rgba(239, 246, 255, 0), rgba(96, 165, 250, 0.65), rgba(236, 72, 153, 0.8), rgba(239, 246, 255, 0));
  transform: translateX(-50%);
  opacity: 0.8;
  z-index: 2;
}

.quantum-cat--animate .quantum-cat__halo {
  animation: halo-spin 12s linear infinite;
}

.quantum-cat--animate .quantum-cat__halo--secondary {
  animation-duration: 20s;
  animation-direction: reverse;
}

.quantum-cat--animate .quantum-cat__orbit {
  animation: orbit-spin 9s linear infinite;
}

.quantum-cat--animate .quantum-cat__orbit--two {
  animation-duration: 13s;
  animation-direction: reverse;
}

.quantum-cat--animate .quantum-cat__svg {
  animation: cat-hover 6s ease-in-out infinite;
}

.quantum-cat--animate .quantum-cat__split {
  animation: split-pulse 3.8s ease-in-out infinite;
}

.quantum-cat--static .quantum-cat__halo,
.quantum-cat--static .quantum-cat__orbit,
.quantum-cat--static .quantum-cat__svg,
.quantum-cat--static .quantum-cat__split {
  animation: none;
}

@keyframes halo-spin {
  0% { transform: rotate(0deg); opacity: 0.26; }
  50% { opacity: 0.35; }
  100% { transform: rotate(360deg); opacity: 0.26; }
}

@keyframes orbit-spin {
  to { transform: rotate(360deg); }
}

@keyframes cat-hover {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2.5%) scale(1.015); }
}

@keyframes split-pulse {
  0%, 100% { opacity: 0.75; filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.35)); }
  50% { opacity: 1; filter: drop-shadow(0 0 18px rgba(236, 72, 153, 0.55)); }
}

@media (prefers-reduced-motion: reduce) {
  .quantum-splash__aurora,
  .quantum-splash__aurora::after,
  .quantum-splash__grid,
  .quantum-splash__grid::after,
  .quantum-splash__portal-ring,
  .quantum-text__eyebrow,
  .quantum-text__title,
  .quantum-text__body,
  .quantum-text__title::after {
    animation: none !important;
  }

  .quantum-text__eyebrow,
  .quantum-text__title,
  .quantum-text__body {
    opacity: 1 !important;
    transform: none !important;
  }

  .quantum-text__title::after {
    opacity: 0 !important;
    transform: none !important;
  }
}

@media (max-width: 640px) {
  .quantum-text__eyebrow { letter-spacing: 0.36em; }
  .quantum-text__body { font-size: 0.95rem; }
}
`;

type Particle = {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    size: Number((Math.random() * 0.7 + 0.25).toFixed(2)),
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 9,
    duration: Math.random() * 7 + 9,
    driftX: (Math.random() - 0.5) * 200,
    driftY: (Math.random() - 0.5) * 200,
  }));
}

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [isActive, setIsActive] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });
  const [particles, setParticles] = useState<Particle[]>(() => generateParticles(36));

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    setParticles(generateParticles(prefersReducedMotion ? 12 : 36));
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const displayDuration = prefersReducedMotion ? 3200 : 6200;
    const fadeDuration = prefersReducedMotion ? 450 : 1100;

    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const showTimer = setTimeout(() => {
      setIsFadingOut(true);
      fadeTimer = setTimeout(() => {
        setIsActive(false);
        onComplete?.();
      }, fadeDuration);
    }, displayDuration);

    return () => {
      clearTimeout(showTimer);
      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
    };
  }, [isActive, prefersReducedMotion, onComplete]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        'quantum-splash fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out',
        isFadingOut && 'pointer-events-none opacity-0',
      )}
    >
      <style>{SPLASH_STYLES}</style>
      <div className="quantum-splash__backdrop" aria-hidden="true">
        <div className="quantum-splash__aurora" aria-hidden="true" />
        <div className="quantum-splash__grid" aria-hidden="true" />
        <div className="quantum-splash__portal" aria-hidden="true">
          <span className="quantum-splash__portal-ring quantum-splash__portal-ring--outer" />
          <span className="quantum-splash__portal-ring quantum-splash__portal-ring--mid" />
          <span className="quantum-splash__portal-ring quantum-splash__portal-ring--inner" />
        </div>
        <div className="quantum-vortex quantum-vortex--one" />
        <div className="quantum-vortex quantum-vortex--two" />
        {particles.map((particle) => {
          const style = {
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            '--delay': `${particle.delay}s`,
            '--duration': `${particle.duration}s`,
            '--drift-x': `${particle.driftX}px`,
            '--drift-y': `${particle.driftY}px`,
          } as CSSProperties & Record<string, string>;

          return (
            <span
              key={particle.id}
              className={cn('quantum-particle', prefersReducedMotion && 'quantum-particle--static')}
              style={style}
            />
          );
        })}
      </div>

      <div className="quantum-splash__content">
        <QuantumCat animate={!prefersReducedMotion} />
        <div className="quantum-text">
          <span className="quantum-text__eyebrow">Quantum Universe</span>
          <h1 className="quantum-text__title">Tuning half-life probabilities</h1>
          <p className="quantum-text__body">
            Hold tight while the box decides if our cat chooses purrs, paradox, or peaceful non-existence.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuantumCat({ animate, className }: { animate: boolean; className?: string }) {
  const primaryGradientId = 'quantum-cat-gradient-primary';
  const secondaryGradientId = 'quantum-cat-gradient-secondary';
  const accentGradientId = 'quantum-cat-gradient-accent';

  return (
    <div className={cn('quantum-cat', animate ? 'quantum-cat--animate' : 'quantum-cat--static', className)}>
      <div className="quantum-cat__halo" aria-hidden="true" />
      <div className="quantum-cat__halo quantum-cat__halo--secondary" aria-hidden="true" />
      <div className="quantum-cat__orbit quantum-cat__orbit--one" aria-hidden="true" />
      <div className="quantum-cat__orbit quantum-cat__orbit--two" aria-hidden="true" />
      <svg
        className="quantum-cat__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3006.46 2591.98"
        fillRule="evenodd"
        clipRule="evenodd"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={primaryGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee">
              {animate && (
                <animate attributeName="stop-color" values="#22d3ee;#38bdf8;#22d3ee" dur="8s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="47%" stopColor="#22d3ee" />
            <stop offset="53%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#c084fc">
              {animate && (
                <animate attributeName="stop-color" values="#c084fc;#f472b6;#c084fc" dur="8s" repeatCount="indefinite" />
              )}
            </stop>
          </linearGradient>

          <linearGradient id={secondaryGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9">
              {animate && (
                <animate attributeName="stop-color" values="#0ea5e9;#2dd4bf;#0ea5e9" dur="7.5s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="47%" stopColor="#0ea5e9" />
            <stop offset="53%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9">
              {animate && (
                <animate attributeName="stop-color" values="#6d28d9;#fb7185;#6d28d9" dur="7.5s" repeatCount="indefinite" />
              )}
            </stop>
          </linearGradient>

          <linearGradient id={accentGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15">
              {animate && (
                <animate attributeName="stop-color" values="#facc15;#f472b6;#facc15" dur="6.2s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="47%" stopColor="#facc15" />
            <stop offset="53%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#ec4899">
              {animate && (
                <animate attributeName="stop-color" values="#ec4899;#a855f7;#ec4899" dur="6.2s" repeatCount="indefinite" />
              )}
            </stop>
          </linearGradient>
        </defs>
        <g>
          <path
            fill={`url(#${primaryGradientId})`}
            d="M2000.82 425.23c-53.32-7.94-257.63-104.81-452.88-90.57l1.12 1219.36c31.56 4.21 72.96-5.68 96.31 12.76 50.8 40.11 15.76 107.48-26.52 144.65-20.83 18.32-49.43 24.82-71.43 41.54-1.58 54.04 1.48 64.56 32.39 95.11 51.37 50.77 128.63 56.73 189.04 18.57 28.41-17.94 42.88-37.42 59.3-73.46 8.76-19.23 12.08-28.69 28.33-35.41 38.62-15.97 95.59 13.11 51.5 95.74-52.01 97.5-85.63 90.08-137.24 122.91-.93 106.93 1.48 159.29-46.4 247.89-37.15 68.74-83.11 95.31-175.85 121.65l.2 243.55c304.13 13.85 597.72-92.16 819.28-256.19 88.67-65.65 148.74-125.97 215.2-216.87 26.94-36.85 65.44-91.43 83.29-133.72 35.37 10.39 77.28 33.87 107.93 49.71 28.33 14.64 92.08 55.23 108.94 16.13 21.13-49.02-35.72-64.31-68.89-81.12-34.8-17.63-73.24-38.66-109.33-52.47 7.8-27.08 21.93-57.56 31.41-86.66 9.68-29.69 14.76-67.75 27.62-92.65 42.48-1.87 89.35-.06 132.48-.15 42.72-.09 100.32 11.79 108.36-27.72 11.26-55.32-46.6-46.17-88.73-46.29-45.9-.13-92.57-.8-138.39.2 30.63-227.15-.22-442.06-80.17-641.99-28.38-70.97-42.62-57.05-27.21-140.45 9.85-53.3 17.41-108.03 23.85-162.47 15.11-127.84 31.67-587.18-35.93-678.39-62.32-84.09-175.78-9.2-254.8 43.94-20.65 13.88-34.58 23.85-54 39.11L2144.54 289.4c-13.4 10.02-10.06 8.48-22.66 21.4-22.14 22.67-79.26 62.83-109.88 101.11-5.11 6.39-5.93 6-11.21 13.35zm138.8 783.29c-25.62-33.41-64.89-67.05-95.63-99.38-26.17-27.52-74.56-88.2-129.57-34.27-55.7 54.6 9.64 106.17 33.13 130.65 17.23 17.96 30.59 32.34 48.14 50 17.04 17.14 40.45 34.33 50.23 58.93-19.4 12.12-84.96 77.41-102.04 94.17-23.56 23.12-84.58 82.87-28.27 133.07 55.85 49.78 103.7-12.5 126.38-35 22.73-22.55 85.31-80.38 98.35-102.78l75.5 73.05c10.34 10.66 18.67 13.36 29.95 24.02 24.07 22.74 68.79 93.47 128.89 43.95 42.33-34.88 18.78-92.47-28.82-134.19-10.63-9.31-16.5-11.04-27.44-21.63-10.57-10.22-16.24-17.09-26.41-27.51-17.65-18.11-39.68-33.05-48.43-57.41 9.07-8.21 14.13-14.97 23.48-23.89 6.73-6.42 17.35-13.62 26.96-21.98 17.74-15.43 33.34-34.93 50.96-52.2 30.51-29.91 82.89-74.01 29.49-132.99-51.54-56.93-107.74 12.1-128.98 33.53-18.26 18.41-32.84 33.54-51.49 51.59-17.1 16.56-33.77 40.38-54.37 50.26z"
          />
          <path
            fill={`url(#${secondaryGradientId})`}
            d="M227.49 1662.68c-50.64-.66-101.47.01-152.16-.27-39.36-.22-97.36-9.1-66.71 68.35 60.15 14.54 168.35 7.53 235.73 6.04 10.4 22.31 16.29 64.78 25.47 91.21 8.56 24.67 27.85 67.23 32.22 87.79-30.47 6.41-77.72 36.17-105.75 50.78-31.24 16.29-102.29 36.61-74.01 82.45 3.34 5.41 16.42 13.98 23.84 15.42 27.24 5.29 161.04-70.06 191.23-82.64 22.09 26.28 57.31 101.75 101.57 153.28l16.8 22.56c14.5 21.67 50.73 54.01 66.7 70.69l82.2 79.82c233.63 198.65 553.14 274.76 857.37 283.82l-1.36-249.85c-64.62 1.66-148.54-64.39-176.24-114.94-47.41-86.52-47.13-145.01-47.67-248.52-14.83-11.85-25.78-13.89-44.04-23.46-17.31-9.07-23.04-16.73-37.03-26.58-20.03-14.11-17.6-12.8-30.65-33.04-16.14-25.06-71.17-96.7-26.13-134.82 12.17-10.3 28.99-11.93 45.04-6.78 47.08 15.1 38.74 149.09 192.15 135.85 17.15-1.48 35.89-5.44 50.81-12.58 55.42-26.53 73.2-68.39 74.18-124.3-18.12-14.17-93.28-36.61-114.62-102.67-29.09-90.07 43.94-100.6 112.05-94.82l1.84-1224.57c-148.46 13.17-207.42 22.51-345.49 61.8-31.34 8.92-75.9 29.03-103.39 34.78-15.73-18.67-33.59-29.46-46.63-44.99-38.9-46.34-16.77-16.41-48.02-45.26-10.81-9.99-10.46-13.79-20.95-22.83-10.17-8.76-19.41-11.65-28.56-21.04-13.67-14.02-2.04-9.18-21.29-22.41l-51.63-41.86C734.73 172.31 559.41 46.36 485.78 17.53 425.74-5.98 379.3-10.86 348.94 34.62c-73.45 110.02-49.7 544.8-35.76 681.17 5.48 53.64 13.78 107.26 23.77 161.97 5.29 28.96 16.8 46.13 5.42 72.47-86.89 201.02-141.82 405.33-120.03 626.11 2.21 22.37 10.37 70.78 5.13 86.33zm648.33-594.26c-54.08 3.13-87.65 27.72-126.93 53.14-17.7 11.46-43.21 49.84-52.44 70.04-5.98 13.08-13.84 26.65-18.77 40.04-28.75 78.1-14.26 168.73 30.89 241.49 17.67 28.48 63.52 67.9 98.74 82.68 101.72 42.7 214.36-.9 259.85-72.12 16.93-26.52 29.11-41.02 41.08-76.5 11.46-33.95 11.61-71.85 10.62-109.72-1.63-62.26-30.85-120.91-75.54-164.06l-29.5-29.3c-36.39-26.87-94.26-38.2-138-35.67z"
          />
          <path
            fill={`url(#${accentGradientId})`}
            d="M1324.34 1991.22c-19.99 143.04 43.8 266.22 178.81 268.01 144.98 1.93 190.36-126.69 181.04-269.63-80.59-1.89-112.22-34.63-140.25-40.1 3.29 44.71 15.62 152.26-21.11 166.91-70.93 28.3-51.76-94.75-51.05-171.9-58.8 25.41-68.93 34.67-147.43 46.7z"
          />
        </g>
      </svg>
      <div className="quantum-cat__split" aria-hidden="true" />
    </div>
  );
}
