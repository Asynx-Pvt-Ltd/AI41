"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";

import Footer from "../components/Footer";
import Link from "next/link";

export default function Page() {
  const [categories, setcategories] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/job-roles")
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        setcategories(d);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("err --->", err);
        console.log("====================================");
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        <h1 className="text-3xl font-bold text-center mb-4">AI Jobs</h1>
        {loading === false ? (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.length > 0
                ? categories.map((item: any, index: number) => (
                    <Link
                      href={`/job/${item.slug}`}
                      key={index}
                      className="bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold">
                          <i className={item.fontIcon}></i>{" "}
                          {item.name ? item.name : "General"}
                        </h3>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {item.tools.length}
                      </span>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
