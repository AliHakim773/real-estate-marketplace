import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../../cors/firebase"
import authAPI from "../../cors/apis/auth"
import { IGoogleData } from "../../cors/types/authTypes"
import { useAppDispatch } from "../../cors/hooks/redux"
import { signInSuccess } from "../../cors/redux/userSlice"
import { useNavigate } from "react-router-dom"

const useLogic = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      const googleData: IGoogleData = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }
      const res = await authAPI.signInWithGoogle(googleData)
      dispatch(signInSuccess(res))
      navigate("/")
    } catch (e: any) {
      console.log("Could not sign in with google", e)
    }
  }
  return { handleGoogleClick }
}

export default useLogic
