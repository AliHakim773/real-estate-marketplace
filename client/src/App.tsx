// React
import { FC } from "react"
// React Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
// Layouts
import Header from "./components/Header"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />}>
      <Route path='home' element={<Home />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='about' element={<About />} />
      <Route path='profile' element={<Profile />} />
    </Route>
  )
)

const App: FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
