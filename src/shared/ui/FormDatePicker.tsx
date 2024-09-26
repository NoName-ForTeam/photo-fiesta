import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CustomDatePicker, DatePickerType } from './datePicker'

export type FormDatePickerProps<TFieldValues extends FieldValues> = Omit<
  DatePickerType,
  'endDate' | 'onSelect' | 'startDate'
> &
  UseControllerProps<TFieldValues>

/**
 * FormDatePicker - компонент для работы с react-hook-form и кастомным DatePicker
 */
export const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  ...rest
}: FormDatePickerProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })

  const handleDateChange = (date: Date | null) => {
    onChange(date) // Обновляем значение в форме при выборе даты
  }

  return (
    <CustomDatePicker
      errorMessage={error?.message}
      inputRef={ref} // Прокидываем реф в инпут для управления
      onBlur={onBlur} // Прокидываем onBlur для корректной работы с формой
      onSelect={handleDateChange} // Вызываем onChange формы при выборе новой даты
      startDate={value} // Привязываем текущее значение к startDate
      {...rest} // Остальные параметры компонента DatePicker
    />
  )
}

// import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
//
// import { CustomDatePicker, DatePickerType } from './datePicker'
//
// export type FormDatePickerProps<TFieldValues extends FieldValues> = Omit<DatePickerType, 'date'> &
//   UseControllerProps<TFieldValues>
//
// export const FormDatePicker = <T extends FieldValues>({
//   control,
//   disabled,
//   name,
//   shouldUnregister,
//   ...rest
// }: FormDatePickerProps<T>) => {
//   const {
//     field: { onBlur, onChange, ref, value },
//     fieldState: { error },
//   } = useController({
//     control,
//     disabled,
//     name,
//     shouldUnregister,
//   })
//   const selectedDate = value instanceof Date ? value : value ? new Date(value) : null
//
//   return (
//     <CustomDatePicker
//       date={value}
//       errorMessage={error?.message}
//       inputRef={ref}
//       onBlur={onBlur}
//       onSelect={onChange}
//       {...rest}
//     />
//   )
// }
