import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../cors/hooks/redux"
import { extractUserSlice } from "../../cors/redux/userSlice"

const AuthRoute: FC = () => {
  const { currentUser } = useAppSelector(extractUserSlice)
  return currentUser ? <Outlet /> : <Navigate to={"sign-in"} />
}

export default AuthRoute
