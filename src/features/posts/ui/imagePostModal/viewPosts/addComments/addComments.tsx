import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useCreateCommentMutation } from '@/features'
import { useTranslation } from '@/shared/utils'
import { Button, Input, Typography } from '@photo-fiesta/ui-lib'

import styles from './addComments.module.scss'

type AddCommentsProps = {
  postId: number
}
export const AddComments = ({ postId }: AddCommentsProps) => {
  const { t } = useTranslation()
  const [createComment, { isLoading }] = useCreateCommentMutation()
  const [commentContent, setCommentContent] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!commentContent.trim()) {
      toast.error('string is empty')

      return
    }

    try {
      await createComment({ content: commentContent, postId }).unwrap()
      setCommentContent('')
    } catch (e) {
      toast.error('Error creating comment')
    }
  }

  return (
    <div>
      <form className={styles.addComment} onSubmit={onSubmit}>
        <Typography className={styles.placeholder} variant={'text14'}>
          <Input
            className={styles.input}
            disabled={isLoading}
            onChange={e => setCommentContent(e.target.value)}
            placeholder={t.posts.addComment}
            value={commentContent}
          />
        </Typography>
        <Button disabled={isLoading} type={'submit'} variant={'ghost'}>
          {t.posts.publish}
        </Button>
      </form>
    </div>
  )
}
