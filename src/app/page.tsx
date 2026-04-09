import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.categoryBadge}>노벨사이언스 창간 10주년 기념</span>
          <h1 className={styles.heroTitle}>과학과 혁신으로<br/>내일을 엽니다</h1>
          <p className={styles.heroDescription}>
            글로벌 석학들과 함께 인류의 당면 과제를 고민하고, 미래 과학의 나아갈 길을 제시하는 최고의 지식 플랫폼에 여러분을 초대합니다.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/forum" className="btn-primary">올해의 포럼 안내</Link>
            <Link href="/about" className="btn-outline" style={{ borderColor: 'var(--surface)', color: 'var(--surface)' }}>포럼 소개영상</Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.sectionPadding}`}>
        <h2 className="title-h2">노벨사이언스 포럼 소개</h2>
        <div className={styles.grid2}>
          <div className={styles.introTextWrapper}>
            <p className={styles.introText}>
              21세기는 융합과 혁신의 시대입니다. <strong>노벨사이언스 포럼</strong>은 세계 최고의 석학들과 국내외 우수 연구진, 그리고 산업계 리더들이 한자리에 모여 인류가 직면한 다양한 문제에 대한 해답을 찾고자 출범했습니다.
            </p>
            <p className={styles.introText}>
              기초과학부터 첨단 응용기술, 그리고 우주 탐사에 이르기까지 폭넓은 주제를 다루며, 각 분야의 최신 연구 성과를 공유하고 교류하는 장을 제공합니다.
            </p>
          </div>
          <div className={styles.introStats}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statLabel}>개국 이상 참여</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>글로벌 연사</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>참여 연구기관</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className={`container ${styles.sectionPadding}`}>
          <h2 className="title-h2 text-center" style={{ textAlign: 'center' }}>운영위원회</h2>
          <p className={styles.sectionDesc}>비전과 혁신을 이끄는 리더들</p>
          <div className={styles.grid3}>
            {[1, 2, 3].map((item) => (
              <div key={item} className="card">
                <div className={styles.memberAvatar}></div>
                <h3 className={styles.memberName}>김대한 위원장</h3>
                <p className={styles.memberRole}>한국과학기술원(KAIST) 명예교수</p>
                <p className={styles.memberBio}>
                  글로벌 과학 네트워크 구축 및 연구 성과 확산에 기여한 공로로 세계적인 권위를 인정받고 있습니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
