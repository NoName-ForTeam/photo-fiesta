import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()

  const userId = router.query.userId

  return (
    <>
      <div>My Profile</div>
      <div>My id is {userId}</div>
    </>
  )
}

export default ProfilePage
