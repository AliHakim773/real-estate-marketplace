import { ChangeEvent, FormEvent, useState } from "react"
import { IRequestError } from "../../cors/types/axiosTypes"
import { ISignInData } from "../../cors/types/authTypes"
import authAPI from "../../cors/apis/auth"
import { useNavigate } from "react-router-dom"

const useLogic = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<IRequestError | null>(null)
  const [formData, SetFormData] = useState<ISignInData>({
    username: "",
    password: "",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authAPI.signIn(formData)
      console.log(res)
      setError(null)
      setLoading(false)
      navigate("/")
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
