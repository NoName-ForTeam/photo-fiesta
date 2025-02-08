import {useState} from "react"

import {GetPostResponse} from "@/features"
import {ROUTES} from "@/shared/config"
import {ProfileAvatar} from "@/shared/ui"
import {useTimeAgo} from "@/shared/utils"
import {Scroll, Typography} from "@photo-fiesta/ui-lib"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router"

import styles from "./publicPost.module.scss"

/**
 * PublicPost component for rendering a single public post with user details.
 */
export const PublicPost = ({post}: { post: GetPostResponse }) => {
    const router = useRouter()
    const timeAgo = useTimeAgo(post.createdAt)

    /** Handles the logic for truncating and expanding long post descriptions.
     *
     * - If the post description exceeds 80 characters, it is truncated by default.
     * - The user can toggle between viewing the full description and the truncated version by clicking a "Show More" or "Hide" button.
     * - When expanded, the description is wrapped in a Scroll component for better readability in case of overflow.
     */
    const [isExpanded, setIsExpanded] = useState(false)
    const isDescriptionLong = post.description && post.description.length > 80
    const truncatedText = post.description ? post.description.slice(0, 80) : ""
    const textHeight = isExpanded ? 192 : 72

    const classNames = {
        description: styles.description,
        photo: styles.photo,
        postContainer: styles.postContainer,
        postInfo: styles.postInfo,
        time: styles.time,
        trigger: styles.trigger,
        user: styles.user
    } as const

    /** Handles redirection to the user's profile page when a post image is clicked. */
    const handlePostClick = () => {
        router.push(
            {
                pathname: `${ROUTES.PROFILE}/${post.ownerId}`,
                query: {postId: post.id.toString()},
            },
            undefined,
            {shallow: true}
        )
    }

    //TODO: add Carousel to publicPost
    return (
        <div className={classNames.postContainer} key={post.id}>
            <div className={classNames.photo}>
                <Image
                    alt={'post image'}
                    height={240 - (textHeight - 72)}
                    onClick={handlePostClick}
                    src={post.images[0]?.url}
                    style={{transition: 'height 0.5s ease'}}
                    width={234}
                />
            </div>
            <div className={classNames.postInfo}>
                <Link className={classNames.user} href={`${ROUTES.PROFILE}/${post.ownerId}`}>
                    <ProfileAvatar avatarOwner={post.avatarOwner}/>
                    <Typography variant={'h3'}>{post.userName}</Typography>
                </Link>
                <Typography className={classNames.time} variant={"textSmall"}>{timeAgo}</Typography>
                <div className={classNames.description}
                     style={{maxHeight: `${textHeight}px`}}>
                    {isExpanded ? (
                        <Scroll>
                            {post.description}
                        </Scroll>
                    ) : (
                        <div>{truncatedText}</div>
                    )}
                </div>
                {isDescriptionLong && (
                    <Typography className={classNames.trigger} onClick={() => setIsExpanded(!isExpanded)}
                          variant={'text14'}
                    >
                            {isExpanded ? 'Hide' : 'Show More'}
                        </Typography>
                )}
            </div>
        </div>
    )
}
