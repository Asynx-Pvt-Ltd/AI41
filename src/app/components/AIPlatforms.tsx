import React from 'react'
import Image from 'next/image'
const AIPlatformsCarousel = () => {
  const platforms = [
    {
      src: '/google-ai-2.webp',
      alt: 'Google AI',
      title: 'Google AI'
    },
    {
      src: '/openai-ai-logo-2.webp',
      alt: 'OpenAI',
      title: 'OpenAI'
    },
    {
      src: '/meta-ai-2.webp',
      alt: 'META AI',
      title: 'META AI'
    },
    {
      src: '/microsoft-ai-2.webp',
      alt: 'Microsoft AI',
      title: 'Microsoft AI'
    },
    {
      src: '/stability-ai-logo-2.webp',
      alt: 'Stability AI',
      title: 'Stability AI'
    },
    {
      src: '/deepmind-ai-logo-2.webp',
      alt: 'Deepmind AI',
      title: 'Deepmind AI'
    }
  ]

  return (
    <div className='overflow-hidden whitespace-nowrap relative'>
      <ul className='flex animate-scroll'>
        {platforms.map((platform, index) => (
          <li key={index}>
            <Image
              loading='lazy'
              src={platform.src}
              alt={platform.alt}
              title={platform.title}
              width='200'
              height='64'
              style={{ maxWidth: 150, margin: '0px 10px' }}
            />
          </li>
        ))}
        {platforms.map((platform, index) => (
          <li key={index + 1}>
            <Image
              loading='lazy'
              src={platform.src}
              alt={platform.alt}
              title={platform.title}
              width='200'
              height='64'
              style={{ maxWidth: 130, margin: '0px 10px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AIPlatformsCarousel
