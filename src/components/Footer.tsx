'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  
  // 홈 화면(/)에서만 후원사 섹션을 표시함
  const isHomePage = pathname === '/';

  return (
    <footer className={styles.footer}>
      {isHomePage && (
        <div className={styles.organizerSection}>
          <div className="container">
            <div className={styles.organizerGrid}>
              <div className={styles.organizerItem}>
                <span className={styles.organizerLabel}>주최</span>
                <p className={styles.organizerName}>한국노벨사이언스위원회</p>
              </div>
              <div className={styles.organizerItem}>
                <span className={styles.organizerLabel}>주관</span>
                <p className={styles.organizerName}>노벨사이언스 · 노벨사이언스포럼</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {new Date().getFullYear()} Nobel Science Forum. All rights reserved.</p>
      </div>
    </footer>
  );
}
