import { useRouter } from 'next/router'
import { en, ru } from 'src/shared/config'

export const useTranslation = () => {
  const router = useRouter()

  const t = router.locale === 'en' ? en : ru

  return { t }
}
