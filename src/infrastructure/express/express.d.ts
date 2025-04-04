import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      token: string
      user: {
        id: number
        login: string
      }
    }
  }
}
