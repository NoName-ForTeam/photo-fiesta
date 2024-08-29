import { SignIn } from '@/features/auth/ui'

export default function Home() {
  return (
    <div
      style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
    >
      <SignIn />
    </div>
  )
}
