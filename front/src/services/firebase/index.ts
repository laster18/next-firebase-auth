import app from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from '~/config'

if (!app.apps.length) {
  app.initializeApp(firebaseConfig)
}

const auth = app.auth()

export default app

export { auth }
