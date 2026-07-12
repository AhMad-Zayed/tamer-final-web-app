/**
 * Re-export from canonical Payload CMS location.
 * Moving the full Header directory would break Payload config.ts which
 * hardcodes '@/Header/RowLabel#RowLabel' and '@/Header/hooks/revalidateHeader'.
 * This barrel file provides the conventional components/layout path without
 * duplicating or breaking the CMS wiring.
 */
export { Header } from '@/Header/Component'
