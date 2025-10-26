
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

export const ShareBadgeIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={cn(className)}
    >
        <g>
            {/* Shield Shape */}
            <path d="M10 10 H90 L90 50 C90 80, 50 100, 10 50 Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="3"/>
            
            {/* Inner Shield Accent */}
            <path d="M15 15 H85 L85 50 C85 75, 50 92, 15 50 Z" fill="hsl(var(--accent))" />

            {/* Share Icon */}
            <g transform="translate(25, 25) scale(2.5)">
                <Share2 stroke="hsl(var(--background))" />
            </g>
        </g>
    </svg>
);
