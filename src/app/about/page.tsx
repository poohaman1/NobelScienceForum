import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
      <h1 className="title-h1">노벨사이언스 포럼 소개</h1>
      <p className={styles.lead}>
        노벨사이언스 포럼은 전 세계 최고의 지성들이 모여 인류의 당면 과제를 고민하고, 미래를 향한 혁신적인 대안을 제시하는 글로벌 학술 및 교류 플랫폼입니다.
      </p>

      <section className={styles.section}>
        <h2 className="title-h2">설립 배경 및 비전</h2>
        <div className="card">
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', wordBreak: 'keep-all' }}>
            <strong>과학기술의 발전은 항상 인류 사회의 도약과 함께해 왔습니다.</strong>
            <br /><br />
            그러나 21세기에 접어들며 우리는 기후변화, 새로운 질병, 그리고 급격한 기술 진보로 인한 사회적 격차 등 전례 없는 복합적 위기를 맞이하고 있습니다. 노벨사이언스 포럼은 이러한 글로벌 과제를 해결하기 위해 선구적인 연구자와 혁신 기업가, 정책 입안자들이 모여 포용적 혁신을 논의하는 장을 마련하고자 설립되었습니다.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="title-h2">운영위원회</h2>
        <div className={styles.memberGrid}>
          {[
            { name: '김대한 위원장', role: '한국과학기술원 명예교수' },
            { name: '이민국 부위원장', role: '글로벌AI연구센터장' },
            { name: '박태양 위원', role: 'K-Science 재단 이사장' },
            { name: '최우주 위원', role: '우주항공청 수석연구원' }
          ].map((member, idx) => (
            <div key={idx} className={`card ${styles.memberCard}`}>
              <div className={styles.memberAvatar}></div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="title-h2">주관 및 파트너사</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.975rem', lineHeight: '1.6', wordBreak: 'keep-all' }}>
          본 포럼은 과학기술의 발전과 인류의 지속 가능한 미래를 지지하는 파트너들과 함께합니다.
        </p>
        <div className={styles.partnerGrid}>
          {['LG 에스프레소', '삼성 모바일', 'K-Science 재단'].map(partner => (
            <div key={partner} className={styles.partnerLogo}>{partner}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
