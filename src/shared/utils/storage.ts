export class Storage {
  private static readonly storageKey = {
    token: 'access_token',
  } as const

  static deleteToken(): void {
    localStorage.removeItem(this.storageKey.token)
  }

  static getToken(): null | string {
    return localStorage.getItem(this.storageKey.token)
  }

  static setToken(token: string) {
    localStorage.setItem(this.storageKey.token, token)
  }
}
