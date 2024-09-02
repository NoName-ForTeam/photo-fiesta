import { SignUp } from '@/features/auth/ui/signUp'
import { Modal } from '@photo-fiesta/ui-lib'

export default function Home() {
  return (
    <>
      <button type={'button'}>Hello</button>
      <SignUp />
      <Modal />
    </>
  )
}
