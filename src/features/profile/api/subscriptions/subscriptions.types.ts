// Common types
type BasePayment = {
  amount: number
  typeSubscription: string
}

type BaseSubscription = {
  subscriptionId: string
  userId: number
}

// Main types
/**
 * @example
 * {
* "typeSubscription": "MONTHLY",
 * "paymentType": "STRIPE",
* "amount": 0,
* "baseUrl": "string"
}
 */
export type RequestSubscription = {
  baseUrl: string
  paymentType: string
} & BasePayment

export type ResponseSubscription = {
  url: string
}

export type Payment = {
  amount: number
  typeDescription: string
}

/**
 * @example
 * {
 * "data": [
 *   {
 *    "amount": 0,
 *    "typeDescription": "MONTHLY"
 *   }
    ]
 * }
 */
export type ResponseCostPayment = {
  data: Payment[]
}

export type CurrentPayment = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
} & BaseSubscription

/**
 * @example
 * {
 * "data": [
 *   {
 *     "userId": 0,
 *    "subscriptionId": "string",
 *    "dateOfPayment": "2024-10-05T09:17:06.779Z",
 *    "endDateOfSubscription": "2024-10-05T09:17:06.779Z",
 *    "autoRenewal": true
 *   }
 *  ],
 * "hasAutoRenewal": true
 * }
 */
export type ResponseCurrentPayment = {
  data: CurrentPayment[]
  hasAutoRenewal: boolean
}
export type PaymentMethods = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SubscriptionOptions = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type DetailedPayment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentMethods
  price: number
  subscriptionType: SubscriptionOptions
} & BaseSubscription

/**
 * @example
 * [
 *  {
 *  "userId": 0,
 *  "subscriptionId": "string",
 *  "dateOfPayment": "2024-10-05T09:17:06.804Z",
 *  "endDateOfSubscription": "2024-10-05T09:17:06.804Z",
 *  "price": 0,
 *  "subscriptionType": "MONTHLY",
 *  "paymentType": "STRIPE"
 *  }
 * ]
 */
export type ResponseMyPayments = DetailedPayment[]
