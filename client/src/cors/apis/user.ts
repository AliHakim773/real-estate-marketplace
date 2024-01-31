import { sendRequest } from "../axios"
import { IUpdateProfileFormData } from "../types/requestTypes"
import { IUser, IUserObject } from "../types/userTypes"

const userAPI = {
  updateUser: async (data: IUpdateProfileFormData): Promise<IUser> => {
    const res = await sendRequest<IUpdateProfileFormData, IUserObject>({
      route: "/user",
      method: "PATCH",
      body: data,
    })

    return res.user
  },
}

export default userAPI
