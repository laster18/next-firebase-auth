import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import http from 'http'

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.json())

  app.post('/login', (req, res) => {
    res.json({ status: true, message: 'login success' })
  })

  app.post('/logout', (req, res) => {
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
