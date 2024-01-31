import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../cors/hooks/redux"
import {
  extractUserSlice,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../cors/redux/userSlice"
import {
  UploadTaskSnapshot,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../cors/firebase"
import {
  IRequestError,
  IUpdateProfileFormData,
} from "../../cors/types/requestTypes"
import userAPI from "../../cors/apis/user"
// import { useNavigate } from "react-router-dom"

const useLogic = () => {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const { currentUser, loading, error } = useAppSelector(extractUserSlice)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [filePerc, setFilePerc] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [formData, setFormData] = useState<IUpdateProfileFormData>({})

  const handleFileUpload = (file: File): void => {
    setFileUploadError(false)
    setIsUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      () => {
        setFileUploadError(true)
        setIsUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl })
        })
        setIsUploading(false)
      }
    )
  }

  useEffect(() => {
    if (file) handleFileUpload(file)
  }, [file])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const user = await userAPI.updateUser(formData)
      dispatch(updateUserSuccess(user))
    } catch (e: any) {
      if (e.response && e.response.data) {
        const apiError: IRequestError = e.response.data
        dispatch(updateUserFailure(apiError))
      } else {
        dispatch(
          updateUserFailure({
            message: "An unexpected error occurred.",
            statusCode: 500,
            success: false,
          })
        )
      }
    }
  }

  return {
    formData,
    isUploading,
    fileUploadError,
    filePerc,
    currentUser,
    fileRef,
    loading,
    error,
    setFile,
    handleChange,
    handleSubmit,
  }
}

export default useLogic
