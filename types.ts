
export type CelebrationState = 'idle' | 'celebrating' | 'spotlight' | 'finished';
export type DialogTab = 'settings' | 'info';
export type CatOutcome = 'initial' | 'alive' | 'dead' | 'paradox';

export interface CatState {
    outcome: CatOutcome;
    catId?: string;
}
