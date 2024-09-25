/**
 * Converts an image Data URL to FormData for sending to the server.
 * @param {string} dataUrl - The Data URL of the image.
 * @param {string} fieldName - The name of the file field in FormData (default is 'file').
 * @returns {FormData} FormData ready to be sent to the server.
 */
export function prepareImageForUpload(dataUrl: string, fieldName: string = 'file'): FormData {
  // Create FormData
  const formData = new FormData()

  // Get MIME type from Data URL
  const mimeType = dataUrl.split(';')[0].split(':')[1] // For example, 'image/jpeg' or 'image/png'

  // Get binary data from Data URL
  const base64 = dataUrl.split(',')[1]
  const binaryString = atob(base64)

  // Create Blob from binary data
  const blob = new Blob(
    [new Uint8Array(binaryString.length).map((_, i) => binaryString.charCodeAt(i))],
    { type: mimeType }
  )

  // Append Blob to FormData
  formData.append(fieldName, blob, `avatar.${mimeType.split('/')[1]}`) // The file name will be 'avatar.jpg' or 'avatar.png'

  return formData
}
