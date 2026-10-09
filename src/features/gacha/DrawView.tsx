import { useState } from 'react';
import { GameArtwork } from '../../components/common/GameArtwork';
import { GameIcon } from '../../components/common/GameIcon';
import styles from '../shared/FeaturePage.module.css';

type DrawId = 'claw' | 'gacha';

function CranePreview() {
  const [position, setPosition] = useState(50);
  const [lowered, setLowered] = useState(false);
  return <>
    <div className={styles.cranePosition} aria-label={'집게 가로 위치 ' + position + '% · ' + (lowered ? '하강' : '상승')}>
      <span>집게 위치 {position}%</span>
      <div className={styles.track}><i style={{ left: position + '%' }} /></div>
      <span aria-live="polite">{lowered ? '하강 위치 확인 · 획득 판정 미구현' : '좌우 버튼으로 위치를 조정하세요'}</span>
    </div>
    <div className={styles.craneButtons}>
      <button type="button" disabled={lowered || position <= 10} onClick={() => setPosition(v => Math.max(10, v - 10))} aria-label="집게 왼쪽 이동">← 왼쪽</button>
      <button type="button" onClick={() => setLowered(v => !v)}>{lowered ? '집게 올리기' : '집게 내리기'}</button>
      <button type="button" disabled={lowered || position >= 90} onClick={() => setPosition(v => Math.min(90, v + 10))} aria-label="집게 오른쪽 이동">오른쪽 →</button>
    </div>
  </>;
}

export function DrawView({ onPreviewChange }: { onPreviewChange: (active: boolean) => void }) {
  const [opened, setOpened] = useState<DrawId | null>(null);
  const [series, setSeries] = useState('A');
  function enter(kind: DrawId) { setOpened(kind); onPreviewChange(true); }
  function back() { setOpened(null); onPreviewChange(false); }

  if (opened) return <section className={styles.section} aria-label={opened === 'claw' ? '인형뽑기' : '굿즈 가챠'}>
    <header className={styles.heading}>
      <button type="button" className={styles.backButton} onClick={back}><GameIcon name="back" size={18}/> 뽑기</button>
      <h1>{opened === 'claw' ? '인형뽑기' : '굿즈 가챠'}</h1>
      <span className={styles.stageLabel}>UI 체험</span>
    </header>
    <div className={styles.split}>
      <div className={styles.scene}><GameArtwork kind={opened} /></div>
      <div className={styles.panel}>
        <h2>{opened === 'claw' ? '집게 조작 체험' : '굿즈 시리즈'}</h2>
        <p className={styles.explainer}>시안 체험 중 코인은 차감되지 않으며 실제 획득은 발생하지 않습니다.</p>
        {opened === 'claw' ? <>
          <div className={styles.metric}><span>1회 이용료</span><strong>150 C</strong></div>
          <CranePreview />
        </> : <>
          <div className={styles.selector} aria-label="가챠 시리즈 선택">
            <button type="button" aria-pressed={series === 'A'} onClick={() => setSeries('A')}>시리즈 A</button>
            <button type="button" aria-pressed={series === 'B'} onClick={() => setSeries('B')}>시리즈 B</button>
          </div>
          <div className={styles.metric}><span>1회 뽑기</span><strong>700 C</strong></div>
          <div className={styles.metric}><span>확률 예시</span><strong>일반 70% · 레어 25% · 슈퍼 레어 5%</strong></div>
          <p className={styles.explainer}>{'시리즈 ' + series + '의 개별 아이템과 실제 확률 데이터는 미등록 상태입니다.'}</p>
          <button type="button" disabled className={styles.disabledAction}>가챠 시작 · 준비 중</button>
        </>}
      </div>
    </div>
  </section>;

  return <section className={styles.section} aria-labelledby="draw-heading">
    <header className={styles.heading}><h1 id="draw-heading">뽑기</h1><span className={styles.stageLabel}>화면 시안</span></header>
    <div className={styles.drawGrid}>
      <article className={styles.drawTile}>
        <div className={styles.drawArt}><GameArtwork kind="claw"/></div>
        <div className={styles.drawInfo}><h2>인형뽑기</h2><p>집게 이동 · 하강 · 인형 획득</p>
          <div className={styles.drawFoot}><span>150 C / 회</span>
            <button type="button" onClick={() => enter('claw')}>조작 체험 <GameIcon name="chevron" size={16}/></button></div></div>
      </article>
      <article className={styles.drawTile}>
        <div className={styles.drawArt}><GameArtwork kind="gacha"/></div>
        <div className={styles.drawInfo}><h2>굿즈 가챠</h2><p>시리즈 선택 · 획득 확률</p>
          <div className={styles.drawFoot}><span>700 C / 회</span>
            <button type="button" onClick={() => enter('gacha')}>화면 체험 <GameIcon name="chevron" size={16}/></button></div></div>
      </article>
    </div>
  </section>;
}
