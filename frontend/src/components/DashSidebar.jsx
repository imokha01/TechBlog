import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const DashSidebar = () => {
  //! Use useLocation hook to access location object, which contains the current URL information.
  const location = useLocation();

  //! Use useEffect hook to manage the state of the 'tab' value extracted from the URL
  const [tab, setTab] = useState("");

  //TODO create a new Dashboard instance with the specified location and tab location.
  useEffect(
    () => {
      const urlParams = new URLSearchParams(location.search);

      // Set the 'tab' state with the extracted value.
      const tabFromUrl = urlParams.get("tab");

      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    },
    [location.search]
  );
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
              Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
