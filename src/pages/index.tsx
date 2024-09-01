import { SignIn } from '@/features/auth/ui'

export default function Home() {
  function handleSubmit(data: unknown) {
    // eslint-disable-next-line no-console
    console.log('Form submitted with:', data)
  }

  return (
    <div
      style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
    >
      <SignIn onSubmit={handleSubmit} />
    </div>
  )
}
