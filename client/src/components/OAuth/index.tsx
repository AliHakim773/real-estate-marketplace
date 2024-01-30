import { FC } from "react"
import useLogic from "./useLogic"

const OAuth: FC = () => {
  const { handleGoogleClick } = useLogic()

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      Continue with Google
    </button>
  )
}

export default OAuth
