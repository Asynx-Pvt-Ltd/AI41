import React from "react";
import Image from "next/image";
import Link from "next/link";

import "../styles/style.css";

function Footer() {
  return (
    <footer className="w-full bg-[#222222] text-white py-8 rounded-t-[3vw] font-roboto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 mb-5">
          {/* Site Branding */}
          <div className="space-y-4">
            <div className="my-2">
              <Link href="/" className="flex items-center">
                <span className="text-xl md:text-2xl font-bold">AI41</span>
              </Link>
            </div>
            <p className="text-sm md:text-base">
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
          <div className="space-y-3">
            <h3 className="font-bold text-lg md:text-xl">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/ai-tutorials"
                  className="hover:text-gray-300 text-sm md:text-base"
                >
                  AI Tutorials
                </a>
              </li>
              <li>
                <a
                  href="/ai-news"
                  className="hover:text-gray-300 text-sm md:text-base"
                >
                  AI News
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Tools */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg md:text-xl">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/ai-categories"
                  className="hover:text-gray-300 text-sm md:text-base"
                >
                  AI Categories
                </a>
              </li>
              <li>
                <a
                  href="/all-ai-tools"
                  className="hover:text-gray-300 text-sm md:text-base"
                >
                  Explore 100+ AI's
                </a>
              </li>
              <li>
                <a
                  href="/submit-ai"
                  className="hover:text-gray-300 text-sm md:text-base"
                >
                  Submit AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="text-center">
            <span className="text-xs md:text-sm">
              © 2024 Aixploria. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
