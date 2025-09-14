/// <reference types="vite/client" />
export {}

interface APP_CONFIG_TYPE {
  REST_API_URL: string
  IMG_SERVER_URL: string
}

declare global {
  interface Window {
    readonly APP_CONFIG: APP_CONFIG_TYPE
  }
}