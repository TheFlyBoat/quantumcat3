
import { type CatState } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { CatDisplay } from './cat-display';
import { Fish } from 'lucide-react';
import { cn } from '@/lib/utils';
import catData from '@/lib/cat-data.json';
import { BoxIcon, ShinyBoxIcon, CardboardBoxIcon } from './icons';

type BoxSkin = 'default' | 'shiny' | 'cardboard';

interface ShareCardProps {
  catState: CatState;
  message: string;
  boxSkin: BoxSkin;
}

const allCats = catData.cats as {id: string, name: string, description: string, type: string, points: number, tagline: string}[];


export function ShareCard({ catState, message, boxSkin }: ShareCardProps) {
    const cat = allCats.find(c => c.id === catState.catId);

    const gradients: Record<string, string> = {
        'Alive': 'from-green-100 via-green-50 to-background',
        'Dead': 'from-red-100 via-red-50 to-background',
        'Paradox': 'from-purple-100 via-purple-50 to-background',
        'initial': 'from-gray-100 to-gray-200',
    };

    const gradientClass = cat ? gradients[cat.type] || gradients.initial : gradients.initial;
    const hashtag = cat ? `#${cat.type.toLowerCase()}cat` : '#thequantumcat';

    let BoxComponent;
    switch (boxSkin) {
        case 'shiny':
        BoxComponent = ShinyBoxIcon;
        break;
        case 'cardboard':
        BoxComponent = CardboardBoxIcon;
        break;
        default:
        BoxComponent = BoxIcon;
        break;
    }

    const catName = cat?.name || "A Cat Appeared!";
    const title = catName.startsWith("The") ? catName : `The ${catName}`;


  return (
    <Card 
        className={cn(
            "w-full h-full relative overflow-hidden flex flex-col p-6 text-center shadow-2xl bg-gradient-to-br",
            gradientClass
        )}
    >
        <div className="flex flex-col items-center justify-around h-full w-full space-y-4">
            {/* Header */}
            <div className="w-full flex flex-col items-center text-foreground/80 space-y-2">
                <Fish className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-3xl font-bold tracking-tight">{title}</h3>
            </div>
            
            {/* Main Content: Box and Cat */}
            <div className="flex-shrink-0 flex items-center justify-center w-full">
                <div className="relative w-48 h-48">
                    <BoxComponent className="w-full h-full" isOpen={true} />
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="w-full h-full scale-[0.6] translate-y-[25%]">
                            <CatDisplay state={catState} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className="w-full">
                <div className="bg-black/5 rounded-lg p-3 min-h-[6rem] flex items-center justify-center">
                    <p className="font-body text-lg leading-tight text-primary">{message}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-foreground/40 font-sans pt-2">
                thequantumcat.app {hashtag}
            </div>
        </div>
    </Card>
  );
}
