declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_URL: string
    readonly API_KEY: string
    readonly AUTH_DOMAIN: string
    readonly DATABASE_URL: string
    readonly PROJECT_ID: string
    readonly STORAGE_BUCKET: string
    readonly MESSAGING_SENDER_ID: string
    readonly APP_ID: string
    readonly MEASUREMENT_ID: string
    readonly TYPE: string
    readonly PRIVATE_KEY_ID: string
    readonly PRIVATE_KEY: string
    readonly CLIENT_EMAIL: string
    readonly CLIENT_ID: string
    readonly AUTH_URI: string
    readonly TOKEN_URI: string
    readonly AUTH_PROVIDER_X509_CERT_URL: string
    readonly CLIENT_X509_CERT_URL: string
  }
}
