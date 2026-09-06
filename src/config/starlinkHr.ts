/**
 * Centralized Starlink Hrvatska guide URLs and verification date.
 * Referral URL is imported from here — do not duplicate it in components.
 */
export const STARLINK_HR_PATH = '/starlink-hrvatska'

export const STARLINK_HR = {
  referralUrl:
    'https://starlink.com/?referral=RC-DF-14108083-46035-89&app_source=share',
  officialUrl: 'https://www.starlink.com/',
  legalUrl: 'https://www.starlink.com/legal',
  contentLastVerified: '2026-09-06',
  images: {
    heroDesktop: '/starlink/starlink-hrvatska-hero.webp',
    heroMobile: '/starlink/starlink-hrvatska-hero-mobile.webp',
    howItWorks: '/starlink/starlink-kako-radi.webp',
    antenna: '/starlink/starlink-polozaj-antene.webp',
    homeTravel: '/starlink/starlink-kuca-putovanje.webp',
  },
} as const

/** Required on the public referral outbound link. */
export const STARLINK_REFERRAL_REL = 'noopener noreferrer sponsored nofollow'

const HR_MONTHS = [
  'siječnja',
  'veljače',
  'ožujka',
  'travnja',
  'svibnja',
  'lipnja',
  'srpnja',
  'kolovoza',
  'rujna',
  'listopada',
  'studenoga',
  'prosinca',
] as const

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

/** Human-readable date for the on-page verification line. */
export function formatStarlinkContentVerifiedDate(language: 'hr' | 'en' = 'hr'): string {
  const [year, month, day] = STARLINK_HR.contentLastVerified.split('-').map(Number)
  if (language === 'en') {
    return `${day} ${EN_MONTHS[month - 1]} ${year}.`
  }
  return `${day}. ${HR_MONTHS[month - 1]} ${year}.`
}
