'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  
  // 관리자 관련 경로(/admin)에서는 후원사 섹션을 표시하지 않음
  const isExcludedPath = pathname?.startsWith('/admin');

  return (
    <footer className={styles.footer}>
      {!isExcludedPath && (
        <div className={styles.sponsorBanner}>
          <div className="container">
            <p className={styles.sponsorTitle}>후원사 및 파트너</p>
            <div className={styles.sponsorLogos}>
              <a 
                href="http://www.nobelscience.net/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.sponsorLogo}
              >
                노벨사이언스
              </a>
              <a 
                href="http://www.nobelscience.net/news/articleView.html?idxno=1636" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.sponsorLogo}
              >
                노벨사이언스위원회
              </a>
              <div className={styles.sponsorLogoEmpty}></div>
              <div className={styles.sponsorLogoEmpty}></div>
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
