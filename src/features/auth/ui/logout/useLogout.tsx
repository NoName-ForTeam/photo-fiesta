import { useDispatch } from 'react-redux'

import { baseApi } from '@/app/api'
import { Storage } from '@/shared/utils/storage'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  return () => {
    Storage.deleteToken()
    dispatch(baseApi.util.invalidateTags(['Auth']))
    dispatch(baseApi.util.resetApiState())
    router.push('/auth/signInPage')
  }
}
