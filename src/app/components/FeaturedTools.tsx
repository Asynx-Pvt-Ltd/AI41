"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {}
interface Project {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
  slug?: string;
}

interface CardsProps {
  projects: Project[];
}

const FeaturedTools: NextPage<Props> = ({}) => {
  const [projects, setProjects] = useState<Project[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/feature-tools")
      .then((res) => res.json())
      .then((ft) => {
        const projectsWithSlugs = ft.slice(0, 5).map((project: Project) => ({
          ...project,
          slug: project.title.toLowerCase().replace(/\s+/g, "-"),
        }));
        setLoading(false);
        setProjects(projectsWithSlugs);
      })
      .catch((err) => {
        console.error("Error fetching featured tools:", err);
        setLoading(false);
      });
  }, []);

  if (!loading && (!projects || projects.length === 0)) {
    return null;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl text-center mb-6">Featured Tools</h2>
      {loading ? (
        <div className="flex flex-row justify-center items-center w-full ml-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto pr-5">
          <div className="flex flex-col justify-center items-center">
            {projects?.map((project, idx) => (
              <div
                key={project?.id}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full block"
                      layoutId="hoverBackground"
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
                  <div className="flex flex-col justify-around">
                    <div className="flex flex-row justify-center text-white dark:text-white dark:bg-gray-800 bg-[#222222] rounded-xl opacity-95">
                      <span className="text-xl my-auto mx-1 ">★</span>
                      <span className="text-xl my-auto">Featured</span>
                    </div>
                    <div className="flex flex-row justify-center align-middle mt-5">
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
                    <div className="flex flex-row justify-center mt-2">
                      <p
                        className="my-3 text-black tracking-wide leading-tight text-sm text-pretty text-center px-2 m-auto line-clamp-3 overflow-hidden not-italic "
                        dangerouslySetInnerHTML={{
                          __html: project.description,
                        }}
                      ></p>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-2">
                      <Link
                        href={`/tool/${project.slug}`}
                        className="w-14 h-8 rounded-md py-1 px-2 bg-black text-white dark:bg-white dark:text-black"
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedTools;
