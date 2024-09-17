import { ComponentPropsWithoutRef, useCallback } from 'react'
import ReCAPTCHAComponent from 'react-google-recaptcha'

import clsx from 'clsx'

import styles from './reCaptcha.module.scss'

type ReCaptchaProps = {
  /**
   * Indicates if there's an error state.
   */
  isError?: boolean
  /**
   * Callback function to handle reCAPTCHA response
   */
  onVerify: (token: null | string) => void
  /**
   *  The Google reCAPTCHA site key.
   */
  siteKey: string
} & ComponentPropsWithoutRef<'div'>

/**
 * ReCaptcha component for user verification.
 * @component
 * @example
 *  const [isError, setIsError] = useState(false);
 * const handleVerify = (token: string | null) => {
 *  if (token) {
 *   setIsError(false);
 *} else {
 *   setIsError(true);
 *}
 *};
 *
 * <ReCaptcha siteKey="your-site-key" isError={false} onVerify={(token) => handleVerification(token)} />
 */

export const ReCaptcha = ({ isError, onVerify, siteKey, ...rest }: ReCaptchaProps) => {
  const classNames = {
    container: clsx(styles.container, isError && styles.error),
    errorText: styles.errorText,
  } as const
  const handleChange = useCallback(
    (token: null | string) => {
      onVerify(token)
    },
    [onVerify]
  )

  return (
    <div className={classNames.container} {...rest}>
      <ReCAPTCHAComponent
        onChange={handleChange}
        sitekey={siteKey}
        size={'normal'}
        theme={'dark'}
      />
      {isError && (
        <div className={classNames.errorText}>Please verify that you are not a robot</div>
      )}
    </div>
  )
}
