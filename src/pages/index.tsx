import { useEffect } from 'react'

import { ROUTES } from '@/shared/config'
import { Loader } from '@/shared/ui'
import { Storage } from '@/shared/utils'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = Storage.getToken()

      if (!token) {
        router.push(ROUTES.PUBLIC)

        return
      } else {
        router.push(ROUTES.HOME)

        return
      }
    }

    checkAuth()
  }, [router])

  return <Loader />
}
