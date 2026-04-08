import { checkAuth } from './actions'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'
import { supabase } from '@/lib/supabase'

export default async function AdminPage() {
  const isAuth = await checkAuth()
  
  if (!isAuth) {
    return <LoginForm />
  }

  let notices: any[] = []
  let news: any[] = []
  if (supabase) {
    const res1 = await supabase.from('notices').select('*').order('created_at', { ascending: false })
    notices = res1.data || []
    const res2 = await supabase.from('news_articles').select('*').order('created_at', { ascending: false })
    news = res2.data || []
  }

  return <AdminDashboard notices={notices} news={news} />
}
