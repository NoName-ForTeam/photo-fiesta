export type SignUpData = {
  email: string
  password: string
  userName: string
}

export type CreateNewPasswordData = {
  newPassword: string
  recoveryCode: string
}

export type ErrorResponse = {
  /** The data object containing error details */
  data: {
    /** A general error message or error type */
    error: string
    /** An array of specific error messages for different fields */
    messages: { field: string; message: string }[]
    /** The HTTP status code of the error */
    statusCode: number
  }
}
