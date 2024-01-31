import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IUser, IUserState } from "../../types/userTypes"
import { IRequestError } from "../../types/requestTypes"

const initialState: IUserState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state: IUserState) => {
      state.loading = true
    },
    signInSuccess: (state: IUserState, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state: IUserState, action) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserStart: (state: IUserState) => {
      state.loading = true
    },
    updateUserSuccess: (state: IUserState, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateUserFailure: (
      state: IUserState,
      action: PayloadAction<IRequestError>
    ) => {
      state.error = action.payload
      state.loading = false
    },
    signOutStart: (state: IUserState) => {
      state.loading = true
    },
    signOutSuccess: (state: IUserState) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    signOutFailure: (
      state: IUserState,
      action: PayloadAction<IRequestError>
    ) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions

export const user = userSlice.name
export const extractUserSlice = (global: RootState) => {
  return global[user]
}
export default userSlice.reducer
