import { sendRequest } from "../axios"
import { IListingData } from "../types/requestTypes"

const listingAPI = {
  create: async (data: IListingData) => {
    const res = await sendRequest<IListingData, IListingData>({
      route: "listing",
      method: "POST",
      body: data,
    })
    return res
  },
}

export default listingAPI
