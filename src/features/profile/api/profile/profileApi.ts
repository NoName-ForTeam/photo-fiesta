import { baseApi } from '@/app/api'
import { API_URLS, METHOD } from '@/shared/config'

import { ProfileResponse, ProfileSettings, SuccessAvatarResponse } from './profile.types'

const { DELETE, POST, PUT } = METHOD

const {
  DELETE_AVATAR,
  DELETE_PROFILE,
  DELETE_PROFILE_BY_ID,
  GET_PROFILE,
  POST_AVATAR,
  UPDATE_PROFILE,
} = API_URLS.PROFILE

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Delete the user's avatar.
     */
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: DELETE,
        url: DELETE_AVATAR,
      }),
    }),
    /**
     * Delete the user's profile.
     */
    deleteProfile: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: DELETE,
        url: DELETE_PROFILE,
      }),
    }),
    /**
     * Delete a profile by user ID.
     * @param {number} userId - The ID of the user whose profile is to be deleted.
     */
    deleteProfileById: builder.mutation<void, number>({
      invalidatesTags: ['Profile'],

      query: (userId: number) => ({
        method: DELETE,
        url: DELETE_PROFILE_BY_ID(userId),
      }),
    }),
    /**
     * Get the user's profile information.
     * @returns {Promise<ProfileResponse>}
     */
    getProfile: builder.query<ProfileResponse, void>({
      providesTags: ['Profile'],
      query: () => GET_PROFILE,
    }),
    /**
     * Update the user's profile information.
     * @param {ProfileSettings} params - The new profile settings.
     * @returns {Promise<ProfileResponse>}
     */
    updateProfile: builder.mutation<void, ProfileSettings>({
      invalidatesTags: ['Profile'],
      query: params => ({
        body: params,
        method: PUT,
        url: UPDATE_PROFILE,
      }),
    }),
    /**
     * Upload a new avatar for the user.
     * @param {File} file - The avatar image file to upload.
     * @returns {Promise<SuccessAvatarResponse>}
     */
    uploadAvatar: builder.mutation<SuccessAvatarResponse, FormData>({
      invalidatesTags: ['Profile'],
      query: (formData: FormData) => ({
        body: formData,
        method: POST,
        url: POST_AVATAR,
      }),
    }),
  }),
})

export const {
  useDeleteAvatarMutation,
  useDeleteProfileByIdMutation,
  useDeleteProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi
