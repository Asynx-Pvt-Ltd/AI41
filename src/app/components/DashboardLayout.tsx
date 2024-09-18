import Link from 'next/link'
import React from 'react'

function DashboardLayout({ children }: any) {
  return (
    <div className='flex h-screen'>
      {/* Left Panel */}
      <aside className='w-64 bg-gray-800 text-white p-6'>
        <nav>
          <ul>
            <li className='mb-4'>
              <Link
                href='/dashboard/feature-tools'
                className='block p-2 hover:bg-gray-700 rounded'
              >
                Feature Tools
              </Link>
            </li>
            <li className='mb-4'>
              <Link
                href='/dashboard/categories'
                className='block p-2 hover:bg-gray-700 rounded'
              >
                Categories
              </Link>
            </li>
            <li className='mb-4'>
              <Link
                href='/dashboard/tools'
                className='block p-2 hover:bg-gray-700 rounded'
              >
                Tools
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 bg-gray-100'>{children}</main>
    </div>
  )
}

export default DashboardLayout
