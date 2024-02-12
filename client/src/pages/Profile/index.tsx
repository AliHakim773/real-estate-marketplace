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
    showListingError,
    userListing,
    setFile,
    handleChange,
    handleSubmit,
    handleDeleteAcount,
    handleSignOut,
    handleShowListings,
    handleDeleteListing,
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
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        {showListingError
          ? "Error in listing, please try again"
          : "Show Listings"}
      </button>
      {userListing.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h2 className='text-center mt-6 text-2xl font-semibold'>Listings</h2>
          {userListing.map((listing) => {
            return (
              <div
                className='border p-3 rounded-lg flex justify-between items-center gap-4'
                key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold flex-1 hover:underline truncate'
                  to={`/listing/${listing._id}`}>
                  <p>{listing.name}</p>
                </Link>
                <div className='flex flex-col items-center'>
                  <button
                    className='text-red-700 uppercase'
                    onClick={() => {
                      if (listing._id) handleDeleteListing(listing._id)
                    }}>
                    Delete
                  </button>
                  <button className='text-green-700 uppercase'>Edit</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Profile
