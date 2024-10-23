export type DeviceType = {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type GetSessions = {
  current: DeviceType
  others: DeviceType[]
}
