'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import URL from '../../../public/url.png'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { Card } from '../components/Card'
import { useRouter } from 'next/navigation'
import ToolsByCategories from '../components/ToolsByCategories'
export default function FullList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryId, setCategoryId] = useState(-1)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<any>([])
  const [price, setPrice] = useState('')
  const router = useRouter()

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value)
  }
  const handleCategoryChange = (e: { target: { value: string } }) => {
    setCategoryId(parseInt(e.target.value))
  }

  const handlePriceChange = (e: { target: { value: string } }) => {
    setPrice(e.target.value)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          console.log('====================================')
          console.log('Failed to fetch categories')
          console.log('====================================')
          return
        }
        const data = await response.json()
        setCategories(data)
      } catch (error: any) {
        console.log('====================================')
        console.log('error.message --->', error.message)
        console.log('====================================')
      }
    }

    fetchCategories()
  }, [])

  const findTools = () => {
    if (searchTerm.trim() || categoryId || price) {
      router.push(
        `/search?s=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(
          categoryId
        )}&pricing=${encodeURIComponent(price)}`
      )
    }
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      // Handle the Enter key press
      console.log('Enter key pressed')
      // You can trigger your search logic here
      findTools()
    }
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          {/* Search Element */}
          <div className='relative w-full md:w-2/3 lg:w-1/2'>
            <input
              type='text'
              placeholder='Search for tools...'
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className='w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' // Add padding to the right for the icon
            />
            <div
              onClick={() => findTools()}
              className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'
            >
              <svg
                className='w-5 h-5 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-4.35-4.35m1.65-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z'
                ></path>
              </svg>
            </div>
          </div>
          {/* Filter Options */}
          <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-2/3 lg:w-1/2'>
            {/* Category Filter */}
            <select
              value={category}
              onChange={handleCategoryChange}
              className='px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2'
            >
              <option value=''>Select Category</option>
              {categories.map((category: { id: number; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={price}
              onChange={handlePriceChange}
              className='px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2'
            >
              <option value=''>Select Price</option>
              <option value='free'>Free</option>
              <option value='freemium'>Freemium</option>
              <option value='paid'>Paid</option>
            </select>
          </div>
        </div>

        {/* Card 1 */}
        <Card />

        <hr className='my-6 mx-9 border-t-4 border-gray-500 dark:border-white' />
        <ToolsByCategories />
        <hr className='my-6 mx-9 border-t-4 border-gray-500 dark:border-white' />
        <section className='w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col justify-center mx-auto my-9'>
          <div className='flex flex-1 flex-col justify-center items-center'>
            <Image
              src={'/ai-tools-list-rank.webp'}
              width={200}
              height={200}
              alt={''}
            />
          </div>
          <div className='flex flex-1 md:flex-col flex-row justify-evenly'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold'>
                Lists and rankings of the best AI Tools
              </h1>
              <p className='text-left mt-6 pr-3'>
                If you&apos;re interested in AI, you probably know how difficult
                it can be to find the best AIs in each category. That&apos;s why
                we&apos;ve put together this comprehensive list of the best AI
                sites, categorized, with the option of voting for your favorite
                AI. With patience and rigor, we have listed the best AI sites in
                around 50 different categories. The number of categories is
                growing steadily, as new areas of artificial intelligence emerge
                every day!
              </p>
            </div>
          </div>
        </section>
        <section className='w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col-reverse justify-center mx-auto my-9'>
          <div className='flex flex-1 flex-col justify-evenly'>
            <h1 className='text-2xl font-bold'>Ergonomic design</h1>
            <p className='text-left mt-6 pl-3'>
              With the Kanban style adopted, you can easily see which AIs are
              currently trending in each category. Each AI is accompanied by a
              brief description (mouse-over) and a link to its website. You can
              also easily identify their pricing: free, freemium or paid.
              What&apos;s more, a keyword search function is available for quick
              navigation to the AIs of your choice.
            </p>
          </div>
          <div className='flex flex-1 flex-col justify-center items-center'>
            <Image
              src={'/kanban-ai-aixploria-list.webp'}
              width={200}
              height={200}
              alt={''}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
