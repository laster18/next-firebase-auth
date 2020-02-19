import Express from 'express'

declare global {
  namespace Express {
    interface SessionData {
      jwt?: string | null
    }
  }
}
