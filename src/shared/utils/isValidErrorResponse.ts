import { ErrorResponse } from '@/features/auth'

/**
 * Checks if the given error object matches the structure of an ErrorResponse.
 * @example
 * if (isValidErrorResponse(error)) {
 *   console.log(error.data.statusCode);
 *   console.log(`Error message: ${error.data.error}`);
 *   error.data.messages.forEach(msg => {
 *       console.log(`Field: ${msg.field}, Message: ${msg.message}`);
 *     });
 * }
 * else {
 *  console.log('Unexpected error structure:', error);
 *   }
 */
export function isValidErrorResponse(error: unknown): error is ErrorResponse {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as ErrorResponse).data === 'object'
  ) {
    const { data } = error as ErrorResponse

    return (
      'error' in data &&
      typeof data.error === 'string' &&
      'messages' in data &&
      Array.isArray(data.messages) &&
      data.messages.every(
        msg =>
          typeof msg === 'object' &&
          msg !== null &&
          'field' in msg &&
          typeof msg.field === 'string' &&
          'message' in msg &&
          typeof msg.message === 'string'
      ) &&
      'statusCode' in data &&
      typeof data.statusCode === 'number'
    )
  }

  return false
}
