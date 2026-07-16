import type {
  Category,
  Client,
  Media,
  Post,
  Project,
  Service,
  Testimonial,
} from '@/payload-types'

export type CMSLocale = 'en' | 'ar'
export type PayloadIdentifier = string

declare const mongoObjectIDBrand: unique symbol
export type MongoObjectID = string & { readonly [mongoObjectIDBrand]: true }

export type CMSRelation<T> = {
  id: string
  value: T | null
}

type RelationshipSource<T extends { id: PayloadIdentifier }> =
  | PayloadIdentifier
  | T
  | null
  | undefined

export type MediaView = {
  id: string
  alt: string
  url: string | null
  width: number | null
  height: number | null
}

export type CategoryView = {
  id: string
  title: string
  slug: string
  description: string | null
}

export type ServiceView = {
  id: string
  title: string
  description: string | null
  icon: string | null
  image: CMSRelation<MediaView> | null
}

export type ProjectView = {
  id: string
  title: string
  description: string | null
  images: CMSRelation<MediaView>[]
  categories: CMSRelation<CategoryView>[]
}

export type TestimonialView = {
  id: string
  name: string
  client: string | null
  text: string
  rating: number
}

export type ClientView = {
  id: string
  name: string
  logo: CMSRelation<MediaView> | null
}

export type LexicalContent = Post['content']

export type PostCardView = {
  id: string
  title: string
  description: string | null
  image: CMSRelation<MediaView> | null
  readTime: number
  categories: CMSRelation<CategoryView>[]
  createdAt: string
}

export type PostDetailView = PostCardView & {
  content: LexicalContent
}

export type HomepageData = {
  services: ServiceView[]
  projects: ProjectView[]
  categories: CategoryView[]
  testimonials: TestimonialView[]
  clients: ClientView[]
}

export type BlogPageResult = {
  docs: PostCardView[]
  totalDocs: number
  hasNextPage: boolean
  page: number
  totalPages: number
}

export function parseCMSLocale(locale: string): CMSLocale {
  if (locale === 'en' || locale === 'ar') return locale
  throw new RangeError(`Unsupported CMS locale: ${locale}`)
}

export function parsePayloadID(id: unknown): MongoObjectID | null {
  if (typeof id !== 'string' || !/^[a-fA-F0-9]{24}$/.test(id)) return null
  return id as MongoObjectID
}

export function normalizeRelation<T extends { id: PayloadIdentifier }, V>(
  source: RelationshipSource<T>,
  normalize: (value: T) => V,
): CMSRelation<V> | null {
  if (source == null) return null

  if (typeof source === 'string') {
    return { id: String(source), value: null }
  }

  return {
    id: String(source.id),
    value: normalize(source),
  }
}

function normalizeRelations<T extends { id: PayloadIdentifier }, V>(
  sources: RelationshipSource<T>[] | null | undefined,
  normalize: (value: T) => V,
): CMSRelation<V>[] {
  if (!sources) return []

  return sources.flatMap((source) => {
    const relation = normalizeRelation(source, normalize)
    return relation ? [relation] : []
  })
}

export const normalizeMedia = (media: Media): MediaView => ({
  id: String(media.id),
  alt: media.alt,
  url: media.url ?? null,
  width: media.width ?? null,
  height: media.height ?? null,
})

export const normalizeCategory = (category: Category): CategoryView => ({
  id: String(category.id),
  title: category.title,
  slug: category.slug,
  description: category.description ?? null,
})

export const normalizeService = (service: Service): ServiceView => ({
  id: String(service.id),
  title: service.title,
  description: service.description ?? null,
  icon: service.icon ?? null,
  image: normalizeRelation(service.image, normalizeMedia),
})

export const normalizeProject = (project: Project): ProjectView => ({
  id: String(project.id),
  title: project.title,
  description: project.description ?? null,
  images: normalizeRelations(project.images, normalizeMedia),
  categories: normalizeRelations(project.categories, normalizeCategory),
})

export const normalizeTestimonial = (testimonial: Testimonial): TestimonialView => ({
  id: String(testimonial.id),
  name: testimonial.name,
  client: testimonial.client ?? null,
  text: testimonial.text,
  rating: testimonial.rating,
})

export const normalizeClient = (client: Client): ClientView => ({
  id: String(client.id),
  name: client.name,
  logo: normalizeRelation(client.logo, normalizeMedia),
})

export const normalizePostCard = (post: Post): PostCardView => ({
  id: String(post.id),
  title: post.title,
  description: post.description ?? null,
  image: normalizeRelation(post.image, normalizeMedia),
  readTime: post.readTime,
  categories: normalizeRelations(post.categories, normalizeCategory),
  createdAt: post.createdAt,
})

export const normalizePostDetail = (post: Post): PostDetailView => ({
  ...normalizePostCard(post),
  content: post.content,
})
