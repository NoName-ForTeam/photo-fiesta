import { CloseOutline } from '@/shared/assets'
import { useTranslation } from '@/shared/utils'
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
  buttonTitle?: string
  closeModal: () => void
  content: string
  handleConfirmation: () => void
  isOpen: boolean
  //*  show only one button if false, default true
  isTwoButtons?: boolean
  pushNo?: () => void
  title: null | string
}

export const ConfirmationModal = ({
  buttonTitle = 'Ok',
  closeModal,
  content,
  handleConfirmation,
  isOpen,
  isTwoButtons = true,
  pushNo,
  title,
}: ModalProps) => {
  const { t } = useTranslation()
  const classNames = {
    buttonsContainer: styles.buttonsContainer,
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
            {isTwoButtons && (
              <div className={classNames.buttonsContainer}>
                <Button onClick={handleConfirmation} variant={'outlined'}>
                  {t.buttonsConfirm.yes}
                </Button>
                <Button onClick={pushNo ? pushNo : closeModal} variant={'primary'}>
                  {t.buttonsConfirm.no}
                </Button>
              </div>
            )}
            {!isTwoButtons && (
              <Button
                className={classNames.one}
                fullWidth
                onClick={handleConfirmation}
                variant={'primary'}
              >
                {buttonTitle}
              </Button>
            )}
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
