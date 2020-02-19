import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import next from 'next'
import http from 'http'
import admin from 'firebase-admin'
// import { firebaseServerConfig } from '../src/config'

import Express from 'express'

declare global {
  namespace Express {
    interface SessionData {
      count?: number
      decodedToken?: string | null
      jwt?: string | null
    }
    interface Request {
      firebaseServer?: admin.app.App
    }
  }
}


const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const FileStore = sessionFileStore(session)

// const firebase = admin.initializeApp(
//   {
//     credential: admin.credential.cert(require('../src/config/index').firebaseServerConfig),
//   },
//   'server'
// )

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.json())
  app.use(
    session({
      secret: 'geheimnis',
      saveUninitialized: true,
      // store: new FileStore({ secret: 'geheimnis' }),
      resave: false,
      rolling: true,
      cookie: { maxAge: 604800000, httpOnly: true }, // week
    })
  )

  // app.use((req, res, next) => {
  //   req.firebaseServer = firebase
  //   req.session.count = 1
  //   next()
  // })

  app.post('/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token

    console.log('token: ', token)

    if (req.session) {
      req.session.jwt = token
    }

    res.json({ status: true, message: 'login success' })
    // firebase
    //   .auth()
    //   .verifyIdToken(token)
    //   .then(decodedToken => {
    //     req.session.decodedToken = decodedToken
    //     return decodedToken
    //   })
    //   .then(decodedToken => res.json({ status: true, decodedToken }))
    //   .catch(error => res.json({ error }))
  })

  app.post('/logout', (req, res) => {
    if (req && req.session) {
      console.log('logout!!!!')
      req.session.jwt = null
    }
    res.json({ status: true, message: 'logout success' })
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  const server = http.createServer(app)

  server.listen(port, () => {
    // if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
