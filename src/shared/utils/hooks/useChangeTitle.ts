import { useCallback, useState } from 'react'

type Step = 'cropping' | 'filters' | 'publication'
type Direction = 'next' | 'prev'

type UseChangeTitleProps = {
  isEditing?: boolean
  viewMode?: boolean
}
/**
 * Changes the current step to the next or previous step based on the `direction` parameter.
 * If the modal is not in view mode, it updates the `step` state accordingly.
 */
export const useChangeTitle = ({ isEditing, viewMode }: UseChangeTitleProps) => {
  const [step, setStep] = useState<Step>('cropping')

  const getStepTitle = useCallback(() => {
    return isEditing ? 'Edit Post' : step.charAt(0).toUpperCase() + step.slice(1)
  }, [isEditing, step])

  const changeStep = useCallback(
    (direction: Direction) => {
      if (!viewMode) {
        setStep(prev => {
          if (direction === 'next') {
            if (prev === 'cropping') {
              return 'filters'
            }
            if (prev === 'filters') {
              return 'publication'
            }
          } else if (direction === 'prev') {
            if (prev === 'publication') {
              return 'filters'
            }
            if (prev === 'filters') {
              return 'cropping'
            }
          }

          return prev
        })
      }
    },
    [viewMode]
  )

  return { changeStep, getStepTitle, step }
}
