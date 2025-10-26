import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const COSMIC_BASE_PROPS: CatComponentProps = {
    body: '#0c0a3e',
    accent: '#3a3285',
    catId: 'cosmic',
};

const COSMIC_STARS = [
    { id: 1, cx: 5200, cy: 4800, r: 65 },
    { id: 2, cx: 6400, cy: 8200, r: 40 },
    { id: 3, cx: 7600, cy: 6200, r: 55 },
    { id: 4, cx: 8900, cy: 9100, r: 35 },
    { id: 5, cx: 10100, cy: 5400, r: 48 },
    { id: 6, cx: 11200, cy: 7600, r: 32 },
    { id: 7, cx: 12400, cy: 8700, r: 45 },
    { id: 8, cx: 13600, cy: 6100, r: 52 },
    { id: 9, cx: 14800, cy: 9400, r: 37 },
    { id: 10, cx: 16000, cy: 5600, r: 42 },
    { id: 11, cx: 17100, cy: 7800, r: 58 },
    { id: 12, cx: 18300, cy: 6300, r: 44 },
    { id: 13, cx: 19500, cy: 8900, r: 36 },
    { id: 14, cx: 20700, cy: 7200, r: 50 },
    { id: 15, cx: 7200, cy: 10400, r: 46 },
    { id: 16, cx: 8500, cy: 11700, r: 38 },
    { id: 17, cx: 9700, cy: 10200, r: 60 },
    { id: 18, cx: 11300, cy: 11300, r: 34 },
    { id: 19, cx: 12700, cy: 10300, r: 48 },
    { id: 20, cx: 14100, cy: 11600, r: 40 },
    { id: 21, cx: 15500, cy: 10100, r: 54 },
    { id: 22, cx: 16900, cy: 11000, r: 33 },
    { id: 23, cx: 18200, cy: 9900, r: 47 },
    { id: 24, cx: 19600, cy: 10800, r: 39 },
    { id: 25, cx: 21000, cy: 9500, r: 35 },
];

const COSMIC_STAR_TIMINGS = [
    { id: 1, delay: 0.0, duration: 2.8 },
    { id: 2, delay: 0.7, duration: 3.4 },
    { id: 3, delay: 1.2, duration: 3.0 },
    { id: 4, delay: 2.1, duration: 2.6 },
    { id: 5, delay: 1.8, duration: 3.8 },
    { id: 6, delay: 0.3, duration: 4.4 },
    { id: 7, delay: 2.4, duration: 2.9 },
    { id: 8, delay: 1.5, duration: 3.2 },
    { id: 9, delay: 3.1, duration: 4.0 },
    { id: 10, delay: 2.7, duration: 2.7 },
    { id: 11, delay: 1.0, duration: 3.6 },
    { id: 12, delay: 3.3, duration: 2.5 },
    { id: 13, delay: 0.9, duration: 4.2 },
    { id: 14, delay: 1.9, duration: 3.1 },
    { id: 15, delay: 0.4, duration: 3.5 },
    { id: 16, delay: 2.6, duration: 2.4 },
    { id: 17, delay: 1.4, duration: 3.9 },
    { id: 18, delay: 3.5, duration: 2.8 },
    { id: 19, delay: 0.2, duration: 4.1 },
    { id: 20, delay: 2.2, duration: 3.3 },
    { id: 21, delay: 1.6, duration: 2.7 },
    { id: 22, delay: 0.8, duration: 3.7 },
    { id: 23, delay: 2.9, duration: 2.9 },
    { id: 24, delay: 1.1, duration: 4.5 },
    { id: 25, delay: 3.7, duration: 3.2 },
];

const COSMIC_STYLES = `
    .cat.cosmic {
        animation: cosmic-float 6s infinite ease-in-out;
    }

    @keyframes cosmic-float {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, -2%); }
    }

    .cat.cosmic .blinking-eye.eye-part {
        animation: cosmic-eye-glow 4s infinite ease-in-out alternate, cosmic-blink 8s infinite ease-in-out;
        transform-origin: center;
    }

    @keyframes cosmic-eye-glow {
        from {
            filter: drop-shadow(0 0 8px #fceeb2) brightness(1.2);
        }
        to {
            filter: drop-shadow(0 0 20px #fceeb2) drop-shadow(0 0 10px #fff) brightness(1.8);
        }
    }

    @keyframes cosmic-blink {
        0%, 97%, 100% { transform: scaleY(1); }
        98.5% { transform: scaleY(0.1); }
    }

    .cat.cosmic .ear-left-base {
        animation: cosmic-ear-twitch-left 7s infinite ease-in-out;
        transform-origin: 8000px 3200px;
    }

    .cat.cosmic .ear-right-base {
        animation: cosmic-ear-twitch-right 7s infinite ease-in-out 0.4s;
        transform-origin: 14800px 3200px;
    }

    @keyframes cosmic-ear-twitch-left {
        0%, 15%, 100% { transform: rotate(0); }
        7% { transform: rotate(-5deg); }
    }

    @keyframes cosmic-ear-twitch-right {
        0%, 15%, 100% { transform: rotate(0); }
        7% { transform: rotate(5deg); }
    }

    .cat.cosmic .whisker-left {
        animation: cosmic-whisker-left 6s infinite ease-in-out;
        transform-origin: 7600px 9200px;
    }

    .cat.cosmic .whisker-right {
        animation: cosmic-whisker-right 6s infinite ease-in-out 0.2s;
        transform-origin: 14000px 9200px;
    }

    @keyframes cosmic-whisker-left {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(3deg); }
    }

    @keyframes cosmic-whisker-right {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(-3deg); }
    }

    .cat.cosmic .wag-tail {
        animation: cosmic-wag-tail 5s infinite ease-in-out;
        transform-origin: 4000px 14500px;
    }

    @keyframes cosmic-wag-tail {
        0%, 100% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
    }

    .cosmic-stars .star {
        animation-name: cosmic-twinkle;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }

    @keyframes cosmic-twinkle {
        0%, 100% {
            opacity: 0.5;
            transform: scale(0.8);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }

    ${COSMIC_STAR_TIMINGS.map(({ id, delay, duration }) => `.cosmic-stars .star[data-star-id="${id}"] { animation-delay: ${delay}s; animation-duration: ${duration}s; }`).join('\n')}
`;

const CosmicFigure: React.FC<CatComponentProps> = ({ body, accent, catId }) => (
    <StandardCat body={body} accent={accent} catId={catId} eyeColor="#fceeb2">
        <g className="cosmic-stars" aria-hidden="true">
            {COSMIC_STARS.map(star => (
                <circle
                    key={star.id}
                    className="star"
                    data-star-id={star.id}
                    cx={star.cx}
                    cy={star.cy}
                    r={star.r}
                    fill="#FFFFFF"
                />
            ))}
        </g>
    </StandardCat>
);

export const CosmicCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat cosmic', className)}>
        <style>{COSMIC_STYLES}</style>
        <CosmicFigure {...COSMIC_BASE_PROPS} />
    </div>
);
