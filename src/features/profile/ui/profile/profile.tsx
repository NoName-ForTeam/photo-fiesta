import { ComponentPropsWithoutRef } from 'react'

import {
  Follow,
  GetPublicPostsResponse,
  GetPublicProfileResponse,
  PostList,
  useGetProfileUserWithPostQuery,
} from '@/features'
import { ROUTES } from '@/shared/config'
import { ProfileAvatar, ProfileStat } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import styles from './profile.module.scss'

export type ProfileProps = {
  isOwnProfile: boolean
  posts: GetPublicPostsResponse
  profileId: number
  profileInfo: GetPublicProfileResponse
} & ComponentPropsWithoutRef<'div'>

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
export const Profile = ({ className, isOwnProfile, posts, profileInfo }: ProfileProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data } = useGetProfileUserWithPostQuery({ userName: profileInfo.userName })

  /**
   * Handles navigation to profile settings and refetches profile data.
   */
  const handleProfileSettings = () => router.push(ROUTES.SETTINGS)

  const userAvatar = profileInfo.avatars.length ? [profileInfo.avatars[0]] : []
  const isFollowing = data?.isFollowing ?? false

  const classNames = {
    avatar: styles.avatar,
    bio: styles.bio,
    bioMobile: styles.bioMobile,
    btnContainer: styles.btnContainer,
    counts: styles.counts,
    firstStat: styles.firstStat,
    info: styles.info,
    root: styles.root,
    secondStat: styles.secondStat,
    title: styles.title,
    titleMobile: styles.titleMobile,
    wrapper: styles.wrapper,
  } as const

  const profileButton = isOwnProfile ? (
    <Button onClick={handleProfileSettings} variant={'secondary'}>
      <Typography variant={'h3'}>{t.myProfile.settings}</Typography>
    </Button>
  ) : (
    <div className={styles.btnContainer}>
      <Follow initialFollowState={isFollowing} userId={profileInfo.id} />
      <Button variant={'secondary'}>
        <Typography variant={'h3'}>{t.myProfile.sendMessage}</Typography>
      </Button>
    </div>
  )

  return (
    <div className={classNames.wrapper}>
      <div className={clsx(classNames.root, className)}>
        <ProfileAvatar avatarOwner={profileInfo.avatars[0]?.url} height={204} width={204} />
        <div className={classNames.info}>
          <div className={classNames.title}>
            <Typography variant={'h1'}>{profileInfo.userName}</Typography>
            {profileButton}
          </div>
          <div className={classNames.counts}>
            <ProfileStat
              className={classNames.firstStat}
              counts={profileInfo.userMetadata.following}
              title={t.myProfile.following}
            />
            <ProfileStat
              className={classNames.secondStat}
              counts={profileInfo.userMetadata.followers}
              title={t.myProfile.followers}
            />
            <ProfileStat
              counts={profileInfo.userMetadata.publications}
              title={t.myProfile.publications}
            />
          </div>
          <div className={classNames.bio}>
            <Typography variant={'text16'}>{profileInfo.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={classNames.titleMobile}>
        <Typography variant={'textBold16'}>{profileInfo.id}</Typography>
      </div>
      <div className={classNames.bioMobile}>
        <Typography variant={'text14'}>{profileInfo.aboutMe}</Typography>
      </div>
      <PostList avatar={userAvatar} initialPosts={posts} userId={profileInfo.id} />
    </div>
  )
}
