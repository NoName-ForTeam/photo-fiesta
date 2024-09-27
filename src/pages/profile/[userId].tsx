import { Profile, useAuthMeQuery } from '@/features'

const ProfilePage = () => {
  const { isError, refetch } = useAuthMeQuery()

  if (isError) {
    refetch()
  }

  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage
