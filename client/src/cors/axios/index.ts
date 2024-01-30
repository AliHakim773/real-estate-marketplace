import axios, { AxiosResponse } from "axios"
import { ISendRequest } from "../types/requestTypes"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const sendRequest = async <T, Y>({
  route,
  method = "GET",
  body,
}: ISendRequest<T>): Promise<Y> => {
  const response: AxiosResponse<Y> = await axios.request({
    url: route,
    method,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return response.data
}
