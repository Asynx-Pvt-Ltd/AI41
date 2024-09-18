'use client'
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Image from 'next/image'
import Footer from '../components/Footer'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
export default function Page() {
  const [categories, setcategories] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((d) => {
        setcategories(d)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err --->', err)
        console.log('====================================')
      })
  }, [])

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
            {categories.length > 0
              ? categories.map((item: any, index: number) => (
                  <div
                    key={index}
                    className='bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-between'
                  >
                    <div className='flex items-center'>
                      <h3 className='text-lg font-semibold'>
                        {item.name ? item.name : 'General'}
                      </h3>
                    </div>
                    <span className='text-gray-500 text-sm'>
                      {item.tools.length}
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
