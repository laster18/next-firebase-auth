import { auth } from '.'

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => auth.createUserWithEmailAndPassword(email, password)

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => auth.signInWithEmailAndPassword(email, password)

export const doSignOut = async () => auth.signOut()

export const doPasswordReset = async (email: string) =>
  auth.sendPasswordResetEmail(email)

export const doPasswordUpdate = async (password: string) => {
  if (auth.currentUser) {
    return auth.currentUser.updatePassword(password)
  } else {
    return Promise.reject(new Error('No authenticated user.'))
  }
}

export const doGetIdToken = () => {
  if (auth.currentUser) {
    return auth.currentUser.getIdToken()
  } else {
    return Promise.reject(new Error('No authenticated user.'))
  }
}
