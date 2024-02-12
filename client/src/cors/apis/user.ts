import { sendRequest } from "../axios"
import {
  IListingData,
  IReturnMessage,
  IUpdateProfileFormData,
} from "../types/requestTypes"
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
  deleteUser: async (): Promise<string> => {
    const res = await sendRequest<null, IReturnMessage>({
      route: "/user",
      method: "DELETE",
    })

    return res.message
  },
  getUserListing: async (): Promise<IListingData[]> => {
    const res = await sendRequest<null, IListingData[]>({
      route: "/user/listing",
      method: "GET",
    })

    return res
  },
}

export default userAPI
