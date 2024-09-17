import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ZodSchema, z } from 'zod'

import { isValidErrorResponse } from './isValidErrorResponse'

const errorMessageSchema = z.object({
  field: z.string(),
  message: z.string(),
})

type ErrorMessage = z.infer<typeof errorMessageSchema>

type ErrorHandlerParams<T extends FieldValues = FieldValues> = {
  badRequestSchema: ZodSchema
  error: unknown
  /**
   * Determines whether to show toast notifications for errors if parsed.success is true.
   * @default false
   */
  isToast?: boolean
  setError: UseFormSetError<T>
}

export function handleErrorResponse<T extends FieldValues>({
  badRequestSchema,
  error,
  isToast = false,
  setError,
}: ErrorHandlerParams<T>) {
  if (isValidErrorResponse(error)) {
    const parsed = badRequestSchema.safeParse(error.data)

    if (parsed.success) {
      if (Array.isArray(parsed.data.messages)) {
        parsed.data.messages.forEach((m: ErrorMessage) => {
          if (m.field === 'code') {
            setError('recoveryCode' as FieldPath<T>, { message: m.message })
          } else {
            setError(m.field as FieldPath<T>, { message: m.message })
          }
        })
        /** show first error message */

        isToast && toast.error(parsed.data.messages[0].message)
      } else if (typeof parsed.data.messages === 'string') {
        toast.error(parsed.data.messages)
      }
    } else {
      //if error.data.messages is not array or string show error message
      if ('messages' in error.data) {
        toast.error(error.data.messages as string)
      } else {
        toast.error('Invalid server response')
      }
    }
  }
}
