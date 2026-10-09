import { useEffect, useRef, useState } from 'react';
import { GameIcon } from '../components/common/GameIcon';
import { useWalletStore } from '../core/economy/useWalletStore';
import { CollectionView } from '../features/collection/CollectionView';
import { DrawView } from '../features/gacha/DrawView';
import { GamesView } from '../features/lobby/GamesView';
import { JobsView } from '../features/jobs/JobsView';
import { PAGES, type PageId } from './navigation/pages';
import styles from './App.module.css';

interface NavProps {
  activePage: PageId;
  onSelect: (page: PageId) => void;
  location: 'side' | 'bottom';
}

function MainNavigation({ activePage, onSelect, location }: NavProps) {
  return (
    <nav
      aria-label={location === 'side' ? '데스크톱 주 메뉴' : '모바일 주 메뉴'}
      className={location === 'side' ? styles.sidebar : styles.bottomNav}
    >
      {PAGES.map(({ id, icon, label }) => (
        <button
          type="button"
          key={id}
          aria-current={activePage === id ? 'page' : undefined}
          className={styles.navItem}
          onClick={() => onSelect(id)}
        >
          <GameIcon name={icon} size={21} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function StatusBar({ onSettings }: { onSettings: () => void }) {
  const balance = useWalletStore((state) => state.balance);
  return (
    <header className={styles.statusBar}>
      <span className={styles.statusTitle}>게임장</span>
      <div className={styles.statusActions}>
        <div className={styles.coinAmount} aria-label={`보유 코인 ${balance.toLocaleString('ko-KR')} C`}>
          <GameIcon name="coins" size={20} />
          <span>{balance.toLocaleString('ko-KR')} C</span>
        </div>
        <button type="button" className={styles.iconButton} aria-label="설정 열기" onClick={onSettings}>
          <GameIcon name="settings" size={20} />
        </button>
      </div>
    </header>
  );
}

export function App() {
  const [activePage, setActivePage] = useState<PageId>('games');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSettingsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [settingsOpen]);

  const closeSettings = () => {
    setSettingsOpen(false);
    settingsTriggerRef.current?.querySelector('button')?.focus();
  };

  return (
    <div className={styles.shell}>
      <div ref={settingsTriggerRef} className={styles.headerSlot}>
        <StatusBar onSettings={() => setSettingsOpen(true)} />
      </div>
      <MainNavigation activePage={activePage} onSelect={setActivePage} location="side" />
      <main id="main-content" className={styles.main}>
        {activePage === 'games' && <GamesView />}
        {activePage === 'jobs' && <JobsView />}
        {activePage === 'draw' && <DrawView />}
        {activePage === 'collection' && <CollectionView />}
      </main>
      <MainNavigation activePage={activePage} onSelect={setActivePage} location="bottom" />
      {settingsOpen && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeSettings();
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <div className={styles.modalHeading}>
              <h2 id="settings-title">설정</h2>
              <button type="button" autoFocus className={styles.iconButton} aria-label="설정 닫기" onClick={closeSettings}>
                <GameIcon name="close" />
              </button>
            </div>
            <p>진행 데이터는 현재 브라우저에 저장됩니다.</p>
            <p className={styles.hint}>사운드 및 데이터 백업 설정은 준비 중입니다.</p>
          </section>
        </div>
      )}
    </div>
  );
}
