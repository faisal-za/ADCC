'use server'

import { readItems } from '@directus/sdk'
import { directus } from '../directus'

export async function loadMoreBlogPosts(offset: number, limit: number, locale: string) {
  try {
    const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US'
    const translationFilter = {
      languages_code: { code: { _eq: directusLocale } }
    } as const

    const posts = await directus.request(readItems('blog', {
      fields: [
        'id',
        { image: ['id'] },
        'read_time',
        'date_created',
        {
          categories: [
            'id',
            {
              categories: [
                'id',
                {
                  translations: [
                    'title',
                    { languages_code: ['code'] },
                  ],
                },
              ],
            },
          ],
        },
        {
          translations: [
            'title',
            'description',
            'content',
            { languages_code: ['code'] },
          ],
        },
      ],
      sort: ['-date_created'],
      limit,
      offset,
      deep: {
        translations: { _filter: translationFilter, _limit: 1 },
        categories: {
          categories: {
            translations: { _filter: translationFilter, _limit: 1 },
          },
        },
      },
    }))

    return {
      data: posts,
      hasMore: posts.length === limit,
    }
  } catch (error) {
    console.error('Error loading more blog posts:', error)
    throw new Error('Failed to load more posts')
  }
}
