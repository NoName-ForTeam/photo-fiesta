import { ComponentPropsWithoutRef } from 'react'

import { useAuthMeQuery } from '@/features'
import { PostList } from '@/features/post/ui/postList/PostList'
import Ava from '@/shared/assets/img/avaTest.png'
import { ProfileStat } from '@/shared/ui/profileStat/profileStat'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

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

export const Profile = ({ className }: ProfileProps) => {
  const router = useRouter()
  const { data: authData, isError } = useAuthMeQuery()

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

  let button

  if (isError) {
    return
  }
  if (authData) {
    button =
      String(authData.userId) === router.query.userId ? (
        <Button variant={'secondary'}>
          <Typography variant={'h3'}>Profile Settings</Typography>
        </Button>
      ) : (
        <div className={classNames.btnContainer}>
          <Button>
            <Typography variant={'h3'}>Follow</Typography>
          </Button>
          <Button variant={'secondary'}>
            <Typography variant={'h3'}>Send Message</Typography>
          </Button>
        </div>
      )
  }

  return (
    <div className={classNames.wrapper}>
      <div className={clsx(classNames.root, className)}>
        <Image alt={'ava'} src={Ava} />
        <div className={classNames.info}>
          <div className={classNames.title}>
            <Typography variant={'h1'}>{authData?.userId}</Typography>
            {button}
          </div>
          <div className={classNames.counts}>
            <ProfileStat className={classNames.firstStat} counts={2218} title={'Following'} />
            <ProfileStat className={classNames.secondStat} counts={2358} title={'Followers'} />
            <ProfileStat counts={2764} title={'Publications'} />
          </div>
          <Typography className={classNames.bio} variant={'text16'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </div>
      </div>
      <PostList />
    </div>
  )
}
