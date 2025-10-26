
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Info, GitCommit, MessageSquare, Heart, Cat, Fish, Bolt, BoxIcon, Share2, User, Shield } from 'lucide-react';
import badgeData from '@/lib/badge-data.json';
import { playSound } from '@/lib/audio';

export function InfoPanel() {
    return (
        <div className="space-y-2">
            <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="w-full justify-start gap-2" onClick={() => playSound('click-2')}><HelpCircle />How to Play</Button></DialogTrigger>
                <DialogContent className="max-h-[80svh] flex flex-col">
                    <DialogHeader><DialogTitle>How to Play</DialogTitle></DialogHeader>
                    <Tabs defaultValue="basics" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basics">Basics</TabsTrigger>
                            <TabsTrigger value="collectibles">Collect</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                        </TabsList>
                        <ScrollArea className="h-96 w-full">
                            <TabsContent value="basics" className="text-sm text-muted-foreground text-left p-1">
                                <div className="space-y-4">
                                    <p className="font-bold text-center text-foreground">Simply tap the box to open it!</p>
                                    <p>Each observation collapses the quantum superposition, revealing a cat that is either <span className="font-bold text-green-500">Alive</span>, <span className="font-bold text-red-500">Dead</span>, or a strange <span className="font-bold text-purple-500">Paradox</span>. Each reveal also comes with a unique message from a feline oracle.</p>
                                    <div className="flex items-start gap-3"><Heart className="w-5 h-5 mt-0.5 shrink-0 text-red-500" /><div><h4 className="font-bold text-foreground">Saving Messages</h4><p>Like a message? Tap the heart icon to save it to that cat's personal diary forever.</p></div></div>
                                    <div className="flex items-start gap-3"><Cat className="w-5 h-5 mt-0.5 shrink-0 text-gray-500" /><div><h4 className="font-bold text-foreground">Gallery & Diary</h4><p>View all your collected cats and read their saved messages in their diary. Access it from the home screen.</p></div></div>
                                    <p className="font-bold text-center text-foreground pt-2">Collect them all and discover the secrets of the box!</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="collectibles" className="text-sm text-muted-foreground text-left p-1">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-foreground flex items-center gap-2"><Fish className="w-5 h-5 shrink-0 text-blue-500" />Fish Points</h4>
                                        <p>Earn Fish Points for each cat you reveal. Rarer cats are worth more! You also get 10 Fish Points for every discovery you share.</p>
                                        <Card>
                                            <CardContent className="p-2 text-xs space-y-1">
                                                <p><span className="font-bold text-green-500">Alive</span> cats are worth <span className="font-bold">1</span> Fish Point.</p>
                                                <p><span className="font-bold text-red-500">Dead</span> cats are worth <span className="font-bold">2</span> Fish Points.</p>
                                                <p><span className="font-bold text-purple-500">Paradox</span> cats are worth <span className="font-bold">5</span> Fish Points.</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-foreground flex items-center gap-2"><Award className="w-5 h-5 shrink-0 text-yellow-500" />Badges</h4>
                                        <p>Unlock special badges by reaching milestones. Here's how:</p>
                                        <Card>
                                            <CardContent className="p-2">
                                                <ul className="space-y-2">
                                                    {badgeData.badges.map(badge => (
                                                        <li key={badge.id} className="flex items-start gap-2 text-xs">
                                                            <Shield className="w-4 h-4 mt-0.5 shrink-0" />
                                                            <div>
                                                                <span className="font-bold">{badge.name}</span>: <span className="text-muted-foreground">{badge.description}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="features" className="text-sm text-muted-foreground text-left p-1">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3"><Bolt className="w-5 h-5 mt-0.5 shrink-0 text-red-500" /><div><h4 className="font-bold text-foreground">Streaks</h4><p>Observe a cat once per day to build up your daily streak.</p></div></div>
                                    <div className="flex items-start gap-3"><BoxIcon className="w-5 h-5 mt-0.5 shrink-0" /><div><h4 className="font-bold text-foreground">Box Skins</h4><p>Customize the look of your quantum box. New skins can be unlocked and selected in the Gallery.</p></div></div>
                                    <div className="flex items-start gap-3"><Share2 className="w-5 h-5 mt-0.5 shrink-0" /><div><h4 className="font-bold text-foreground">Sharing</h4><p>Share your cat discoveries with your friends! Each reveal generates a unique, beautiful card perfect for social media.</p></div></div>
                                    <div className="flex items-start gap-3"><User className="w-5 h-5 mt-0.5 shrink-0" /><div><h4 className="font-bold text-foreground">Accounts</h4><p>Sign in to save your progress across devices. Guests' progress is saved only on their current browser.</p></div></div>
                                </div>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="w-full justify-start gap-2" onClick={() => playSound('click-2')}><Info />About</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>About The Quantum Cat</DialogTitle></DialogHeader><div className="space-y-2 text-sm text-muted-foreground"><p>Version 2.0.4</p><p>This app is a playful exploration of the famous Schrödinger's Cat thought experiment.</p><p>What state will your cat be in?</p></div></DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="w-full justify-start gap-2" onClick={() => playSound('click-2')}><GitCommit />Credits</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Credits</DialogTitle></DialogHeader><div className="space-y-2 text-sm text-muted-foreground"><p>FlyBoat Creative 2025</p></div></DialogContent>
            </Dialog>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="mailto:hello@thequantumcat.app?subject=Quantum%20Cat%20Feedback"><MessageSquare />Send Feedback</a>
            </Button>
        </div>
    );
}
