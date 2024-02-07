import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../cors/firebase"
import { useState } from "react"

interface IListingData {
  imageUrls: string[]
}

const useLogic = () => {
  const [uploading, setUploading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState("")
  const [formData, setFormData] = useState<IListingData>({
    imageUrls: [],
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const handleOnFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFiles(e.target.files)
    setImageUploadError("")
  }
  const handleImageSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault()
    if (
      files &&
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      setImageUploadError("")
      setUploading(true)
      const promises: Promise<any>[] = []

      for (const file of files) {
        promises.push(storeImage(file))
      }

      Promise.all(promises)
        .then((urls: string[]) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError("")
        })
        .catch(() => {
          setImageUploadError("Upload fail :( max size is 2mb each ")
        })
        .finally(() => setUploading(false))
    } else {
      setImageUploadError("You can only upload up to 6 images per listing ")
    }
  }

  const storeImage = async (file: File) => {
    return await new Promise<any>((res, rej) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => rej(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            res(downloadUrl)
          )
        }
      )
    })
  }

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }
  return {
    handleImageRemove,
    handleImageSubmit,
    handleOnFileChange,
    imageUploadError,
    uploading,
    formData,
  }
}

export default useLogic
