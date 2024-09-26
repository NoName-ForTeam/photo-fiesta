import React, { ReactNode, forwardRef } from 'react'
import DatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker'

import { ArrowIosBackOutline, ArrowIosForwardOutline, Calendar } from '@/shared/assets'
import clsx from 'clsx'
import { enUS } from 'date-fns/locale'

import styles from './datePicker.module.scss'

export type DatePickerType = {
  className?: string
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
  className,
  disabled,
  endDate,
  errorMessage,
  label,
  onSelect,
  placeholder,
  required,
  setEndDate,
  setStartDate,
  startDate,
  ...restProps
}: DatePickerType) => {
  const showError = !!errorMessage && errorMessage.length > 0

  const classNames = {
    calendar: styles.calendar,
    day: (): string => styles.day || '',
    errorText: styles.errorText,
    input: clsx(styles.input),
    root: clsx(styles.root, className),
  }

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
      onSelect?.(start)
    } else {
      setStartDate?.(dates)
      setEndDate?.(null)
      onSelect?.(dates)
    }
  }
  const isRange = endDate !== undefined

  return (
    <div className={classNames.root}>
      <DatePicker
        calendarClassName={classNames.calendar}
        className={classNames.input}
        customInput={
          <CustomInput
            disabled={disabled}
            label={label}
            required={required}
            showError={showError}
          />
        }
        dateFormat={'dd/MM/yyyy'}
        dayClassName={classNames.day}
        disabled={disabled}
        endDate={endDate || undefined}
        locale={'enUS'}
        onChange={formatSelectedDate}
        placeholderText={placeholder}
        popperPlacement={'bottom-start'}
        renderCustomHeader={renderCustomHeader}
        required={required}
        selected={startDate}
        // @ts-expect-error toDo picker fix
        selectsRange={isRange}
        showPopperArrow={false}
        startDate={startDate || undefined}
        {...restProps}
      />
      {showError && <p className={clsx(classNames.errorText)}>{errorMessage}</p>}
    </div>
  )
}

type CustomInputProps = {
  disabled?: boolean
  label?: ReactNode
  required?: boolean
  showError: boolean
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ disabled, label, required, showError, ...rest }, ref) => {
    const classNames = {
      error: styles.error,
      icon: styles.icon,
      input: styles.input,
      inputContainer: styles.inputContainer,
      label: styles.label,
      required: styles.required,
    }

    return (
      <div className={clsx(classNames.inputContainer)}>
        {label && (
          <label className={classNames.label}>
            {label} {required && <span className={classNames.required}>*</span>}
          </label>
        )}
        <input
          className={clsx(classNames.input, { [classNames.error as string]: showError })}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        <Calendar className={clsx(classNames.icon, { [classNames.error as string]: showError })} />
      </div>
    )
  }
)
