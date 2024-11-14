"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/Button";
import prisma from "../../lib/primsa";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
interface Tools {
  icon: string;
  name: string;
  description: string;
}

interface searchedprops {
  filteredtools: Tools[];
}

function Search() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams?.get("s");
  const category = searchParams?.get("category");
  const pricing = searchParams?.get("pricing");
  const [filteredtools, setFilteredTools] = useState<Tools[] | []>([]);

  const getFilteredTools = async () => {
    setLoading(true);
    const data = await fetch(
      `/api/categories/search?searchTerm=${encodeURIComponent(
        query ?? ""
      )}&categoryId=${encodeURIComponent(
        category ?? ""
      )}&pricing=${encodeURIComponent(pricing ?? "")}`
    );
    const t = await data.json();
    console.log("====================================");
    console.log("t -->", t);
    console.log("====================================");
    setFilteredTools(t);
    setLoading(false);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (query || category || pricing) {
      getFilteredTools();
    }
  }, [query, category, pricing]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        {loading === false ? (
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-10">
              {filteredtools.length ? (
                filteredtools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="rounded-md h-full w-full p-2 overflow-hidden bg-white border-slate-400 dark:bg-gray-800 dark:border-slate-500 border dark:group-hover:border-slate-300 group-hover:border-slate-700 relative z-50"
                  >
                    <div className="relative z-50">
                      <div className="p-4">
                        <div className="absolute justify-evenly pt-[1px] pl-[9px] pb-[2px] pr-[5px] text-black dark:text-white right-0 opacity-100 top-0  left-0 bg-white dark:bg-gray-800">
                          <span className="text-xl my-auto mx-1">★</span>
                          <span className="text-xl my-auto">Featured</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-6">
                          <div className="flex flex-col justify-center">
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 invert"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="text-black dark:text-zinc-100 font-bold tracking-wide">
                              {tool.name}
                            </h4>
                          </div>
                        </div>
                        <p
                          className="mt-4 text-black tracking-wide leading-tight text-sm text-justify overflow-hidden line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: tool.description,
                          }}
                        />
                        <Link href={"/tool/" + tool.slug}>
                          <Button className="mt-3 dark:bg-white dark:text-black">
                            Visit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="justify-center">
                  <h1>No Tools Found</h1>
                </div>
              )}
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

export default function SearchPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
