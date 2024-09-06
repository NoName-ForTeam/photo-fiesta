import { CloseOutline } from '@/assets/icons'
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
  closeModal: () => void
  email?: string
}
export const SentEmail = ({ closeModal, email }: SentEmailProps) => {
  const classNames = {
    container: styles.container,
    content: styles.content,
    description: styles.description,
    footer: styles.footer,
    header: styles.header,
    icon: styles.icon,
  } as const

  const finalEmail = email ?? 'epam@epam.com'

  return (
    <Modal open>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <Typography variant={'h1'}>Email sent</Typography>
          <ModalClose onClick={closeModal}>
            <CloseOutline className={classNames.icon} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.container}>
          <Typography className={classNames.description} variant={'text16'}>
            We have sent a link to confirm your email to {finalEmail}
          </Typography>
          <ModalFooter className={classNames.footer}>
            <Button onClick={closeModal}>OK</Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
