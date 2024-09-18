import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../styles/style.css'

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Apply dark mode class to the <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <header id='header' className='site-header dark:bg-gray-800'>
      <div className='container mx-auto flex items-center justify-between py-4 px-8'>
        {/* Left: Logo/Image */}
        <div className='flex items-center'>
          {/* <Image
          src='/logo.png' // Replace with your logo path
          alt='Logo'
          width={50}
          height={50}
          className='mr-2'
        /> */}
          <span className='text-xl font-bold text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
            AI XPORIA
          </span>
        </div>

        {/* Right: Navigation */}
        <nav className='flex space-x-6'>
          <Link
            href='/full-list'
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            Full List
          </Link>
          <Link
            href='/ai-categories'
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            AI Categries
          </Link>
          <Link
            href='/ai-tutorials'
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            AI Tutorials
          </Link>
          <nav className='relative group'>
            <div className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              More
            </div>
            <div className='absolute hidden  group-hover:block group-hover:flex-col bg-white text-gray-800 shadow-lg rounded-md mt-1 w-48 left-[-32px]'>
              <Link
                href='/ai-news'
                className='flex px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              >
                AI News
              </Link>
              <Link
                href='/submit-ai'
                className='flex px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              >
                Submit AI
              </Link>
            </div>
          </nav>
          <button
            onClick={toggleDarkMode}
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none'
          >
            {darkMode ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3v1m0 16v1m8.485-9.485h-1M4.515 12h-1m15.364-6.364l-.707-.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707.707M12 5a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7z'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9z'
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
