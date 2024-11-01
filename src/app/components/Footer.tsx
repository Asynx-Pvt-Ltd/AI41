import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <footer className='w-full bg-gray-900 text-white py-8 sticky'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Site Branding */}
          <div className='space-y-4'>
            <div className='my-2 justify-center site-brand-foot'>
              <Image
                src='/logo-light-aixploria.webp'
                alt='Aixploria'
                title='Aixploria'
                width='200'
                height='45'
                className='logo24'
                loading='lazy'
                decoding='async'
              />
            </div>
            <p>Artificial intelligence for everyone</p>
            <ul className='flex space-x-4'>
              <li>
                <a href='#' className='block w-12 h-12'>
                  <Image
                    src='/icon-lang-english-us.webp'
                    alt='English'
                    className='mx-auto'
                    width={20}
                    height={0}
                    loading='lazy'
                    decoding='async'
                  />
                </a>
              </li>
              <li>
                <a href='#' className='block w-12 h-12'>
                  <Image
                    src='/icon-lang-fr.webp'
                    alt='Français'
                    className='mx-auto'
                    width={20}
                    height={0}
                    loading='lazy'
                    decoding='async'
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <ul className='space-y-2'>
              <li className='font-bold text-lg'>Resources</li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Tutorials, tips and blog
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  AI Conferences Agenda
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  AI Glossary & Lexicon
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Tools */}
          <div>
            <ul className='space-y-2'>
              <li className='font-bold text-lg'>Useful Tools</li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Best AI Youtube Channels
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Top 100 AI
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  GPTs List
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Hubspot AI Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <ul className='space-y-2'>
              <li className='font-bold text-lg'>Company</li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-300'
                  rel='nofollow noopener'
                >
                  Submit an AI Tool
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-300'
                  rel='nofollow noopener'
                >
                  Submit a GPTs
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-300'
                  rel='nofollow noopener'
                >
                  Submit an AI Event
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-300'
                  rel='nofollow noopener'
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-gray-300'
                  rel='nofollow noopener'
                >
                  Feature your tool ★
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-row justify-evenly items-center text-center'>
              <span className='text-sm'>
                © 2024 Aixploria. All rights reserved.
              </span>
              <Image
                className='ml-2'
                src='/aixploria-eco-friendly-green.webp'
                alt='Green World'
                title='Eco-Friendly'
                width={15}
                height={15}
                loading='lazy'
                decoding='async'
              />
              {/* <div className='flex justify-center items-center space-x-4 mt-2'> */}
              <a
                href='#'
                className='hover:text-gray-300 text-[12px] ml-2'
                rel='nofollow noopener'
              >
                Cookie Policy
              </a>
              <a
                href='#'
                className='hover:text-gray-300 text-[12px] ml-2'
                rel='nofollow noopener'
              >
                Conditions of use
              </a>
              <a
                href='#'
                className='hover:text-gray-300 text-[12px] ml-2'
                rel='nofollow noopener'
              >
                Legals informations
              </a>
              {/* </div> */}
            </div>
            <div className='flex items-center space-x-4 mb-4 md:mb-0'>
              <a
                href='#'
                target='_blank'
                title='Aixploria X'
                rel='noopener noreferrer'
              >
                <Image
                  src='/x-icon-ai-style.webp'
                  alt='Aixploria X'
                  width={20}
                  height={20}
                  className='invert filter'
                  loading='lazy'
                  decoding='async'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
