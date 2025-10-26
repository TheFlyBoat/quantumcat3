
'use client';

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CelebrationCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const CelebrationCard = ({ title, description, icon }: CelebrationCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * 360;
            const radius = Math.random() * 150 + 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.setProperty('--tx', `${x}px`);
            particle.style.setProperty('--ty', `${y}px`);

            card.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        };

        const interval = setInterval(createParticle, 50);

        return () => clearInterval(interval);
    }, []);


    return (
        <div 
            ref={cardRef}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center",
                "animate-celebration-in"
            )}
        >
            <div className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-secondary/50 to-background p-8 shadow-2xl">
                 {icon}
                 <h2 className="text-3xl font-headline font-bold text-foreground text-center">{title}</h2>
                 <p className="text-muted-foreground text-center">{description}</p>
            </div>
        </div>
    );
};

    