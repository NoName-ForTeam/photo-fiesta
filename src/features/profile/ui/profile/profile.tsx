import { ComponentPropsWithoutRef, useState } from 'react'

import { PostList, useGetUserPostsQuery } from '@/features/posts'
import { ImagePostModal } from '@/features/posts/ui/imagePostModal/imagePostModal'
import { avaTest } from '@/shared/assets'
import { ProfileStat } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { ModalAddPhoto } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './profile.module.scss'

import { useProfile } from './useProfile'

export type ProfileProps = ComponentPropsWithoutRef<'div'>

export const Profile = ({ className }: ProfileProps) => {
  const { t } = useTranslation()
  const { authData, handleProfileSettings, isError, isOwnProfile, profileInfo } = useProfile()

  const userId = authData?.userId
  const { data: userPosts } = useGetUserPostsQuery({ userId })
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => setOpenModal(true)

  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleClosePostModal = () => {
    setOpenPostModal(false)
    setSelectedImage(null) // Сбрасываем выбранное изображение после закрытия
  }

  const handleOpenPostModal = () => setOpenPostModal(true)

  const classNames = {
    bio: styles.bio,
    btnContainer: styles.btnContainer,
    counts: styles.counts,
    firstStat: styles.firstStat,
    info: styles.info,
    root: styles.root,
    secondStat: styles.secondStat,
    title: styles.title,
    wrapper: styles.wrapper,
  } as const

  if (isError) {
    return null
  }
  const profileButton = isOwnProfile ? (
    <Button onClick={handleProfileSettings} variant={'secondary'}>
      <Typography variant={'h3'}>{t.myProfile.settings}</Typography>
    </Button>
  ) : (
    <div className={styles.btnContainer}>
      <Button>
        <Typography variant={'h3'}>{t.myProfile.follow}</Typography>
      </Button>
      <Button variant={'secondary'}>
        <Typography variant={'h3'}>{t.myProfile.sendMessage}</Typography>
      </Button>
    </div>
  )

  console.log(userPosts)

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.root, className)}>
        <Image alt={'ava'} src={avaTest} />
        <div className={styles.info}>
          <div className={classNames.title}>
            <Typography variant={'h1'}>{authData?.userId}</Typography>
            {profileButton}
          </div>
          <div className={classNames.counts}>
            <ProfileStat
              className={classNames.firstStat}
              counts={2218}
              title={t.myProfile.following}
            />
            <ProfileStat
              className={classNames.secondStat}
              counts={2358}
              title={t.myProfile.followers}
            />
            <ProfileStat counts={2764} title={t.myProfile.publications} />
          </div>
          <Typography className={classNames.bio} variant={'text16'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </div>
      </div>

      {/* Кнопка добавления поста */}
      {isOwnProfile && <Button onClick={handleOpenModal}>Добавить пост</Button>}

      {/* Модалка для создания поста */}
      {openModal && (
        <ModalAddPhoto
          handleCloseModal={() => {
            handleCloseModal()
            handleOpenPostModal() // Открываем модалку для поста после закрытия ModalAddPhoto
          }}
          isOpen={openModal}
          setImage={setSelectedImage}
        />
      )}
      {openPostModal && selectedImage && (
        <ImagePostModal
          avatar={profileInfo?.avatars}
          handleClose={handleClosePostModal}
          selectedImage={selectedImage}
          userId={profileInfo?.id}
        />
      )}
      {/* Список постов */}
      <PostList userId={authData?.userId} />
    </div>
  )
}
