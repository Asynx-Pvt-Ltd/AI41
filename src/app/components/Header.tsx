import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/style.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  Button,
  DropdownItem,
} from "@nextui-org/react";
export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header id="header" className="site-header dark:bg-gray-800 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4 px-8 ">
        {/* Left: Logo/Image */}
        <Link href="/" className="flex items-center cursor-pointer">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400">
            AI XPORIA
          </span>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex flex-wrap justify-around sm:justify-start space-x-2 sm:space-x-6 mt-4 sm:mt-0">
          <Link
            href="/full-list"
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400"
          >
            Full List
          </Link>
          <Link
            href="/ai-categories"
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400"
          >
            AI Categories
          </Link>
          <Link
            href="/ai-tutorials"
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400"
          >
            AI Tutorials
          </Link>

          <Dropdown
            isOpen={menuDisplay}
            onMouseLeave={() => setMenuDisplay(false)}
          >
            <DropdownTrigger>
              <div
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400 cursor-pointer"
                onMouseEnter={() => setMenuDisplay(true)}
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                More
              </div>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-[#222222]"
              aria-label="Static Actions"
              itemClasses={{
                base: [
                  "data-[hover=true]:text-foreground",
                  // "data-[hover=true]:bg-transparent",
                  "dark:data-[hover=true]:bg-gray-500",
                ],
              }}
            >
              <DropdownItem
                key="news"
                className="bg-[#222222] hover:bg-gray-600"
              >
                <Link
                  href="/ai-news"
                  className="flex px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg text-white dark:text-gray-300 hover:text-black dark:hover:text-blue-400"
                >
                  AI News
                </Link>
              </DropdownItem>
              <DropdownItem
                key="submit-ai"
                className="bg-[#222222] hover:bg-gray-600"
              >
                <Link
                  href="/submit-ai"
                  className="flex px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg text-white dark:text-gray-300 hover:text-black dark:hover:text-blue-400"
                >
                  Submit AI
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <button
              onClick={toggleDarkMode}
              className="text-white dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.485-9.485h-1M4.515 12h-1m15.364-6.364l-.707-.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707.707M12 5a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9z"
                  />
                </svg>
              )}
            </button> */}
        </nav>
      </div>
    </header>
  );
};
