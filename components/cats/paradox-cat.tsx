
import { cn } from "@/lib/utils";
import { GlitchCatIcon } from "./glitch-cat-icon";


export const ParadoxCatIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative cat-container", className)}>
        <GlitchCatIcon className="w-full h-full" />
    </div>
);
