import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SeeMoreButton = ({ text = 'See More', redirectTo = '/list-aitools' }) => {
  return (
    <Link
      href={redirectTo}
      className='bg-white text-black font-bold py-2 px-4 rounded border border-slate-400 hover:bg-slate-300 dark:bg-slate-800 dark:text-white transition duration-300 ease-in-out'
    >
      {text}
    </Link>
  )
}

export default SeeMoreButton
