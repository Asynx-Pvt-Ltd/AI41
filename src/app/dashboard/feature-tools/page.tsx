'use client'

import React, { useState, useEffect, useRef } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Image from 'next/image'
import { PutBlobResult } from '@vercel/blob'
export const dynamic = 'force-dynamic'

function FeatureTools() {
  const [tools, setTools] = useState<any>([])
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    url: ''
  })
  const [iconError, setIconError] = useState<any>('')
  const [editMode, setEditMode] = useState(false)
  const [editingTool, setEditingTool] = useState<any>(null)
  const fetchTools = async () => {
    const data = await fetch('/api/feature-tools')
    const tools = await data.json()
    setTools(tools)
  }
  // Fetch tools from the backend
  useEffect(() => {
    fetchTools()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Add or update tool
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // const formDataObj = new FormData()
    // formDataObj.append('title', formData.name)
    // formDataObj.append('description', formData.description)
    // formDataObj.append('url', formData.url)
    var data: any = {
      title: formData.name,
      description: formData.description,
      url: formData.url
    }
    if (!inputFileRef.current?.files?.length) {
      setIconError('No Image Selected')
      return
    } else {
      setIconError('')
      const response = await fetch(
        '/api/image/upload?filename=' + inputFileRef.current.files[0]?.name,
        {
          method: 'POST',
          body: inputFileRef.current.files[0]
        }
      )
      const url = ((await response.json()) as PutBlobResult).url
      console.log('====================================')
      console.log('url -->', url)
      console.log('====================================')
      data = { ...data, icon: url }
      if (editMode && editingTool?.id) {
        // Update tool
        await fetch(`/api/feature-tools/${editingTool?.id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        })
          .then((res) => {
            console.log('====================================')
            console.log('res -->', res)
            console.log('====================================')
          })
          .catch((err) => {
            console.log('====================================')
            console.log('err -->', err)
            console.log('====================================')
          })
      } else {
        console.log('====================================')
        console.log('creating new data')
        console.log('====================================')
        // Create new tool
        await fetch('/api/feature-tools', {
          method: 'POST',
          body: JSON.stringify(data)
        })
          .then((res) => {
            console.log('====================================')
            console.log('res -->', res)
            console.log('====================================')
          })
          .catch((err) => {
            console.log('====================================')
            console.log('err -->', err)
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

  // Edit tool
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

  // Delete tool
  const handleDelete = async (id: any) => {
    await fetch(`/api/feature-tools/${id}`, {
      method: 'DELETE'
    })
    fetchTools()
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Feature Tools</h1>

        {/* Tool List Table */}
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4'>Icon</th>
              <th className='py-2 px-4'>Name</th>
              <th className='py-2 px-4'>Description</th>
              <th className='py-2 px-4'>URL</th>
              <th className='py-2 px-4'></th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool: any) => (
              <tr key={tool.id}>
                <td className='border px-4 py-2'>
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className='w-8 h-8'
                  />
                </td>
                <td className='border px-4 py-2'>{tool.title}</td>
                <td className='border px-4 py-2'>
                  {tool.description.slice(0, 250)}
                </td>
                <td className='border px-4 py-2'>
                  <a href={tool.link} target='_blank' rel='noopener noreferrer'>
                    {tool.link.slice(0, 90)}...
                  </a>
                </td>
                <td className='h-auto align-middle border px-4 py-2'>
                  <div className='flex flex-row'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 mr-2'
                      onClick={() => handleEdit(tool)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 text-white px-4 py-2'
                      onClick={() => handleDelete(tool.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Edit Form */}
        <form onSubmit={handleFormSubmit} className='mt-8'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleInputChange}
            className='block mb-4 p-2 border'
          />
          <textarea
            name='description'
            placeholder='Description'
            rows={10}
            value={formData.description}
            onChange={handleInputChange}
            className='block mb-4 p-2 border'
          />
          <input
            type='file'
            name='icon'
            ref={inputFileRef}
            placeholder='icon'
            className={`block mb-4 p-2 border ${
              iconError ? 'border-red-600' : 'border-transparent'
            }`}
          />
          {iconError ? (
            <span className='text-red-600 py-5'>{iconError}</span>
          ) : null}
          <input
            type='text'
            name='url'
            placeholder='URL'
            value={formData.url}
            onChange={handleInputChange}
            className='block mb-4 p-2 border'
          />
          <button type='submit' className='bg-green-500 text-white px-4 py-2'>
            {editMode ? 'Update Tool' : 'Add Tool'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default FeatureTools
