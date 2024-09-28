import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } from '@/features'
import {
  commonAboutMeSchema,
  commonDateOfBirthSchema,
  commonFirstNameSchema,
  commonLastNameSchema,
  commonUsernameSchema,
  createBadRequestSchema,
  handleErrorResponse,
  prepareImageForUpload,
} from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const ProfileSettingsSchema = z.object({
  aboutMe: commonAboutMeSchema,
  city: z.string(),
  country: z.string(),
  dateOfBirth: commonDateOfBirthSchema,
  firstName: commonFirstNameSchema,
  lastName: commonLastNameSchema,
  //TODO: add region: get region from back end
  region: z.string(),
  userName: commonUsernameSchema,
})

{
  /** TODO: check response and handle errors*/
}
const badRequestSchema = createBadRequestSchema([
  'userName',
  'firstName',
  'lastName',
  'aboutMe',
  'dateOfBirth',
  'city',
  'country',
  'region',
])

export type ProfileSettings = z.infer<typeof ProfileSettingsSchema>

export const useGeneralInfo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updateProfile] = useUpdateProfileMutation()
  const { data: profileData, isLoading } = useGetProfileQuery()

  const [uploadAvatar] = useUploadAvatarMutation()
  /**
   * if the user has an avatar, it will be displayed in the profile settings
   * if the user has no avatar, a placeholder will be displayed
   */
  const [image, setImage] = useState<null | string>(
    profileData?.avatars && profileData.avatars.length > 0 ? profileData.avatars[0].url : null
  )
  /**
   * Memoized default values for the form
   */
  const defaultValues = useMemo(
    () => ({
      aboutMe: profileData?.aboutMe ?? '',
      city: profileData?.city ?? '',
      country: profileData?.country ?? '',
      dateOfBirth: profileData?.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : new Date('2000-01-01'),
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? '',
      region: profileData?.region ?? '',
      userName: profileData?.userName ?? '',
    }),
    [profileData]
  )
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileSettings>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(ProfileSettingsSchema),
  })

  const onSubmit = handleSubmit(async (data: ProfileSettings) => {
    /**
     * block the submit button until the request is completed
     */
    setIsSubmitting(true)
    try {
      const submissionData = {
        ...data,

        dateOfBirth: data.dateOfBirth.toISOString(), //converts the dateOfBirth to ISO string format for backend
      }

      await updateProfile(submissionData).unwrap()
      if (image && image !== profileData?.avatars[0]?.url) {
        const formData = prepareImageForUpload(image)

        await uploadAvatar(formData).unwrap()
      }

      toast.success('Profile updated successfully!')
    } catch (error) {
      handleErrorResponse({ badRequestSchema, error, isToast: true, setError })
    } finally {
      setIsSubmitting(false)
    }
  })

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleDeletePhoto = () => {
    setImage(null)
  }

  return {
    control,
    errors,
    handleCloseModal,
    handleDeletePhoto,
    handleOpenModal,
    image,
    isLoading,
    isOpen,
    isSubmitting,
    onSubmit,
    setImage,
  }
}
