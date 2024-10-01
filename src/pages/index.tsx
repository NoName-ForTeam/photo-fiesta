import { useEffect } from 'react'

import { ROUTES } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { Button } from '@photo-fiesta/ui-lib'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  //const [triggerAuthMe] = useLazyAuthMeQuery()

  useEffect(() => {
    const checkAuth = async () => {
      const token = Storage.getToken()

      if (!token) {
        //TODO: route to public page
        router.push(ROUTES.SIGN_IN)

        return
      }
      //! may be it is not needed
      try {
        // await triggerAuthMe().unwrap()
      } catch (err) {
        router.push(ROUTES.SIGN_IN)
      }
    }

    checkAuth()
  }, [])

  //TODO: This is a mock data, need to fix
  return (
    <>
      <main
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 140,
        }}
      >
        <h1>Welcome to Photo Fiesta!</h1>
        <p>Your favorite place to share photos and connect with friends.</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
          }}
        >
          <Button asChild style={{ margin: '30px' }}>
            <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
          </Button>
          <Button asChild style={{ margin: '30px' }}>
            <Link href={ROUTES.SIGN_IN}>Log In</Link>
          </Button>
        </div>
      </main>
    </>
  )
}
