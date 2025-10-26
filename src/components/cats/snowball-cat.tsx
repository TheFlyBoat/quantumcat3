import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const SNOWBALL_BASE_PROPS: CatComponentProps = {
    body: '#EDF2F7',
    accent: '#A0AEC0',
    catId: 'snowball',
};

const SNOWBALL_STYLES = `
    .cat.snowball {
        animation: snowball-breathe 4s infinite ease-in-out;
    }

    @keyframes snowball-breathe {
        0%, 100% { transform: translate(-50%, 0) scale(1); }
        50% { transform: translate(-50%, -2px) scale(1.02); }
    }

    .cat.snowball .blinking-eye {
        animation: snowball-blink 5s infinite ease-in-out;
        transform-origin: center;
    }

    @keyframes snowball-blink {
        0%, 95%, 100% { transform: scaleY(1); }
        97.5% { transform: scaleY(0.1); }
    }

    .cat.snowball .whisker-left {
        animation: snowball-whisker-left 3s infinite ease-in-out;
        transform-origin: 7600px 9200px;
    }

    .cat.snowball .whisker-right {
        animation: snowball-whisker-right 3s infinite ease-in-out 0.3s;
        transform-origin: 14000px 9200px;
    }

    @keyframes snowball-whisker-left {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(4deg); }
    }

    @keyframes snowball-whisker-right {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(-3deg); }
    }

    .cat.snowball .wag-tail {
        animation: snowball-tail 4s infinite ease-in-out;
        transform-origin: 4000px 14500px;
    }

    @keyframes snowball-tail {
        0%, 100% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
    }

    .cat.snowball .ear-left-base {
        animation: snowball-ear-twitch 6s infinite ease-in-out 0.5s;
        transform-origin: 8000px 3000px;
    }

    @keyframes snowball-ear-twitch {
        0%, 90%, 100% { transform: rotate(0deg); }
        92% { transform: rotate(-10deg); }
        94% { transform: rotate(5deg); }
    }
`;

const SnowballFigure: React.FC<CatComponentProps> = ({ body, accent, catId }) => (
    <StandardCat body={body} accent={accent} catId={catId} eyeColor="#2563EB" noseColor="#F472B6" />
);

export const SnowballCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat snowball', className)}>
        <style>{SNOWBALL_STYLES}</style>
        <SnowballFigure {...SNOWBALL_BASE_PROPS} />
    </div>
);
