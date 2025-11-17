import {GetPostResponse, PublicPost} from "@/features"

import styles from "./publicPosts.module.scss"

/**
 * PublicPosts component for displaying a grid of public posts.
 */
export const PublicPosts=({items}: {items: GetPostResponse[]})=>{

    const classNames = {
        posts: styles.posts,
    } as const


const publicPosts = items && items.length > 0 ? (
    items?.map(post => (
        <PublicPost key={post.id} post={post} />
    ))
) : (
    <div>No posts available</div>
)

    return (
        <div className={classNames.posts}>
            {publicPosts}
        </div>
    )
}
