<<<<<<< HEAD
import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const PARADOX_BASE_PROPS: CatComponentProps = {
    body: '#6B7280',
    accent: '#374151',
    catId: 'paradox',
};

const PARADOX_STYLES = `
    .cat.paradox {
        aspect-ratio: 21164.08 / 18861.8;
    }

    .paradox-container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .paradox-cat {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        will-change: transform, opacity;
    }

    .paradox-main {
        z-index: 10;
        animation:
            paradox-main-shake 12s infinite,
            paradox-main-idle 4s infinite 1.5s ease-in-out;
    }

    @keyframes paradox-main-shake {
        0%, 8.3% {
            transform: scale(1);
        }
        8.4%, 9.2%, 10%, 10.8%, 11.6% { transform: translateX(1%) rotate(-2deg) scale(1.02); }
        8.8%, 9.6%, 10.4%, 11.2% { transform: translateX(-1%) rotate(2deg) scale(1.02); }
        12.5%, 100% { transform: scale(1); }
    }

    @keyframes paradox-main-idle {
        50% { transform: translateY(-1.5%); }
    }

    .paradox-alive-1, .paradox-alive-2, .paradox-alive-3,
    .paradox-dead-1, .paradox-dead-2, .paradox-dead-3 {
        opacity: 0;
        animation: paradox-shadow-appear 12s infinite;
    }

    @keyframes paradox-shadow-appear {
        0%, 12.5% {
            opacity: 0;
            transform: var(--transform-initial);
        }
        16.7% {
            opacity: 1;
            transform: var(--transform-final);
        }
        95% { opacity: 1; }
        100% { opacity: 0; }
    }

    .paradox-alive-1 { z-index: 3; --transform-initial: translateX(10%) scale(0.5); --transform-final: translateX(25%) scale(0.7); animation-delay: 0s; }
    .paradox-alive-2 { z-index: 2; --transform-initial: translateX(20%) scale(0.5); --transform-final: translateX(45%) scale(0.6); animation-delay: 0.4s; }
    .paradox-alive-3 { z-index: 1; --transform-initial: translateX(30%) scale(0.5); --transform-final: translateX(65%) scale(0.5); animation-delay: 0.8s; }

    .paradox-dead-1 { z-index: 3; --transform-initial: translateX(-10%) scale(0.5); --transform-final: translateX(-25%) scale(0.7); animation-delay: 0s; }
    .paradox-dead-2 { z-index: 2; --transform-initial: translateX(-20%) scale(0.5); --transform-final: translateX(-45%) scale(0.6); animation-delay: 0.4s; }
    .paradox-dead-3 { z-index: 1; --transform-initial: translateX(-30%) scale(0.5); --transform-final: translateX(-65%) scale(0.5); animation-delay: 0.8s; }

    .paradox-alive-1 {
        animation: paradox-shadow-appear 12s infinite, paradox-alive-1-anim 1s infinite ease-in-out 2s;
    }

    @keyframes paradox-alive-1-anim {
        50% { transform: var(--transform-final) rotate(2deg); }
    }

    .paradox-alive-2 .ear-left-base {
        animation: paradox-twitch-fast 1.5s infinite ease-in-out 2.4s;
        transform-origin: 8000px 3200px;
    }

    @keyframes paradox-twitch-fast {
        50% { transform: rotate(-15deg); }
    }

    .paradox-alive-3 {
        animation: paradox-shadow-appear 12s infinite, paradox-alive-3-anim 4s infinite ease-in-out 2.8s;
    }

    @keyframes paradox-alive-3-anim {
        50% { transform: var(--transform-final) translateY(-2%); }
    }

    .paradox-dead-1 {
        animation: paradox-shadow-appear 12s infinite, paradox-dead-1-anim 5s infinite ease-in-out 2s;
    }

    @keyframes paradox-dead-1-anim {
        50% { transform: var(--transform-final) translateY(-3%); }
    }

    .paradox-dead-2 {
        animation: paradox-shadow-appear 12s infinite, paradox-dead-2-anim 0.2s infinite steps(2, end) 2.4s;
    }

    @keyframes paradox-dead-2-anim {
        to { opacity: 0.8; transform: var(--transform-final) translateX(1%); }
    }

    .paradox-dead-3 {
        animation: paradox-shadow-appear 12s infinite, paradox-dead-3-anim 8s infinite ease-in-out 2.8s;
    }

    @keyframes paradox-dead-3-anim {
        50% { opacity: 0.6; }
    }
`;

const DeadCat: React.FC<CatComponentProps> = ({ body, accent, catId }) => (
    <StandardCat body={body} accent={accent} catId={catId} eyeColor="transparent">
        <g stroke="#E53E3E" strokeWidth="300" strokeLinecap="round">
            <path d="M8200 7100 L9500 8400" />
            <path d="M9500 7100 L8200 8400" />
            <path d="M13000 7100 L14300 8400" />
            <path d="M14300 7100 L13000 8400" />
        </g>
    </StandardCat>
);

const ParadoxFigure: React.FC<CatComponentProps> = ({ body, accent, catId }) => {
    const aliveColors = [
        { body: '#4A90E2', accent: '#2A5298' },
        { body: '#B8E986', accent: '#7CB82F' },
        { body: '#F5A623', accent: '#B4781A' },
    ];
    const deadColors = [
        { body: '#2A3B4D', accent: '#1A232E' },
        { body: '#4A5C39', accent: '#2E3823' },
        { body: '#6B4C1A', accent: '#402D10' },
    ];

    return (
        <div className="paradox-container">
            {aliveColors.map((colors, index) => (
                <div key={`alive-${index}`} className={`paradox-cat paradox-alive-${index + 1}`}>
                    <StandardCat body={colors.body} accent={colors.accent} catId={catId} />
                </div>
            ))}
            {deadColors.map((colors, index) => (
                <div key={`dead-${index}`} className={`paradox-cat paradox-dead-${index + 1}`}>
                    <DeadCat body={colors.body} accent={colors.accent} catId={catId} />
                </div>
            ))}
            <div className="paradox-cat paradox-main">
                <StandardCat body={body} accent={accent} catId={catId} />
            </div>
        </div>
    );
};

export const ParadoxCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat paradox', className)}>
        <style>{PARADOX_STYLES}</style>
        <ParadoxFigure {...PARADOX_BASE_PROPS} />
=======

import { cn } from "@/lib/utils";
import { GlitchCatIcon } from "./glitch-cat-icon";


export const ParadoxCatIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative cat-container", className)}>
        <GlitchCatIcon className="w-full h-full" />
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    </div>
);
