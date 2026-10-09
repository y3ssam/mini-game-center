import type { IconName } from '../../components/common/GameIcon';

export type PageId = 'games' | 'jobs' | 'draw' | 'collection';

export const PAGES: ReadonlyArray<{ id: PageId; label: string; icon: IconName }> = [
  { id: 'games', label: '게임장', icon: 'gamepad' },
  { id: 'jobs', label: '알바', icon: 'briefcase' },
  { id: 'draw', label: '뽑기', icon: 'gift' },
  { id: 'collection', label: '도감', icon: 'book' },
];
