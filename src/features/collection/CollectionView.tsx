import { GameIcon } from '../../components/common/GameIcon';
import styles from '../shared/FeaturePage.module.css';

export function CollectionView() {
  return (
    <section className={styles.section} aria-labelledby="collection-heading">
      <h1 id="collection-heading">도감</h1>
      <div className={styles.item}>
        <GameIcon name="book" size={24} />
        <div className={styles.info}>
          <strong>수집품 도감</strong>
          <span>인형 및 굿즈의 획득 현황</span>
        </div>
        <span className={styles.status}>준비 중</span>
      </div>
    </section>
  );
}
