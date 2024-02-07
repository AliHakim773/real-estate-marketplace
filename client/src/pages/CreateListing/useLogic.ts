import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../../cors/firebase"
import { ChangeEventHandler, useState } from "react"
import { IListingData } from "../../cors/types/requestTypes"
import listingAPI from "../../cors/apis/listing"
import { useNavigate } from "react-router-dom"

const useLogic = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<IListingData>({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    furnished: false,
    parking: false,
  })
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    } else if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: (e.target as HTMLInputElement).checked,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }
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

  const handleListingSubmit: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault()
    if (formData.imageUrls.length < 1)
      return setError("You need to have at least one image")
    if (formData.regularPrice <= formData.discountedPrice)
      return setError(
        "Regular price cant be less than or equal to discounted price"
      )
    setLoading(true)
    setError("")
    try {
      const result = await listingAPI.create(formData)
      setError("")
      navigate(`/listing/${result._id}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleImageRemove,
    handleImageSubmit,
    handleOnFileChange,
    handleChange,
    handleListingSubmit,
    imageUploadError,
    uploading,
    formData,
    loading,
    error,
  }
}

export default useLogic
