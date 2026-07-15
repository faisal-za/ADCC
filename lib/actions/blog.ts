'use server'

import { getBlogPage } from '@/lib/cms'
import { parseCMSLocale, type BlogPageResult } from '@/lib/cms-types'

export type LoadBlogPostsInput = {
  page: number
  limit: number
  locale: string
  categoryId?: string
}

export async function loadMoreBlogPosts({
  page,
  limit,
  locale,
  categoryId,
}: LoadBlogPostsInput): Promise<BlogPageResult> {
  try {
    return await getBlogPage({
      page,
      limit,
      locale: parseCMSLocale(locale),
      categoryId,
    })
  } catch (error) {
    console.error('Error loading blog posts:', error)
    throw new Error('Failed to load blog posts')
  }
}
