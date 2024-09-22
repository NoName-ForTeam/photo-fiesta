import { useTranslation } from '@/shared/utils'

export type Term = {
  description: string
  extra?: string[]
  title: string
}

/**
 * Custom hook to retrieve structured terms of services data.
 * Utilizes the translation function to return localized content.
 *
 * @returns {Term[]} Array of privacy policy sections with description, title, and optional extra points.
 */

const useTerms = () => {
  const { t } = useTranslation()

  const terms: Term[] = [
    {
      description: t.termsOfService.sections.acceptanceOfTerms.description,
      title: t.termsOfService.sections.acceptanceOfTerms.title,
    },
    {
      description: t.termsOfService.sections.eligibility.description,
      title: t.termsOfService.sections.eligibility.title,
    },
    {
      description: t.termsOfService.sections.accountSecurity.description,
      title: t.termsOfService.sections.accountSecurity.title,
    },
    {
      description: t.termsOfService.sections.userContent.description,
      extra: [
        t.termsOfService.sections.userContent.contentRemoval,
        t.termsOfService.sections.userContent.prohibitedContent,
      ],
      title: t.termsOfService.sections.userContent.title,
    },
    {
      description: t.termsOfService.sections.privacy.description,
      title: t.termsOfService.sections.privacy.title,
    },
    {
      description: t.termsOfService.sections.prohibitedActivities.description,
      extra: [
        t.termsOfService.sections.prohibitedActivities.hack,
        t.termsOfService.sections.prohibitedActivities.offensiveContent,
        t.termsOfService.sections.prohibitedActivities.purposes,
      ],
      title: t.termsOfService.sections.prohibitedActivities.title,
    },
    {
      description: t.termsOfService.sections.intellectualProperty.description,
      title: t.termsOfService.sections.intellectualProperty.title,
    },
    {
      description: t.termsOfService.sections.termination.description,
      title: t.termsOfService.sections.termination.title,
    },
    {
      description: t.termsOfService.sections.disclaimers.description,
      title: t.termsOfService.sections.disclaimers.title,
    },
    {
      description: t.termsOfService.sections.liability.description,
      title: t.termsOfService.sections.liability.title,
    },
    {
      description: t.termsOfService.sections.changes.description,
      title: t.termsOfService.sections.changes.title,
    },
  ]

  return terms
}

export default useTerms
