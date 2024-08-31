import { CloseOutline } from '@/assets'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Typography,
} from '@photo-fiesta/ui-lib'

import styles from './sentEmail.module.scss'

export type SentEmailProps = {
  email?: string
}
export const SentEmail = ({ email }: SentEmailProps) => {
  const classNames = {
    container: styles.container,
    content: styles.content,
    description: styles.description,
    footer: styles.footer,
    header: styles.header,
    icon: styles.icon,
  } as const

  const finalEmail = email ?? 'epam@epam.com'

  const onClickHandler = () => {}

  return (
    <Modal open>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <Typography variant={'h1'}>Email sent</Typography>
          <ModalClose>
            <CloseOutline className={classNames.icon} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.container}>
          <Typography className={classNames.description} variant={'text16'}>
            We have sent a link to confirm your email to {finalEmail}
          </Typography>
          <ModalFooter className={classNames.footer}>
            <Button onClick={onClickHandler}>OK</Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
