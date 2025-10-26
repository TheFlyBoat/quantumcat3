import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const DOMINO_BASE_PROPS: CatComponentProps = {
    body: '#2D3748',
    accent: '#1A202C',
    catId: 'domino',
};

const DOMINO_STYLES = `
    .cat.domino .head-part {
        animation: domino-head-bob 3s infinite ease-in-out;
        transform-origin: 50% 100%;
    }

    @keyframes domino-head-bob {
        0%, 100% { transform: rotate(0deg); }
        20% { transform: rotate(-3deg); }
        40% { transform: rotate(2deg); }
        60% { transform: rotate(-1deg); }
    }

    .cat.domino .wag-tail {
        animation: domino-tail-sway 5s infinite ease-in-out;
        transform-origin: 4000px 14500px;
    }

    @keyframes domino-tail-sway {
        0%, 100% { transform: rotate(8deg); }
        50% { transform: rotate(-8deg); }
    }

    .cat.domino .blinking-eye {
        animation: domino-blink 6s infinite ease-in-out;
        transform-origin: center;
    }

    @keyframes domino-blink {
        0%, 96%, 100% { transform: scaleY(1); }
        98% { transform: scaleY(0.1); }
    }
`;

const DominoFigure: React.FC<CatComponentProps> = ({ body, accent, catId }) => {
    const whiteColor = '#F7FAFC';

    return (
        <StandardCat body={body} accent={accent} catId={catId}>
            <g className="tuxedo-markings" fill={whiteColor}>
                <path d="M11750,8500 Q11750,11000 10000,12500 L13500,12500 Q11750,11000 11750,8500 Z" />
                <path d="M5051.62 16776.77 C 4500 17500, 6000 18500, 7500 18000 L 8500 18200 L 7800 16800 Z" />
                <path d="M16659 16776.77 C 17200 17500, 15700 18500, 14200 18000 L 13200 18200 L 13900 16800 Z" />
                <g stroke={whiteColor} strokeWidth="150" fill="none">
                    <path d="M7500 9500 C 5000 9000, 3000 9500, 2000 9300" />
                    <path d="M7500 9000 C 5000 8500, 3000 8800, 2000 8600" />
                    <path d="M16000 9500 C 18500 9000, 20500 9500, 21500 9300" />
                    <path d="M16000 9000 C 18500 8500, 20500 8800, 21500 8600" />
                </g>
            </g>
        </StandardCat>
    );
};

export const DominoCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat domino', className)}>
        <style>{DOMINO_STYLES}</style>
        <DominoFigure {...DOMINO_BASE_PROPS} />
    </div>
);
