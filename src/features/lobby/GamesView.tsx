import { useState } from 'react';
import { GameIcon, type IconName } from '../../components/common/GameIcon';
import styles from './GamesView.module.css';

type GameCategory = 'all' | 'card' | 'dice' | 'other';

interface GameListItem {
  id: string;
  name: string;
  category: Exclude<GameCategory, 'all'>;
  icon: IconName;
  minimumBet?: number;
}

const categories: ReadonlyArray<{ id: GameCategory; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'card', label: '카드' },
  { id: 'dice', label: '주사위' },
  { id: 'other', label: '기타' },
];

const games: ReadonlyArray<GameListItem> = [
  { id: 'highlow', name: '하이로우', category: 'card', icon: 'cards', minimumBet: 20 },
  { id: 'dice-odd-even', name: '주사위 홀짝', category: 'dice', icon: 'dice', minimumBet: 20 },
  { id: 'roulette', name: '룰렛', category: 'other', icon: 'roulette' },
  { id: 'blackjack', name: '블랙잭', category: 'card', icon: 'cards' },
];

export function GamesView() {
  const [category, setCategory] = useState<GameCategory>('all');
  const visibleGames = category === 'all' ? games : games.filter((game) => game.category === category);

  return (
    <section className={styles.section} aria-labelledby="games-heading">
      <h1 id="games-heading">게임장</h1>
      <div className={styles.categories} aria-label="게임 종류">
        {categories.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={category === option.id}
            className={styles.categoryButton}
            onClick={() => setCategory(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <ul className={styles.gameList} aria-label="미니게임 목록">
        {visibleGames.map((game) => (
          <li className={styles.gameRow} key={game.id}>
            <span className={styles.gameIcon}><GameIcon name={game.icon} size={22} /></span>
            <div className={styles.gameInfo}>
              <strong>{game.name}</strong>
              {game.minimumBet !== undefined && <span>최소 베팅 {game.minimumBet} C</span>}
            </div>
            <span className={styles.gameStatus}>준비 중</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
