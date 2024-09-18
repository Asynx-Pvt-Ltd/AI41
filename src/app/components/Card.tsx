'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from './Button'
interface Project {
  title: string
  description: string
  link: string
}

interface CardsProps {
  projects: Project[]
}

export const Card = () => {
  const [projects, setProjects] = useState<Project[] | null>()
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/feature-tools')
      .then((res) => res.json())
      .then((ft) => {
        setProjects(ft)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err -->', err)
        console.log('====================================')
      })
  }, [])

  return (
    <section className='container mx-auto'>
      <h2 className='text-2xl font-semibold text-gray-900 dark:text-white pt-6 mb-6'>
        Featured Tools
      </h2>

      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-10'>
          {projects &&
            projects?.map((project, idx) => (
              <div
                key={project?.link}
                className='relative group block p-2 h-full w-full '
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className='absolute inset-0 h-full w-full block'
                      layoutId='hoverBackground' // required for the background to follow
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 }
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 }
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className='rounded-md h-full w-full p-2 overflow-hidden bg-white border-slate-400 dark:bg-gray-800 dark:border-slate-500 border dark:group-hover:border-slate-300 group-hover:border-slate-700 relative z-50'>
                  <div className='relative z-50'>
                    <div className='p-4'>
                      <div className='absolute justify-evenly pt-[1px] pl-[9px] pb-[2px] pr-[5px] text-black dark:text-white right-0 opacity-100 top-0  left-0 bg-white dark:bg-gray-800'>
                        <span className='text-xl my-auto mx-1'>★</span>
                        <span className='text-xl my-auto'>Featured</span>
                      </div>
                      <h4 className='text-black dark:text-zinc-100 font-bold tracking-wide mt-6'>
                        {project.title}
                      </h4>
                      <p className='mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm'>
                        {project.description}
                      </p>
                      <Button className='mt-2 dark:bg-white dark:text-black'>
                        Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
