import { ComponentPropsWithoutRef } from 'react'

import { PostList, useProfile } from '@/features'
import { ProfileAvatar, ProfileStat } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './profile.module.scss'

export type ProfileProps = ComponentPropsWithoutRef<'div'>

/**
 * `Profile` is a component that displays a user's profile information, including their avatar,
 * follower statistics, and options to follow or send a message.
 * If the authenticated user is viewing their own profile, they have the option to access profile settings.
 * It also displays a list of posts below the profile information.
 *
 * @example
 * return (
 *   <Profile />
 * )
 */
//TODO: add translations
export const Profile = ({ className }: ProfileProps) => {
  const { t } = useTranslation()
  const { authData, handleProfileSettings, isError, isOwnProfile, profileInfo } = useProfile()
  const userAvatar = profileInfo?.avatars.length ? [profileInfo.avatars[0]] : []
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

  return (
    <div className={classNames.wrapper}>
      <div className={clsx(classNames.root, className)}>
        <ProfileAvatar avatarOwner={profileInfo?.avatars[0]?.url} height={204} width={204} />
        <div className={classNames.info}>
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
            {profileInfo?.aboutMe}
          </Typography>
        </div>
      </div>
      {/*TODO: fix type of userId*/}
      <PostList avatar={userAvatar} userId={authData?.userId ?? 0} />
    </div>
  )
}
