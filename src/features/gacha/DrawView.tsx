import { GameIcon } from '../../components/common/GameIcon';
import styles from '../shared/FeaturePage.module.css';

export function DrawView() {
  return (
    <section className={styles.section} aria-labelledby="draw-heading">
      <h1 id="draw-heading">뽑기</h1>
      <div className={styles.item}>
        <GameIcon name="claw" size={24} />
        <div className={styles.info}>
          <strong>인형뽑기</strong>
          <span>1회 150 C · 2D 조작형</span>
        </div>
        <span className={styles.status}>준비 중</span>
      </div>
      <div className={styles.item}>
        <GameIcon name="gift" size={24} />
        <div className={styles.info}>
          <strong>굿즈 가챠</strong>
          <span>1회 700 C · 시리즈별 랜덤 수집</span>
        </div>
        <span className={styles.status}>준비 중</span>
      </div>
    </section>
  );
}
