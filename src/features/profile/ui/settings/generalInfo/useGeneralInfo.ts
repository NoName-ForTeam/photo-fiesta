import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  commonAboutMeSchema,
  commonDateOfBirthSchema,
  commonFirstNameSchema,
  commonLastNameSchema,
  commonUsernameSchema,
  createBadRequestSchema,
  handleErrorResponse,
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

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileSettings>({
    // TODO: add default values from backend
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: new Date('2000-01-01'),
      firstName: '',
      lastName: '',
      region: 'string',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(ProfileSettingsSchema),
  })

  const onSubmit = handleSubmit(async (data: ProfileSettings) => {
    try {
      {
        /**TODO: add api call to update profile settings and post request for avatar,
         * for date to back end use date of birth in ISO format: date.toISOString()
         */
      }
      // eslint-disable-next-line no-console
      console.log(data)
    } catch (error) {
      handleErrorResponse({ badRequestSchema, error, setError })
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
