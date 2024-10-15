import { DetailedPayment } from '@/features'
import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  TableWrapper,
} from '@/widgets/table'

export const MyPaymentsList = ({ payments }: { payments: DetailedPayment[] }) => {
  return (
    <TableWrapper>
      <TableHead>
        <TableHeadCell>Date of Payment</TableHeadCell>
        <TableHeadCell>End date of subscription</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Subscription Type</TableHeadCell>
        <TableHeadCell>Payment Type</TableHeadCell>
      </TableHead>
      <TableBody>
        {payments.map(payment => (
          <TableBodyRow key={payment.subscriptionId}>
            <TableBodyCell>{new Date(payment.dateOfPayment).toLocaleDateString()}</TableBodyCell>
            <TableBodyCell>
              {new Date(payment.endDateOfSubscription).toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>${payment.price}</TableBodyCell>
            <TableBodyCell>{payment.subscriptionType}</TableBodyCell>
            <TableBodyCell>{payment.paymentType}</TableBodyCell>
          </TableBodyRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}
