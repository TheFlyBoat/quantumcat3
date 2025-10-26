'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Atom, RotateCcw, Sparkles, Wand2 } from 'lucide-react';
import { CardboardBoxIcon } from '@/components/icons/cardboard-box-icon';

const APP_NAME = 'The Quantum Cat';

type OnboardingStep = {
    id: string;
    title: string;
    description: string;
    backgroundClass: string;
    icon: ComponentType<{ className?: string }>;
    iconWrapperClass: string;
    iconClass: string;
    auraClass: string;
    accentGradient: string;
    accentBorder: string;
};

const steps: OnboardingStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to The Quantum Cat',
        description:
            'Every peek inside the quantum box collapses reality into one surprising cat with a cosmic message.',
        backgroundClass: 'bg-indigo-600/70',
        icon: Sparkles,
        iconWrapperClass: 'bg-white/18 border border-white/25 shadow-[0_0_40px_rgba(79,70,229,0.45)]',
        iconClass: 'text-indigo-50',
        auraClass: 'bg-indigo-300/25',
        accentGradient: 'from-indigo-200/40 via-indigo-400/20 to-indigo-900/10',
        accentBorder: 'border-indigo-200/50'
    },
    {
        id: 'mystery-in-motion',
        title: 'Mystery in Motion',
        description:
            'Each cat is unique — Alive, Dead, or Paradox. Expect sparkles, surprises, and quantum shifts.',
        backgroundClass: 'bg-violet-500/60',
        icon: Atom,
        iconWrapperClass: 'bg-white/18 border border-white/25 shadow-[0_0_40px_rgba(139,92,246,0.45)]',
        iconClass: 'text-violet-50',
        auraClass: 'bg-violet-300/25',
        accentGradient: 'from-violet-200/40 via-fuchsia-400/20 to-slate-900/5',
        accentBorder: 'border-violet-200/50'
    },
    {
        id: 'whimsical-world',
        title: 'Whimsical World',
        description:
            'Relax into the pastel world of floating boxes, cozy sounds, and infinite probabilities.',
        backgroundClass: 'bg-rose-400/50',
        icon: Wand2,
        iconWrapperClass: 'bg-white/18 border border-white/25 shadow-[0_0_40px_rgba(244,114,182,0.45)]',
        iconClass: 'text-rose-50',
        auraClass: 'bg-rose-200/30',
        accentGradient: 'from-rose-100/40 via-rose-400/20 to-amber-100/10',
        accentBorder: 'border-rose-200/50'
    },
    {
        id: 'begin-your-journey',
        title: 'Begin Your Journey',
        description:
            'Tap the box to meet your first cat and start your collection of fates, fortunes, and badges.',
        backgroundClass: 'bg-cyan-400/50',
        icon: CardboardBoxIcon,
        iconWrapperClass: 'bg-white/18 border border-white/25 shadow-[0_0_40px_rgba(34,211,238,0.45)]',
        iconClass: 'text-cyan-50',
        auraClass: 'bg-cyan-200/30',
        accentGradient: 'from-cyan-100/50 via-sky-300/20 to-slate-900/10',
        accentBorder: 'border-cyan-200/50'
    },
    {
        id: 'quantum-loop',
        title: 'The Quantum Loop',
        description:
            'Return each day for a new cat, a new message, and a new slice of reality.',
        backgroundClass: 'bg-amber-400/50',
        icon: RotateCcw,
        iconWrapperClass: 'bg-white/18 border border-white/25 shadow-[0_0_40px_rgba(251,191,36,0.45)]',
        iconClass: 'text-amber-100',
        auraClass: 'bg-amber-200/30',
        accentGradient: 'from-amber-100/45 via-orange-300/20 to-slate-900/10',
        accentBorder: 'border-amber-200/50'
    }
];

type OnboardingTourProps = {
    open: boolean;
    onComplete: () => void;
    onSkip: () => void;
};

export function OnboardingTour({ open, onComplete, onSkip }: OnboardingTourProps) {
    const [stepIndex, setStepIndex] = useState(0);
    const closeReason = useRef<'complete' | 'skip' | null>(null);

    useEffect(() => {
        if (open) {
            setStepIndex(0);
        }
    }, [open]);

    const currentStep = steps[stepIndex];
    const CurrentIcon = currentStep.icon;
    const isLastStep = stepIndex === steps.length - 1;
    const isWelcomeStep = currentStep.id === 'welcome';

    const handleNext = () => {
        if (isLastStep) {
            closeReason.current = 'complete';
            onComplete();
        } else {
            setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => {
        setStepIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSkip = () => {
        closeReason.current = 'skip';
        onSkip();
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            if (closeReason.current) {
                closeReason.current = null;
                return;
            }
            onSkip();
        } else {
            closeReason.current = null;
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-xl border-none bg-transparent p-0 sm:rounded-3xl sm:p-0">
                <div
                    className={cn(
                        'group relative overflow-hidden rounded-3xl border border-white/20 p-6 shadow-[0_22px_70px_-28px_rgba(15,23,42,0.7)] backdrop-blur-2xl transition-all duration-500',
                        currentStep.backgroundClass
                    )}
                >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)] opacity-70" />
                        <div
                            className={cn(
                                'absolute left-[-15%] top-[-20%] h-48 w-48 rounded-full blur-3xl mix-blend-screen transition-all duration-700 group-hover:scale-110',
                                currentStep.auraClass
                            )}
                        />
                        <div
                            className={cn(
                                'absolute bottom-[-25%] right-[-20%] h-60 w-60 rounded-full bg-gradient-to-br blur-3xl opacity-80 transition duration-700 group-hover:rotate-3 group-hover:opacity-95',
                                currentStep.accentGradient
                            )}
                        />
                        <div
                            className={cn(
                                'absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-dashed opacity-60 transition duration-[1200ms] group-hover:scale-[1.02]',
                                currentStep.accentBorder
                            )}
                        />
                    </div>

                    <div className="relative rounded-[26px] bg-white/95 p-6 shadow-[0_12px_45px_rgba(15,23,42,0.14)] backdrop-blur-lg sm:p-8">
                        <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
                            <span>
                                Step {stepIndex + 1} / {steps.length}
                            </span>
                            {stepIndex < steps.length - 1 && (
                                <button
                                    type="button"
                                    onClick={handleSkip}
                                    className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 transition hover:text-primary"
                                >
                                    Skip
                                </button>
                            )}
                        </div>

                        {isWelcomeStep && (
                            <div className="mt-4 flex flex-col items-center space-y-2 text-center">
                                <span className="font-headline text-4xl text-slate-900 drop-shadow-[0_6px_25px_rgba(79,70,229,0.35)] sm:text-5xl">
                                    {APP_NAME}
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-500">
                                    Onboarding Tour
                                </span>
                            </div>
                        )}

                        <div className="mt-6 flex flex-col items-center gap-5 text-center sm:gap-6">
                            <div
                                className={cn(
                                    'relative flex h-20 w-20 items-center justify-center rounded-3xl transition duration-500 sm:h-24 sm:w-24',
                                    currentStep.iconWrapperClass
                                )}
                            >
                                <div
                                    className={cn(
                                        'absolute inset-0 rounded-3xl opacity-90 blur-2xl transition-all duration-700 group-hover:opacity-100',
                                        currentStep.auraClass
                                    )}
                                />
                                <div className="absolute inset-[14%] rounded-[1.35rem] bg-white/25 backdrop-blur-md" />
                                <CurrentIcon className={cn('relative h-10 w-10 drop-shadow-md sm:h-12 sm:w-12', currentStep.iconClass)} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold text-slate-900 drop-shadow-[0_8px_22px_rgba(15,23,42,0.18)] sm:text-3xl">
                                    {currentStep.title}
                                </h2>
                                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                                    {currentStep.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        'h-2 rounded-full transition-all duration-300',
                                        index === stepIndex
                                            ? 'w-10 bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.45)]'
                                            : 'w-2 bg-primary/35'
                                    )}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={stepIndex === 0}
                                className="text-slate-500 hover:text-primary sm:w-auto"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 sm:w-auto"
                            >
                                {isLastStep ? "Let's play!" : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
