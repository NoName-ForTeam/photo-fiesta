export type ProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type ProfileSettings = {
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  region: string
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

/**
 * {
 * "avatars": [
 *  {
 *   "url": "https://example.com/image.jpg",
 *  "width": 300,
 *  "height": 300,
 * "fileSize": 300,
 * "createdAt": "2024-09-19T15:40:52.543Z"
 * }
 * ]
 *}
 */
export type SuccessAvatarResponse = {
  avatars: Avatar[]
}
