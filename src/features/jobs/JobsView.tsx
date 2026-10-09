import { useState } from 'react';
import { GameArtwork } from '../../components/common/GameArtwork';
import { GameIcon } from '../../components/common/GameIcon';
import styles from '../shared/FeaturePage.module.css';

type Job = 'counter' | 'sorting';
export function JobsView() {
  const [job, setJob] = useState<Job>('counter');
  const counter = job === 'counter';
  return <section className={styles.section} aria-labelledby="jobs-heading">
    <header className={styles.heading}><h1 id="jobs-heading">알바</h1><span className={styles.stageLabel}>화면 시안</span></header>
    <div className={styles.selector} aria-label="알바 종류">
      <button type="button" aria-pressed={counter} onClick={() => setJob('counter')}>게임장 카운터</button>
      <button type="button" aria-pressed={!counter} onClick={() => setJob('sorting')}>물품 정리</button>
    </div>
    <div className={styles.split}>
      <div className={styles.scene}><GameArtwork kind="counter" /></div>
      <div className={styles.panel}>
        <div className={styles.panelHeader}><span className={styles.eyebrow}>{counter ? '방치형 알바' : '직접 플레이 알바'}</span><h2>{counter ? '게임장 카운터' : '물품 정리'}</h2></div>
        {counter ? <>
          <div className={styles.metric}><span>기본 시급 환산</span><strong>240 C <small>/시간</small></strong></div>
          <div className={styles.metric}><span>수익 발생</span><strong>20 C <small>/5분</small></strong></div>
          <div className={styles.metric}><span>최대 누적</span><strong>4시간</strong></div>
          <div className={styles.previewTrack}><div /></div>
          <p className={styles.explainer}>수익 및 경과 시간은 아직 연결되지 않았습니다.</p>
          <button type="button" className={styles.disabledAction} disabled>급여 수령 · 준비 중</button>
        </> : <>
          <div className={styles.metric}><span>완료 보수 예시</span><strong>60 C</strong></div>
          <div className={styles.metric}><span>재도전 대기</span><strong>3분</strong></div>
          <p className={styles.explainer}>물품 정리 조작 게임은 다음 개발 단계에서 추가됩니다.</p>
          <button type="button" className={styles.disabledAction} disabled>알바 시작 · 준비 중</button>
        </>}
      </div>
    </div>
  </section>;
}
