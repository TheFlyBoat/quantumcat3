
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { GingerCatIcon } from "./ginger-cat";

const GLITCH_STYLES = `
    .glitch-cat {
        position: relative;
        display: inline-block;
        isolation: isolate;
    }

    .glitch-cat svg {
        width: 100%;
        height: 100%;
    }

    .glitch-cat .glitch-base {
        position: relative;
        z-index: 1;
        height: 100%;
        animation: glitch-color-cycle 7s infinite linear;
        filter: hue-rotate(0deg) saturate(1.2);
    }

    .glitch-cat .glitch-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        mix-blend-mode: screen;
        opacity: 0.65;
        height: 100%;
    }

    .glitch-cat .glitch-layer-1 {
        filter: hue-rotate(35deg) saturate(1.4);
        animation:
            glitch-shift-one 2.4s infinite steps(2, end),
            glitch-color-cycle 6s infinite linear;
    }

    .glitch-cat .glitch-layer-2 {
        filter: hue-rotate(-45deg) saturate(1.4);
        animation:
            glitch-shift-two 2.1s infinite steps(3, end),
            glitch-color-cycle 6.8s infinite linear reverse;
    }

    .glitch-cat .glitch-layer-3 {
        filter: hue-rotate(180deg) saturate(1.1);
        opacity: 0.4;
        animation: glitch-shift-three 1.8s infinite steps(2, end), glitch-color-cycle 5.5s infinite linear reverse;
    }

    .glitch-cat::after {
        content: "";
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.08) 0,
            rgba(255, 255, 255, 0.08) 2px,
            transparent 2px,
            transparent 6px
        );
        mix-blend-mode: overlay;
        opacity: 0.3;
        animation: glitch-scanline 4s linear infinite;
    }

    @keyframes glitch-color-cycle {
        0% { filter: hue-rotate(0deg) saturate(1.2); }
        25% { filter: hue-rotate(80deg) saturate(1.4); }
        50% { filter: hue-rotate(160deg) saturate(1.25); }
        75% { filter: hue-rotate(240deg) saturate(1.5); }
        100% { filter: hue-rotate(360deg) saturate(1.2); }
    }

    @keyframes glitch-shift-one {
        0%, 100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
        10% { transform: translate(-1.8%, -0.6%); clip-path: inset(0 0 62% 0); }
        20% { transform: translate(1.2%, 0.8%); clip-path: inset(42% 0 0 0); }
        30% { transform: translate(-0.8%, 0.2%); clip-path: inset(18% 0 24% 0); }
        50% { transform: translate(1.4%, -0.9%); clip-path: inset(30% 0 12% 0); }
        70% { transform: translate(-1%, 0.6%); clip-path: inset(8% 0 40% 0); }
    }

    @keyframes glitch-shift-two {
        0%, 100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
        15% { transform: translate(1.6%, 0.4%); clip-path: inset(12% 0 48% 0); }
        35% { transform: translate(-1.4%, -0.6%); clip-path: inset(54% 0 0 0); }
        55% { transform: translate(1.1%, 1%); clip-path: inset(22% 0 36% 0); }
        80% { transform: translate(-1.2%, -0.4%); clip-path: inset(0 0 58% 0); }
    }

    @keyframes glitch-shift-three {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(-0.8%, 0.6%); }
        45% { transform: translate(0.9%, -0.7%); }
        65% { transform: translate(-0.5%, 0.4%); }
        88% { transform: translate(0.6%, -0.3%); }
    }

    @keyframes glitch-scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
    }
`;

const GingerLayer = ({ className }: { className?: string }) => (
    <div className={cn(className)}>
        <GingerCatIcon className="w-full h-full" />
    </div>
);

export const GlitchCatIcon = ({ className }: { className?: string }) => (
    <div className={cn("glitch-cat", className)}>
        <style>{GLITCH_STYLES}</style>
        <GingerLayer className="glitch-base" />
        <GingerLayer className="glitch-layer glitch-layer-1" />
        <GingerLayer className="glitch-layer glitch-layer-2" />
        <GingerLayer className="glitch-layer glitch-layer-3" />
=======
import { Cat } from "lucide-react";

export const GlitchCatIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-16 h-16", className)}>
        <Cat className="absolute inset-0 w-full h-full text-cyan-400 opacity-80 animate-glitch-layer-1" />
        <Cat className="absolute inset-0 w-full h-full text-magenta-500 opacity-80 animate-glitch-layer-2" />
        <Cat className="absolute inset-0 w-full h-full text-yellow-300 opacity-80 animate-glitch-layer-3" />
        <Cat className="absolute inset-0 w-full h-full text-white" />
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    </div>
);
