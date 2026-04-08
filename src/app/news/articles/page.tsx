import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ArticlesPage() {
  let articles = [];

  if (supabase) {
    const { data } = await supabase.from("news_articles").select("*").order("created_at", { ascending: false });
    articles = data || [];
  } else {
    articles = [
      {
        id: 1,
        title: "노벨사이언스 포럼, 2026년 주제 'AI와 미래' 발표",
        summary: "올해로 4회째를 맞는 노벨사이언스 포럼이 2026년 대주제로 '인공지능과 인류의 미래'를 선정했다고 밝혔다. 글로벌 AI 석학들이 참여할 예정이며, 사전 등록은 다음 주부터 시작된다. 위원장은 혁신적인 기술이 우리 삶에 미칠 영향을 깊이 있게 논의하고자 한다고 전했다.",
        url: "https://example.com/news/1"
      },
      {
        id: 2,
        title: "제3회 포럼 성공적 마무리... 글로벌 과학계 호평",
        summary: "기후변화를 주제로 열렸던 작년 포럼의 주요 세션 영상이 오늘 아카이브를 통해 공개되었다. 세계 여러 곳에서 10만 명 이상의 온라인 참여자가 참석했던 이번 행사는 지속 가능한 미래를 향한 과학계의 다짐을 재확인하는 계기가 되었다.",
        url: "https://example.com/news/2"
      }
    ];
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <Link href="/news" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>공지사항</Link>
        <Link href="/news/articles" style={{ fontWeight: 700, color: 'var(--primary)' }}>뉴스</Link>
      </div>

      <h1 className="title-h1">포럼 뉴스</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>언론에 보도된 노벨사이언스 포럼의 소식을 전해드립니다.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {articles.map(article => (
          <div key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{article.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {article.summary}
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <a href={article.url} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                원문보기
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
