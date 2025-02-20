import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"


const Dashboard = () => {
  //! Use useLocation hook to access location object, which contains the current URL information.
  const location = useLocation()

  //! Use useEffect hook to manage the state of the 'tab' value extracted from the URL
    const [tab, setTab] = useState('')


  //TODO create a new Dashboard instance with the specified location and tab location.
  useEffect(() =>{
    // Extract the 'tab' value from the URL search parameters.
    const urlParams = new URLSearchParams(location.search)
  

    // Set the 'tab' state with the extracted value.  
    const tabFromUrl = urlParams.get('tab')

    // Update the state with the extracted tab value
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar/>
      </div>
         {/* profile */}
         {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard
