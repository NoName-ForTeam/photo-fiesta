import { useState } from 'react'

import { MyPaymentsList, useGetMyPaymentsQuery } from '@/features'
import { Pagination, Select, SelectContainer, SelectItem } from '@photo-fiesta/ui-lib'

import styles from './myPayments.module.scss'

const classNames = {
  root: styles.root,
} as const

const options = [
  { id: 0, title: '10', value: '10' },
  { id: 1, title: '20', value: '20' },
  { id: 2, title: '50', value: '50' },
  { id: 3, title: '100', value: '100' },
]

export const MyPayments = () => {
  const { data: myPayments } = useGetMyPaymentsQuery()
  const [option, setOption] = useState('10')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const handleOptionChange = (value: string) => {
    setOption(value)
    setPageSize(Number(value))
  }
  const handlePageChange = (num: number) => {
    setCurrentPage(num)
  }

  return (
    <div className={classNames.root}>
      {myPayments && myPayments.length && (
        <div>
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
