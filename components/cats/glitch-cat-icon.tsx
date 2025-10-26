
import { cn } from "@/lib/utils";
import { Cat } from "lucide-react";

export const GlitchCatIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-16 h-16", className)}>
        <Cat className="absolute inset-0 w-full h-full text-cyan-400 opacity-80 animate-glitch-layer-1" />
        <Cat className="absolute inset-0 w-full h-full text-magenta-500 opacity-80 animate-glitch-layer-2" />
        <Cat className="absolute inset-0 w-full h-full text-yellow-300 opacity-80 animate-glitch-layer-3" />
        <Cat className="absolute inset-0 w-full h-full text-white" />
    </div>
);
