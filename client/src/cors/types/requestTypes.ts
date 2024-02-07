export interface ISendRequest<T> {
  route: string
  method?: "GET" | "POST" | "DELETE" | "PATCH"
  body?: T
}

export interface IRequestError {
  message: string
  statusCode: number
  success: boolean
}

export interface IUpdateProfileFormData {
  username?: string
  email?: string
  password?: string
  avatar?: string
}

export interface IReturnMessage {
  message: string
}

export interface IListingData {
  name: string
  description: string
  address: string
  regularPrice: number
  discountedPrice: number
  bedrooms: number
  bathrooms: number
  furnished: boolean
  parking: boolean
  type: "rent" | "sale"
  offer: boolean
  imageUrls: string[]
  user?: string
  _id?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}
