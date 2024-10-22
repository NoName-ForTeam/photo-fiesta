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
  confirmation: () => void
  content: string
  isOpen: boolean
  //*  show only one button if false, default true
  isTwoButtons?: boolean
  title: null | string
}
export const ConfirmationModal = ({
  buttonTitle = 'Ok',
  closeModal,
  confirmation,
  content,
  isOpen,
  isTwoButtons = true,
  title,
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

  const { t } = useTranslation()

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
              // TODO: create names in buttons by props
              <>
                <Button onClick={closeModal} variant={'secondary'}>
                  {t.no}
                </Button>
                <Button onClick={confirmation} variant={'primary'}>
                  {t.yes}
                </Button>
              </>
            )}
            {!isTwoButtons && (
              <Button
                className={classNames.one}
                fullWidth
                onClick={confirmation}
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
