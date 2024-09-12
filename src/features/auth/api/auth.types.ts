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
  data: {
    error: string
    messages: { field: string; message: string }[]
    statusCode: number
  }
}

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
