
'use client';

<<<<<<< HEAD
import { Atom } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
=======
import { useEffect, useRef } from "react";
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { cn } from "@/lib/utils";

interface CelebrationCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
<<<<<<< HEAD
    onClose: () => void;
}

const PARTICLE_COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    '#38bdf8',
    '#f97316',
    '#a855f7'
];

const ATOM_ORBITS = [
    { radius: 72, duration: 16, delay: 0, size: 18, glow: 'rgba(56,189,248,0.85)' },
    { radius: 56, duration: 12, delay: 0.45, size: 16, glow: 'rgba(244,114,182,0.8)' },
    { radius: 84, duration: 20, delay: 1, size: 20, glow: 'rgba(129,140,248,0.75)' },
    { radius: 44, duration: 9.5, delay: 0.75, size: 14, glow: 'rgba(253,224,71,0.7)' },
    { radius: 96, duration: 26, delay: 1.4, size: 22, glow: 'rgba(45,212,191,0.65)' },
];

const BACKGROUND_ATOMS = [
    { top: '12%', left: '18%', size: 42, opacity: 0.6, duration: 22, delay: 0 },
    { top: '28%', left: '78%', size: 34, opacity: 0.5, duration: 18, delay: 2.4 },
    { top: '66%', left: '24%', size: 38, opacity: 0.55, duration: 26, delay: 1.2 },
    { top: '74%', left: '70%', size: 46, opacity: 0.65, duration: 30, delay: 0.8 },
    { top: '42%', left: '8%', size: 28, opacity: 0.4, duration: 14, delay: 1.8 },
    { top: '14%', left: '58%', size: 32, opacity: 0.5, duration: 20, delay: 3.1 },
    { top: '84%', left: '48%', size: 36, opacity: 0.45, duration: 24, delay: 2.7 },
];

export const CelebrationCard = ({ title, description, icon, onClose }: CelebrationCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [quantumPhase, setQuantumPhase] = useState<'orbit' | 'merge'>('orbit');
=======
}

export const CelebrationCard = ({ title, description, icon }: CelebrationCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
<<<<<<< HEAD

            const size = Math.random() * 10 + 6;
            const stretch = Math.random() > 0.4 ? Math.random() * 0.6 + 0.8 : 1;
            const angle = Math.random() * 360;
            const radius = Math.random() * 180 + 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
            const duration = 900 + Math.random() * 1000;
            const rotation = Math.random() * 360;

            particle.style.width = `${size}px`;
            particle.style.height = `${size * stretch}px`;
            particle.style.setProperty('--tx', `${x}px`);
            particle.style.setProperty('--ty', `${y}px`);
            particle.style.setProperty('--particle-color', color);
            particle.style.setProperty('--particle-duration', `${duration}ms`);
            particle.style.setProperty('--particle-rotation', `${rotation}deg`);
            particle.style.setProperty('--particle-radius', Math.random() > 0.55 ? '9999px' : `${Math.random() * 40 + 10}%`);

            if (Math.random() > 0.75) {
                particle.style.filter = 'drop-shadow(0 0 6px rgba(255,255,255,0.5))';
            }

            card.appendChild(particle);
            setTimeout(() => particle.remove(), duration + 250);
        };

        const interval = setInterval(createParticle, 70);

        return () => {
            clearInterval(interval);
            requestAnimationFrame(() => {
                card.querySelectorAll('.particle').forEach((node) => node.remove());
            });
        };
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => setQuantumPhase('merge'), 3600);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div
            ref={cardRef}
            className={cn(
                "fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden px-4",
                "bg-black/60 backdrop-blur-lg",
                "animate-celebration-in"
            )}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(221,214,254,0.55),rgba(254,215,170,0.32)_55%,transparent_85%)] opacity-95 animate-quantum-glitter" />
                <div className="absolute -inset-[140px] bg-[conic-gradient(from_60deg_at_50%_50%,rgba(249,168,212,0.6),rgba(251,191,36,0.45),rgba(196,181,253,0.5),rgba(249,168,212,0.6))] blur-3xl opacity-85 animate-quantum-field" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,243,199,0.35),transparent_75%)] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
                <div className="absolute inset-x-[-30%] bottom-[-40%] h-[70%] bg-[radial-gradient(circle_at_bottom,rgba(252,211,77,0.38),transparent_68%)] opacity-75 animate-celebration-float" />
                <div className="absolute inset-x-[-35%] top-[-45%] h-[65%] bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.48),transparent_72%)] opacity-80 animate-[spin_28s_linear_infinite]" />
                {BACKGROUND_ATOMS.map((atom, index) => (
                    <Atom
                        key={`${atom.top}-${atom.left}-${index}`}
                        className="absolute text-white/80 drop-shadow-[0_0_16px_rgba(250,204,21,0.35)]"
                        style={{
                            top: atom.top,
                            left: atom.left,
                            width: `${atom.size}px`,
                            height: `${atom.size}px`,
                            opacity: atom.opacity,
                            animation: `spin ${atom.duration}s linear infinite`,
                            animationDelay: `${atom.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div
                className="relative w-full max-w-xl cursor-auto"
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    aria-hidden
                    className="absolute -inset-[3px] rounded-[32px] bg-gradient-to-r from-primary/80 via-magenta-500/80 to-secondary/80 opacity-80 blur-xl animate-celebration-glow"
                />
                <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/90 px-10 py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/85">
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_65%)] opacity-80 mix-blend-screen" />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 45%)] opacity-40 animate-[pan-bg_12s_ease-in-out_infinite]" />
                    <div aria-hidden className="absolute inset-[1px] rounded-[26px] border border-white/30 opacity-50" />

                    <div className="relative flex flex-col items-center gap-6 text-center">
                        {icon && (
                            <div className="relative flex h-24 w-24 items-center justify-center overflow-visible rounded-full bg-[conic-gradient(from_140deg,rgba(59,130,246,0.9),rgba(236,72,153,0.85),rgba(253,224,71,0.85),rgba(59,130,246,0.9))] text-white shadow-[0_18px_48px_rgba(14,165,233,0.45)] animate-celebration-float">
                                <div
                                    aria-hidden
                                    className={cn(
                                        "pointer-events-none absolute -inset-12",
                                        quantumPhase === 'merge' ? "animate-quantum-collapse" : "animate-quantum-glitter"
                                    )}
                                >
                                    {ATOM_ORBITS.map((orbit, index) => (
                                        <div
                                            key={`${orbit.radius}-${index}`}
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 animate-[spin_14s_linear_infinite]"
                                            style={{
                                                width: `${orbit.radius * 2}px`,
                                                height: `${orbit.radius * 2}px`,
                                                animationDuration: `${orbit.duration}s`,
                                                animationDelay: `${orbit.delay}s`,
                                                borderColor: orbit.glow,
                                                boxShadow: `0 0 36px ${orbit.glow}`,
                                            }}
                                        >
                                            <Atom
                                                className="absolute left-1/2 top-0 -translate-x-1/2 text-white"
                                                style={{
                                                    width: `${orbit.size}px`,
                                                    height: `${orbit.size}px`,
                                                    filter: `drop-shadow(0 0 16px ${orbit.glow})`,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 rounded-full border border-white/40 opacity-80 mix-blend-screen" />
                                <div className="absolute -inset-[10px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5),transparent_65%)] blur-xl opacity-70" />
                                <div className="absolute -inset-[6px] rounded-full border border-white/20 opacity-60 animate-celebration-pulse" />
                                <div
                                    className={cn(
                                        "relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),rgba(14,165,233,0.35)_60%,rgba(56,189,248,0.25))] text-4xl text-white shadow-[0_0_25px_rgba(14,165,233,0.55)] animate-quantum-core transition-transform duration-500",
                                        quantumPhase === 'merge' && "scale-110"
                                    )}
                                >
                                    {icon}
                                </div>
                            </div>
                        )}

                        <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
                            <h2 className="text-4xl font-headline font-bold leading-tight tracking-tight text-foreground drop-shadow-[0_6px_20px_rgba(236,72,153,0.25)]">
                                {title}
                            </h2>
                            <p className="mx-auto max-w-md text-base text-muted-foreground/90 sm:text-lg">
                                {description}
                            </p>
                        </div>

                        <div className="h-px w-full max-w-[220px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80" />
                        <Button
                            type="button"
                            onClick={onClose}
                            className="mt-4 w-full max-w-[220px] text-base font-semibold uppercase tracking-wide shadow-[0_12px_35px_rgba(14,165,233,0.35)]"
                        >
                            Home
                        </Button>
                    </div>
                </div>
=======
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * 360;
            const radius = Math.random() * 150 + 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.setProperty('--tx', `${x}px`);
            particle.style.setProperty('--ty', `${y}px`);

            card.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        };

        const interval = setInterval(createParticle, 50);

        return () => clearInterval(interval);
    }, []);


    return (
        <div 
            ref={cardRef}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center",
                "animate-celebration-in"
            )}
        >
            <div className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-secondary/50 to-background p-8 shadow-2xl">
                 {icon}
                 <h2 className="text-3xl font-headline font-bold text-foreground text-center">{title}</h2>
                 <p className="text-muted-foreground text-center">{description}</p>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
            </div>
        </div>
    );
};

<<<<<<< HEAD
    
=======
    
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
