import { useSelector } from "react-redux"
import PropTypes from 'prop-types';


//TODO This is a custom React component to manage theme
const ThemeProvider = ({children}) => {
    const {theme} = useSelector(state => state.theme)

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gary-200 dark:bg-[rgb(16,23,42)] min-h-screen ">
        {children}
      </div>
    </div>
  )
}

//! This is checking the properties type of the parameters (e.g. children)
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider

