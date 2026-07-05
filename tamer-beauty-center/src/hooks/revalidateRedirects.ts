import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  try {
    revalidateTag('redirects', 'max')
  } catch (err) {
    payload.logger.error({ err }, `Error revalidating redirects`)
  }

  return doc
}
