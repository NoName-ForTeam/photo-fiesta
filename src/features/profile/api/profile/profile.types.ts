/**
 * base profile interface
 */
interface BaseProfile {
  aboutMe: string
  city: string
  country: string
  firstName: string
  lastName: string
  region: string
  userName: string
}

/**
 * type for avatar
 */
export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

/**
 * Interface for profile response.
 * @example
 * {
 *   "id": 12345,
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "userName": "johndoe",
 *   "aboutMe": "I'm a software developer",
 *   "city": "New York",
 *   "country": "USA",
 *   "region": "North America",
 *   "avatars": [
 *     {
 *       "url": "https://example.com/avatar.jpg",
 *       "width": 200,
 *       "height": 200,
 *       "fileSize": 15000,
 *       "createdAt": "2024-09-23T10:30:00Z"
 *     }
 *   ],
 *   "createdAt": "2024-01-01T00:00:00Z",
 *   "dateOfBirth": "1990-01-01"
 * }
 */
export interface ProfileResponse extends BaseProfile {
  avatars: Avatar[]
  createdAt: string
  dateOfBirth: string
  id: number
}

/**
 * type for profile settings
 * @example
 * const profileSettings: ProfileSettings = {
 *   dateOfBirth: "1990-01-01",
 *   aboutMe: "I'm a software engineer passionate about web development.",
 *   city: "San Francisco",
 *   country: "USA",
 *   firstName: "Jane",
 *   lastName: "Doe",
 *   region: "California",
 *   userName: "janedoe_dev"
 * }
 */
export type ProfileSettings = {
  dateOfBirth: string
} & BaseProfile

/**
 * type for success avatar response
 * @example
 * {
 *   "avatars": [
 *     {
 *       "url": "https://example.com/image.jpg",
 *       "width": 300,
 *       "height": 300,
 *       "fileSize": 300,
 *       "createdAt": "2024-09-19T15:40:52.543Z"
 *     }
 *   ]
 * }
 */
export type SuccessAvatarResponse = {
  avatars: Avatar[]
}
