import { useState } from 'react'
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
  const [image, setImage] = useState<null | string>(null)
  const [updateProfile] = useUpdateProfileMutation()
  const { data: profileData } = useGetProfileQuery()

  const [uploadAvatar] = useUploadAvatarMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileSettings>({
    defaultValues: {
      aboutMe: profileData?.aboutMe ?? '',
      city: profileData?.city ?? '',
      country: profileData?.country ?? '',
      dateOfBirth: profileData?.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : new Date('2000-01-01'),
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? '',
      region: profileData?.region ?? 'string',
      userName: profileData?.userName ?? '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ProfileSettingsSchema),
  })

  const onSubmit = handleSubmit(async (data: ProfileSettings) => {
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
    }
  })

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return {
    control,
    errors,
    handleCloseModal,
    handleOpenModal,
    image,
    isOpen,
    onSubmit,
    setImage,
  }
}
