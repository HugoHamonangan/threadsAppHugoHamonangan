import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoCalendarNumberOutline,
  IoCalendarNumber,
  IoExitOutline,
  IoLogIn,
  IoLogInOutline,
  IoClose,
} from "react-icons/io5";
import { FaBarsProgress } from "react-icons/fa6";
import { asyncUnsetAuthUser } from "../states/authUser/action";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();

  const dispatch = useDispatch();

  const ownProfile = useSelector((state) => state.ownProfile);

  const isLoggedIn = accessToken !== null;
  const [toggleNav, setToggleNav] = useState(false);

  function isToggleNav() {
    setToggleNav(!toggleNav);
  }

  return (
    <>
      <button
        className="p-2 bg-blue-500 text-white z-20 text-lg fixed bottom-5 left-5 md:hidden block"
        onClick={isToggleNav}
      >
        {!toggleNav ? <FaBarsProgress /> : <IoClose />}
      </button>

      <nav
        className={`${
          toggleNav ? "!block" : "!hidden"
        } fixed z-10 bottom-0 left-0 w-[8rem] bg-gray-200 py-3 px-3 transition-all h-screen hidden md:!block`}
      >
        <ul className="flex flex-col justify-evenly gap-4">
          <li>
            <Link to="/">
              <div className="text-2xl p-2 flex justify-center flex-col items-center gap-1">
                {location.pathname === "/" ? <IoHome /> : <IoHomeOutline />}
                <p className="text-sm">Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/leaderboards">
              <div className="text-2xl p-2 flex justify-center flex-col items-center gap-1">
                {location.pathname === "/leaderboards" ? (
                  <IoCalendarNumber />
                ) : (
                  <IoCalendarNumberOutline />
                )}
                <p className="text-sm">Leaderboards</p>
              </div>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(asyncUnsetAuthUser());
                }}
                className="cursor-pointer"
              >
                <div className="text-3xl p-2 flex justify-center flex-col items-center gap-1">
                  <IoExitOutline />
                  <p className="text-sm">Logout</p>
                </div>
              </a>
            ) : (
              <Link to="/auth">
                <div className="text-3xl p-2 flex justify-center flex-col items-center gap-1">
                  {location.pathname === "/auth" ? (
                    <IoLogIn />
                  ) : (
                    <IoLogInOutline />
                  )}
                  <p className="text-sm">Login</p>
                </div>
              </Link>
            )}
          </li>
          <li className="border w-full flex justify-center text-sm mt-9 flex-col items-center">
            <p className="font-bold capitalize">
              {accessToken ? ownProfile.name : "belum login"}
            </p>
            <img
              className="mt-2"
              src={
                accessToken ? ownProfile.avatar : "https://placehold.co/600x400"
              }
              alt="image"
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
