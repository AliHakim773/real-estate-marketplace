import { useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { IRequestError } from "../../cors/types/axiosTypes"
import { ISignUpData } from "../../cors/types/authTypes"
import authAPI from "../../cors/apis/auth"

const useLogic = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<IRequestError | null>(null)
  const [formData, SetFormData] = useState<ISignUpData>({
    username: "",
    email: "",
    password: "",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authAPI.signUp(formData)

      setLoading(false)
      setError(null)
      navigate("sign-in")
    } catch (e: any) {
      if (e.response && e.response.data) {
        const apiError: IRequestError = e.response.data
        setError(apiError)
      } else {
        setError({
          message: "An unexpected error occurred.",
          statusCode: 500,
          success: false,
        })
      }
    }
    setLoading(false)
  }
  return { handleSubmit, handleChange, error, loading }
}

export default useLogic
