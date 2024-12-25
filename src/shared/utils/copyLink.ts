import { toast } from 'react-toastify'

/**
 * Copies the current page URL to the clipboard.
 *
 * Utilizes the `navigator.clipboard.writeText` method to copy the URL and provides feedback via toast notifications.
 *
 * - On success: Displays a success toast message indicating the link was copied.
 * - On failure: Displays an error toast message indicating the failure to copy the link.
 */
export const copyLink = () => {
  const link = window.location.href

  navigator.clipboard
    .writeText(link)
    .then(() => {
      toast.success('Link copied to clipboard')
    })
    .catch(() => {
      toast.error('Failed to copy link')
    })
}
