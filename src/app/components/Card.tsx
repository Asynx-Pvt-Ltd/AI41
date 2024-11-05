"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
interface Project {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface CardsProps {
  projects: Project[];
}

export const Card = () => {
  const [projects, setProjects] = useState<Project[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/feature-tools")
      .then((res) => res.json())
      .then((ft) => {
        setLoading(false);
        setProjects(ft);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("err -->", err);
        console.log("====================================");
      });
  }, []);

  return (
    <section className="container mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white pt-6 mb-6">
        Featured Tools
      </h2>
      <>
        {loading === false ? (
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-10">
              {projects?.length && !loading
                ? projects?.map((project, idx) => (
                    <div
                      key={project?.link}
                      className="relative group block p-2 h-full w-full "
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <AnimatePresence>
                        {hoveredIndex === idx && (
                          <motion.span
                            className="absolute inset-0 h-full w-full block"
                            layoutId="hoverBackground" // required for the background to follow
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: { duration: 0.15 },
                            }}
                            exit={{
                              opacity: 0,
                              transition: { duration: 0.15, delay: 0.2 },
                            }}
                          />
                        )}
                      </AnimatePresence>
                      <div className="flex flex-col justify-around rounded-md h-full w-full p-2 overflow-hidden bg-white border-slate-400 dark:bg-gray-800 dark:border-slate-500 border dark:group-hover:border-slate-300 group-hover:border-slate-700 relative z-50">
                        {/* <div className='relative z-50'> */}
                        <div className="flex flex-col justify-around">
                          <div className="flex flex-row justify-center text-white dark:text-white dark:bg-gray-800 bg-[#222222] rounded-xl opacity-95">
                            <span className="text-xl my-auto mx-1 ">★</span>
                            <span className="text-xl my-auto">Featured</span>
                          </div>
                          <div className="flex flex-row justify-center align-middle mt-3">
                            <div className="flex flex-col justify-center mr-1">
                              <Image
                                src={project?.icon}
                                alt={project?.title}
                                width={32}
                                height={32}
                                className="w-8 h-8"
                              />
                            </div>
                            <div className="flex flex-col justify-center ml-1">
                              <h4 className="text-black dark:text-zinc-100 font-bold tracking-wide">
                                {project.title}
                              </h4>
                            </div>
                          </div>
                          <div className="flex flex-row justify-center ">
                            <p
                              className="my-4 text-zinc-400 tracking-wide leading-relaxed text-sm text-pretty text-justify px-2 m-auto line-clamp-8 overflow-hidden"
                              dangerouslySetInnerHTML={{
                                __html: project.description.slice(0, 200),
                              }}
                            ></p>
                          </div>
                          <div className="flex flex-col justify-center items-center mt-2">
                            <Link
                              href={project.link}
                              target={"_blank"}
                              className="w-14 h-8 rounded-md py-1 px-2 bg-black text-white dark:bg-white dark:text-black"
                            >
                              Visit
                            </Link>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        )}
      </>
    </section>
  );
};
