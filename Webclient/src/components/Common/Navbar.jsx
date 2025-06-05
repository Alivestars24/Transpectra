import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "../core/ProfileDropDown";
import logo from "../../assets/Images/Logo.png";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Paths where navbar should be hidden
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  // Check if the current page is the homepage to make the navbar fully transparent
  const isHomePage = location.pathname === "/";

  if (hideNavbar) {
    return null;
  }

  return (
    <div
      className={`w-full flex h-12 items-center justify-center ${
        isHomePage ? "fixed top-0 left-0 bg-transparent" : "bg-blu"
      } transition-all duration-200 z-50`}
    >
      <div className="flex w-10/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" className={` ${ isHomePage ? "h-18 w-40 mt-3" : "w-36 h-12 py-2"} py-2 pl-6 `}/>
        </Link>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-[5px] border border-blu bg-richblue-5 px-[17px] py-[3px] text-richblue-700">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[5px] border border-blu bg-richblue-5 px-[17px] py-[3px] text-richblue-700">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
