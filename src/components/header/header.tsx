import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { useAuth } from '@context/auth-context';

import { ProfileDropdown } from './ProfileDropdown';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto  px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {/*
                Icon when menu is closed.
                Heroicon name: outline/menu
                Menu open: "hidden", Menu closed: "block"
              */}
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/*
                Icon when menu is open.
                Heroicon name: outline/x
                Menu open: "block", Menu closed: "hidden"
              */}
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='relative flex flex-1  sm:items-stretch'>
            {/* Brand */}
            <div className='flex flex-shrink-0 items-center'>
              <Link href='/'>
                <a>
                  <div className='relative h-14 w-52'>
                    <Image layout='fill' src={'/Flocess.png'} alt='Logo' />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {/* Right Menu Buttons */}
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {/* Profile dropdown */}
            <ProfileDropdown
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
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
