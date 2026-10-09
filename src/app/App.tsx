import { useEffect, useRef, useState } from 'react';
import { GameIcon } from '../components/common/GameIcon';
import { useWalletStore } from '../core/economy/useWalletStore';
import { CollectionView } from '../features/collection/CollectionView';
import { DrawView } from '../features/gacha/DrawView';
import { GamesView } from '../features/lobby/GamesView';
import { JobsView } from '../features/jobs/JobsView';
import { PAGES, type PageId } from './navigation/pages';
import styles from './App.module.css';

type NavProps = { activePage: PageId; onSelect: (page: PageId) => void; location: 'side' | 'bottom' };
function Navigation({ activePage, onSelect, location }: NavProps) {
  return <nav aria-label={location === 'side' ? '데스크톱 주 메뉴' : '모바일 주 메뉴'}
    className={location === 'side' ? styles.sidebar : styles.bottomNav}>
    {PAGES.map(({ id, icon, label }) => <button key={id} type="button"
      aria-current={activePage === id ? 'page' : undefined} className={styles.navItem}
      onClick={() => onSelect(id)}><GameIcon name={icon} size={21} /><span>{label}</span></button>)}
  </nav>;
}

export function App() {
  const [activePage, setActivePage] = useState<PageId>('games');
  const [inPreview, setInPreview] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const balance = useWalletStore((state) => state.balance);

  function navigate(page: PageId) { setActivePage(page); setInPreview(false); }
  function closeSettings() { setSettingsOpen(false); settingsButton.current?.focus(); }

  useEffect(() => {
    if (!settingsOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSettingsOpen(false); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [settingsOpen]);

  return <div className={inPreview ? styles.shell + ' ' + styles.playing : styles.shell}>
    <header className={styles.statusBar}>
      <div className={styles.statusTitle}><GameIcon name="gamepad" size={22} /><span>게임장</span></div>
      <div className={styles.statusActions}>
        <div className={styles.coinAmount} aria-label={'보유 코인 ' + balance.toLocaleString('ko-KR') + ' C'}>
          <GameIcon name="coins" size={20}/><span>{balance.toLocaleString('ko-KR')} C</span>
        </div>
        <button ref={settingsButton} type="button" className={styles.iconButton} aria-label="설정 열기"
          onClick={() => setSettingsOpen(true)}><GameIcon name="settings" size={21}/></button>
      </div>
    </header>
    <Navigation activePage={activePage} onSelect={navigate} location="side" />
    <main id="main-content" className={styles.main}>
      {activePage === 'games' && <GamesView onPreviewChange={setInPreview} />}
      {activePage === 'jobs' && <JobsView />}
      {activePage === 'draw' && <DrawView />}
      {activePage === 'collection' && <CollectionView />}
    </main>
    <Navigation activePage={activePage} onSelect={navigate} location="bottom"/>
    {settingsOpen && <div className={styles.modalBackdrop} onMouseDown={(e) => {
      if (e.target === e.currentTarget) closeSettings();
    }}>
      <section role="dialog" aria-modal="true" aria-labelledby="settings-title" className={styles.modal}>
        <div className={styles.modalHeading}><h2 id="settings-title">설정</h2>
          <button type="button" autoFocus className={styles.iconButton} aria-label="설정 닫기" onClick={closeSettings}><GameIcon name="close"/></button>
        </div>
        <p>현재 코인 데이터는 이 브라우저에 저장됩니다.</p>
        <p className={styles.hint}>사운드 및 데이터 백업 설정은 준비 중입니다.</p>
      </section>
    </div>}
  </div>;
}
