import { ChangeEvent, useState } from 'react'

import { useGetPostsByUsernameQuery } from '@/features'
import { useDebounce } from '@/shared/utils'
import { Input, Typography } from '@photo-fiesta/ui-lib'

import s from './search.module.scss'

/**
 * Search component for querying posts by username and displaying recent requests.
 */

export const Search = () => {
  const [username, setUsername] = useState(localStorage.getItem('recent') || '')

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
  const { data: posts } = useGetPostsByUsernameQuery(
    { username: debouncedSearchTerm },
    { skip: !debouncedSearchTerm }
  )

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

  const postsList =
    posts?.items.length && posts.items.length > 0
      ? posts?.items.map(post => (
          <div className={classNames.wrapper} key={post.id}>
            <img alt={'avatar'} className={classNames.img} src={post.avatarOwner} />
            <div>
              <Typography variant={'textMedium14'}>{post.userName}</Typography>
              <Typography className={classNames.fullName} variant={'text14'}>
                {post.owner.firstName} {post.owner.lastName}
              </Typography>
            </div>
          </div>
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
          {postsList?.length ? (
            postsList
          ) : (
            <div className={classNames.empty}>
              <Typography variant={'textBold14'}>Oops! This place looks empty!</Typography>
              <Typography variant={'textSmall'}>No recent requests</Typography>
            </div>
          )}
        </div>
      ) : (
        <div className={classNames.container}>{postsList}</div>
      )}
    </div>
  )
}
