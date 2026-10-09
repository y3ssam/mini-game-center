import type { ReactNode } from 'react';

export type IconName =
  | 'gamepad' | 'briefcase' | 'gift' | 'book' | 'coins' | 'settings'
  | 'cards' | 'dice' | 'roulette' | 'back' | 'chevron' | 'clock'
  | 'close';

const shapes: Record<IconName, ReactNode> = {
  gamepad: <><rect x="3" y="7" width="18" height="11" rx="4" /><path d="M8 10v5M5.5 12.5h5" /><circle cx="15.5" cy="11.5" r=".8" fill="currentColor" stroke="none" /><circle cx="18" cy="14" r=".8" fill="currentColor" stroke="none" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  gift: <><rect x="3" y="10" width="18" height="11" rx="1" /><path d="M2 7h20v3H2zM12 7v14M12 7c-5 0-7-2-6-4 2-3 6 0 6 4Zm0 0c5 0 7-2 6-4-2-3-6 0-6 4Z" /></>,
  book: <><path d="M12 6c-2-2-5-2-9-2v15c4 0 7 0 9 2 2-2 5-2 9-2V4c-4 0-7 0-9 2Zm0 0v15" /></>,
  coins: <><ellipse cx="8" cy="7" rx="5" ry="3" /><path d="M3 7v4c0 1.7 2.2 3 5 3m-5-3v4c0 1.7 2.2 3 5 3M13 7v2" /><ellipse cx="16" cy="14" rx="5" ry="3" /><path d="M11 14v4c0 1.7 2.2 3 5 3s5-1.3 5-3v-4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m10 2-.4 2.2-2 .8-1.9-1.3-2.4 2.4L4.6 8l-.8 2-2.2.4v3.2l2.2.4.8 2-1.3 1.9 2.4 2.4L7.6 19l2 .8.4 2.2h3.2l.4-2.2 2-.8 1.9 1.3 2.4-2.4-1.3-1.9.8-2 2.2-.4v-3.2l-2.2-.4-.8-2 1.3-1.9-2.4-2.4L15.6 5l-2-.8L13.2 2Z" transform="translate(.4 0) scale(.97)" /></>,
  cards: <><rect x="5" y="4" width="12" height="16" rx="2" /><path d="m8 8 3-2 3 2-3 2-3-2Zm9-1 2 1v11a2 2 0 0 1-2 2h-8" /></>,
  dice: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" /></>,
  roulette: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="M12 3v7m0 4v7M3 12h7m4 0h7M6 6l4.5 4.5m3 3L18 18M18 6l-4.5 4.5m-3 3L6 18" /></>,
  back: <><path d="m14 5-7 7 7 7M8 12h13" /></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></>,
  close: <path d="M5 5l14 14M19 5 5 19" />,
};

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export function GameIcon({ name, size = 20, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
