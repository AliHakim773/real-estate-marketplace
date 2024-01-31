import { ChangeEvent, FC } from "react"
import useLogic from "./useLogic"
import { Link } from "react-router-dom"

const Profile: FC = () => {
  const {
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
    handleDeleteAcount,
    handleSignOut,
  } = useLogic()

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0])
            }
          }}
          hidden
          type='file'
          ref={fileRef}
          accept='image/*'
        />
        <img
          onClick={() => {
            if (!isUploading) {
              fileRef.current?.click()
            }
          }}
          src={formData.avatar || currentUser?.avatar}
          alt='Profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error in image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-7'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>successefuly uploaded!</span>
          ) : null}
        </p>
        <input
          type='text'
          id='username'
          defaultValue={currentUser?.username}
          placeholder='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          defaultValue={currentUser?.email}
          placeholder='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className='bg-green-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95'>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteAcount}
          className='text-red-700 cursor-pointer'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && error.message}</p>
    </div>
  )
}

export default Profile
