'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import URL from '../../../public/url.png'

interface Tool {
  icon: string
  name: string
  description: string
  url: string
}

interface ToolsByCategory {
  name: string
  tools: Tool[]
}

interface toolProps {
  toolsByCategories: ToolsByCategory[]
}

function ToolsByCategories() {
  const [tools, setTools] = useState<ToolsByCategory[] | null>()

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((t) => {
        console.log('====================================')
        console.log('tools -->', t)
        console.log('====================================')
        setTools(t)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err --->', err)
        console.log('====================================')
      })
  }, [])
  return (
    <section className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6'>
      {tools &&
        tools.length > 0 &&
        tools?.map((category: ToolsByCategory, index: number) =>
          category.tools.length > 0 ? (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 dark:border dark:border-slate-500 rounded-lg shadow-lg p-4'
            >
              <h2 className='dark:text-white text-xl font-bold mb-4'>
                {category.name}
              </h2>
              <hr className='my-6 mx-6 border-t-4 border-gray-500 dark:border-white' />
              <div className='max-h-40 overflow-y-auto'>
                <ul className='list-none pl-5'>
                  {category?.tools?.map((tool, idx) => (
                    <li key={idx} className='flex flex-row justify-between'>
                      <div className='flex flex-1 flex-row justify-start'>
                        <span className='dark:text-white'>{idx + 1}</span>
                        <span className='ml-2'>
                          <a
                            href={tool.url}
                            target='_blank'
                            className='flex flex-1 text-black dark:text-white hover:underline'
                          >
                            {tool.name}
                          </a>
                        </span>
                      </div>
                      <div className='flex flex-row justify-end'>
                        <a
                          href={tool.url}
                          target='_blank'
                          className='text-blue-500 hover:underline'
                        >
                          <Image src={URL} alt='url' width={24} height={24} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null
        )}
    </section>
  )
}

export default ToolsByCategories

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    include: {
      tools: true // Include all the tools under each category
    }
  })

  // Map the data to the desired format
  const formattedData = categories.map(
    (category: { name: any; tools: any[] }) => ({
      category: category.name,
      tools: category.tools.map((tool) => ({
        name: tool.name,
        icon: tool.icon,
        description: tool.description,
        url: tool.url
      }))
    })
  )

  return {
    props: {
      toolsByCategories: formattedData // Pass the formatted data to the page component
    }
  }
}
