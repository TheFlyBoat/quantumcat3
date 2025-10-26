
import { cn } from "@/lib/utils";

export const FishBadgeIcon = ({ className }: { className?: string }) => (
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

            {/* Fish Icon */}
            <g transform="translate(25, 25) scale(0.5)">
                <path d="M 50,20 C 70,20 80,35 80,50 C 80,65 70,80 50,80 C 30,80 20,65 20,50 C 20,35 30,20 50,20 Z" fill="hsl(var(--background))" />
                <path d="M 80,50 L 95,35 L 95,65 Z" fill="hsl(var(--background))" />
                <circle cx="55" cy="45" r="3" fill="hsl(var(--primary-foreground))" />
            </g>
        </g>
    </svg>
);
