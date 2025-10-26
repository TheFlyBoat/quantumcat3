
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import badgeData from '@/lib/badge-data.json';
import { useBadges } from '@/context/badge-context';
<<<<<<< HEAD
import { BadgeCard } from '@/components/badge-card';
import { badgeImageMap, defaultBadgeImage } from '@/lib/badge-images';
=======
import { FishBadgeIcon, ShareBadgeIcon, MessageSquareBadgeIcon } from '@/components/icons';
import { BadgeCard } from '@/components/badge-card';

const badgeComponentMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'FishBadgeIcon': FishBadgeIcon,
    'ShareBadgeIcon': ShareBadgeIcon,
    'MessageSquareBadgeIcon': MessageSquareBadgeIcon,
};
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

export default function AwardsPage() {
    const badges = badgeData.badges as {id: string, name: string, description: string, icon: string}[];
    const { isBadgeUnlocked } = useBadges();

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
<<<<<<< HEAD
                    <CardTitle className="font-headline text-3xl text-primary">Badges</CardTitle>
=======
                    <CardTitle className="text-lg">Badges</CardTitle>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {badges.map((badge) => (
                            <BadgeCard
                                key={badge.id}
                                badge={badge}
                                unlocked={isBadgeUnlocked(badge.id)}
<<<<<<< HEAD
                                badgeImage={badgeImageMap[badge.id] ?? defaultBadgeImage}
=======
                                BadgeComponent={badgeComponentMap[badge.icon]}
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
