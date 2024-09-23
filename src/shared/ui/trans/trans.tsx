import { Fragment } from 'react'

import { OPEN_CLOSE_TAG_REGEX, TAGS_REGEX } from '@/shared/config'

type TransType = {
  /**
   * An optional object where keys are tag numbers (as strings),
   * and values are functions that wrap content in JSX elements.
   * Example: { "1": (str: string) => <strong>{str}</strong> }
   */
  tags?: Record<string, (str: string) => JSX.Element>
  text: string
}

/**
 * `Trans` component used to interpolate dynamic tags into JSX elements.
 *
 * @example
 * // Renders a string with <1> as bold and <2> as italic.
 * <Trans
 *   text="This is <1>bold</1> and <2>italic</2>"
 *   tags={{
 *     "1": (str: string) => <strong>{str}</strong>,
 *     "2": (str: string) => <em>{str}</em>
 *   }}
 * />
 */
export const Trans = (props: TransType) => {
  return <>{interpolateTags(props)}</>
}

/**
 * Function that interpolates text containing numbered tags and replaces them with JSX elements.
 */
const interpolateTags = (data: TransType) => {
  const { tags, text } = data

  if (!tags) {
    return text
  }

  const tokens = text.split(TAGS_REGEX)

  return tokens.map(token => {
    const matchResult = OPEN_CLOSE_TAG_REGEX.exec(token)

    if (!matchResult) {
      return token
    }

    const [, openTag, content, closeTag] = matchResult

    if (!openTag || !closeTag || openTag !== closeTag) {
      return token
    }

    return <Fragment key={content}>{tags[openTag]?.(content ?? '')}</Fragment>
  })
}
