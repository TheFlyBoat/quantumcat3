import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const SNEEKY_BASE_PROPS: CatComponentProps = {
    body: '#4A5568',
    accent: '#2D3748',
    catId: 'sneeky',
};

const SNEEKY_STYLES = `
    .cat.sneeky {
        width: 100%;
        height: 100%;
        transform: none;
    }

    .sneeky-head {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 35%;
        transform: translate(-50%, 100%);
        clip-path: url(#sneeky-head-clip);
        animation: sneeky-peek-head 8s infinite;
    }

    .sneeky-paw {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 20%;
        height: auto;
        aspect-ratio: 1;
        transform: translate(-50%, 100%);
        animation: sneeky-play-paw 8s infinite ease-in-out;
    }

    .sneeky-head .pupil {
        animation: sneeky-look-around 8s infinite ease-in-out;
    }

    @keyframes sneeky-peek-head {
        0%   { transform: translate(-50%, 100%); }
        15%  { transform: translate(-50%, 100%); animation-timing-function: ease-out; }
        25%  { transform: translate(-50%, 62%); }
        50%  { transform: translate(-50%, 62%); animation-timing-function: ease-in; }
        55%  { transform: translate(-50%, 100%); }
        100% { transform: translate(-50%, 100%); }
    }

    @keyframes sneeky-look-around {
        0%, 25%, 50%, 100% { transform: translateX(0); }
        32% { transform: translateX(-400px); }
        40% { transform: translateX(400px); }
        48% { transform: translateX(0); }
    }

    @keyframes sneeky-play-paw {
        0%, 60% { transform: translate(-50%, 110%); opacity: 0; }
        70% { transform: translate(-50%, 75%) rotate(0deg); opacity: 1; }
        74% { transform: translate(-80%, 75%) rotate(-20deg); }
        76% { transform: translate(-80%, 80%) rotate(-20deg); }
        78% { transform: translate(-80%, 75%) rotate(-20deg); }
        82% { transform: translate(-20%, 75%) rotate(20deg); }
        84% { transform: translate(-20%, 80%) rotate(20deg); }
        86% { transform: translate(-20%, 75%) rotate(20deg); }
        90% { transform: translate(-50%, 75%) rotate(0deg); }
        95% { transform: translate(-50%, 110%); opacity: 0; }
        100% { opacity: 0; }
    }
`;

const SneekyFigure: React.FC<CatComponentProps> = ({ body, accent, catId }) => (
    <>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                <clipPath id="sneeky-head-clip">
                    <rect x="0" y="0" width="21164.08" height="9500" />
                </clipPath>
            </defs>
        </svg>
        <div className="sneeky-head">
            <StandardCat body={body} accent={accent} catId={catId} />
        </div>
        <div className="sneeky-paw">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <g transform="translate(50, 80)">
                    <path
                        d="M 0,20 C -30,20 -40,0 -40,-10 C -40,-30 -25,-40 0,-40 C 25,-40 40,-30 40,-10 C 40,0 30,20 0,20 Z"
                        fill={body}
                        stroke={accent}
                        strokeWidth="5"
                    />
                    <circle cx="0" cy="-10" r="12" fill={accent} />
                    <circle cx="-20" cy="-28" r="6" fill={accent} />
                    <circle cx="0" cy="-30" r="6" fill={accent} />
                    <circle cx="20" cy="-28" r="6" fill={accent} />
                </g>
            </svg>
        </div>
    </>
);

export const SneekyCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat sneeky', className)}>
        <style>{SNEEKY_STYLES}</style>
        <SneekyFigure {...SNEEKY_BASE_PROPS} />
    </div>
);
