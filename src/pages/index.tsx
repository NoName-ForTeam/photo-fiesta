import { ConfirmEmail, SentEmail, SignIn } from '@/features/auth/ui'
import { SignUp } from '@/features/auth/ui/signUp'
import { Modal } from '@photo-fiesta/ui-lib'

export default function Home() {
  function handleSubmit(data: unknown) {
    // eslint-disable-next-line no-console
    console.log('Form submitted with:', data)
  }

  return (
    <>
      <button type={'button'}>Hello</button>
      <SignUp />
      <Modal />
      <ConfirmEmail />
      <SentEmail />
      <SignIn onSubmit={handleSubmit} />
    </>
  )
}
