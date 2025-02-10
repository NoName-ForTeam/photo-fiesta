import { Search } from '@/features/search'
import { SearchWrapper } from '@/widgets/searchWrapper/searchWrapper'
import { Typography } from '@photo-fiesta/ui-lib'
import Head from 'next/head'

/**
 * SearchPage Component
 * This component represents the search page of the Photo Fiesta application.
 */

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Search</title>
        <meta
          content={`Search page of Photo Fiesta. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`search, photo, fiesta, github`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <SearchWrapper>
        <Typography variant={'h1'}>Search</Typography>
        <Search />
      </SearchWrapper>
    </>
  )
}

export default SearchPage
