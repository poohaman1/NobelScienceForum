'use server'

import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', { secure: true, httpOnly: true, path: '/' })
    return { success: true }
  }
  return { success: false, error: '비밀번호가 일치하지 않습니다.' }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  revalidatePath('/admin')
}

export async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

export async function addNotice(formData: FormData) {
  if (!(await checkAuth()) || !supabase) return { success: false, error: 'Database Not Connected' }
  const title = formData.get('title') as string
  const content = formData.get('content') as string || null
  const isNew = formData.get('isNew') === 'on'

  if (!title) return { success: false, error: 'Title is required' }
  
  const { error } = await supabase.from('notices').insert([{ title, content, is_new: isNew }])
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/news')
  revalidatePath('/admin')
  return { success: true }
}

export async function addNews(formData: FormData) {
  if (!(await checkAuth()) || !supabase) return { success: false, error: 'Database Not Connected' }
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const url = formData.get('url') as string

  if (!title || !summary || !url) return { success: false, error: 'All fields are required' }
  
  const { error } = await supabase.from('news_articles').insert([{ title, summary, url }])
  if (error) return { success: false, error: error.message }
  
  revalidatePath('/news/articles')
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteNotice(id: string) {
  if (!(await checkAuth()) || !supabase) return { success: false, error: 'Database Not Connected' }
  const { error } = await supabase.from('notices').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/news')
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteNews(id: string) {
  if (!(await checkAuth()) || !supabase) return { success: false, error: 'Database Not Connected' }
  const { error } = await supabase.from('news_articles').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/news/articles')
  revalidatePath('/admin')
  return { success: true }
}
