import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      try {
        const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

        payload.logger.info(`Revalidating page at path: ${path}`)

        revalidatePath(path)
        revalidateTag('pages-sitemap', 'max')
      } catch (err) {
        payload.logger.warn({ err }, 'Failed to revalidate page')
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      try {
        const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
        payload.logger.info(`Revalidating old page at path: ${oldPath}`)

        revalidatePath(oldPath)
        revalidateTag('pages-sitemap', 'max')
      } catch (err) {
        payload.logger.warn({ err }, 'Failed to revalidate old page')
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    try {
      const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
      revalidatePath(path)
      revalidateTag('pages-sitemap', 'max')
    } catch (err) {
      // Ignore errors during delete revalidation
    }
  }

  return doc
}
