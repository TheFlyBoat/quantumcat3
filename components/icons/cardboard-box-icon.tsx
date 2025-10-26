
import { cn } from "@/lib/utils";

export const CardboardBoxIcon = ({ className, isOpen }: { className?: string, isOpen?: boolean }) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <defs>
      <linearGradient id="cardboard-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BEA488" />
        <stop offset="100%" stopColor="#A07A5A" />
      </linearGradient>
       <linearGradient id="cardboard-flap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C9B49A" />
        <stop offset="100%" stopColor="#B38B6A" />
      </linearGradient>
    </defs>
    
    {/* Shadow */}
    <ellipse cx="50" cy="94" rx="40" ry="5" fill="#000000" fillOpacity={0.15} />

    {/* Box Body */}
    <g>
      <rect x="5" y="38" width="90" height="50" rx="2" fill="url(#cardboard-gradient)" />
      {/* Tape */}
      <path d="M 5,63 L 95,63" stroke="#D2B48C" strokeWidth="12" strokeOpacity="0.6"/>
      {/* Fragile Symbol */}
      <g transform="translate(68 45) scale(0.15)" fill="none" stroke="#A0522D" strokeWidth="6">
         <path d="M60,10 L60,50 L40,50 L40,10" /> 
         <path d="M50,60 A10,10 0 1,1 50,80 A10,10 0 0,1 50,60" />
         <path d="M40,10 C20,10 20,40 40,40 M60,10 C80,10 80,40 60,40" />
      </g>
      {/* This side up symbol */}
       <g transform="translate(18 48) scale(0.12)" fill="none" stroke="#A0522D" strokeWidth="8">
            <path d="M30 60 L50 40 L70 60" />
            <path d="M30 75 L50 55 L70 75" />
            <path d="M20 85 L80 85" />
      </g>
       {/* Hazard Symbol */}
        <g transform="translate(40 68) scale(0.2)" fill="#A0522D">
            <path d="M50 10 A 40 40 0 0 1 84.6 30 L 67.3 30 A 20 20 0 0 0 50 10 Z" transform="rotate(0 50 50)" />
            <path d="M50 10 A 40 40 0 0 1 84.6 30 L 67.3 30 A 20 20 0 0 0 50 10 Z" transform="rotate(120 50 50)" />
            <path d="M50 10 A 40 40 0 0 1 84.6 30 L 67.3 30 A 20 20 0 0 0 50 10 Z" transform="rotate(240 50 50)" />
            <circle cx="50" cy="50" r="8" />
      </g>
    </g>

    {/* Lid Flaps */}
    <g className={cn("transition-transform duration-300", !isOpen && "group-hover:-translate-y-1")}>
        {/* Back Flap */}
        <rect x="5" y="28" width="90" height="10" fill="url(#cardboard-flap-gradient)" stroke="#A07A5A" strokeWidth="1" />
        
        {/* Left Flap */}
        <path d={cn(
            "M 5,38 h 45 v -10 h -45 Z",
            isOpen ? "transition-transform duration-500 origin-top-left rotate-[-105deg] translate-x-1" : ""
            )} fill="url(#cardboard-flap-gradient)" stroke="#A07A5A" strokeWidth="1" />

        {/* Right Flap */}
        <path d={cn(
            "M 50,38 h 45 v -10 h -45 Z",
             isOpen ? "transition-transform duration-500 origin-top-right rotate-[105deg] -translate-x-1" : ""
            )} fill="url(#cardboard-flap-gradient)" stroke="#A07A5A" strokeWidth="1" />
    </g>
  </svg>
);
