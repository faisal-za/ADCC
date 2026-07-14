import { aggregate, readItems } from '@directus/sdk'
import { directus } from '../../../lib/directus'
import BlogPageClient from '../../../components/blog-page-client'

export const dynamic = 'force-dynamic'

function parseAggregateCount(result: unknown): number {
  if (!Array.isArray(result) || result.length === 0) return 0

  const count = (result[0] as { count?: unknown }).count
  if (typeof count === 'number' || typeof count === 'string') {
    return Number(count) || 0
  }

  if (count && typeof count === 'object' && '*' in count) {
    const wildcardCount = (count as { '*': unknown })['*']
    return Number(wildcardCount) || 0
  }

  return 0
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US'
  const translationFilter = {
    languages_code: { code: { _eq: directusLocale } }
  } as const

  let blogData: any[] = []
  let categoriesData: any[] = []
  let totalBlogCount = 0
  const initialPageSize = 6

  try {
    const [countResult, posts, categories] = await Promise.all([
      directus.request(aggregate('blog', {
        aggregate: { count: '*' },
      })),
      directus.request(readItems('blog', {
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
        limit: initialPageSize,
        deep: {
          translations: { _filter: translationFilter, _limit: 1 },
          categories: {
            categories: {
              translations: { _filter: translationFilter, _limit: 1 },
            },
          },
        },
      })),
      directus.request(readItems('categories', {
        fields: [
          'id',
          { translations: ['title', { languages_code: ['code'] }] },
        ],
        deep: {
          translations: { _filter: translationFilter, _limit: 1 },
        },
      })),
    ])

    totalBlogCount = parseAggregateCount(countResult)
    blogData = posts
    categoriesData = categories
  } catch (error) {
    console.error('Error fetching data server-side:', error)
  }

  return (
    <BlogPageClient
      locale={locale}
      initialBlogData={blogData}
      categoriesData={categoriesData}
      totalBlogCount={totalBlogCount}
      pageSize={initialPageSize}
    />
  )
}
