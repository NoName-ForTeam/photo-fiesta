import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CustomDatePicker, DatePickerType } from './datePicker'

export type FormDatePickerProps<TFieldValues extends FieldValues> = Omit<DatePickerType, 'date'> &
  UseControllerProps<TFieldValues>

export const FormDatePicker = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: FormDatePickerProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return (
    <CustomDatePicker
      date={value}
      errorMessage={error?.message}
      inputRef={ref}
      onBlur={onBlur}
      onSelect={onChange}
      {...rest}
    />
  )
}
