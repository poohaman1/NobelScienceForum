'use client'

import { useState } from 'react'
import { loginAdmin } from './actions'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await loginAdmin(password)
    if (res.success) {
      router.refresh()
    } else {
      setError(res.error || 'Login failed')
    }
  }

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', minHeight: '60vh', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="title-h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>운영자 접속</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>비밀번호</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '1rem' }}
            required
            placeholder="기본 비밀번호: admin123"
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>로그인</button>
      </form>
    </div>
  )
}
