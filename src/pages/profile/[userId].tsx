import {
  GetPublicPostsResponse,
  GetPublicProfileResponse,
  Profile,
  useAuthMeQuery,
} from '@/features'
import { API_URLS } from '@/shared/config'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

/**
 * Fetches the user's public profile, a specific post by ID, and all their public posts.
 * Queries based on the userId and postId parameters from the request.
 *
 * @returns {Promise<{ props: { posts: GetPublicPostsResponse, profileId: number, userProfile: GetPublicProfileResponse, postId: number, publicPost: GetPostResponse } }>} Server-side props.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async context => {
  const { userId } = context.query

  const userProfileResponse = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetPublicProfileById(Number(userId))}`
  )
  const userProfile: GetPublicProfileResponse = await userProfileResponse.json()

  const publicPostsResponse = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetUserPublicPosts(null, Number(userId))}?pageSize=8`
  )
  const userAllPosts: GetPublicPostsResponse = await publicPostsResponse.json()

  return {
    props: {
      posts: userAllPosts,
      userProfile,
    },
  }
}

type ProfilePageProps = {
  posts: GetPublicPostsResponse
  userProfile: GetPublicProfileResponse
}

/**
 * ProfilePage component for rendering a user's public profile with their posts.
 * Fetches data server-side using Next.js `getServerSideProps`.
 */
const ProfilePage = ({ posts, userProfile }: ProfilePageProps) => {
  const { data: currentUser } = useAuthMeQuery()

  const isOwnProfile = currentUser?.userId === userProfile.id

  return (
    <>
      <Head>
        <title>Profile: {userProfile?.userName}</title>
        <meta
          content={`Profile of ${userProfile?.userName}. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`profile, ${userProfile?.userName}, GitHub`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <Profile
        isOwnProfile={isOwnProfile}
        posts={posts}
        profileId={userProfile.id}
        profileInfo={userProfile}
      />
    </>
  )
}

export default ProfilePage
