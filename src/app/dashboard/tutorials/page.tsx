'use client'
import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Image from 'next/image'
import { PutBlobResult } from '@vercel/blob'
import { toast } from 'react-toastify'
export const dynamic = 'force-dynamic'
function Tutorials() {
  const [tutorials, setTutorials] = useState<any>([])
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    url: '',
    tags: ['']
  })
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingTool, setEditingTool] = useState<any>(null)
  const fetchTools = async () => {
    setLoading(true)
    const response = await fetch('/api/tutorial')
    const data = await response.json()
    console.log('====================================')
    console.log('tools -->', data)
    console.log('====================================')
    setTutorials(data)
    setLoading(false)
  }
  // Fetch tools from the backend
  useEffect(() => {
    fetchTools()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    if (name === 'tags') {
      setFormData({ ...formData, [name]: value.split(',') })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // Add or update tool
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    var data: any = {
      title: formData.title,
      url: formData.url,
      tags: formData.tags
    }
    if (data.title === '' || data.url === '') {
      toast.error('Add necessary data')
      return
    }
    if (inputFileRef.current?.files?.length === 0 && !editMode) {
      toast.error('No Icon Selected')
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
      if (editMode && editingTool?.id) {
        // Update tool
        await fetch(`/api/tutorial/${editingTool?.id}`, {
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
        await fetch('/api/tutorial', {
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
      title: '',
      description: '',
      url: '',
      tags: ['']
    })
    setEditMode(false)
    fetchTools()
  }

  const handleEdit = (
    tool:
      | React.SetStateAction<null>
      | React.SetStateAction<{
          name: string
          icon: string
          description: string
          url: string
        }>
  ) => {
    setEditMode(true)
    setEditingTool(tool)
    setFormData(tool)
  }

  const handleDelete = async (id: any) => {
    setLoading(true)
    fetch(`/api/tutorial/${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((d) => {
        setTutorials(d)
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
        <h1 className='text-2xl font-bold mb-4'>Tutorials</h1>

        <>
          {loading === false ? (
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-2 px-4'>Thumbnail</th>
                  <th className='py-2 px-4'>Title</th>
                  <th className='py-2 px-4'>URL</th>
                  <th className='py-2 px-4'></th>
                </tr>
              </thead>
              <tbody>
                {tutorials.length > 0 &&
                  tutorials?.map((tutorial: any) => (
                    <tr key={tutorial.id}>
                      <td className='border px-4 py-2'>
                        <Image
                          src={tutorial.icon}
                          alt={tutorial.title}
                          width={128}
                          height={128}
                          className='w-32 h-32'
                        />
                      </td>
                      <td className='border px-4 py-2'>{tutorial.title}</td>

                      <td className='border px-4 py-2'>
                        <a
                          href={tutorial.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {tutorial.url}
                        </a>
                      </td>
                      <td className='h-auto align-middle border px-4 py-2'>
                        <div className='flex flex-row'>
                          <button
                            className='bg-blue-500 text-white px-4 py-3 mr-2'
                            onClick={() => handleEdit(tutorial)}
                          >
                            Edit
                          </button>
                          <button
                            className='bg-red-500 text-white px-4 py-2'
                            onClick={() => handleDelete(tutorial.id)}
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

        <h2 className='text-xl font-bold mt-4'>Add Tutorial</h2>
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
                className='max-w-80 block mb-4 p-2 border'
              />
              <div className='flex flex-row'>
                <span className='pt-2 pr-2'>
                  Icon: <span className='text-red-500'>*</span>
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
              <label>Tags</label>
              <input
                type='text'
                name='tags'
                placeholder='Tags separated by `,`'
                value={formData.tags}
                onChange={handleInputChange}
                className='max-w-52 block mb-4 p-2 border'
              />
              <button
                type='submit'
                className='max-w-32 mt-4 bg-green-500 text-white px-4 py-2'
              >
                {editMode ? 'Update Tutorial' : 'Add Tutorial'}
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

export default Tutorials
