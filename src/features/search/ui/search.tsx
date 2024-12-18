import { ChangeEvent, useEffect, useState } from 'react'

import { useGetPostsByUsernameQuery } from '@/features'
import ResultList from '@/features/search/ui/resultList/resultList'
import { useDebounce } from '@/shared/utils'
import { Input, Typography } from '@photo-fiesta/ui-lib'

import s from './search.module.scss'

/**
 * Search component for querying posts by username and displaying recent requests.
 */

const SEARCH_DEBOUNCE_DELAY = 500

export const Search = () => {
  const [username, setUsername] = useState('')

  /**
   * State for controlling the visibility of the "Recent Requests" section.
   * Defaults to true, showing the recent requests initially.
   */
  const [isRecentRequests, setViewIsRecentRequests] = useState(true)
  const debouncedSearchTerm = useDebounce(username || '', SEARCH_DEBOUNCE_DELAY)

  useEffect(() => {
    const recent = typeof window !== 'undefined' ? localStorage.getItem('recent') : ''

    setUsername(recent || '')
  }, [])

  /**
   * RTK Query hook for fetching posts based on the debounced username.
   * Skips the query if the debounced username is empty.
   */
  const { data } = useGetPostsByUsernameQuery(
    { userName: debouncedSearchTerm },
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
    setViewIsRecentRequests(false)
  }

  const onBlurHandler = () => {
    setViewIsRecentRequests(true)
    localStorage.setItem('recent', username || '')
  }

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

      {isRecentRequests ? (
        <div className={classNames.recent}>
          <Typography variant={'textBold16'}>Recent requests</Typography>
          {data?.items?.length ? (
            <ResultList data={data} />
          ) : (
            <div className={classNames.empty}>
              <Typography variant={'textBold14'}>Oops! This place looks empty!</Typography>
              <Typography variant={'textSmall'}>No recent requests</Typography>
            </div>
          )}
        </div>
      ) : (
        <div className={classNames.container}>
          <ResultList data={data || null} />
        </div>
      )}
    </div>
  )
}
