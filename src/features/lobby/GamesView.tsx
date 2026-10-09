import { useState } from 'react';
import { GameArtwork, type ArtworkKind } from '../../components/common/GameArtwork';
import { GameIcon } from '../../components/common/GameIcon';
import styles from './GamesView.module.css';

type Category = 'all' | 'card' | 'dice' | 'other';
type Preview = 'dice' | 'highlow';
type Game = { id: ArtworkKind; name: string; category: Exclude<Category, 'all'>; caption: string; demo: boolean };
const categories: { id: Category; label: string }[] = [
  { id: 'all', label: '전체' }, { id: 'card', label: '카드' },
  { id: 'dice', label: '주사위' }, { id: 'other', label: '기타' },
];
const games: Game[] = [
  { id: 'dice', name: '주사위 홀짝', category: 'dice', caption: '두 주사위의 합계 예측', demo: true },
  { id: 'highlow', name: '하이로우', category: 'card', caption: '다음 카드의 숫자 예측', demo: true },
  { id: 'roulette', name: '룰렛', category: 'other', caption: '색상·숫자 베팅', demo: false },
  { id: 'blackjack', name: '블랙잭', category: 'card', caption: '딜러와 21에 가깝게', demo: false },
];

const pips: Record<number, number[]> = {
  1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8],
};

function Die({ value }: { value: number }) {
  return <div className={styles.die} role="img" aria-label={'주사위 ' + value}>
    {Array.from({ length: 9 }, (_, i) => <span key={i} className={pips[value].includes(i) ? styles.pip : styles.emptyPip} />)}
  </div>;
}

function rankLabel(value: number): string {
  return ({ 1: 'A', 11: 'J', 12: 'Q', 13: 'K' } as Record<number, string>)[value] ?? String(value);
}

function PreviewScreen({ kind, back }: { kind: Preview; back: () => void }) {
  const [amount, setAmount] = useState(100);
  const [dice, setDice] = useState<[number, number]>([3, 5]);
  const [rank, setRank] = useState(8);
  const [next, setNext] = useState<number | null>(null);
  const [guess, setGuess] = useState<'odd' | 'even' | 'higher' | 'lower' | null>(null);
  const [rules, setRules] = useState(false);
  const isDice = kind === 'dice';
  const total = dice[0] + dice[1];
  const won = isDice
    ? (guess === 'odd' && total % 2 === 1) || (guess === 'even' && total % 2 === 0)
    : next !== null && ((guess === 'higher' && next > rank) || (guess === 'lower' && next < rank));

  function choose(pick: 'odd' | 'even' | 'higher' | 'lower') {
    if (guess !== null) return;
    if (isDice) setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
    else setNext(Math.floor(Math.random() * 13) + 1);
    setGuess(pick);
  }
  function reset() {
    setGuess(null);
    setNext(null);
    if (!isDice) setRank(Math.floor(Math.random() * 11) + 2);
  }

  return <section className={styles.preview}>
    <div className={styles.previewHeader}>
      <button type="button" className={styles.backButton} onClick={back}><GameIcon name="back" /> 목록</button>
      <h1>{isDice ? '주사위 홀짝' : '하이로우'}</h1>
      <span className={styles.demoTag}>UI 체험</span>
    </div>
    <div className={styles.playLayout}>
      <div className={styles.scene}>
        <GameArtwork kind={kind} className={styles.sceneArt} />
        <div className={styles.sceneContent}>
          <span className={styles.eyebrow}>{isDice ? 'DICE' : 'HIGH / LOW'}</span>
          {isDice ? <div className={styles.dicePair}><Die value={dice[0]} /><Die value={dice[1]} /></div>
            : <div className={styles.cardPair}>
              <div className={styles.card}><small>현재</small><strong>{rankLabel(rank)}</strong><b>♥</b></div>
              <div className={next === null ? styles.cardBack : styles.card}><small>다음</small><strong>{next === null ? '?' : rankLabel(next)}</strong><b>{next === null ? '' : '♠'}</b></div>
            </div>}
          <div className={styles.result} aria-live="polite" role="status">
            {guess === null
              ? (isDice ? '합계가 홀수일까, 짝수일까?' : '다음 카드가 높을까, 낮을까?')
              : <><strong>{!isDice && next === rank ? '동률 · 무승부' : won ? '예측 적중' : '예측 실패'}</strong>
                <small>{isDice ? '합계 ' + total + ' · ' + (total % 2 ? '홀수' : '짝수') : rankLabel(rank) + ' → ' + rankLabel(next!)}</small></>}
          </div>
        </div>
      </div>
      <aside className={styles.controls}>
        <div className={styles.controlTitle}><h2>조작 체험</h2><p>실제 코인은 차감되거나 지급되지 않습니다.</p></div>
        <label className={styles.betLabel}>베팅 금액 예시</label>
        <div className={styles.stepper}>
          <button type="button" aria-label="베팅 금액 줄이기" disabled={amount <= 20 || guess !== null} onClick={() => setAmount(v => Math.max(20, v - 20))}>−</button>
          <output>{amount} C</output>
          <button type="button" aria-label="베팅 금액 늘리기" disabled={amount >= 200 || guess !== null} onClick={() => setAmount(v => Math.min(200, v + 20))}>+</button>
        </div>
        {guess === null
          ? <div className={styles.choiceRow}>
              {isDice ? <>
                <button type="button" onClick={() => choose('odd')}>홀수 선택</button>
                <button type="button" onClick={() => choose('even')}>짝수 선택</button>
              </> : <>
                <button type="button" disabled={rank === 13} onClick={() => choose('higher')}>▲ 높음</button>
                <button type="button" disabled={rank === 1} onClick={() => choose('lower')}>▼ 낮음</button>
              </>}
            </div>
          : <button className={styles.retry} type="button" onClick={reset}>다시 체험하기</button>}
        <button type="button" className={styles.rulesToggle} aria-expanded={rules} onClick={() => setRules(!rules)}>규칙 보기 <GameIcon name="chevron" size={16} /></button>
        {rules && <p className={styles.rules}>{isDice
          ? '두 개의 주사위 합계가 홀수인지 짝수인지 예측합니다. 실제 게임 배당은 베팅액 포함 1.9배입니다.'
          : '다음 카드가 높을지 낮을지 선택합니다. 동률은 무승부이며 카드별 배당은 추후 확정합니다.'}</p>}
        <p className={styles.disclaimer}>조작 위치를 확인하기 위한 시안입니다. 실제 베팅·보상·저장은 연결되지 않았습니다.</p>
      </aside>
    </div>
  </section>;
}

export function GamesView({ onPreviewChange }: { onPreviewChange: (active: boolean) => void }) {
  const [category, setCategory] = useState<Category>('all');
  const [selected, setSelected] = useState<Preview | null>(null);
  function enter(game: Preview) { setSelected(game); onPreviewChange(true); }
  function back() { setSelected(null); onPreviewChange(false); }

  if (selected) return <PreviewScreen key={selected} kind={selected} back={back} />;

  return <section className={styles.section} aria-labelledby="games-heading">
    <div className={styles.heading}><h1 id="games-heading">게임장</h1><span>게임 화면 시안 2종</span></div>
    <div className={styles.filters} aria-label="게임 종류">
      {categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id}
        onClick={() => setCategory(item.id)}>{item.label}</button>)}
    </div>
    <div className={styles.grid}>
      {games.filter(item => category === 'all' || item.category === category).map(game =>
        <article className={styles.tile} key={game.id}>
          <div className={styles.art}><GameArtwork kind={game.id} /></div>
          <div className={styles.tileBody}>
            <div className={styles.tileHeading}><h2>{game.name}</h2><span>{game.demo ? '체험 가능' : '준비 중'}</span></div>
            <p>{game.caption}</p>
            <div className={styles.tileFoot}>
              <span>{game.demo ? '베팅 20–200 C' : '추후 추가'}</span>
              {game.demo
                ? <button type="button" aria-label={game.name + ' 화면 체험'} onClick={() => enter(game.id as Preview)}>화면 체험 <GameIcon name="chevron" size={16} /></button>
                : <span>미구현</span>}
            </div>
          </div>
        </article>)}
    </div>
  </section>;
}
