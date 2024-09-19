import { useAuthMeQuery } from '@/features'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { data, isSuccess } = useAuthMeQuery()
  const userId = router.query.userId

  if (!isSuccess) {
    // TODO: add logic for show loading
    return <div>Loading...</div>
  }

  return (
    <>
      <div>My Profile</div>
      <div>My id is {userId || data?.userId}</div>
    </>
  )
}

export default ProfilePage
