"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logout, selectUserToken } from "store/slices/userSlice";
import useSWRMutation from "swr/mutation";
import { redirect, useRouter } from "next/navigation";
import { postRequest } from "pages/api/hello";
import { Button, Navbar } from "flowbite-react";
import { animateCSS, toggleAnimate } from "./SideBar";
// import Notifications from "./Components/Notifications";

function NavBar() {
  const router = useRouter();
  const token = useAppSelector(selectUserToken);
  const [isSignIn, setIsSignIn] = useState(true);
  const [animate, setAnimate] = useState(true);
  const dispatch = useAppDispatch();
  const {
    trigger: LogoutUser,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/auth/signout", postRequest);
  const logOut = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const res = await LogoutUser(null);
      const jsonRes = await res?.json();
      console.log(jsonRes);

      if (jsonRes.success) {
        dispatch(logout());
        // redirect("/login");

        router.push("/login");
      } else {
        alert(jsonRes.message);
      }
      //   console.log("data", data1.data);
      //   alert(JSON.stringify(data1.data));
    } catch (err) {
      console.log("err", err);
    }
  };

  // useEffect(() => {
  //   if (!isSignIn) {
  //     router.push("/login");
  //   }
  // }, [isSignIn]);
  useEffect(() => {
    if (token) setIsSignIn(true);
    else setIsSignIn(false);
  }, [token]);
  const openSideBar = () => {
    // dispatch(toggleSideBar());
  };
  const Nav = () => {
    return (
      <Navbar className="bg-slate-700" fluid={true}>
        <Navbar.Brand
          // className="mr-3 h-9 sm:h-9 w-20"
          href="/"
        >
          <img
            src="/wheelchair-icon.png"
            className="mr-3 h-10 animate__animated animate__fadeInRight animate__slower"
            alt="Accessible Careers Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2  ">
          {/* {isSignIn && (
            <div className="flex md:w-[12vw] lg:w-[15vw] xl:w-[20vw] 2xl:w-[20vw] items-center justify-start">
              <Notifications />
            </div>
          )} */}
          <Navbar.Toggle className="ml-3" />
        </div>
        <Navbar.Collapse>
          {/* <Navbar.Link> */}
          <Link
            href="/"
            className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
          >
            Home
          </Link>
          {/* </Navbar.Link> */}
          {!isSignIn ? (
            <>
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/register"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
              >
                Register
              </Link>
              {/* </Navbar.Link> */}
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/login"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400"
              >
                Login
              </Link>
              {/* </Navbar.Link> */}
            </>
          ) : (
            <>
              {/* <Navbar.Link className="hover:bg-slate-600"> */}
              <Link
                href="/create-contract"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400 "
              >
                Create Jobs
              </Link>
              <Link
                href="/search"
                className="text-white whitespace-nowrap font-normal text-lg hover:text-gray-400 "
              >
                search
              </Link>

              <div
                // onClick={openSideBar}
                onClick={() => {
                  toggleAnimate(
                    "aside",
                    "animate__fadeInLeft",
                    "animate__fadeOutLeft"
                  );
                }}
                className=" text-white whitespace-nowrap font-normal text-lg cursor-pointer hover:text-gray-400"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-400 from-sky-400 hover:to-sky-200 hover:from-orange-400">
                  My Jobs
                </span>
              </div>
              <div
                onClick={logOut}
                className=" text-white whitespace-nowrap font-normal text-lg cursor-pointer hover:text-gray-400"
              >
                logout
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return <Nav />;
}

export default NavBar;
