import { useState } from 'react';
import { GameArtwork } from '../../components/common/GameArtwork';
import styles from '../shared/FeaturePage.module.css';

type Filter = 'all' | 'plush' | 'goods';
export function CollectionView() {
  const [filter, setFilter] = useState<Filter>('all');
  return <section className={styles.section} aria-labelledby="collection-heading">
    <header className={styles.heading}><h1 id="collection-heading">도감</h1><span className={styles.stageLabel}>화면 시안</span></header>
    <div className={styles.selector} aria-label="수집품 종류">
      {([{ id: 'all', label: '전체' }, { id: 'plush', label: '인형' }, { id: 'goods', label: '굿즈' }] as const).map(item =>
        <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
    </div>
    <div className={styles.split}>
      <div className={styles.scene}><GameArtwork kind="collection"/></div>
      <div className={styles.panel}>
        <h2>{filter === 'all' ? '전체 수집품' : filter === 'plush' ? '인형 도감' : '굿즈 도감'}</h2>
        <div className={styles.metric}><span>획득한 종류</span><strong>—</strong></div>
        <div className={styles.metric}><span>등록된 시리즈</span><strong>—</strong></div>
        <div className={styles.emptyCollection}>
          <strong>수집품 데이터 준비 중</strong>
          <p>획득한 아이템, 보유 수량과 수집률은 컬렉션 시스템 구현 후 이곳에 표시됩니다.</p>
        </div>
      </div>
    </div>
  </section>;
}
