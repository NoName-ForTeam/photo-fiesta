export type SignUpData = {
  email: string
  password: string
  userName: string
}

export type SignInData = Omit<SignUpData, 'userName'>

export type SuccessSignInResponse = {
  accessToken: string
}

export type ConfirmRegistration = {
  confirmationCode: string
}

export type ResendLink = {
  baseUrl?: string
  email: string
}

export type CreateNewPasswordData = {
  newPassword: string
  recoveryCode: string
}

export type PasswordRecoveryData = {
  email: string
  recaptcha: string
}

export type AuthMeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
