
'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { useSound } from '@/context/sound-context';
import { useTheme } from 'next-themes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { User, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { playSound } from '@/lib/audio';

export function SettingsPanel() {
    const { user } = useAuth();
    const { soundEnabled, setSoundEnabled, volume, setVolume, reduceMotion, setReduceMotion } = useSound();
    const { theme, setTheme } = useTheme();
    const userEmail = (user && user !== 'guest' && user.email) ? user.email : null;

    const handleSoundToggle = (checked: boolean) => {
        playSound(checked ? 'toggle-on' : 'toggle-off');
        setSoundEnabled(checked);
    };

    const handleThemeToggle = (checked: boolean) => {
        playSound(checked ? 'toggle-on' : 'toggle-off');
        setTheme(checked ? 'dark' : 'light');
    };

    const handleMotionToggle = (checked: boolean) => {
        playSound(checked ? 'toggle-on' : 'toggle-off');
        setReduceMotion(checked);
    };

    return (
        <div className="space-y-6">
            {userEmail && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><User /> Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm">
                            <span className="text-muted-foreground">{userEmail}</span>
                        </div>
                    </CardContent>
                </Card>
            )}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Volume2 /> Audio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="sound-toggle" className="flex items-center gap-2 cursor-pointer">
                            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                            <span>Sound Effects</span>
                        </Label>
                        <Switch
                            id="sound-toggle"
                            checked={soundEnabled}
                            onCheckedChange={handleSoundToggle}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="volume-slider" className="flex items-center gap-2 cursor-pointer">
                            <span>Volume</span>
                        </Label>
                        <Slider
                            id="volume-slider"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[volume]}
                            onValueChange={(value) => setVolume(value[0])}
                            className="w-24"
                            disabled={!soundEnabled}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><User /> Display & Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="theme-toggle" className="flex items-center gap-2 cursor-pointer">
                            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            <span>Dark Mode</span>
                        </Label>
                        <Switch
                            id="theme-toggle"
                            checked={theme === 'dark'}
                            onCheckedChange={handleThemeToggle}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="reduce-motion-toggle" className="flex items-center gap-2 cursor-pointer">
                            <User className="w-5 h-5" />
                            <span>Reduce Motion</span>
                        </Label>
                        <Switch
                            id="reduce-motion-toggle"
                            checked={reduceMotion}
                            onCheckedChange={handleMotionToggle}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
