import { DetailedPayment } from '@/features'
import { useTranslation } from '@/shared/utils'
import { getFormatDate } from '@/shared/utils/getFormatDate'
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
    { key: 'dateOfPayment', label: t.myPayments.dateOfPayment },
    { key: 'endDateOfSubscription', label: t.myPayments.endDateOfPayment },
    { key: 'price', label: t.myPayments.price },
    { key: 'subscriptionType', label: t.myPayments.subscriptionType },
    { key: 'paymentType', label: t.myPayments.paymentType },
  ]
  const tableHeaders = headers.map((header, index) => (
    <TableHeadCell key={index}>{header.label}</TableHeadCell>
  ))

  const paymentsCells = payments.map(payment => (
    <TableBodyRow key={payment.subscriptionId}>
      <TableBodyCell>{getFormatDate(payment.dateOfPayment)}</TableBodyCell>
      <TableBodyCell>{getFormatDate(payment.endDateOfSubscription)}</TableBodyCell>
      <TableBodyCell>${payment.price}</TableBodyCell>
      <TableBodyCell>{payment.subscriptionType}</TableBodyCell>
      <TableBodyCell>{payment.paymentType}</TableBodyCell>
    </TableBodyRow>
  ))

  return (
    <TableWrapper>
      <TableHead className={styles.head}>{tableHeaders}</TableHead>
      <TableBody>{paymentsCells}</TableBody>
    </TableWrapper>
  )
}
