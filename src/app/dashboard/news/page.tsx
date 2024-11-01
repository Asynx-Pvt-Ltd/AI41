'use client'
import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Image from 'next/image'
import { PutBlobResult } from '@vercel/blob'
import { toast } from 'react-toastify'
export const dynamic = 'force-dynamic'
function News() {
  const [news, setNews] = useState<any>([])
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<any>({
    title: '',
    url: ''
  })

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingNews, setEditingNews] = useState<any>(null)

  const fetchTools = async () => {
    setLoading(true)
    const response = await fetch('/api/news')
    const data = await response.json()
    console.log('====================================')
    console.log('tools -->', data)
    console.log('====================================')
    setNews(data)
    setLoading(false)
  }
  // Fetch tools from the backend
  useEffect(() => {
    fetchTools()
  }, [])

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
      } catch (error: any) {
        console.log('====================================')
        console.log('error.message --->', error.message)
        console.log('====================================')
      }
    }

    fetchCategories()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Add or update tool
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    var data: any = {
      title: formData.title,
      url: formData.url
    }
    if (data.title === '' || data.url === '') {
      toast.error('Add required data')
      return
    }
    if (!inputFileRef.current?.files && !editMode) {
      toast.error('Add thumbnail')
      return
    } else {
      setSubmitting(true)
      if (
        inputFileRef.current?.files &&
        inputFileRef.current.files.length > 0
      ) {
        const response = await fetch(
          `/api/image/upload?filename=${inputFileRef.current.files[0].name}`,
          {
            method: 'POST',
            body: inputFileRef.current.files[0]
          }
        )
        const url = ((await response.json()) as PutBlobResult).url
        data = { ...data, icon: url }
      }
      if (editMode && editingNews?.id) {
        // Update tool
        await fetch(`/api/news/${editingNews?.id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        })
          .then((res) => {
            setSubmitting(false)
            console.log('====================================')
            console.log('res --->', res)
            console.log('====================================')
          })
          .catch((err) => {
            console.log('====================================')
            console.log('err updating --->', err)
            console.log('====================================')
          })
      } else {
        // Create new tool
        await fetch('/api/news', {
          method: 'POST',
          body: JSON.stringify(data)
        })
          .then((res) => {
            setSubmitting(false)
            console.log('====================================')
            console.log('res --->', res)
            console.log('====================================')
            // const newTools = tools.push(tool)
            // setTools(newTools)
          })
          .catch((err) => {
            console.log('====================================')
            console.log('err posting --->', err)
            console.log('====================================')
          })
      }
    }
    // Refresh tools list
    setFormData({
      name: '',
      description: '',
      url: ''
    })
    setEditMode(false)
    fetchTools()
  }

  const handleEdit = (news: any) => {
    setEditMode(true)
    setEditingNews(news)
    setFormData(news)
  }

  const handleDelete = async (id: any) => {
    setLoading(true)
    fetch(`/api/news/${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((d) => {
        setNews(d)
        setLoading(false)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err --->', err)
        console.log('====================================')
      })
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-2xl font-bold mb-4'>AI News</h1>

        <>
          {loading === false ? (
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-2 px-4'>Icon</th>
                  <th className='py-2 px-4'>Title</th>
                  <th className='py-2 px-4'>URL</th>
                  <th className='py-2 px-4'></th>
                </tr>
              </thead>
              <tbody>
                {news.length > 0 &&
                  news?.map((n: any) => (
                    <tr key={n.id}>
                      <td className='border px-4 py-2'>
                        <Image
                          src={n.icon}
                          alt={n.title}
                          width={32}
                          height={32}
                          className='w-8 h-8'
                        />
                      </td>
                      <td className='border px-4 py-2'>{n.title}</td>
                      <td className='border px-4 py-2'>
                        <a
                          href={n.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {n.url}
                        </a>
                      </td>
                      <td className='h-auto align-middle border px-4 py-2'>
                        <div className='flex flex-row'>
                          <button
                            className='bg-blue-500 text-white px-4 py-3 mr-2'
                            onClick={() => handleEdit(n)}
                          >
                            Edit
                          </button>
                          <button
                            className='bg-red-500 text-white px-4 py-2'
                            onClick={() => handleDelete(n.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className='flex flex-row justify-center items-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white'></div>
            </div>
          )}
        </>

        <h2 className='text-xl font-bold mt-4'>Add News</h2>
        {/* Add/Edit Form */}
        <form onSubmit={handleFormSubmit} className='flex flex-col mt-8'>
          {submitting === false ? (
            <>
              <label>
                Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleInputChange}
                className='max-w-52 block mb-4 p-2 border'
              />
              <div className='flex flex-row'>
                <span className='pt-2 pr-2'>
                  Thumbnail: <span className='text-red-500'>*</span>
                  (Only in case of new tool)
                </span>
                <input
                  type='file'
                  name='icon'
                  placeholder='icon'
                  ref={inputFileRef}
                  className={`block mb-4 p-2 border`}
                />
              </div>
              <label>
                URL <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='url'
                placeholder='URL'
                value={formData.url}
                onChange={handleInputChange}
                className='max-w-52 block mb-4 p-2 border'
              />

              <button
                type='submit'
                className='max-w-32 mt-4 bg-green-500 text-white px-4 py-2'
              >
                {editMode ? 'Update Tool' : 'Add Tool'}
              </button>
            </>
          ) : (
            <div className='flex flex-row justify-center items-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white'></div>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  )
}

export default News
