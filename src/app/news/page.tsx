import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./news.module.css";

export default async function NewsPage() {
  let notices: { id: number; title: string; created_at: string; is_new: boolean; content?: string }[] = [];

  if (supabase) {
    const { data } = await supabase.from("notices").select("*").order("created_at", { ascending: false });
    notices = data || [];
  } else {
    notices = [
      { id: 1, title: '2026 노벨사이언스 포럼 사전 등록 안내', created_at: '2026-04-10T10:00:00Z', is_new: true },
      { id: 2, title: '운영위원회 신규 위원 위촉 공고', created_at: '2026-03-25T14:30:00Z', is_new: false },
      { id: 3, title: '2025 아카이브 발표 자료 업데이트 안내', created_at: '2026-02-10T09:00:00Z', is_new: false }
    ];
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
      <div className={styles.tabBar}>
        <Link href="/news" style={{ fontWeight: 700, color: 'var(--primary)' }}>공지사항</Link>
        <Link href="/news/articles" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>뉴스</Link>
      </div>

      <h1 className="title-h1">공지사항</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
        포럼 관련 주요 소식 및 안내사항을 확인하세요.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notices.map(notice => {
          const dateStr = new Date(notice.created_at).toLocaleDateString('ko-KR');
          return (
            <details key={notice.id} className={styles.noticeItem}>
              <summary className={styles.noticeSummary}>
                <div className={styles.noticeLeft}>
                  {notice.is_new && (
                    <span className={styles.newBadge}>NEW</span>
                  )}
                  <h3 className={styles.noticeTitle}>{notice.title}</h3>
                </div>
                <span className={styles.noticeDate}>{dateStr}</span>
              </summary>
              <div className={styles.noticeBody}>
                {notice.content ? (
                  <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                ) : (
                  <p>본문 내용이 없습니다.</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
