import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const ANOMALY_BASE_PROPS: CatComponentProps = {
    body: '#9333ea',
    accent: '#581c87',
    catId: 'anomaly',
};

const ANOMALY_STYLES = `
    .cat.anomaly > div {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-areas: "stack";
    }

    .anomaly-form-wrapper {
        grid-area: stack;
        opacity: 0;
    }

    .anomaly-base-wrapper   { animation: anomaly-cycle-base 10s infinite steps(1, end); }
    .anomaly-pixel-wrapper  { animation: anomaly-cycle-pixel 10s infinite steps(1, end); }
    .anomaly-sketch-wrapper { animation: anomaly-cycle-sketch 10s infinite steps(1, end); }
    .anomaly-glitch-wrapper { animation: anomaly-cycle-glitch 10s infinite steps(1, end); }

    @keyframes anomaly-cycle-base {
        0%, 28%, 95%, 100% { opacity: 1; }
        29%, 94% { opacity: 0; }
    }

    @keyframes anomaly-cycle-pixel {
        0%, 29% { opacity: 0; }
        30%, 53% { opacity: 1; }
        54%, 100% { opacity: 0; }
    }

    @keyframes anomaly-cycle-sketch {
        0%, 54% { opacity: 0; }
        55%, 78% { opacity: 1; }
        79%, 100% { opacity: 0; }
    }

    @keyframes anomaly-cycle-glitch {
        0%, 79% { opacity: 0; }
        80%, 93% { opacity: 1; }
        94%, 100% { opacity: 0; }
    }

    .anomaly-base-wrapper > div > svg,
    .anomaly-base-wrapper > svg {
        animation: anomaly-color-shift 4s infinite linear alternate, anomaly-instability 0.3s infinite steps(2, end);
    }

    @keyframes anomaly-color-shift {
        from { filter: hue-rotate(-20deg) saturate(1.5); }
        to { filter: hue-rotate(20deg) saturate(2); }
    }

    @keyframes anomaly-instability {
        0% { transform: translate(0,0) skew(0); }
        100% { transform: translate(1px, -1px) skew(-0.5deg); }
    }

    .anomaly-pixel-wrapper svg {
        animation: anomaly-pixel-jig 0.5s infinite steps(4, end);
    }

    @keyframes anomaly-pixel-jig {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-2%, -2%); }
        50% { transform: translate(0, 0); }
        75% { transform: translate(2%, -2%); }
    }

    .anomaly-sketch-wrapper .sketch-boil {
        animation: anomaly-sketch-boil 0.1s infinite;
    }

    @keyframes anomaly-sketch-boil {
        0% { filter: url(#sketch-filter-1); }
        50% { filter: url(#sketch-filter-2); }
        100% { filter: url(#sketch-filter-1); }
    }

    .anomaly-glitch-wrapper {
        filter: url(#glitch-chromatic-aberration);
    }

    .anomaly-glitch-wrapper > div > svg,
    .anomaly-glitch-wrapper > svg {
        animation: anomaly-glitch-flicker 0.1s infinite steps(2, end);
    }

    @keyframes anomaly-glitch-flicker {
        0% { transform: skewX(0); }
        50% { transform: skewX(2deg); }
        100% { transform: skewX(0); }
    }

    .anomaly-glitch-wrapper .head-part { animation: anomaly-glitch-head 0.2s infinite steps(3, end) alternate; }
    .anomaly-glitch-wrapper .wag-tail { animation: anomaly-glitch-tail 0.3s infinite steps(2, end) alternate; }
    .anomaly-glitch-wrapper .fade-group > path:nth-of-type(2) { animation: anomaly-glitch-body 0.25s infinite steps(4, end) reverse; }

    @keyframes anomaly-glitch-head {
        from { transform: translate(-800px, 300px) skewX(20deg); }
        to { transform: translate(600px, -100px) skewY(-15deg); }
    }

    @keyframes anomaly-glitch-tail {
        from { transform: translate(0, 0) scaleY(1); }
        to { transform: translate(1500px, -1000px) scaleY(3) rotate(30deg); }
    }

    @keyframes anomaly-glitch-body {
        from { transform: scale(1.1, 0.9) skew(5deg); }
        to { transform: translate(-400px, 0) scale(0.9, 1.1) skew(-5deg); }
    }
`;

const AnomalyForms: React.FC<CatComponentProps> = ({ body, accent, catId }) => {
    const pixelSize = 1000;
    const pixels = [
        { x: 3, y: 0, c: accent }, { x: 4, y: 0, c: accent }, { x: 11, y: 0, c: accent }, { x: 12, y: 0, c: accent },
        { x: 2, y: 1, c: accent }, { x: 3, y: 1, c: body }, { x: 4, y: 1, c: accent }, { x: 11, y: 1, c: accent }, { x: 12, y: 1, c: body }, { x: 13, y: 1, c: accent },
        { x: 2, y: 2, c: accent }, { x: 3, y: 2, c: body }, { x: 4, y: 2, c: body }, { x: 5, y: 2, c: body }, { x: 6, y: 2, c: body }, { x: 7, y: 2, c: body }, { x: 8, y: 2, c: body }, { x: 9, y: 2, c: body }, { x: 10, y: 2, c: body }, { x: 11, y: 2, c: body }, { x: 12, y: 2, c: body }, { x: 13, y: 2, c: accent },
        { x: 2, y: 3, c: body }, { x: 3, y: 3, c: body }, { x: 4, y: 3, c: body }, { x: 5, y: 3, c: body }, { x: 6, y: 3, c: body }, { x: 7, y: 3, c: body }, { x: 8, y: 3, c: body }, { x: 9, y: 3, c: body }, { x: 10, y: 3, c: body }, { x: 11, y: 3, c: body }, { x: 12, y: 3, c: body }, { x: 13, y: 3, c: body },
        { x: 2, y: 4, c: body }, { x: 4, y: 4, c: 'cyan' }, { x: 5, y: 4, c: 'cyan' }, { x: 10, y: 4, c: 'magenta' }, { x: 11, y: 4, c: 'magenta' }, { x: 13, y: 4, c: body },
        { x: 2, y: 5, c: body }, { x: 4, y: 5, c: 'cyan' }, { x: 5, y: 5, c: 'cyan' }, { x: 10, y: 5, c: 'magenta' }, { x: 11, y: 5, c: 'magenta' }, { x: 13, y: 5, c: body },
        { x: 2, y: 6, c: body }, { x: 7, y: 6, c: accent }, { x: 8, y: 6, c: accent }, { x: 13, y: 6, c: body },
        { x: 2, y: 7, c: body }, { x: 3, y: 7, c: body }, { x: 4, y: 7, c: body }, { x: 5, y: 7, c: body }, { x: 6, y: 7, c: body }, { x: 7, y: 7, c: body }, { x: 8, y: 7, c: body }, { x: 9, y: 7, c: body }, { x: 10, y: 7, c: body }, { x: 11, y: 7, c: body }, { x: 12, y: 7, c: body }, { x: 13, y: 7, c: body },
        { x: 3, y: 8, c: accent }, { x: 4, y: 8, c: body }, { x: 5, y: 8, c: body }, { x: 6, y: 8, c: body }, { x: 7, y: 8, c: body }, { x: 8, y: 8, c: body }, { x: 9, y: 8, c: body }, { x: 10, y: 8, c: body }, { x: 11, y: 8, c: body }, { x: 12, y: 8, c: accent },
        { x: 3, y: 9, c: accent }, { x: 4, y: 9, c: body }, { x: 5, y: 9, c: body }, { x: 6, y: 9, c: body }, { x: 7, y: 9, c: body }, { x: 8, y: 9, c: body }, { x: 9, y: 9, c: body }, { x: 10, y: 9, c: body }, { x: 11, y: 9, c: body }, { x: 12, y: 9, c: accent },
        { x: 3, y: 10, c: accent }, { x: 4, y: 10, c: body }, { x: 5, y: 10, c: body }, { x: 6, y: 10, c: body }, { x: 7, y: 10, c: body }, { x: 8, y: 10, c: body }, { x: 9, y: 10, c: body }, { x: 10, y: 10, c: body }, { x: 11, y: 10, c: body }, { x: 12, y: 10, c: accent },
        { x: 3, y: 11, c: accent }, { x: 4, y: 11, c: body }, { x: 5, y: 11, c: body }, { x: 6, y: 11, c: body }, { x: 7, y: 11, c: body }, { x: 8, y: 11, c: body }, { x: 9, y: 11, c: body }, { x: 10, y: 11, c: body }, { x: 11, y: 11, c: body }, { x: 12, y: 11, c: accent },
        { x: 4, y: 12, c: accent }, { x: 5, y: 12, c: accent }, { x: 10, y: 12, c: accent }, { x: 11, y: 12, c: accent },
        { x: 13, y: 8, c: accent }, { x: 14, y: 9, c: accent }, { x: 14, y: 10, c: body }, { x: 14, y: 11, c: body }, { x: 14, y: 12, c: accent }, { x: 13, y: 12, c: accent },
    ];

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="sketch-filter-1">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="warp" />
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
                    </filter>
                    <filter id="sketch-filter-2">
                        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" result="warp" />
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
                    </filter>
                    <filter id="glitch-chromatic-aberration">
                        <feOffset in="SourceGraphic" dx="500" dy="0" result="red" />
                        <feOffset in="SourceGraphic" dx="-500" dy="0" result="cyan" />
                        <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red-only" />
                        <feColorMatrix in="cyan" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan-only" />
                        <feBlend in="red-only" in2="SourceGraphic" mode="lighten" result="blended1" />
                        <feBlend in="cyan-only" in2="blended1" mode="lighten" />
                    </filter>
                </defs>
            </svg>

            <div className="anomaly-form-wrapper anomaly-base-wrapper">
                <StandardCat {...{ body, accent, catId }} />
            </div>

            <div className="anomaly-form-wrapper anomaly-pixel-wrapper">
                <svg
                    viewBox={`0 0 ${pixelSize * 16} ${pixelSize * 15}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
                >
                    {pixels.map((p, index) => (
                        <rect key={index} x={p.x * pixelSize} y={p.y * pixelSize} width={pixelSize} height={pixelSize} fill={p.c} />
                    ))}
                </svg>
            </div>

            <div className="anomaly-form-wrapper anomaly-sketch-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 21164.08 18861.8">
                    <g fill="none" strokeWidth="150" strokeLinecap="round" strokeLinejoin="round" className="sketch-boil">
                        <path stroke="#FF00FF" d="M 6000 3000 C 5000 1000, 9000 1000, 8500 3500" />
                        <path stroke="#FF00FF" d="M 15000 3000 C 16000 1000, 12000 1000, 12500 3500" />
                        <path stroke="#00FFFF" d="M 5000, 10000 C 16000, 10000, 16000, 4000, 5000, 4000" />
                        <path stroke="#00FFFF" d="M 5000, 10000 C 16000, 10000, 16000, 18000, 5000, 18000" />
                        <path stroke="#FF00FF" d="M 8500 7500 C 9000 8000 10000 8000 10500 7500" />
                        <path stroke="#FF00FF" d="M 12500 7500 C 13000 8000 14000 8000 14500 7500" />
                        <path stroke="#FFFF00" d="M 11750 9000 C 11000 10500, 12500 10500, 11750 9000" />
                        <path stroke="#00FFFF" d="M 2000, 14000 C 1000, 12000, -500, 18000, 2000, 16000" />
                    </g>
                </svg>
            </div>

            <div className="anomaly-form-wrapper anomaly-glitch-wrapper">
                <StandardCat body="#00FF00" accent="#FF00FF" catId={catId} />
            </div>
        </div>
    );
};

export const AnomalyCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat anomaly', className)}>
        <style>{ANOMALY_STYLES}</style>
        <AnomalyForms {...ANOMALY_BASE_PROPS} />
    </div>
);
