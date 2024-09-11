import { ROUTES } from '@/shared/config'
import { Button } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

export default function Home() {
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
          <Link href={ROUTES.SIGN_UP}>
            <Button style={{ margin: '30px' }}>Sign Up</Button>
          </Link>
          <Link href={'/auth/signInPage'}>
            <Button style={{ margin: '30px' }}>Log In</Button>
          </Link>
        </div>
      </main>
    </>
  )
}
