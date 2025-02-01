import React from "react";
import Image from "next/image";
import Link from "next/link";

import "../styles/style.css";

function Footer() {
  return (
    <footer className="w-full bg-[#222222] text-white py-8 sticky rounded-t-[3vw] font-roboto text-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          {/* Site Branding */}
          <div className="space-y-4">
            <div className="my-2 justify-center site-brand-foot">
              <Link href="/" className="flex items-center cursor-pointer">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  AI41
                </span>
              </Link>
            </div>
            <p className="text-base">
              A project by{" "}
              <strong className="underline">
                <Link href="https://aiforeveryone.org/" target="_blank">
                  Ai For Everyone
                </Link>
              </strong>
              - making the world better with A.I.
            </p>
          </div>

          {/* Resources */}
          <div>
            <ul className="space-y-2">
              <li className="font-bold text-xl">Resources</li>
              <li>
                <a href="/ai-tutorials" className="hover:text-gray-300">
                  AI Tutorials
                </a>
              </li>
              <li>
                <a href="/ai-news" className="hover:text-gray-300">
                  AI News
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Tools */}
          <div>
            <ul className="space-y-2">
              <li className="font-bold text-xl">Useful Links</li>
              <li>
                <a href="/ai-categories" className="hover:text-gray-300">
                  AI Categories
                </a>
              </li>
              <li>
                <a href="/all-ai-tools" className="hover:text-gray-300">
                  Explore 100+ AI's
                </a>
              </li>
              <li>
                <a href="/submit-ai" className="hover:text-gray-300">
                  Submit AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-row items-center text-center">
              <span className="text-sm">
                © 2024 Aixploria. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
