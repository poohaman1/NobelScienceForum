import { checkAuth } from './actions'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'

export default async function AdminPage() {
  const isAuth = await checkAuth()
  
  if (!isAuth) {
    return <LoginForm />
  }

  return <AdminDashboard />
}
