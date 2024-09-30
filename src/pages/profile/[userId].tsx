import { Profile, useAuthMeQuery } from '@/features'

const ProfilePage = () => {
  const {} = useAuthMeQuery()

  // if (isError) {
  //   refetch()
  // }

  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage
