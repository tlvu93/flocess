import { useAuth } from "@context/auth-context";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ProfileButton {
  open: boolean;
  setOpen: Function;
  isAuthenticated: boolean;
  logout: Function;
}

const ProfileButton = ({
  open,
  setOpen,
  isAuthenticated,
  logout,
}: ProfileButton) => {
  const router = useRouter();

  const handleOnLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    router.push("/signin");
  };

  return (
    <div className="relative ml-3">
      {/* Profile dropdown Button*/}
      <button
        type="button"
        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open user menu</span>
        <div className="h-8 w-8">
          {isAuthenticated ? (
            <Image
              className="rounded-full"
              layout="fill"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="alt"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </button>

      {/* sm menu open */}
      {open && (
        <div className="absolute right-0 w-60 rounded-lg border bg-white px-5 py-3 shadow dark:border-transparent dark:bg-gray-800">
          {isAuthenticated ? (
            <ul className="space-y-3 dark:text-white">
              {/* Account Li*/}
              <li className="font-medium">
                <a
                  href="#"
                  className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-indigo-700"
                >
                  <div className="mr-3">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  Account
                </a>
              </li>
              {/* Setting Li*/}
              <li className="font-medium">
                <a
                  href="#"
                  className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-indigo-700"
                >
                  <div className="mr-3">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  Setting
                </a>
              </li>
              {/* Divider*/}
              <hr className="dark:border-gray-700" />
              {/* Logout Li*/}
              <li className="font-medium">
                <button
                  onClick={(e) => handleOnLogout(e)}
                  className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-red-600"
                >
                  <div className="mr-3 text-red-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="space-y-3 dark:text-white">
              {/* Sign in Li*/}
              <li className="font-medium">
                <Link href="/signin">
                  <a className="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-green-600">
                    <div className="mr-3 text-green-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    Sign In
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto  px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/*
                Icon when menu is closed.
                Heroicon name: outline/menu
                Menu open: "hidden", Menu closed: "block"
              */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/*
                Icon when menu is open.
                Heroicon name: outline/x
                Menu open: "block", Menu closed: "hidden"
              */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="relative flex flex-1  sm:items-stretch">
            {/* Brand */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <a>
                  <div className="relative h-14 w-52">
                    <Image layout="fill" src={"/Flocess.png"} alt="Logo" />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {/* Right Menu Buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <ProfileButton
              open={open}
              setOpen={setOpen}
              isAuthenticated={isAuthenticated}
              logout={logout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
