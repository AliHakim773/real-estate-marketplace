import { sendRequest } from "../axios"
import { IListingData, IReturnMessage } from "../types/requestTypes"

const listingAPI = {
  create: async (data: IListingData) => {
    const res = await sendRequest<IListingData, IListingData>({
      route: "listing",
      method: "POST",
      body: data,
    })
    return res
  },
  delete: async (id: string) => {
    const res = await sendRequest<null, IReturnMessage>({
      route: `listing/${id}`,
      method: "DELETE",
    })
    return res.message
  },
}

export default listingAPI
