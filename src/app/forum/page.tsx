import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ForumPage() {
  let forum = null;

  if (supabase) {
    const { data } = await supabase.from("forums").select("*").eq("is_current", true).single();
    forum = data;
  }
  
  if (!forum) {
    // Fallback data
    forum = {
      year: 2026,
      title: "2026 노벨사이언스 포럼",
      theme: "인공지능과 인류의 미래",
    };
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <Link href="/forum" style={{ fontWeight: 700, color: 'var(--primary)' }}>올해의 포럼</Link>
        <Link href="/forum/archive" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>아카이브</Link>
      </div>

      <h1 className="title-h1">{forum.title}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>올해의 포럼 개요 및 프로그램 안내입니다.</p>
      
      <div className="card">
        <h2 className="title-h2">주제: {forum.theme}</h2>
        <p style={{ marginBottom: '0.5rem' }}><strong>일시:</strong> 2026년 10월 15일 (목) ~ 10월 17일 (토)</p>
        <p><strong>장소:</strong> 서울 코엑스 (COEX) 그랜드볼룸</p>
        
        <hr style={{ margin: '2rem 0', borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
        
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>프로그램 일정</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--primary)' }}>1일차 (10.15)</strong> - 기조연설 및 개회식
          </li>
          <li style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--primary)' }}>2일차 (10.16)</strong> - 분야별 세션 (AI, 양자컴퓨팅, 바이오)
          </li>
          <li style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--primary)' }}>3일차 (10.17)</strong> - 종합 토론 및 폐회식
          </li>
        </ul>
      </div>
    </div>
  );
}
