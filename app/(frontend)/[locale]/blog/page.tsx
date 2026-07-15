import BlogPageClient from '@/components/blog-page-client'
import { getBlogPage, getCategories } from '@/lib/cms'
import { parseCMSLocale, type BlogPageResult, type CategoryView } from '@/lib/cms-types'

export const revalidate = 3600

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cmsLocale = parseCMSLocale(locale)
  const pageSize = 6

  let initialResult: BlogPageResult = {
    docs: [],
    totalDocs: 0,
    hasNextPage: false,
    page: 1,
    totalPages: 0,
  }
  let categories: CategoryView[] = []

  try {
    const [blogResult, categoryResult] = await Promise.all([
      getBlogPage({ locale: cmsLocale, page: 1, limit: pageSize }),
      getCategories(cmsLocale),
    ])
    initialResult = blogResult
    categories = categoryResult
  } catch (error) {
    console.error('Failed to fetch blog data:', error)
  }

  return (
    <BlogPageClient
      locale={cmsLocale}
      initialResult={initialResult}
      categories={categories}
      pageSize={pageSize}
    />
  )
}
