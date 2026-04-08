'use client'

import { useState } from 'react'
import { addNotice, addNews, logoutAdmin } from './actions'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()

  const [newsUrl, setNewsUrl] = useState('')
  const [newsTitle, setNewsTitle] = useState('')
  const [newsSummary, setNewsSummary] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)

  const handleAction = async (actionFn: any, formData: FormData) => {
    const res = await actionFn(formData)
    if (res.success) {
      alert('성공적으로 등록되었습니다.')
      // 폼 초기화
      if (actionFn === addNews) {
        setNewsUrl('')
        setNewsTitle('')
        setNewsSummary('')
      }
    } else {
      alert('오류 발생: ' + res.error)
    }
  }

  const handleAISummarize = async () => {
    if (!newsUrl) {
      return alert('먼저 시작할 뉴스 원문 링크(URL)를 입력해 주세요.')
    }
    
    setIsSummarizing(true)
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newsUrl })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'AI 요약 요청에 실패했습니다.')
      }

      setNewsTitle(data.title || '')
      setNewsSummary(data.summary || '')
    } catch (e: any) {
      alert(e.message)
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="title-h1" style={{ marginBottom: 0 }}>운영자 대시보드</h1>
        <button onClick={async () => { await logoutAdmin(); router.refresh() }} className="btn-outline">로그아웃</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* 공지사항 등록 폼 */}
        <div className="card">
          <h2 className="title-h2">새 공지사항 등록</h2>
          <form action={(formData) => handleAction(addNotice, formData)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>제목</label>
              <input name="title" required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" name="isNew" defaultChecked />
                <span>NEW 표시 설정</span>
              </label>
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>등록하기</button>
          </form>
        </div>

        {/* 관련 뉴스 등록 폼 */}
        <div className="card">
          <h2 className="title-h2">관련 뉴스 등록 (3줄 요약)</h2>
          <form action={(formData) => handleAction(addNews, formData)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>원문 링크 (URL)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input name="url" type="url" value={newsUrl} onChange={(e) => setNewsUrl(e.target.value)} required style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} placeholder="https://..." />
                <button type="button" onClick={handleAISummarize} disabled={isSummarizing} className="btn-outline" style={{ background: isSummarizing ? 'var(--surface-hover)' : 'transparent', whiteSpace: 'nowrap' }}>
                  {isSummarizing ? '요약 중...' : '🔥 AI요약'}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>기사 제목</label>
              <input name="title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>3~5줄 요약 내용</label>
              <textarea name="summary" value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>뉴스 등록</button>
          </form>
        </div>
      </div>
    </div>
  )
}
