import { useState } from 'react'

export const useMyPayments = () => {
  const [option, setOption] = useState('10')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const options = [
    { id: 0, title: '10', value: '10' },
    { id: 1, title: '20', value: '20' },
    { id: 2, title: '50', value: '50' },
    { id: 3, title: '100', value: '100' },
  ]

  const handleOptionChange = (value: string) => {
    setOption(value)
    setPageSize(Number(value))
  } // change value of payments on page

  const handlePageChange = (num: number) => setCurrentPage(num) // change current page in pagination

  return {
    currentPage,
    handleOptionChange,
    handlePageChange,
    option,
    options,
    pageSize,
  }
}
