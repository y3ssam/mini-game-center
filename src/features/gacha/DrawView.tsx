import { useState } from 'react';
import { GameArtwork } from '../../components/common/GameArtwork';
import styles from '../shared/FeaturePage.module.css';

export function DrawView() {
  const [series, setSeries] = useState<'A' | 'B'>('A');

  return <section className={styles.section} aria-labelledby="draw-heading">
    <header className={styles.heading}>
      <h1 id="draw-heading">뽑기</h1>
      <span className={styles.stageLabel}>화면 시안</span>
    </header>
    <div className={styles.split}>
      <div className={styles.scene}><GameArtwork kind="gacha" /></div>
      <div className={styles.panel}>
        <h2>굿즈 가챠</h2>
        <p className={styles.explainer}>시안에서는 코인이 차감되거나 수집품이 지급되지 않습니다.</p>
        <div className={styles.selector} aria-label="가챠 시리즈 선택">
          <button type="button" aria-pressed={series === 'A'} onClick={() => setSeries('A')}>시리즈 A</button>
          <button type="button" aria-pressed={series === 'B'} onClick={() => setSeries('B')}>시리즈 B</button>
        </div>
        <div className={styles.metric}><span>예정 이용료</span><strong>700 C</strong></div>
        <div className={styles.metric}><span>선택한 시리즈</span><strong>시리즈 {series}</strong></div>
        <p className={styles.explainer}>실제 굿즈 이미지와 아이템별 획득 확률은 시리즈 데이터 제작 후 표시합니다.</p>
        <button type="button" disabled className={styles.disabledAction}>가챠 뽑기 · 준비 중</button>
      </div>
    </div>
  </section>;
}
