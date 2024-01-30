import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IUser, IUserState } from "../../types/userTypes"

const initialState: IUserState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export const user = userSlice.name
export const extractUserSlice = (global: RootState) => {
  return global[user]
}
export default userSlice.reducer
