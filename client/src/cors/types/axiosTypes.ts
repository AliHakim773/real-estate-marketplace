export interface ISendRequest<T> {
  route: string
  method: "GET" | "POST" | "DELETE" | "PATCH"
  body: T
}

export interface IRequestError {
  message: string
  statusCode: number
  success: boolean
}

export interface IUpdateProfileFormData {
  username: string
  email: string
  password: string
  avatar: string
}
