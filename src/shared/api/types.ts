/**
 * Represents a standardized error response structure from the backend API.
 * This type is used to handle various error scenarios across different API endpoints.
 * @example
 *  {
 *  "statusCode": 400,
 * "messages": [
 *     {
 *        "message": "User with this userName is already exist",
 *       "field": "userName"
 *  }
 *],
 * "error": "BAD_REQUEST"
 *}
 * @example
 * {
 *   data: {
 *     error: "Internal Server Error",
 *     messages: "An unexpected error occurred",
 *     statusCode: 500
 *   }
 * }
 */

export type ErrorResponse = {
  /** The data object containing error details */
  data: {
    /** A general error message or error type */
    error: string
    /** An array of specific error messages for different fields or a single string message */
    messages: { field: string; message: string }[] | string
    /** The HTTP status code of the error */
    statusCode: number
  }
}
