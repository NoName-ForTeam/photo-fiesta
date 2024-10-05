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

import styles from './confirmationModal.module.scss'

type ModalProps = {
  closeModal: () => void
  confirmation: () => void
  content: string
  isOpen: boolean
  title: string
  //*  show only one button if false
  two: boolean
}
//TODO: add translations
export const ConfirmationModal = ({
  closeModal,
  confirmation,
  content,
  isOpen,
  title,
  two = true,
}: ModalProps) => {
  const classNames = {
    container: styles.container,
    content: styles.content,
    description: styles.description,
    footer: styles.footer,
    header: styles.header,
    icon: styles.icon,
    one: styles.one,
  } as const

  return (
    <Modal onOpenChange={closeModal} open={isOpen}>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <ModalTitle>
            <Typography variant={'h1'}>{title}</Typography>
          </ModalTitle>
          <ModalClose onClick={closeModal}>
            <CloseOutline className={classNames.icon} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.container}>
          <Typography className={classNames.description} variant={'text16'}>
            {content}
          </Typography>
          <ModalFooter className={classNames.footer}>
            {two && (
              <>
                <Button onClick={closeModal} variant={'secondary'}>
                  No
                </Button>
                <Button onClick={confirmation} variant={'primary'}>
                  Yes
                </Button>
              </>
            )}
            {!two && (
              <Button
                className={classNames.one}
                fullWidth
                onClick={confirmation}
                variant={'primary'}
              >
                Ok
              </Button>
            )}
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
