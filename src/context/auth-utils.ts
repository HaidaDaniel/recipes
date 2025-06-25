let logoutCallback: (() => void) | null = null

export function setLogoutCallback(cb: () => void) {
  logoutCallback = cb
}

export function callLogout() {
  if (logoutCallback) logoutCallback()
}
