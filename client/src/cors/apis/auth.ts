import { sendRequest } from "../axios"
import { IGoogleData, ISignInData, ISignUpData } from "../types/authTypes"
import { IReturnMessage } from "../types/requestTypes"
import { IUser, IUserObject } from "../types/userTypes"

const authAPI = {
  signUp: async (data: ISignUpData) => {
    const res = await sendRequest({
      route: "auth/signup",
      method: "POST",
      body: data,
    })
    return res
  },
  signIn: async (data: ISignInData): Promise<IUser> => {
    const res = await sendRequest<ISignInData, IUserObject>({
      route: "auth/signin",
      method: "POST",
      body: data,
    })
    return res.user
  },
  signInWithGoogle: async (data: IGoogleData): Promise<IUser> => {
    const res = await sendRequest<IGoogleData, IUserObject>({
      route: "auth/google",
      method: "POST",
      body: data,
    })
    return res.user
  },
  signOut: async (): Promise<string> => {
    const res = await sendRequest<null, IReturnMessage>({
      route: "auth/signout",
    })
    return res.message
  },
}

export default authAPI
