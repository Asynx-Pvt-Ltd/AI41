import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/style.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Navigation items with their respective lord-icon sources
  const navItems = [
    {
      href: "/all-ai-tools",
      text: "Full List",
      iconSrc: "https://cdn.lordicon.com/jeuxydnh.json", // List icon
    },
    {
      href: "/ai-categories",
      text: "AI Categories",
      iconSrc: "https://cdn.lordicon.com/xcrjfxeh.json", // Category/folder icon
    },
    {
      href: "/ai-tutorials",
      text: "AI Tutorials",
      iconSrc: "https://cdn.lordicon.com/fihkmkwt.json", // Book/tutorial icon
    },
    {
      href: "/job",
      text: "AI Jobs",
      iconSrc: "https://cdn.lordicon.com/mrdiiocb.json", // Briefcase/job icon
    },
  ];

  return (
    <header id="header" className="site-header dark:bg-gray-800 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4 px-8">
        {/* Left: Logo/Image */}
        <Link href="/" className="flex items-center cursor-pointer">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400">
            AI41
          </span>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex justify-around sm:justify-start space-x-2 sm:space-x-6 mt-4 sm:mt-0">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2 group">
                <lord-icon
                  src={item.iconSrc}
                  trigger="hover"
                  target=".group"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 group-hover:text-gray-300 dark:group-hover:text-blue-400">
                  {item.text}
                </span>
              </div>
            </Link>
          ))}

          <Dropdown
            isOpen={menuDisplay}
            onMouseLeave={() => setMenuDisplay(false)}
            className="bg-[#222222]"
          >
            <DropdownTrigger>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setMenuDisplay(true)}
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/vexjzsuj.json"
                  trigger="hover"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-blue-400">
                  More
                </span>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-[#222222]"
              aria-label="Static Actions"
              itemClasses={{
                base: [
                  "data-[hover=true]:text-foreground",
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
                  className="flex items-center space-x-2 px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg text-white dark:text-gray-300 hover:text-black dark:hover:text-blue-400"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/eqxyjqxd.json"
                    trigger="hover"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  <span>AI News</span>
                </Link>
              </DropdownItem>
              <DropdownItem
                key="submit-ai"
                className="bg-[#222222] hover:bg-gray-600"
              >
                <Link
                  href="/submit-ai"
                  className="flex items-center space-x-2 px-4 py-2 text-sm sm:text-base md:text-lg lg:text-lg text-white dark:text-gray-300 hover:text-black dark:hover:text-blue-400"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/mecwbjnp.json"
                    trigger="hover"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  <span>Submit AI</span>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
};
