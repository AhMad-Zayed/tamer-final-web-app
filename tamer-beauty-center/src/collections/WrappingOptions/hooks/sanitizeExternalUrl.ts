import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Allowlisted video/social platform hostnames.
 * Only these origins are permitted as ExternalURL values.
 * This prevents XSS, SSRF, and mixed-content attacks.
 */
const ALLOWED_VIDEO_HOSTS = new Set([
  'www.facebook.com',
  'facebook.com',
  'fb.watch',
  'www.instagram.com',
  'instagram.com',
  'www.youtube.com',
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'www.vimeo.com',
])

/** Patterns that suggest script injection or data URIs */
const DANGEROUS_PATTERNS = [
  /^javascript:/i,
  /^data:/i,
  /^vbscript:/i,
  /<script/i,
  /on\w+\s*=/i,
]

export function sanitizeExternalUrl(raw: string): string {
  // 1. Reject dangerous patterns before parsing
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(raw.trim())) {
      throw new ValidationError({
        errors: [{ message: 'الرابط يحتوي على محتوى خطير ومرفوض.', path: 'externalUrl' }],
      })
    }
  }

  // 2. Parse URL — rejects malformed URLs
  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    throw new ValidationError({
      errors: [{ message: 'الرابط غير صالح. يرجى التحقق من الرابط.', path: 'externalUrl' }],
    })
  }

  // 3. Enforce HTTPS — prevents mixed-content attacks
  if (parsed.protocol !== 'https:') {
    throw new ValidationError({
      errors: [{ message: 'يجب أن يبدأ الرابط بـ https:// لضمان الأمان.', path: 'externalUrl' }],
    })
  }

  // 4. Allowlist check — only permitted social platforms
  if (!ALLOWED_VIDEO_HOSTS.has(parsed.hostname)) {
    throw new ValidationError({
      errors: [{
        message: `المنصة "${parsed.hostname}" غير مدعومة. يُسمح فقط بـ: Facebook, Instagram, YouTube, Vimeo.`,
        path: 'externalUrl',
      }],
    })
  }

  // 5. Return normalized URL — strips any fragment-based XSS attempts
  return parsed.toString()
}

/**
 * Payload beforeChange hook — validates & sanitizes the externalUrl field
 * before the document is written to the database.
 */
export const sanitizeExternalUrlHook: CollectionBeforeChangeHook = async ({ data }) => {
  if (data.mediaType === 'external_video' && data.externalUrl) {
    data.externalUrl = sanitizeExternalUrl(data.externalUrl)
  }

  // Clear stale externalUrl when switching to image gallery
  if (data.mediaType === 'image_gallery') {
    data.externalUrl = null
  }

  return data
}
