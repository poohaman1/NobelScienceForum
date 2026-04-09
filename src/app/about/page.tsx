'use client';

import { useState } from "react";
import styles from "./about.module.css";

const committeeData = {
  '명예회장': [
    { name: '조완규', role: '서울대학교 18대 총장, 한국한림원 초대 원장, 국가과학기술유공자회 회장' },
    { name: '조장희', role: '고려대학교 석좌교수, KAIST 前교수, 미국 University of California 前교수' }
  ],
  '명예고문': [
    { name: '권숙일', role: '서울대 명예교수, 대한민국 학술원 前회장' },
    { name: '이충희', role: '한국표준과학연구원 前원장, 한국시니어과학기술인협회 명예회장' },
    { name: '이은방', role: '서울대학교 명예교수' },
    { name: '성용길', role: '한국노벨과학문화연구원 원장, 동국대 명예교수, 미국 University of Utah 前연구교수' },
    { name: '장인순', role: '한국원자력연구원 前원장' },
    { name: '박성현', role: '서울대 명예교수, 대한민국 학술원 부회장, 한국시니어과학기술인협회 회장' },
    { name: '오세정', role: '서울대학교 27대 총장, 명예교수' }
  ],
  '회장': [
    { name: '이도수', role: '노벨사이언스 편집·발행인, 대표회장' }
  ],
  '위원장': [
    { name: '초대 조완규', role: '서울대 명예교수' },
    { name: '2대 조장희', role: '고려대 석좌교수' },
    { name: '3대 성용길', role: '한국노벨과학문화연구원장, 동국대 명예교수' }
  ],
  '부위원장': [
    { name: '김경진', role: '수석부회장, 서울대 명예교수; DGIST 석좌교수' },
    { name: '김재완', role: '연세대 교수, 고등과학원 석학교수' },
    { name: '김현숙', role: '한국노벨과학문화연구원 부원장, 신성대 전 교수' },
    { name: '김용현', role: '정석케미컬 대표 회장' },
    { name: '장용순', role: '순천여고 전 교장, 전국 교장협회 전 회장' }
  ]
};

type Category = keyof typeof committeeData;

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Category>('명예회장');

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
        <div className={styles.tabContainer}>
          {(Object.keys(committeeData) as Category[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={`card ${styles.committeeList}`}>
          {committeeData[activeTab].map((member, idx) => (
            <div key={idx} className={styles.memberItem}>
              <div className={styles.memberIcon}>👤</div>
              <div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
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
          {['노벨사이언스', '노벨사이언스위원회', '한국노벨과학문화연구원'].map(partner => (
            <div key={partner} className={styles.partnerLogo}>{partner}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
