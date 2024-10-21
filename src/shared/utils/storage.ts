// In the Storage class, we added a check for typeof window !== 'undefined' before any operations with localStorage. This prevents errors in server-side rendering.
export class Storage {
  static TOKEN_KEY = 'token'

  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY)
    }

    return null
  }

  static removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY)
      {
        /*Call the 'storage' event manually to notify the components
       in the current window about localStorage changes*/
      }
      window.dispatchEvent(new Event('storage'))
    }
  }

  static setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token)
      window.dispatchEvent(new Event('storage'))
    }
  }
}
