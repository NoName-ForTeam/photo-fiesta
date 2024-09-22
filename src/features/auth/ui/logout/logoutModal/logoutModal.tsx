import { CloseOutline } from '@/shared/assets'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Typography,
} from '@photo-fiesta/ui-lib'

import styles from './logoutModal.module.scss'
export type LogoutModalProps = {
  closeModal: () => void
  confirmLogout: () => void
  open: boolean
}

export const LogoutModal = ({ closeModal, confirmLogout, open }: LogoutModalProps) => {
  const classNames = {
    container: styles.container,
    content: styles.content,
    description: styles.description,
    footer: styles.footer,
    header: styles.header,
    icon: styles.icon,
  } as const

  return (
    <Modal onOpenChange={closeModal} open={open}>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <ModalTitle>
            <Typography variant={'h1'}>Log Out</Typography>
          </ModalTitle>
          <ModalClose onClick={closeModal}>
            <CloseOutline className={classNames.icon} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.container}>
          <Typography className={classNames.description} variant={'text16'}>
            Are you really want to logout of your account?
          </Typography>
          <ModalFooter className={classNames.footer}>
            <Button onClick={closeModal} variant={'secondary'}>
              No
            </Button>
            <Button onClick={confirmLogout} variant={'primary'}>
              Yes
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
