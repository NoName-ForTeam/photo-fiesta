const StorageKey = {
  token: 'access_token',
}

export class Storage {
  static deleteToken() {
    localStorage.removeItem(StorageKey.token)
  }

  static getToken() {
    return localStorage.getItem(StorageKey.token)
  }

  static setToken(token: string) {
    localStorage.setItem(StorageKey.token, token)
  }
}
