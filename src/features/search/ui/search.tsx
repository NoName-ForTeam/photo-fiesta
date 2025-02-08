import { ChangeEvent, useEffect, useState } from 'react'

import { UserProfile, useGetUserProfileQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { ProfileAvatar } from '@/shared/ui'
import { useDebounce } from '@/shared/utils'
import { Input, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import s from './search.module.scss'

/**
 * Search component for querying posts by username and displaying recent requests.
 */

export const Search = () => {
  // const [username, setUsername] = useState(localStorage.getItem('recent'))

  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('recent') || ''

    setUsername(storedUsername)
  }, [])

  /**
   * State for controlling the visibility of the "Recent Requests" section.
   * Defaults to true, showing the recent requests initially.
   */
  const [recentRequests, setViewRecentRequests] = useState(true)
  const debouncedSearchTerm = useDebounce(username || '', 500)

  /**
   * RTK Query hook for fetching posts based on the debounced username.
   * Skips the query if the debounced username is empty.
   */
  const { data: users } = useGetUserProfileQuery({
    cursor: 0,
    pageNumber: 1,
    pageSize: 12,
    search: debouncedSearchTerm,
  })

  const classNames = {
    container: s.container,
    empty: s.emptyList,
    fullName: s.fullName,
    img: s.img,
    recent: s.recent,
    wrapper: s.wrapper,
  } as const

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
    setViewRecentRequests(false)
  }

  const onBlurHandler = () => {
    setViewRecentRequests(true)
    localStorage.setItem('recent', username || '')
  }

  const usersList =
    Array.isArray(users?.items) && users.items.length > 0
      ? users.items.map((user: UserProfile) => (
          <Link className={classNames.wrapper} href={`${ROUTES.PROFILE}/${user.id}`} key={user.id}>
            <ProfileAvatar avatarOwner={user.avatars?.[0]?.url} className={classNames.img} />
            <div>
              <Typography variant={'textMedium14'}>{user.userName}</Typography>
              <Typography className={classNames.fullName} variant={'text14'}>
                {user.firstName} {user.lastName}
              </Typography>
            </div>
          </Link>
        ))
      : ''

  return (
    <div>
      <Input
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        placeholder={'Search'}
        value={username || ''}
        variant={'search'}
        width={'100%'}
      />

      {recentRequests ? (
        <div className={classNames.recent}>
          <Typography variant={'textBold16'}>Recent requests</Typography>
          {usersList?.length ? (
            usersList
          ) : (
            <div className={classNames.empty}>
              <Typography variant={'textBold14'}>Oops! This place looks empty!</Typography>
              <Typography variant={'textSmall'}>No recent requests</Typography>
            </div>
          )}
        </div>
      ) : (
        <div className={classNames.container}>{usersList}</div>
      )}
    </div>
  )
}
