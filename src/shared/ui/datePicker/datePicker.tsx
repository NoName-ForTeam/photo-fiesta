import React, { useCallback, useEffect, useState } from 'react'
import DatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker'

import { ArrowIosBackOutline, ArrowIosForwardOutline, Calendar } from '@/shared/assets'
import clsx from 'clsx'
import { parse } from 'date-fns'
import { enUS } from 'date-fns/locale'

import styles from './datePicker.module.scss'

export type DatePickerType = {
  date?: Date | null
  disabled?: boolean
  /**
   * The end date for the selected range.
   */
  endDate?: Date | null
  errorMessage?: string
  inputRef?: React.RefCallback<HTMLInputElement>
  label?: string
  onBlur?: () => void
  onSelect?: (date: Date | null) => void
  placeholder?: string
  required?: boolean
  /**
   * Whether to select a date range or a single date.
   */
  selectsRange?: boolean
  setEndDate?: (date: Date | null) => void
  setStartDate?: (date: Date | null) => void
  /**
   * The start date for the selected range.
   */
  startDate?: Date | null
}
registerLocale('enUS', enUS)

/**
 * A customizable date picker component that allows users to select single or range dates.
 * It uses `react-datepicker` and provides additional styling and functionality.
 *
 * @component
 * @example
 * <CustomDatePicker
 *   label="Select a date"
 *   selectsRange
 *   startDate={startDate}
 *   endDate={endDate}
 *   setStartDate={setStartDate}
 *   setEndDate={setEndDate}
 *   placeholder="Select a date range"
 *   required
 * />
 */

export const CustomDatePicker = ({
  disabled,
  endDate,
  errorMessage,
  inputRef,
  label,
  placeholder,
  required,
  selectsRange = false,
  setEndDate,
  setStartDate,
  startDate,
  ...restProps
}: DatePickerType) => {
  const showError = !!errorMessage && errorMessage.length > 0

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    locale = 'en',
  }: { locale?: string } & ReactDatePickerCustomHeaderProps) => {
    return (
      <div className={styles.header}>
        <span>{date.toLocaleString(locale, { month: 'long', year: 'numeric' })}</span>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={decreaseMonth} type={'button'}>
            <ArrowIosBackOutline />
          </button>
          <button className={styles.button} onClick={increaseMonth} type={'button'}>
            <ArrowIosForwardOutline />
          </button>
        </div>
      </div>
    )
  }

  const formatSelectedDate = (dates: [Date | null, Date | null] | Date) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates

      setStartDate?.(start)
      setEndDate?.(end)
    } else {
      setStartDate?.(dates)
      setEndDate?.(null)
    }
  }

  const getInputValue = useCallback(() => {
    const formatDate = (date: Date | null | undefined) => {
      return date ? new Intl.DateTimeFormat('en-GB').format(date) : ''
    }

    if (selectsRange && startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`
    }

    return formatDate(startDate)
  }, [selectsRange, startDate, endDate])

  const [inputValue, setInputValue] = useState<string>(getInputValue())

  useEffect(() => {
    setInputValue(getInputValue())
  }, [getInputValue])
  const isRange = endDate !== undefined

  return (
    <div className={styles.root}>
      <DatePicker
        calendarClassName={styles.calendar}
        customInput={
          <div className={clsx(styles.inputContainer)}>
            {label && (
              <label className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
              </label>
            )}
            <input
              className={clsx(styles.input, { [styles.error as string]: showError })}
              disabled={disabled}
              onBlur={e => {
                const newValue = e.target.value
                const parsedDate = parse(newValue, 'dd/MM/yyyy', new Date())

                if (!isNaN(parsedDate.getTime())) {
                  setStartDate?.(parsedDate)
                  setEndDate?.(parsedDate)
                } else {
                  setInputValue('')
                }
              }}
              onChange={e => setInputValue(e.target.value)}
              placeholder={placeholder}
              ref={inputRef}
              required={required}
              type={'text'}
              value={inputValue}
            />
            <Calendar className={clsx(styles.icon, { [styles.error as string]: showError })} />
          </div>
        }
        dateFormat={'dd/MM/yyyy'}
        dayClassName={(): string => styles.day || ''}
        disabled={disabled}
        endDate={endDate || undefined}
        locale={'enUS'}
        onChange={formatSelectedDate}
        placeholderText={placeholder}
        popperPlacement={'bottom-start'}
        renderCustomHeader={renderCustomHeader}
        required={required}
        selected={startDate}
        selectsMultiple={undefined}
        // @ts-expect-error toDo picker fix
        selectsRange={isRange}
        showPopperArrow={false}
        startDate={startDate || undefined}
        {...restProps}
      />
      {showError && <p className={clsx(styles.errorText)}>{errorMessage}</p>}
    </div>
  )
}
