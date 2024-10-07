// src/shared/utils/errorHandlers.ts
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ErrorResponse } from '@/shared/api'

/**
 * Handles and displays error messages from an API response.
 *
 * This function processes error messages received from an API and either sets form errors
 * or displays toast notifications based on the structure of the error response.
 *
 * @template T - Type extending FieldValues, representing the structure of the form.
 * @param {ErrorResponse} error - The error response object from the API.
 * @param {UseFormSetError<T>} setError - Function to set errors in the form.
 *
 * @description
 * The function handles three types of error structures:
 * 1. Array of field-specific errors: Sets form errors for specific fields.
 * 2. Single string message: Displays as a toast error.
 * 3. General error message: Displays as a toast error.
 *
 * If no recognizable error structure is found, it displays a generic error message.
 */

export const checkErrorMessages = <T extends FieldValues>(
  error: ErrorResponse,
  setError: UseFormSetError<T>
) => {
  const { data } = error

  if (Array.isArray(data.messages)) {
    data.messages.forEach(message => {
      if (typeof message === 'object' && 'field' in message && 'message' in message) {
        setError(message.field as FieldPath<T>, { message: message.message })
      }
    })
  } else if (typeof data.messages === 'string') {
    toast.error(data.messages)
  }

  if (data.error) {
    toast.error(data.error)
  }

  if (!data.messages && !data.error) {
    toast.error('An unknown error occurred.')
  }
}
