import styles from '../shared/FeaturePage.module.css';

export function CollectionView() {
  return <section className={styles.section} aria-labelledby="collection-heading">
    <header className={styles.heading}>
      <h1 id="collection-heading">도감</h1>
      <span className={styles.stageLabel}>화면 시안</span>
    </header>
    <div className={styles.panel}>
      <h2>굿즈 도감</h2>
      <div className={styles.metric}><span>획득한 굿즈</span><strong>—</strong></div>
      <div className={styles.metric}><span>등록된 시리즈</span><strong>—</strong></div>
      <div className={styles.emptyCollection}>
        <strong>수집품 데이터 준비 중</strong>
        <p>가챠에서 획득한 굿즈의 이미지, 희귀도, 보유 수량 및 수집률이 표시될 예정입니다.</p>
      </div>
    </div>
  </section>;
}
