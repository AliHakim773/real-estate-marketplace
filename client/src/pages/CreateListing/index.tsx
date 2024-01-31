import { FC } from "react"

const CreateListing: FC = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col gap-4 sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <label htmlFor='sale' className='select-none'>
                Sell
              </label>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <label htmlFor='rent' className='select-none'>
                Rent
              </label>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <label htmlFor='parking' className='select-none'>
                Parking Spot
              </label>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <label htmlFor='furnished' className='select-none'>
                Furnished
              </label>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <label htmlFor='offer' className='select-none'>
                Offer
              </label>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='bedrooms'
                min={1}
                max={10}
                required
              />
              <label htmlFor='bedrooms'>Beds</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='bathrooms'
                min={1}
                max={10}
                required
              />
              <label htmlFor='bathrooms'>Baths</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='regularPrice'
                required
              />
              <div className='flex flex-col items-center'>
                <label htmlFor='regularPrice'>Regular Price</label>
                <span className='text-xs'>{"$ / month"}</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='discountedPrice'
                required
              />
              <div className='flex flex-col items-center'>
                <label htmlFor='discountedPrice'>Discounted Price</label>
                <span className='text-xs'>{"$ / month"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>
            Images:{" "}
            <span className='font-normal text-gray-600 ml-2'>
              The first will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border border-gray-300 rounded w-full'
            />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
