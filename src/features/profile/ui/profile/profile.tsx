import React, { ComponentPropsWithoutRef, useState } from 'react'

import { PostList, useCreatePostMutation, useUploadPostImageMutation } from '@/features/posts'
import { avaTest } from '@/shared/assets'
import { Button, Modal, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './profile.module.scss'

import { useProfile } from './useProfile'

export type ProfileProps = ComponentPropsWithoutRef<'div'>

export const Profile = ({ className }: ProfileProps) => {
  const { authData, handleProfileSettings, isError, isOwnProfile } = useProfile()
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadPostImageMutation()
  const [openModal, setOpenModal] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  if (isError) {
    return null
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setSelectedImage(file)
    }
  }

  const handleSavePost = async () => {
    if (selectedImage && description) {
      const formData = new FormData()

      formData.append('file', selectedImage)

      const imageUploadData = await uploadImage(formData).unwrap()

      // Создаем пост
      if (Array.isArray(imageUploadData)) {
        await createPost({
          childrenMetadata: imageUploadData.map((img: { uploadId: string }) => ({
            uploadId: img.uploadId,
          })),
          description,
        })
        // else {
        //   // Обработка случая, когда imageUploadData не является массивом
        //   await createPost({
        //     childrenMetadata: [{ uploadId: imageUploadData.uploadId }],
        //     description,
        //   })
        // }
      }

      setOpenModal(false)
      setDescription('')
      setSelectedImage(null)
    }
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.root, className)}>
        <Image alt={'ava'} src={avaTest} />
        <div className={styles.info}>
          <div className={styles.title}>
            <Typography variant={'h1'}>{authData?.userId}</Typography>
            {isOwnProfile && (
              <Button onClick={handleProfileSettings} variant={'secondary'}>
                <Typography variant={'h3'}>Настройки профиля</Typography>
              </Button>
            )}
          </div>
        </div>

        {/* Кнопка добавления поста */}
        {isOwnProfile && <Button onClick={() => setOpenModal(true)}>Добавить пост</Button>}

        {/* Модалка для создания поста */}
        {openModal && (
          <Modal onOpenChange={() => setOpenModal(false)} open={openModal}>
            <div>
              <Typography variant={'h2'}>Создать новый пост</Typography>

              {/* Поле выбора картинки */}
              <input accept={'image/*'} onChange={handleImageChange} type={'file'} />

              {/* Превью изображения */}
              {selectedImage && (
                <div>
                  <Image
                    alt={'Selected image'}
                    height={300}
                    src={URL.createObjectURL(selectedImage)}
                    width={300}
                  />
                </div>
              )}

              <textarea
                onChange={e => setDescription(e.target.value)}
                placeholder={'Write a description...'}
                value={description}
              />

              <Button
                disabled={isCreatingPost || isUploading || !selectedImage || !description}
                onClick={handleSavePost}
              >
                {isCreatingPost || isUploading ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </Modal>
        )}

        {/* Список постов */}
        <PostList userId={authData?.userId} />
      </div>
    </div>
  )
}

// import { ComponentPropsWithoutRef } from 'react'
//
// import { PostList } from '@/features/posts'
// import { avaTest } from '@/shared/assets'
// import { ProfileStat } from '@/shared/ui'
// import { useTranslation } from '@/shared/utils'
// import { Button, Typography } from '@photo-fiesta/ui-lib'
// import clsx from 'clsx'
// import Image from 'next/image'
//
// import styles from './profile.module.scss'
//
// import { useProfile } from './useProfile'
//
// export type ProfileProps = ComponentPropsWithoutRef<'div'>
//
// /**
//  * `Profile` is a component that displays a user's profile information, including their avatar,
//  * follower statistics, and options to follow or send a message.
//  * If the authenticated user is viewing their own profile, they have the option to access profile settings.
//  * It also displays a list of posts below the profile information.
//  *
//  * @example
//  * return (
//  *   <Profile />
//  * )
//  */
// //TODO: add translations
// export const Profile = ({ className }: ProfileProps) => {
//   const { t } = useTranslation()
//   const { authData, handleProfileSettings, isError, isOwnProfile } = useProfile()
//
//   const classNames = {
//     bio: styles.bio,
//     btnContainer: styles.btnContainer,
//     counts: styles.counts,
//     firstStat: styles.firstStat,
//     info: styles.info,
//     root: styles.root,
//     secondStat: styles.secondStat,
//     title: styles.title,
//     wrapper: styles.wrapper,
//   } as const
//
//   if (isError) {
//     return null
//   }
//   const profileButton = isOwnProfile ? (
//     <Button onClick={handleProfileSettings} variant={'secondary'}>
//       <Typography variant={'h3'}>{t.myProfile.settings}</Typography>
//     </Button>
//   ) : (
//     <div className={styles.btnContainer}>
//       <Button>
//         <Typography variant={'h3'}>{t.myProfile.follow}</Typography>
//       </Button>
//       <Button variant={'secondary'}>
//         <Typography variant={'h3'}>{t.myProfile.sendMessage}</Typography>
//       </Button>
//     </div>
//   )
//
//   return (
//     <div className={classNames.wrapper}>
//       <div className={clsx(classNames.root, className)}>
//         <Image alt={'ava'} src={avaTest} />
//         <div className={classNames.info}>
//           <div className={classNames.title}>
//             <Typography variant={'h1'}>{authData?.userId}</Typography>
//             {profileButton}
//           </div>
//           <div className={classNames.counts}>
//             <ProfileStat
//               className={classNames.firstStat}
//               counts={2218}
//               title={t.myProfile.following}
//             />
//             <ProfileStat
//               className={classNames.secondStat}
//               counts={2358}
//               title={t.myProfile.followers}
//             />
//             <ProfileStat counts={2764} title={t.myProfile.publications} />
//           </div>
//           <Typography className={classNames.bio} variant={'text16'}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//             exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//           </Typography>
//         </div>
//       </div>
//       <PostList userId={authData?.userId} />
//     </div>
//   )
// }
