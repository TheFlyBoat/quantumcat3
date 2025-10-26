
'use client';

import { type CatState } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Fish } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';

interface MessageDisplayProps {
  message: string;
  catState: CatState;
}

const LoadingFishes = () => {
    const [fishCount, setFishCount] = useState(1);
    const colors = ['text-accent/40', 'text-accent/60', 'text-accent/80', 'text-accent'];

    useEffect(() => {
        const interval = setInterval(() => {
            setFishCount(prevCount => (prevCount % 4) + 1);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Fish
                    key={i}
                    className={`h-5 w-5 ${colors[i]} transition-opacity duration-300`}
                    style={{ opacity: i < fishCount ? 1 : 0 }}
                />
            ))}
        </div>
    );
};


export function MessageDisplay({ message, catState }: MessageDisplayProps) {
  const { reduceMotion } = useSound();

  useEffect(() => {
    if (message) {
      if (catState.outcome === 'alive') {
        playSound('message-alive');
      } else if (catState.outcome === 'dead') {
        playSound('message-dead');
      } else {
        playSound('message-default');
      }
    }
  }, [message, catState.outcome]);
  
  if (catState.outcome === 'initial') {
    return <div className="h-8" />;
  }

  if (!message) {
    return (
      <div className="flex items-center justify-center h-8">
        <LoadingFishes />
      </div>
    );
  }

  const sentences = message.split('.').filter(sentence => sentence.trim().length > 0);

  return (
    <div className={cn("w-full max-w-2xl", !reduceMotion && "animate-bounce-in")}>
      <div className="rounded-xl p-3">
        <div className={`font-body text-lg text-center text-primary`}>
            {sentences.map((sentence, index) => (
                <div key={index}>{sentence}.</div>
            ))}
        </div>
      </div>
    </div>
  );
}

