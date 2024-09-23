//for auth
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

//for profile settings
export const DATE_OF_BIRTH_REGEX = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/
export const ABOUT_ME_REGEX = /^[0-9A-Za-zА-Яа-я!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]*$/
export const FIRST_NAME_REGEX = /^[a-zA-Zа-яА-Я-]*$/
export const LAST_NAME_REGEX = /^[a-zA-Zа-яА-Я-]*$/

//for internalization
export const TAGS_REGEX = /(<\d+>[^<>]*<\/\d+>)/
export const OPEN_CLOSE_TAG_REGEX = /<(\d+)>([^<>]*)<\/(\d+)>/
