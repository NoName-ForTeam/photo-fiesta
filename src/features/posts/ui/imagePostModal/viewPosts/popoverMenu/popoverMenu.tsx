import { useFollowUserMutation, useRemoveFollowerMutation } from '@/features'
import {
  CloseOutline,
  CopyOutline,
  Edit2,
  MoreHorizontalOutline,
  PersonAdd,
  PersonRemove,
} from '@/shared/assets'
import { Loader, PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui'
import { copyLink, useFollowHandler, useModal, useTranslation } from '@/shared/utils'
import { ConfirmationModal } from '@/widgets'
import { Button } from '@photo-fiesta/ui-lib'

import styles from './popoverMenu.module.scss'

type PopoverMenuProps = {
  confirmDelete: () => void
  /* Indicates the initial follow status of the user */
  initialFollowState: boolean
  /* Determines if the profile belongs to the current user */
  isOwnProfile: boolean
  /* Function to toggle edit mode for posts */
  setIsEditing: (isEditing: boolean) => void
  /* The ID of the user to follow/unfollow */
  userId: number
}
/**
 * PopoverMenu component provides a context menu for user actions such as follows/unfollow,
 * edit/delete post, or copy post link, depending on the user's profile ownership.
 */
export const PopoverMenu = ({
  confirmDelete,
  initialFollowState,
  isOwnProfile,
  setIsEditing,
  userId,
}: PopoverMenuProps) => {
  const { t } = useTranslation()
  const confirmDeleteModal = useModal()
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useRemoveFollowerMutation()

  const { follow, toggleFollow } = useFollowHandler({
    followUser,
    initialFollowState,
    unfollowUser,
    userId,
  })

  const isLoading = isFollowLoading || isUnfollowLoading

  if (isLoading) {
    return <Loader />
  }

  const classNames = {
    content: styles.content,
    icon: styles.icon,
    popover: styles.popover,
  }

  return (
    <>
      <div className={classNames.popover}>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <MoreHorizontalOutline className={classNames.icon} />
          </PopoverTrigger>
          <PopoverContent
            align={'start'}
            alignOffset={20}
            className={classNames.content}
            side={'right'}
            sideOffset={1}
          >
            {isOwnProfile ? (
              <>
                <Button onClick={() => setIsEditing(true)} variant={'icon-link'}>
                  <Edit2 className={classNames.icon} />
                  {t.posts.edit}
                </Button>
                <Button
                  onClick={() => confirmDeleteModal.openModal('ConfirmDelete')}
                  variant={'icon-link'}
                >
                  <CloseOutline className={classNames.icon} />
                  {t.posts.delete}
                </Button>
              </>
            ) : (
              <>
                <Button disabled={isLoading} onClick={toggleFollow} variant={'icon-link'}>
                  {follow ? (
                    <PersonRemove className={classNames.icon} />
                  ) : (
                    <PersonAdd className={classNames.icon} />
                  )}
                  {follow ? t.myProfile.unfollow : t.myProfile.follow}
                </Button>
                <Button onClick={() => copyLink()} variant={'icon-link'}>
                  <CopyOutline className={classNames.icon} />
                  {t.posts.copyLink}
                </Button>
              </>
            )}
          </PopoverContent>
        </PopoverRoot>
      </div>
      {confirmDeleteModal.isModalOpen && (
        <ConfirmationModal
          closeModal={confirmDeleteModal.closeModal}
          content={t.posts.deletePostText}
          handleConfirmation={confirmDelete}
          isOpen={confirmDeleteModal.isModalOpen}
          isTwoButtons
          title={t.posts.deletePost}
        />
      )}
    </>
  )
}
