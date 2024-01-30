import { ChangeEvent, FormEvent, useState } from "react"
import { IRequestError } from "../../cors/types/axiosTypes"
import { ISignInData } from "../../cors/types/authTypes"
import authAPI from "../../cors/apis/auth"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../cors/hooks/redux"
import {
  extractUserSlice,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../cors/redux/userSlice"

const useLogic = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector(extractUserSlice)
  const [formData, SetFormData] = useState<ISignInData>({
    username: "",
    password: "",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(signInStart())
      const user = await authAPI.signIn(formData)
      dispatch(signInSuccess(user))
      navigate("/")
    } catch (e: any) {
      if (e.response && e.response.data) {
        const apiError: IRequestError = e.response.data
        dispatch(signInFailure(apiError))
      } else {
        dispatch(
          signInFailure({
            message: "An unexpected error occurred.",
            statusCode: 500,
            success: false,
          })
        )
      }
    }
  }
  return { handleSubmit, handleChange, error, loading }
}

export default useLogic
