'use client'

import Image from 'next/image'
import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { useState, useEffect, Key } from 'react'
import Link from 'next/link'

export default function Page() {
  const [news, setNews] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/news')
      .then((res) => res.json())
      .then((d) => {
        console.log('====================================')
        console.log('news --->', d)
        console.log('====================================')
        setLoading(false)
        setNews(d)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err  --->', err)
        console.log('====================================')
      })
  }, [])

  // const newsData = [
  //   {
  //     title: 'AI Revolutionizing Healthcare in 2024',
  //     description:
  //       'Artificial intelligence is transforming the healthcare sector with cutting-edge technology, improving diagnostics and patient care.',
  //     date: 'September 5, 2024',
  //     image:
  //       'https://qualitrix.com/wp-content/uploads/2023/05/Future-Of-AI-In-HealthCare.png'
  //   },
  //   {
  //     title: 'Midjourney Introduces Stunning AI Art Features',
  //     description:
  //       "Midjourney's latest AI features bring unprecedented creativity to digital art, allowing users to create stunning visuals.",
  //     date: 'August 28, 2024',
  //     image:
  //       'https://miro.medium.com/v2/resize:fit:512/1*KRypQvgkXZuMk2rE9027eg.png'
  //   },
  //   {
  //     title: 'AI Agents: The Future of Automated Workflows',
  //     description:
  //       'AI agents are increasingly automating workflows, making businesses more efficient with minimal human intervention.',
  //     date: 'August 21, 2024',
  //     image:
  //       'https://www.allabtai.com/wp-content/uploads/2023/04/ai-agents-autogpt-2.jpg'
  //   },
  //   {
  //     title: 'OpenAI Unveils GPT-5 with Advanced Capabilities',
  //     description:
  //       'The release of GPT-5 by OpenAI is set to revolutionize natural language processing and offer more human-like interactions.',
  //     date: 'August 15, 2024',
  //     image: 'https://i.ytimg.com/vi/TfNiCeN7Zvo/maxresdefault.jpg'
  //   }
  // ]

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold text-center mb-8'>
            Latest AI News & Trends
          </h1>
          {loading === false ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {news.map((n: any, index: number) => (
                <div
                  key={index}
                  className='bg-white shadow-lg rounded-lg overflow-hidden'
                >
                  <Image
                    src={n.icon}
                    alt={n.title}
                    width={100}
                    height={192}
                    className='w-full h-48 object-cover'
                  />
                  <Link href={n.url} target='_blank' className='p-4'>
                    <h2 className='text-xl font-semibold mb-2'>{n.title}</h2>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-row justify-center items-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white'></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
