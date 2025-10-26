
import { cn } from "@/lib/utils";
import React from "react";

export const CatPaw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.7,14.9c-0.3,0-0.6-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9c0.3-0.3,0.6-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.4,0,1.9C15.3,14.8,15,14.9,14.7,14.9z" />
    <path d="M9.3,14.9c-0.3,0-0.6-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9c0.3-0.3,0.6-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.4,0,1.9C9.9,14.8,9.6,14.9,9.3,14.9z" />
    <path d="M12,11.3c-0.3,0-0.6-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9c0.3-0.3,0.6-0.4,0.9-0.4c0.3,0,0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.4,0,1.9C12.6,11.2,12.3,11.3,12,11.3z" />
    <path d="M17.7,11.1c-0.3,0-0.6-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9c0.3-0.3,0.6-0.4,0.9-0.4s0.6,0.1,0.9,0.4c0.5,0.5,0.5,1.4,0,1.9C18.3,11,18,11.1,17.7,11.1z" />
    <path d="M12,21c-4,0-7.3-3.3-7.3-7.3c0-2.3,1.1-4.4,2.8-5.8C8.9,6.7,10.4,6,12,6s3.1,0.7,4.5,1.9c1.7,1.4,2.8,3.5,2.8,5.8C19.3,17.7,16,21,12,21z M12,8c-3.1,0-5.6,2.5-5.6,5.6c0,3.1,2.5,5.6,5.6,5.6s5.6-2.5,5.6-5.6C17.6,10.5,15.1,8,12,8z" />
  </svg>
);


export const BoxIcon = ({ className, isOpen }: { className?: string, isOpen?: boolean }) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <defs>
      <linearGradient id="stripes" gradientTransform="rotate(45)">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="10%" stopColor="#A0522D" />
        <stop offset="10%" stopColor="#8B4513" />
        <stop offset="20%" stopColor="#8B4513" />
        <stop offset="20%" stopColor="#A0522D" />
        <stop offset="30%" stopColor="#A0522D" />
        <stop offset="30%" stopColor="#8B4513" />
        <stop offset="40%" stopColor="#8B4513" />
        <stop offset="40%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="60%" stopColor="#8B4513" />
        <stop offset="60%" stopColor="#A0522D" />
        <stop offset="70%" stopColor="#A0522D" />
        <stop offset="70%" stopColor="#8B4513" />
        <stop offset="80%" stopColor="#8B4513" />
        <stop offset="80%" stopColor="#A0522D" />
        <stop offset="90%" stopColor="#A0522D" />
        <stop offset="90%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
    </defs>
    
    {/* Lid */}
    <g className={cn("transition-transform duration-300", !isOpen && "group-hover:-translate-y-1", isOpen && "-translate-y-4")}>
      <path d="M 8,28 H 92 C 96,28 96,22 92,22 L 8,22 C 4,22 4,28 8,28 Z" fill={'#8B4513'} />
    </g>

    {/* Box Body */}
    <g>
      <rect x="5" y="28" width="90" height="60" rx="5" fill={"url(#stripes)"} />
    </g>
    
    <ellipse cx="50" cy="94" rx="40" ry="5" fill="#000000" fillOpacity={0.2} />
  </svg>
);


const catBody = "M30 90 C 10 90, 10 60, 30 60 L 70 60 C 90 60, 90 90, 70 90 Z";
const catHead = "M 35 60 C 25 30, 75 30, 65 60 Z";
const earLeft = "M 35 40 C 30 25, 20 30, 30 40";
const earRight = "M 65 40 C 70 25, 80 30, 70 40";
const tail = "M 80 90 C 95 85, 95 70, 85 70";

const commonCatStyle = {
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: "none",
  stroke: "currentColor",
};

export const AliveCatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn(className)}>
    <g {...commonCatStyle}>
      <path d={catBody} />
      <path d={catHead} />
      <path d={earLeft} />
      <path d={earRight} />
      <path d={tail} />
      {/* Eyes */}
      <circle cx="45" cy="50" r="2" fill="currentColor" />
      <circle cx="55" cy="50" r="2" fill="currentColor" />
      {/* Mouth */}
      <path d="M 48 55 Q 50 58, 52 55" />
    </g>
  </svg>
);

export const DeadCatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn(className, 'opacity-70')}>
    <g {...commonCatStyle}>
      <path d={catBody} />
      <path d={catHead} transform="rotate(-5 50 50)" />
      <path d={earLeft} />
      <path d={earRight} />
      <path d={tail} />
       {/* Eyes */}
      <path d="M 42 47 L 48 53 M 48 47 L 42 53" strokeWidth="2.5" />
      <path d="M 52 47 L 58 53 M 58 47 L 52 53" strokeWidth="2.5" />
      {/* Mouth */}
      <path d="M 48 58 Q 50 55, 52 58" />
    </g>
  </svg>
);


export const FishboneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M12 12v6" />
    <path d="M16 14l-4-2-4 2" />
    <path d="M16 11l-4-2-4 2" />
    <path d="M16 8l-4-2-4 2" />
  </svg>
);

export const ShinyBoxIcon = ({ className, isOpen }: { className?: string, isOpen?: boolean }) => (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <defs>
        <linearGradient id="shiny-body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#434343" />
            <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="shiny-lid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#666666" />
            <stop offset="100%" stopColor="#222222" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>
      
      {/* Lid */}
      <g className={cn("transition-transform duration-300", !isOpen && "group-hover:-translate-y-1", isOpen && "-translate-y-4")}>
        <path d="M 8,28 H 92 C 96,28 96,22 92,22 L 8,22 C 4,22 4,28 8,28 Z" fill={'url(#shiny-lid-gradient)'} />
        <path d="M 48 20 L 52 20 L 52 16 L 48 16 Z" fill="hsl(var(--primary))" filter="url(#glow)" />
      </g>
  
      {/* Box Body */}
      <g>
        <rect x="5" y="28" width="90" height="60" rx="5" fill={"url(#shiny-body-gradient)"} />
        <path d="M 20 40 L 80 40 M 20 50 L 80 50 M 20 60 L 80 60 M 20 70 L 80 70" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" filter="url(#glow)" />
      </g>
      
      <ellipse cx="50" cy="94" rx="40" ry="5" fill="#000000" fillOpacity={0.2} />
    </svg>
  );
  

export * from './icons/fish-badge-icon';
export * from './icons/cardboard-box-icon';
export * from './icons/share-badge-icon';
export * from './icons/message-square-badge-icon';

