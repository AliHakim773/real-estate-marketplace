import { IRequestError } from "./requestTypes"

export interface IUser {
  _id: string
  username: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IUserObject {
  user: IUser
}

export interface IUserState {
  currentUser: null | IUser
  error: null | IRequestError
  loading: boolean
}
