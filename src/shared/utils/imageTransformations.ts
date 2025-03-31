import { ImageData } from '@/widgets'

/**
 * Applies image transformations including cropping and scaling.
 *
 * @async
 * @param {ImageData} imageData - The image data containing source, crop, and other properties.
 * @returns {Promise<string>} A promise that resolves to the data URL of the transformed image.
 */

export const applyImageTransformations = async (imageData: ImageData) => {
  const img = new window.Image()

  // Set cross-origin to 'Anonymous' to handle CORS issues
  img.crossOrigin = 'Anonymous'
  img.src = imageData.src

  // Wait for the image to load
  await new Promise(resolve => {
    img.onload = resolve
  })

  // Create a canvas element for image manipulation
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return imageData.src
  }

  // calculate scaling
  const scaleX = img.naturalWidth / 100
  const scaleY = img.naturalHeight / 100

  // Set canvas dimensions based on crop size and scaling
  canvas.width = imageData.crop.width * scaleX
  canvas.height = imageData.crop.height * scaleY

  // Draw the cropped and scaled image onto the canvas
  ctx.drawImage(
    img,
    imageData.crop.x * scaleX,
    imageData.crop.y * scaleY,
    imageData.crop.width * scaleX,
    imageData.crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  )

  // Convert the canvas to a data URL and return it
  return canvas.toDataURL('image/jpeg') // возвращает Base64
}

export const applyImageTransformationsArray = async (
  imageData: ImageData
): Promise<ImageData[]> => {
  const img = new window.Image()
  img.crossOrigin = 'Anonymous'
  img.src = imageData.src

  await new Promise(resolve => {
    img.onload = resolve
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return [imageData]
  }

  const scaleX = img.naturalWidth / 100
  const scaleY = img.naturalHeight / 100

  canvas.width = imageData.crop.width * scaleX
  canvas.height = imageData.crop.height * scaleY

  ctx.drawImage(
    img,
    imageData.crop.x * scaleX,
    imageData.crop.y * scaleY,
    imageData.crop.width * scaleX,
    imageData.crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  )

  const newSrc = canvas.toDataURL('image/jpeg')

  return [{ ...imageData, src: newSrc }] // возвр массив объектов с сохр объекта crop но с обрезанным изобр base64 в src
}
