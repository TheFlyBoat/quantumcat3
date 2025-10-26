
'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SettingsPanel } from './settings-panel';
import { InfoPanel } from './info-panel';


type DialogTab = 'settings' | 'info';

interface ControlPanelProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    activeTab: DialogTab;
    onTabChange: (tab: DialogTab) => void;
}

export function ControlPanel({ isOpen, onOpenChange, activeTab, onTabChange }: ControlPanelProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80svh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Control Panel</DialogTitle>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as DialogTab)} className="w-full flex-grow flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="info">Info</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="flex-grow mt-4 -mr-6 pr-6">
                        <TabsContent value="settings">
                            <SettingsPanel />
                        </TabsContent>
                        <TabsContent value="info">
                            <InfoPanel />
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
