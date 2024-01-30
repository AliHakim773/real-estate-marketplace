export interface ISignUpData {
  username: string
  email: string
  password: string
}
export interface ISignInData {
  username: string
  password: string
}

export interface IGoogleData {
  username: string | null
  email: string | null
  photo: string | null
}
