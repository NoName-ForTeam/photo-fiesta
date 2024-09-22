import { useTranslation } from '@/shared/utils'

export type Privacy = {
  description: string
  extra?: string[]
  title: string
}

/**
 * Custom hook to retrieve structured privacy policy data.
 * Utilizes the translation function to return localized content.
 *
 * @returns {Privacy[]} Array of privacy policy sections with description, title, and optional extra points.
 */
const usePrivacy = () => {
  const { t } = useTranslation()

  const points: Privacy[] = [
    {
      description: t.privacyPolicy.sections.informationCollection.description,
      extra: t.privacyPolicy.sections.informationCollection.extra,
      title: t.privacyPolicy.sections.informationCollection.title,
    },
    {
      description: t.privacyPolicy.sections.useOfInformation.description,
      extra: t.privacyPolicy.sections.useOfInformation.extra,
      title: t.privacyPolicy.sections.useOfInformation.title,
    },
    {
      description: t.privacyPolicy.sections.sharingInformation.description,
      extra: t.privacyPolicy.sections.sharingInformation.extra,
      title: t.privacyPolicy.sections.sharingInformation.title,
    },
    {
      description: t.privacyPolicy.sections.dataRetention.description,
      title: t.privacyPolicy.sections.dataRetention.title,
    },
    {
      description: t.privacyPolicy.sections.yourRights.description,
      extra: t.privacyPolicy.sections.yourRights.extra,
      title: t.privacyPolicy.sections.yourRights.title,
    },
    {
      description: t.privacyPolicy.sections.securityMeasures.description,
      title: t.privacyPolicy.sections.securityMeasures.title,
    },
    {
      description: t.privacyPolicy.sections.changesToPolicy.description,
      title: t.privacyPolicy.sections.changesToPolicy.title,
    },
    {
      description: t.privacyPolicy.sections.contactUs.description,
      title: t.privacyPolicy.sections.contactUs.title,
    },
  ]

  return points
}

export default usePrivacy
