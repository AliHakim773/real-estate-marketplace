import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../cors/hooks/redux"
import { extractUserSlice } from "../../cors/redux/userSlice"
import {
  UploadTaskSnapshot,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../cors/firebase"
import { IUpdateProfileFormData } from "../../cors/types/axiosTypes"

const useLogic = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const { currentUser } = useAppSelector(extractUserSlice)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [filePerc, setFilePerc] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [formData, setFormData] = useState<IUpdateProfileFormData>({
    username: "",
    email: "",
    password: "",
    avatar: "",
  })

  const handleFileUpload = (file: File) => {
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

  return {
    formData,
    isUploading,
    fileUploadError,
    filePerc,
    setFile,
    currentUser,
    fileRef,
  }
}

export default useLogic
