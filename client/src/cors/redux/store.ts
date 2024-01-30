import { configureStore } from "@reduxjs/toolkit"
import userSlice, { user } from "./userSlice"

export const store = configureStore({
  reducer: {
    [user]: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
