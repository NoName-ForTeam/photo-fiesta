import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import styles from './table.module.scss'

export const TableWrapper = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <table className={clsx(styles.tableWrapper, className)} {...restProps} ref={ref}>
        {children}
      </table>
    )
  }
)

TableWrapper.displayName = 'TableWrapper'

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ children, ...restProps }, ref) => {
    return (
      <thead className={styles.tableHead} {...restProps} ref={ref}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

export const TableHeadRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr
        className={clsx(styles.tableRow, styles.tableHeadRow, className)}
        {...restProps}
        ref={ref}
      >
        {children}
      </tr>
    )
  }
)

TableHeadRow.displayName = 'TableHeadRow'

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <th className={clsx(styles.tableCell, className)} {...restProps} ref={ref}>
        {children}
      </th>
    )
  }
)

TableHeadCell.displayName = 'TableHeadCell'

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ children, ...restProps }, ref) => {
    return (
      <tbody className={styles.tableBody} {...restProps} ref={ref}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export const TableBodyRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr className={clsx(styles.tableRow, className)} {...restProps} ref={ref}>
        {children}
      </tr>
    )
  }
)

TableBodyRow.displayName = 'TableBodyRow'

export const TableBodyCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <td
        className={clsx(styles.tableCell, styles.tableBodyCell, className)}
        {...restProps}
        ref={ref}
      >
        {children}
      </td>
    )
  }
)
