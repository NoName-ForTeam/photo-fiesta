import { DetailedPayment, PaymentCard } from '@/features'
import clsx from 'clsx'

import styles from './myPaymentsCardsMobile.module.scss'

type MyPaymentsCardsMobileProps = {
  className?: string
  payments: DetailedPayment[]
}

/**
 * The MyPaymentsCardsMobile component renders payment cards for a mobile view.
 * This component is specifically designed for mobile devices and is replaced by
 * the MyPaymentsList component on desktop view.
 *
 * @example
 * <MyPaymentsCardsMobile payments={arrayOfPayments} />
 */

export const MyPaymentsCardsMobile = ({ className, payments }: MyPaymentsCardsMobileProps) => {
  const classNames = {
    root: clsx(styles.root, className),
  } as const

  const renderCards = payments.map((payment, index) => (
    <PaymentCard key={index} payment={payments[index]} />
  ))

  return <div className={classNames.root}>{renderCards}</div>
}
