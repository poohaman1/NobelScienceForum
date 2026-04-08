import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sponsorBanner}>
        <div className="container">
          <p className={styles.sponsorTitle}>후원사 및 파트너</p>
          <div className={styles.sponsorLogos}>
            <div className={styles.sponsorLogo}>LG 에스프레소</div>
            <div className={styles.sponsorLogo}>삼성 모바일</div>
            <div className={styles.sponsorLogo}>K-Science 재단</div>
            <div className={styles.sponsorLogo}>우주탐사국</div>
          </div>
        </div>
      </div>
      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {new Date().getFullYear()} Nobel Science Forum. All rights reserved.</p>
      </div>
    </footer>
  );
}
