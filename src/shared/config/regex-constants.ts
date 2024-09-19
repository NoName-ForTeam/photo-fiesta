export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/
export const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
export const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/
