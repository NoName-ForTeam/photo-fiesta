import { useDispatch } from 'react-redux'

import { baseApi } from '@/app/api'
import { ROUTES } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  return () => {
    Storage.deleteToken()
    dispatch(baseApi.util.invalidateTags(['Auth']))
    dispatch(baseApi.util.resetApiState())
    router.push(ROUTES.SIGN_IN)
  }
}
