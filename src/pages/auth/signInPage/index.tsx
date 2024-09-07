import { SignIn } from '@/features/auth/ui/signIn'
import { getAuthLayout } from '@/features/layout/layout'

const SignInPage = () => {
  return <SignIn />
}

export default getAuthLayout(SignInPage)
