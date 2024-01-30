import { FC } from "react"
import { FaSearch } from "react-icons/fa"
import { Link, NavLink, Outlet } from "react-router-dom"
import { useAppSelector } from "../../cors/hooks/redux"
import { extractUserSlice } from "../../cors/redux/userSlice"

const Header: FC = () => {
  const { currentUser } = useAppSelector(extractUserSlice)
  return (
    <>
      <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to={"/"}>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-500'>Ali</span>
              <span className='text-slate-700'>Estate</span>
            </h1>
          </Link>
          <search className='bg-slate-100 py-2 px-3 rounded-lg flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
            />
            <FaSearch className='text-slate-600' />
          </search>
          <ul className='flex gap-4'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              <NavLink to={"about"}>About</NavLink>
            </li>
            <li className='text-slate-700 hover:underline'>
              {currentUser ? (
                <Link to={"/profile"}>
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='Profile Pic'
                  />
                </Link>
              ) : (
                <NavLink to={"sign-in"}>Sign In</NavLink>
              )}
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header
