import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ZodSchema, z } from 'zod'

import { isValidErrorResponse } from './isValidErrorResponse'

const errorMessageSchema = z.object({
  field: z.string(),
  message: z.string(),
})

type ErrorMessage = z.infer<typeof errorMessageSchema>
type ErrorHandlerParams<T extends FieldValues> = {
  badRequestSchema: ZodSchema
  error: unknown
  setError: UseFormSetError<T>
}

export function handleErrorResponse<T extends FieldValues>({
  badRequestSchema,
  error,
  setError,
}: ErrorHandlerParams<T>) {
  if (isValidErrorResponse(error)) {
    const parsed = badRequestSchema.safeParse(error.data)

    if (parsed.success) {
      parsed.data.messages.forEach((m: ErrorMessage) => {
        /**
         * *the recoveryCode field is replaced by the code field
         * *in response from the backend
         */
        if (m.field === 'code') {
          setError('recoveryCode' as FieldPath<T>, { message: m.message })
        } else {
          setError(m.field as FieldPath<T>, { message: m.message })
        }
      })
      /** show first error message */
      toast.error(parsed.data.messages[0].message)
    } else {
      /**
       * If the data does not match the schema, but there is a message property,
       * we display that message. Otherwise, we show a generic error message.
       */
      if ('message' in error.data && typeof error.data.message === 'string') {
        toast.error(error.data.message)
      } else {
        toast.error('Invalid server response')
      }
    }
  }
}
