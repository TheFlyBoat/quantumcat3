import React from 'react';
import { cn } from '@/lib/utils';
import { StandardCat } from './shared/standard-cat';
import type { CatComponentProps } from './shared/types';

const CLOUD_BASE_PROPS: CatComponentProps = {
    body: '#dbeafe',
    accent: '#bfdbfe',
    catId: 'cloud',
};

const CLOUD_STYLES = `
    .cat.cloud {
        animation: cloud-master-lifecycle 12s infinite ease-in-out;
    }

    @keyframes cloud-master-lifecycle {
        0%   { transform: translate(-50%, 0); opacity: 1; }
        10%  { transform: translate(-50%, -3%); }
        20%  { transform: translate(-50%, 0); opacity: 1; }
        50%  { transform: translate(-50%, -150%); opacity: 1; }
        50.1% { opacity: 0; }
        85% { transform: translate(-50%, 20%); }
        100% { transform: translate(-50%, 0); opacity: 1; }
    }

    .cat.cloud .cat-form {
        animation: cloud-cat-to-cloud-morph 12s infinite ease-in-out;
    }

    .cat.cloud .cloud-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: cloud-cloud-from-cat-morph 12s infinite ease-in-out;
        transform: scale(1.2);
        pointer-events: none;
    }

    @keyframes cloud-cat-to-cloud-morph {
        0%, 20% { opacity: 1; filter: blur(0px); }
        50% { opacity: 0; filter: blur(20px); }
        50.1%, 100% { opacity: 0; filter: blur(20px); }
    }

    @keyframes cloud-cloud-from-cat-morph {
        0%, 20% { opacity: 0; filter: blur(20px); }
        50% { opacity: 0.9; filter: blur(0px); }
        100% { opacity: 0.9; filter: blur(0px); }
    }
`;

const CloudForms: React.FC<CatComponentProps> = ({ body, accent, catId }) => (
    <>
        <div className="cat-form">
            <StandardCat body={body} accent={accent} catId={catId} />
        </div>
        <div className="cloud-form">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="100%" height="100%">
                <defs>
                    <filter id="cloud-soften">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                </defs>
                <g filter="url(#cloud-soften)">
                    <circle cx="60" cy="60" r="40" fill={body} />
                    <circle cx="100" cy="70" r="35" fill={body} />
                    <circle cx="140" cy="55" r="45" fill={accent} />
                    <circle cx="110" cy="40" r="30" fill={body} />
                    <rect x="60" y="60" width="80" height="40" fill={body} />
                </g>
            </svg>
        </div>
    </>
);

export const CloudCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat cloud', className)}>
        <style>{CLOUD_STYLES}</style>
        <CloudForms {...CLOUD_BASE_PROPS} />
    </div>
);
