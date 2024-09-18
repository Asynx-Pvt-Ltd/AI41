'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value)
  }

  const videos = [
    {
      id: 'LsNHsfZFjlA',
      title: 'The ULTIMATE Beginners Guide to Midjourney in 2024',
      thumbnail: '/guide-to-midjourney-2024.jpg',
      duration: '48min',
      tags: ['#midjourney', '#ai']
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'How to Build AI Models in 2024',
      thumbnail: '/how-to-build-models-2024.jpg',
      duration: '1hr 15min',
      tags: ['#ai', '#models']
    },
    {
      id: '9bZkp7q19f0',
      title: 'Midjourney Art Techniques',
      thumbnail: '/midjourney-art-techniques.jpg',
      duration: '30min',
      tags: ['#art', '#midjourney']
    },
    {
      id: 'LsNHsfZFjlA',
      title: 'The ULTIMATE Beginners Guide to Midjourney in 2024',
      thumbnail: '/guide-to-midjourney-2024.jpg',
      duration: '48min',
      tags: ['#midjourney', '#ai']
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'How to Build AI Models in 2024',
      thumbnail: '/how-to-build-models-2024.jpg',
      duration: '1hr 15min',
      tags: ['#ai', '#models']
    },
    {
      id: '9bZkp7q19f0',
      title: 'Midjourney Art Techniques',
      thumbnail: '/midjourney-art-techniques.jpg',
      duration: '30min',
      tags: ['#art', '#midjourney']
    }
    // Add more items here
  ]

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          {/* Search Element */}
          <input
            type='text'
            placeholder='Search for tools...'
            value={searchTerm}
            onChange={handleSearch}
            className='w-full md:w-2/3 lg:w-1/2 px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {videos.map((video, index) => (
              <div
                key={index}
                className='bg-white shadow-lg rounded-lg overflow-hidden'
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  className='block'
                >
                  <div className='relative'>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={'100'}
                      height={'100'}
                      className='w-full h-auto'
                    />
                  </div>
                  <div className='p-4'>
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-lg font-semibold'>{video.title}</h3>
                      <span className='text-sm text-gray-600'>
                        {video.duration}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500'>
                      {video.tags.map((tag, i) => (
                        <span key={i} className='mr-2'>
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
