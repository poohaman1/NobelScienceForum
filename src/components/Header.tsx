import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Nobel Science Forum</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>소개</Link>
          <Link href="/forum" className={styles.navLink}>포럼</Link>
          <Link href="/news" className={styles.navLink}>소식</Link>
          <Link href="/admin" className={`${styles.navLink} ${styles.adminLink}`}>운영자접속</Link>
        </nav>
      </div>
    </header>
  );
}
