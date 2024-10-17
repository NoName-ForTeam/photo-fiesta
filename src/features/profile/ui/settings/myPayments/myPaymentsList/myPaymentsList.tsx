import { DetailedPayment } from '@/features'
import { useTranslation } from '@/shared/utils'
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableWrapper,
} from '@/widgets/table'

import styles from './myPaymentsList.module.scss'
/**
 * The MyPaymentsList component renders a table of user's payments with their details, such as date of payment,
 * end date of payment, price, subscription type, and payment type.
 * @example
 * <MyPaymentsList payments={[
 *   { subscriptionId: 1, dateOfPayment: '2022-01-01', endDateOfSubscription: '2022-12-31',
 *   price: 100, subscriptionType: 'Monthly', paymentType: 'Stripe' },
 *   // ... more payments
 * ]} />
 */
export const MyPaymentsList = ({ payments }: { payments: DetailedPayment[] }) => {
  const { t } = useTranslation()
  const headers = [
    t.myPayments.dateOfPayment,
    t.myPayments.endDateOfPayment,
    t.myPayments.price,
    t.myPayments.subscriptionType,
    t.myPayments.paymentType,
  ]

  const formatDate = (date: string) => new Date(date).toLocaleDateString()

  return (
    <TableWrapper>
      <TableHead className={styles.head}>
        {headers.map((header, index) => (
          <TableHeadCell key={index}>{header}</TableHeadCell>
        ))}
      </TableHead>
      <TableBody>
        {payments.map(payment => (
          <TableBodyRow key={payment.subscriptionId}>
            <TableBodyCell>{formatDate(payment.dateOfPayment)}</TableBodyCell>
            <TableBodyCell>{formatDate(payment.endDateOfSubscription)}</TableBodyCell>
            <TableBodyCell>${payment.price}</TableBodyCell>
            <TableBodyCell>{payment.subscriptionType}</TableBodyCell>
            <TableBodyCell>{payment.paymentType}</TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
