import { User } from 'firebase'

export interface Thread {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: number
  threadId: number
  userName: string
  message: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface ThreadDetail {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  posts: Post[]
}

export interface AuthUser {
  email: string
  uid: string
}

// export interface Session {
//   authUser: null | AuthUser
//   isSessionChecked: boolean
// }

export interface Session {
  authUser: null | User
  isSessionChecked: boolean
}
