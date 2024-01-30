import axios, { AxiosResponse } from "axios"
import { ISendRequest } from "../types/axiosTypes"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const sendRequest = async <T>({
  route,
  method = "GET",
  body,
}: ISendRequest<T>): Promise<T> => {
  const response: AxiosResponse<T> = await axios.request({
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
