'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [forumMenuOpen, setForumMenuOpen] = useState(false);
  
  const closeMenu = () => {
    setMenuOpen(false);
    setForumMenuOpen(false);
  };

  const toggleForumMenu = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setForumMenuOpen(!forumMenuOpen);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <span className={styles.logoText}>Nobel Science Forum</span>
          </Link>
        </div>

        {/* 햄버거 버튼 - 모바일에서만 표시 */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기/닫기"
          aria-expanded={menuOpen}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* 네비게이션 */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link href="/about" className={styles.navLink} onClick={closeMenu}>소개</Link>
          <div className={styles.navItemDropdown} onMouseEnter={() => window.innerWidth >= 768 && setForumMenuOpen(true)} onMouseLeave={() => window.innerWidth >= 768 && setForumMenuOpen(false)}>
            <Link href="/forum" className={styles.navLink} onClick={toggleForumMenu}>포럼</Link>
            <ul className={`${styles.dropdownMenu} ${forumMenuOpen ? styles.dropdownOpen : ''}`}>
              <li><Link href="/forum" className={styles.dropdownLink} onClick={closeMenu}>올해의 포럼</Link></li>
              <li><Link href="/forum/archive" className={styles.dropdownLink} onClick={closeMenu}>아카이브</Link></li>
            </ul>
          </div>
          <Link href="/news" className={styles.navLink} onClick={closeMenu}>소식</Link>
          <Link href="/admin" className={`${styles.navLink} ${styles.adminLink}`} onClick={closeMenu}>운영자접속</Link>
        </nav>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
