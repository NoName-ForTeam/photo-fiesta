// src/shared/utils/errorHandlers.ts
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ErrorResponse } from '@/shared/api'

export const checkErrorMessages = (
  error: ErrorResponse,
  setError: UseFormSetError<{ email: string }>
) => {
  if (Array.isArray(error.data.messages) && error.data.messages.length > 0) {
    const message = error.data.messages[0]

    if (typeof message === 'object' && 'message' in message) {
      setError('email', { message: message.message })
    } else if (typeof message === 'string') {
      setError('email', { message })
    }
  } else {
    toast.error('An unknown error occurred.')
  }
}
