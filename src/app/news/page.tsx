import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function NewsPage() {
  let notices = [];

  if (supabase) {
    const { data } = await supabase.from("notices").select("*").order("created_at", { ascending: false });
    notices = data || [];
  } else {
    // Fallback data
    notices = [
      { id: 1, title: '2026 노벨사이언스 포럼 사전 등록 안내', created_at: '2026-04-10T10:00:00Z', is_new: true },
      { id: 2, title: '운영위원회 신규 위원 위촉 공고', created_at: '2026-03-25T14:30:00Z', is_new: false },
      { id: 3, title: '2025 아카이브 발표 자료 업데이트 안내', created_at: '2026-02-10T09:00:00Z', is_new: false }
    ];
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <Link href="/news" style={{ fontWeight: 700, color: 'var(--primary)' }}>공지사항</Link>
        <Link href="/news/articles" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>뉴스</Link>
      </div>

      <h1 className="title-h1">공지사항</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>포럼 관련 주요 소식 및 안내사항을 확인하세요.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notices.map(notice => {
          const dateStr = new Date(notice.created_at).toLocaleDateString('ko-KR');
          return (
            <div key={notice.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {notice.is_new && <span style={{ background: 'var(--secondary)', color: '#fff', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>NEW</span>}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>{notice.title}</h3>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{dateStr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
