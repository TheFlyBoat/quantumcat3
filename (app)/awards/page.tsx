
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import badgeData from '@/lib/badge-data.json';
import { useBadges } from '@/context/badge-context';
import { FishBadgeIcon, ShareBadgeIcon, MessageSquareBadgeIcon } from '@/components/icons';
import { BadgeCard } from '@/components/badge-card';

const badgeComponentMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'FishBadgeIcon': FishBadgeIcon,
    'ShareBadgeIcon': ShareBadgeIcon,
    'MessageSquareBadgeIcon': MessageSquareBadgeIcon,
};

export default function AwardsPage() {
    const badges = badgeData.badges as {id: string, name: string, description: string, icon: string}[];
    const { isBadgeUnlocked } = useBadges();

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Badges</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {badges.map((badge) => (
                            <BadgeCard
                                key={badge.id}
                                badge={badge}
                                unlocked={isBadgeUnlocked(badge.id)}
                                BadgeComponent={badgeComponentMap[badge.icon]}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
