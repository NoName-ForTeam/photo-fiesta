import { useAuthMeQuery } from '@/features'

const ProfilePage = () => {
  const { data, isError, refetch } = useAuthMeQuery()

  if (isError) {
    refetch()
  }

  return (
    <>
      <div>My Profile</div>
      <div>My id is {data?.userId}</div>
    </>
  )
}

export default ProfilePage
