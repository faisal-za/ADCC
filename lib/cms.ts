import 'server-only'

import { NotFound } from 'payload'

import {
  type BlogPageResult,
  type CategoryView,
  type CMSLocale,
  type HomepageData,
  type PayloadIdentifier,
  type PostDetailView,
  normalizeCategory,
  normalizeClient,
  normalizePostCard,
  normalizePostDetail,
  normalizeProject,
  normalizeService,
  normalizeTestimonial,
  parsePayloadID,
} from '@/lib/cms-types'
import { getPayloadClient } from '@/lib/payload'

const MAX_BLOG_PAGE_SIZE = 24

const validatePagination = (page: number, limit: number) => {
  if (!Number.isSafeInteger(page) || page < 1) {
    throw new RangeError('Blog page must be a positive integer')
  }

  if (!Number.isSafeInteger(limit) || limit < 1 || limit > MAX_BLOG_PAGE_SIZE) {
    throw new RangeError(`Blog page size must be between 1 and ${MAX_BLOG_PAGE_SIZE}`)
  }
}

/**
 * These reads intentionally set overrideAccess because they execute only in trusted,
 * server-only website code. Browser and REST callers still use collection access rules.
 */
export async function getHomepageData(locale: CMSLocale): Promise<HomepageData> {
  const payload = await getPayloadClient()

  const [services, projects, categories, testimonials, clients] = await Promise.all([
    payload.find({
      collection: 'services',
      locale,
      depth: 1,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'projects',
      locale,
      depth: 1,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'categories',
      locale,
      depth: 0,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'testimonials',
      locale,
      depth: 0,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'clients',
      locale,
      depth: 1,
      pagination: false,
      overrideAccess: true,
    }),
  ])

  return {
    services: services.docs.map(normalizeService),
    projects: projects.docs.map(normalizeProject),
    categories: categories.docs.map(normalizeCategory),
    testimonials: testimonials.docs.map(normalizeTestimonial),
    clients: clients.docs.map(normalizeClient),
  }
}

export async function getCategories(locale: CMSLocale): Promise<CategoryView[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    locale,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    sort: 'title',
  })

  return result.docs.map(normalizeCategory)
}

type GetBlogPageArgs = {
  locale: CMSLocale
  page: number
  limit: number
  categoryId?: PayloadIdentifier
}

export async function getBlogPage({
  locale,
  page,
  limit,
  categoryId,
}: GetBlogPageArgs): Promise<BlogPageResult> {
  validatePagination(page, limit)

  const parsedCategoryID = categoryId === undefined ? null : parsePayloadID(categoryId)
  if (categoryId !== undefined && parsedCategoryID === null) {
    throw new RangeError('Category ID must be a valid Mongo ObjectID')
  }

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    locale,
    depth: 1,
    page,
    limit,
    overrideAccess: true,
    sort: '-createdAt',
    where: parsedCategoryID
      ? {
          categories: {
            contains: parsedCategoryID,
          },
        }
      : undefined,
  })

  return {
    docs: result.docs.map(normalizePostCard),
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    page: result.page ?? page,
    totalPages: result.totalPages,
  }
}

export async function getBlogPost(
  id: PayloadIdentifier,
  locale: CMSLocale,
): Promise<PostDetailView | null> {
  const parsedID = parsePayloadID(id)
  if (parsedID === null) return null

  const payload = await getPayloadClient()

  try {
    const post = await payload.findByID({
      collection: 'posts',
      id: parsedID,
      locale,
      depth: 1,
      overrideAccess: true,
    })

    return normalizePostDetail(post)
  } catch (error: unknown) {
    if (error instanceof NotFound) return null
    throw error
  }
}
