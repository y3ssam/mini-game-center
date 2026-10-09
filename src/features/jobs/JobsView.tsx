import { GameIcon } from '../../components/common/GameIcon';
import styles from '../shared/FeaturePage.module.css';

export function JobsView() {
  return (
    <section className={styles.section} aria-labelledby="jobs-heading">
      <h1 id="jobs-heading">알바</h1>
      <div className={styles.item}>
        <GameIcon name="briefcase" size={24} />
        <div className={styles.info}>
          <strong>게임장 카운터</strong>
          <span>방치 수익 · 급여 수령</span>
        </div>
        <span className={styles.status}>준비 중</span>
      </div>
      <div className={styles.item}>
        <GameIcon name="clock" size={24} />
        <div className={styles.info}>
          <strong>물품 정리</strong>
          <span>직접 플레이 알바</span>
        </div>
        <span className={styles.status}>준비 중</span>
      </div>
    </section>
  );
}
