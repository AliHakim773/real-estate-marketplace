import { sendRequest } from "../axios"
import { ISignUpData } from "../types/authTypes"

const authAPI = {
  signUp: async (data: ISignUpData) => {
    const res = await sendRequest({
      route: "auth/signup",
      method: "POST",
      body: data,
    })
    return res
  },
}

export default authAPI
