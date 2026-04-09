import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./forum.module.css";

export default async function ForumPage() {
  let forum = null;

  if (supabase) {
    const { data } = await supabase.from("forums").select("*").eq("is_current", true).single();
    forum = data;
  }
  
  if (!forum) {
    forum = {
      year: 2026,
      title: "2026 노벨사이언스 포럼",
      theme: "인공지능과 인류의 미래",
    };
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
      <div className={styles.tabBar}>
        <Link href="/forum" style={{ fontWeight: 700, color: 'var(--primary)' }}>올해의 포럼</Link>
        <Link href="/forum/archive" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>아카이브</Link>
      </div>

      <h1 className="title-h1">{forum.title}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.975rem' }}>
        올해의 포럼 개요 및 안내입니다.
      </p>
      
      <div className="card">
        <h2 className="title-h2">주제: {forum.theme}</h2>
        <div className={styles.infoGrid}>
          <p><strong>일시</strong><span>2026년 6월 17일 (수) 오후 2:00 ~ 5:30</span></p>
          <p>
            <strong>장소</strong>
            <span>
              <a 
                href="https://map.naver.com/p/entry/place/11674485" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}
              >
                서울대학교 호암교수회관 무궁화홀
              </a>
            </span>
          </p>
          <p><strong>주최</strong><span>한국노벨사이언스위원회</span></p>
          <p><strong>주관</strong><span>노벨사이언스 · 노벨사이언스포럼</span></p>
        </div>
        
        <hr className={styles.divider} />
        
        <h3 className={styles.scheduleTitle}>자세한 프로그램 일정은 추후 공지됩니다.</h3>
      </div>
    </div>
  );
}
