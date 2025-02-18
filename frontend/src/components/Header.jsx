import { Navbar, TextInput, Button, NavbarCollapse, NavbarLink, NavbarToggle, Dropdown, Avatar } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice"


const Header = () => {
const path = useLocation().pathname ;
// TODO: Get the Logged In User Details from React Redux State Store.
const {currentUser} = useSelector(state => state.user)

// TODO: Create a dispatch state for the Redux store
 const dispatch = useDispatch();

 //TODO: Import the theme from the Redux store
 const theme = useSelector(state => state.theme)


  return (
    <div>
      <Navbar className="border-b-2">
        {/* Link to the Home Page*/}
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">TechGuru</span>
          Blog
        </Link>

        {/* Search Bar */}
        <form>
          <TextInput 
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
          <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button>
          <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
              {theme.theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>

       {/* TODO: Check if the User is a Current User and display it profile picture as a dropdown */}
            {currentUser ? (
              <Dropdown
                arrowIcon ={false}
                inline 
                label={
                  <Avatar 
                      alt="user"
                      img={currentUser.profilePicture} 
                      rounded   
                  />
                }
              >
                  <Dropdown.Header>
                    <span className="block text-sm">@{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item> Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item> 
                    Sign Out 
                  </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in" > 
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
            <NavbarToggle /> {/*TODO Hamburger Menu */}
          </div>

          {/*TODO Hamburger Menu Dropdown List*/}
          <NavbarCollapse>
            <NavbarLink active={path === "/"} as={"div"}>
              <Link to="/">Home</Link>
            </NavbarLink>
            <NavbarLink active={path === "/about"} as={"div"}>
              <Link to="/about">About Us</Link>
            </NavbarLink>
            <NavbarLink active={path === "/projects"} as={"div"}>
              <Link to="/projects">Projects</Link>
            </NavbarLink>
          </NavbarCollapse>
      </Navbar>
    </div>
  )
}

export default Header

