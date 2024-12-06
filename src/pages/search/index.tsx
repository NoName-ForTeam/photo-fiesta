import { Search } from '@/features/search'
import { Typography } from '@photo-fiesta/ui-lib'
import Head from 'next/head'
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
      <div
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          gap: '13px',
          justifyContent: 'flex-end',
          marginTop: '35px',
          paddingLeft: '24px',
          paddingRight: '64px',
          width: '100%',
        }}
      >
        <Typography variant={'h1'}>Search</Typography>
        <Search />
      </div>
    </>
  )
}

export default SearchPage
