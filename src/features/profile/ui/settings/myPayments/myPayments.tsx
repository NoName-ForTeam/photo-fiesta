import { MyPaymentsList, useMyPayments } from '@/features'
import { Pagination, Select, SelectContainer, SelectItem } from '@photo-fiesta/ui-lib'

import styles from './myPayments.module.scss'

const classNames = {
  container: styles.container,
  pagination: styles.pagination,
  root: styles.root,
} as const

/**
 * The MyPayments component displays a list of user's payments with pagination
 * and a select dropdown to change the number of items per page.
 */
export const MyPayments = () => {
  const {
    currentPage,
    handleOptionChange,
    handlePageChange,
    isLoading,
    myPayments,
    option,
    options,
    pageSize,
  } = useMyPayments()

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className={classNames.root}>
      {myPayments && myPayments.length && (
        <div className={classNames.container}>
          <MyPaymentsList payments={myPayments} />
          <Pagination
            currentPage={currentPage}
            onChangePage={handlePageChange}
            pageSize={pageSize}
            totalCount={myPayments.length}
          >
            {/* @ts-expect-error: fix type in library*/}
            <SelectContainer content={['Show', 'on page']}>
              <Select onValueChange={handleOptionChange} pagination value={option}>
                {options.map(option => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </Select>
            </SelectContainer>
          </Pagination>
        </div>
      )}
    </div>
  )
}
