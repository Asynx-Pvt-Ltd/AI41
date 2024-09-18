'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import URL from '../../../public/url.png'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { Card } from '../components/Card'
export default function FullList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')

  const toolsByCategories = [
    {
      category: 'Latest AI',
      tools: [
        {
          name: 'HIX.AI',
          url: 'https://hix.ai'
        },
        {
          name: 'PhotoShop AI',
          url: 'https://www.adobe.com/products/photoshop.html'
        }
      ]
    },
    {
      category: 'Ai Tool Selection',
      tools: [
        {
          name: 'AI Fashion Models',
          url: 'https://insmind.com/ai-model'
        },
        {
          name: 'TikTok Watermark Remover',
          url: 'https://www.media.io/tiktok-watermark-remover.html'
        }
      ]
    },
    {
      category: 'Super Tools',
      tools: [
        {
          name: 'MidJourney V6.1',
          url: 'https://midjourney.com'
        },
        {
          name: 'Stable Diffusion',
          url: 'https://stablediffusionweb.com'
        }
      ]
    },
    {
      category: 'Chat Assistant',
      tools: [
        {
          name: 'ChatGPT',
          url: 'https://chat.openai.com'
        },
        {
          name: 'Claude AI',
          url: 'https://claude.ai'
        }
      ]
    }
  ]
  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value)
  }
  const handleCategoryChange = (e: { target: { value: string } }) => {
    setCategory(e.target.value)
  }

  const handlePriceChange = (e: { target: { value: string } }) => {
    setPrice(e.target.value)
  }

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

          {/* Filter Options */}
          <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-2/3 lg:w-1/2'>
            {/* Category Filter */}
            <select
              value={category}
              onChange={handleCategoryChange}
              className='px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2'
            >
              <option value=''>Select Category</option>
              <option value='nlp'>Natural Language Processing</option>
              <option value='vision'>Computer Vision</option>
              <option value='audio'>Audio Processing</option>
              <option value='robotics'>Robotics</option>
              <option value='analytics'>Analytics</option>
              {/* Add more categories as needed */}
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
        <section className='container mx-auto'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white pt-6 mb-6'>
            Featured Tools
          </h2>

          {/* Card 1 */}
          <Card />
        </section>
        <hr className='my-6 mx-9 border-t-4 border-gray-500 dark:border-white' />
        <section className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6'>
          {toolsByCategories.map((category, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 dark:border dark:border-slate-500 rounded-lg shadow-lg p-4'
            >
              <h2 className='dark:text-white text-xl font-bold mb-4'>
                {category.category}
              </h2>
              <hr className='my-6 mx-6 border-t-4 border-gray-500 dark:border-white' />
              <div className='max-h-40 overflow-y-auto'>
                <ul className='list-none pl-5'>
                  {category.tools.map((tool, idx) => (
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
          ))}
        </section>
        <hr className='my-6 mx-9 border-t-4 border-gray-500 dark:border-white' />
        <section className='w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 flex-row justify-center mx-auto my-9'>
          <div className='flex flex-1 flex-col justify-center items-center'>
            <Image
              src={'/ai-tools-list-rank.webp'}
              width={200}
              height={200}
              alt={''}
            />
          </div>
          <div className='flex flex-1 flex-col justify-evenly'>
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
        </section>
        <section className='w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 flex-row justify-center mx-auto my-9'>
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
