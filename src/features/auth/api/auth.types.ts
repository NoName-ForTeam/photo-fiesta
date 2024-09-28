//base types
type BaseAuthData = {
  email: string
  password: string
}

type Token = {
  accessToken: string
}

//use  registration and authentication

export type SignUpData = {
  userName: string
} & BaseAuthData

export type SignInData = BaseAuthData

export type SuccessSignInResponse = Token

export type ConfirmRegistration = {
  confirmationCode: string
}

export type ResendLink = {
  baseUrl?: string
  email: string
}

// Password management
export type CreateNewPasswordData = {
  newPassword: string
  recoveryCode: string
}

export type PasswordRecoveryData = {
  email: string
  recaptcha: string
}

export type CheckRecoveryCodeRequest = {
  code: string
}

export type CheckRecoveryCodeResponse = {
  email: string
}

//User info
export type AuthMeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

//Token management
export type UpdateTokens = Token
