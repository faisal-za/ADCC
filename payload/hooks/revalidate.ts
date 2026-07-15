import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
  TypeWithID,
} from 'payload'

type Invalidate = (id: number | string) => void

type RevalidationHooks = {
  afterChange: CollectionAfterChangeHook<TypeWithID>
  afterDelete: CollectionAfterDeleteHook<TypeWithID>
}

const invalidateHomepage = () => {
  revalidatePath('/en')
  revalidatePath('/ar')
}

const invalidateBlogIndexes = () => {
  revalidatePath('/en/blog')
  revalidatePath('/ar/blog')
}

const invalidateBlogDetails = () => {
  revalidatePath('/en/blog/[id]', 'page')
  revalidatePath('/ar/blog/[id]', 'page')
}

const invalidatePost = (id: number | string) => {
  invalidateBlogIndexes()
  revalidatePath(`/en/blog/${id}`)
  revalidatePath(`/ar/blog/${id}`)
}

const invalidateCategories = () => {
  invalidateHomepage()
  invalidateBlogIndexes()
  invalidateBlogDetails()
}

const invalidateMedia = () => {
  invalidateHomepage()
  invalidateBlogIndexes()
  invalidateBlogDetails()
}

const safelyInvalidate = (
  req: PayloadRequest,
  label: string,
  invalidate: () => void,
) => {
  try {
    invalidate()
  } catch (error: unknown) {
    req.payload.logger.error({
      err: error,
      msg: `Failed to revalidate ${label}`,
    })
  }
}

const createRevalidationHooks = (label: string, invalidate: Invalidate): RevalidationHooks => ({
  afterChange: ({ doc, req }) => {
    safelyInvalidate(req, label, () => invalidate(doc.id))
    return doc
  },
  afterDelete: ({ doc, id, req }) => {
    safelyInvalidate(req, label, () => invalidate(id))
    return doc
  },
})

export const homepageRevalidation = createRevalidationHooks('homepage', invalidateHomepage)
export const categoryRevalidation = createRevalidationHooks('category routes', invalidateCategories)
export const mediaRevalidation = createRevalidationHooks('media routes', invalidateMedia)
export const postRevalidation = createRevalidationHooks('post routes', invalidatePost)
