
import { Award } from 'lucide-react';
import { FishBadgeIcon, ShareBadgeIcon, MessageSquareBadgeIcon } from '@/components/icons';

export const badgeComponentMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'FishBadgeIcon': FishBadgeIcon,
    'ShareBadgeIcon': ShareBadgeIcon,
    'MessageSquareBadgeIcon': MessageSquareBadgeIcon,
    'default': Award,
};
