import { baseApi } from '@/app/api'
import { API_URLS, METHOD } from '@/shared/config'

import { ProfileResponse, ProfileSettings, SuccessAvatarResponse } from './profile.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Delete the user's avatar.
     * @returns {Promise<void>}
     */
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: METHOD.DELETE,
        url: API_URLS.PROFILE.DELETE_AVATAR,
      }),
    }),
    /**
     * Delete the user's profile.
     * @returns {Promise<void>}
     */
    deleteProfile: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      query: () => ({
        method: METHOD.DELETE,
        url: API_URLS.PROFILE.DELETE_PROFILE,
      }),
    }),
    /**
     * Delete a profile by user ID.
     * @param {number} userId - The ID of the user whose profile is to be deleted.
     * @returns {Promise<void>}
     */
    deleteProfileById: builder.mutation<void, number>({
      invalidatesTags: ['Profile'],

      query: (userId: number) => ({
        method: METHOD.DELETE,
        url: `${API_URLS.PROFILE.DELETE_PROFILE_BY_ID}/${userId}`,
      }),
    }),
    /**
     * Get the user's profile information.
     * @returns {Promise<ProfileResponse>}
     */
    getProfile: builder.query<ProfileResponse, void>({
      providesTags: ['Profile'],
      query: () => API_URLS.PROFILE.GET_PROFILE,
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
        method: METHOD.PUT,
        url: API_URLS.PROFILE.UPDATE_PROFILE,
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
        method: METHOD.POST,
        url: API_URLS.PROFILE.POST_AVATAR,
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
