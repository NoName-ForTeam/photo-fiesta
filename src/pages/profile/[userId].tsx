import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Profile, useAuthMeQuery } from '@/features'
import { Loader } from '@/shared/ui'
/**
 * it is  responsible for rendering the user's profile page.
 */
const ProfilePage = () => {
  const { isError, isLoading, refetch } = useAuthMeQuery()

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load profile. Retrying...')
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error loading profile. Please try again later.</div>
  }

  return <Profile />
}

export default ProfilePage
