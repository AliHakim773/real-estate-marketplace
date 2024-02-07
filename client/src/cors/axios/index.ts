import axios, { AxiosResponse } from "axios"
import { ISendRequest } from "../types/requestTypes"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const sendRequest = async <TRequest, TResponse>({
  route,
  method = "GET",
  body,
}: ISendRequest<TRequest>): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axios.request({
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
