import { sendRequest } from "../axios"
import { ISignInData, ISignUpData } from "../types/authTypes"

const authAPI = {
  signUp: async (data: ISignUpData) => {
    const res = await sendRequest({
      route: "auth/signup",
      method: "POST",
      body: data,
    })
    return res
  },
  signIn: async (data: ISignInData) => {
    const res = await sendRequest({
      route: "auth/signin",
      method: "POST",
      body: data,
    })
    return res
  },
}

export default authAPI
