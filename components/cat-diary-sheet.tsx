
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDiary } from "@/context/diary-context";
import { Eye } from "lucide-react";

interface CatDiarySheetProps {
    cat: {
        id: string;
        name: string;
        description: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CatDiarySheet({ cat, open, onOpenChange }: CatDiarySheetProps) {
    const { getDiary, getRevealCount } = useDiary();
    const diaryEntries = getDiary(cat.id);
    const revealCount = getRevealCount(cat.id);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <span>{cat.name}'s Diary</span>
                        <Badge variant="secondary" className="flex items-center gap-1.5">
                           <Eye className="w-4 h-4" />
                           {revealCount}
                        </Badge>
                    </SheetTitle>
                    <SheetDescription>{cat.description}</SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-grow pr-4 -mr-6">
                    <div className="space-y-4">
                        {diaryEntries.length > 0 ? (
                             diaryEntries.map((entry, index) => (
                                <div key={index} className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground italic">
                                    "{entry}"
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-8">No messages recorded for this cat yet.</p>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
