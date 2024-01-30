import { ChangeEvent, FC, FormEvent, useState } from "react"
import { ISignUpData } from "../../cors/types/authTypes"
import { IRequestError } from "../../cors/types/axiosTypes"
import { Link } from "react-router-dom"
import authAPI from "../../cors/apis/auth"

const SignUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<IRequestError | null>(null)
  const [formData, SetFormData] = useState<ISignUpData>({
    username: "",
    email: "",
    password: "",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value })
    console.log(formData)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authAPI.signUp(formData)
      console.log(res)
      setError(null)
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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sgin Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error.message}</p>}
    </div>
  )
}

export default SignUp
