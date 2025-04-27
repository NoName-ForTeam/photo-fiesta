import { Favorites } from '@/features'
import Head from 'next/head'

const FavoritesPage = () => {
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta
          content={`Favorites page of Photo Fiesta. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`search, photo, fiesta, github`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <Favorites />
    </>
  )
}

export default FavoritesPage
