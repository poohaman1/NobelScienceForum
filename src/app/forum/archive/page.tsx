import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ArchivePage() {
  let archives = [];

  if (supabase) {
    const { data } = await supabase.from("forums").select("*").eq("is_current", false).order("year", { ascending: false });
    archives = data || [];
  } else {
    // Fallback data
    archives = [
      { year: 2025, title: '2025 노벨사이언스 포럼', theme: '기후변화와 지속가능한 과학' },
      { year: 2024, title: '2024 노벨사이언스 포럼', theme: '우주 탐사와 신물질' },
      { year: 2023, title: '2023 노벨사이언스 포럼', theme: '기초과학의 미래' }
    ];
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <Link href="/forum" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>올해의 포럼</Link>
        <Link href="/forum/archive" style={{ fontWeight: 700, color: 'var(--primary)' }}>아카이브</Link>
      </div>

      <h1 className="title-h1">포럼 아카이브</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>과거 포럼의 기록과 자료를 확인하세요. 당시의 영상 및 발표 자료가 제공됩니다.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {archives.map(archive => (
          <div key={archive.year} className="card">
            <div style={{ height: '160px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              포럼 갤러리 이미지
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{archive.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>주제: {archive.theme}</p>
            <button className="btn-outline" style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>자료보기</button>
          </div>
        ))}
      </div>
    </div>
  );
}
