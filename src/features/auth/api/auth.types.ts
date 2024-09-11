export type SignUpData = {
  email: string
  password: string
  userName: string
}

export type SignInData = {
  email: string
  password: string
}

export type ErrorMessage = {
  field: string
  message: string
}

export type ErrorResponse = {
  error: string
  messages: ErrorMessage[]
  statusCode: number
}

export type SuccessSignInResponse = {
  accessToken: string
}

export type ConfirmRegistrationType = {
  confirmationCode: string
}
