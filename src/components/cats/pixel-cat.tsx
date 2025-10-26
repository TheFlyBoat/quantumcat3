import React from 'react';
import { cn } from '@/lib/utils';
import type { CatComponentProps } from './shared/types';

const PIXEL_BASE_PROPS: CatComponentProps = {
    body: '#FF7A5A',
    accent: '#AD4F3A',
    catId: 'pixel',
};

const PIXEL_STYLES = `
    .cat.pixel {
        animation: pixel-jiggle 1s steps(4, end) infinite;
    }

    @keyframes pixel-jiggle {
        0%, 100% { transform: translate(-50%, 0); }
        25% { transform: translate(-51%, -3px); }
        50% { transform: translate(-50%, 0); }
        75% { transform: translate(-49%, -3px); }
    }
`;

const PixelFigure: React.FC<CatComponentProps> = ({ body, accent }) => {
    const size = 10;
    const pixels = [
        {x:3, y:0, c:accent}, {x:4, y:0, c:accent},
        {x:11, y:0, c:accent}, {x:12, y:0, c:accent},
        {x:2, y:1, c:accent}, {x:3, y:1, c:body}, {x:4, y:1, c:accent},
        {x:11, y:1, c:accent}, {x:12, y:1, c:body}, {x:13, y:1, c:accent},
        {x:2, y:2, c:accent}, {x:3, y:2, c:body}, {x:4, y:2, c:body}, {x:5, y:2, c:body}, {x:6, y:2, c:body}, {x:7, y:2, c:body}, {x:8, y:2, c:body}, {x:9, y:2, c:body},{x:10, y:2, c:body},{x:11, y:2, c:body}, {x:12, y:2, c:body}, {x:13, y:2, c:accent},
        {x:2, y:3, c:body}, {x:3, y:3, c:body}, {x:4, y:3, c:body}, {x:5, y:3, c:body}, {x:6, y:3, c:body}, {x:7, y:3, c:body}, {x:8, y:3, c:body}, {x:9, y:3, c:body},{x:10, y:3, c:body},{x:11, y:3, c:body}, {x:12, y:3, c:body}, {x:13, y:3, c:body},
        {x:2, y:4, c:body}, {x:4, y:4, c:'black'}, {x:5, y:4, c:'black'}, {x:10, y:4, c:'black'}, {x:11, y:4, c:'black'}, {x:13, y:4, c:body},
        {x:2, y:5, c:body}, {x:4, y:5, c:'black'}, {x:5, y:5, c:'black'}, {x:10, y:5, c:'black'}, {x:11, y:5, c:'black'}, {x:13, y:5, c:body},
        {x:2, y:6, c:body}, {x:7, y:6, c:accent}, {x:8, y:6, c:accent}, {x:13, y:6, c:body},
        {x:2, y:7, c:body}, {x:3, y:7, c:body}, {x:4, y:7, c:body}, {x:5, y:7, c:body}, {x:6, y:7, c:body}, {x:7, y:7, c:body}, {x:8, y:7, c:body}, {x:9, y:7, c:body},{x:10, y:7, c:body},{x:11, y:7, c:body}, {x:12, y:7, c:body}, {x:13, y:7, c:body},
        {x:3, y:8, c:accent}, {x:4, y:8, c:body}, {x:5, y:8, c:body}, {x:6, y:8, c:body}, {x:7, y:8, c:body}, {x:8, y:8, c:body}, {x:9, y:8, c:body},{x:10, y:8, c:body},{x:11, y:8, c:body}, {x:12, y:8, c:accent},
        {x:3, y:9, c:accent}, {x:4, y:9, c:body}, {x:5, y:9, c:body}, {x:6, y:9, c:body}, {x:7, y:9, c:body}, {x:8, y:9, c:body}, {x:9, y:9, c:body},{x:10, y:9, c:body},{x:11, y:9, c:body}, {x:12, y:9, c:accent},
        {x:3, y:10, c:accent}, {x:4, y:10, c:body}, {x:5, y:10, c:body}, {x:6, y:10, c:body}, {x:7, y:10, c:body}, {x:8, y:10, c:body}, {x:9, y:10, c:body},{x:10, y:10, c:body},{x:11, y:10, c:body}, {x:12, y:10, c:accent},
        {x:3, y:11, c:accent}, {x:4, y:11, c:body}, {x:5, y:11, c:body}, {x:6, y:11, c:body}, {x:7, y:11, c:body}, {x:8, y:11, c:body}, {x:9, y:11, c:body},{x:10, y:11, c:body},{x:11, y:11, c:body}, {x:12, y:11, c:accent},
        {x:4, y:12, c:accent}, {x:5, y:12, c:accent}, {x:10, y:12, c:accent}, {x:11, y:12, c:accent},
        {x:4, y:13, c:accent}, {x:5, y:13, c:accent}, {x:10, y:13, c:accent}, {x:11, y:13, c:accent},
        {x:13, y:8, c:accent}, {x:14, y:9, c:accent}, {x:14, y:10, c:body}, {x:14, y:11, c:body}, {x:14, y:12, c:accent}, {x:13, y:12, c:accent},
    ];

    return (
        <svg viewBox={`0 0 ${size * 16} ${size * 16}`} xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }} width="100%" height="100%">
            {pixels.map((p, index) => (
                <rect key={index} x={p.x * size} y={p.y * size} width={size} height={size} fill={p.c} />
            ))}
        </svg>
    );
};

export const PixelCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat pixel', className)}>
        <style>{PIXEL_STYLES}</style>
        <PixelFigure {...PIXEL_BASE_PROPS} />
    </div>
);
