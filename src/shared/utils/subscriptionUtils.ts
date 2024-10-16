type CurrentPayment = {
  endDateOfSubscription: string
}

/**
 * Computes the end date of the subscription and the next payment date.
 * @param {CurrentPayment[]} currentPayments - Array of current payments.
 * @returns {{ endDate: string | null, nextPaymentDate: string | null }} - The end date and next payment date as strings, and isSubscriptionActive as boolean.
 */
export const computeSubscriptionDates = (currentPayments: CurrentPayment[]) => {
  const activePayments = currentPayments.filter(
    payment => new Date(payment.endDateOfSubscription) > new Date()
  )
  const isSubscriptionActive = activePayments.length > 0

  const endDateOfSubscription =
    activePayments.length > 0
      ? new Date(
          Math.max(...activePayments.map(payment => +new Date(payment.endDateOfSubscription)))
        )
      : null

  let nextPaymentDate: Date | null = null

  if (endDateOfSubscription) {
    nextPaymentDate = new Date(endDateOfSubscription)
    nextPaymentDate.setDate(nextPaymentDate.getDate() + 1) // Add one day to the end date
  }

  return {
    endDate: endDateOfSubscription ? endDateOfSubscription.toLocaleDateString() : null,
    isSubscriptionActive,
    nextPaymentDate: nextPaymentDate ? nextPaymentDate.toLocaleDateString() : null,
  }
}
