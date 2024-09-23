'use client'
import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import Image from 'next/image'
import { PutBlobResult } from '@vercel/blob'
export const dynamic = 'force-dynamic'
function Tools() {
  const [tools, setTools] = useState<any>([])
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    url: '',
    category: '',
    pricing: '',
    categoryId: -1
  })
  const [category, setCategory] = useState('')
  const [pricing, setPricing] = useState('Free')
  const [categories, setCategories] = useState<any>([])
  const [iconError, setIconError] = useState<any>('')
  const [editMode, setEditMode] = useState(false)
  const [editingTool, setEditingTool] = useState<any>(null)
  const fetchTools = async () => {
    setCategory('')
    setPricing('Free')
    const response = await fetch('/api/tools')
    const data = await response.json()
    console.log('====================================')
    console.log('tools -->', data)
    console.log('====================================')
    setTools(data)
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
        setCategories(data)
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
    // const formDataObj = new FormData()
    // formDataObj.append('name', formData.name)
    // formDataObj.append('description', formData.description)
    // formDataObj.append('url', formData.url)
    // formDataObj.append('categoryId', formData.categoryId)
    // formDataObj.append('pricing', formData.pricing)
    // formDataObj.append('category', formData.category)
    var data: any = {
      name: formData.name,
      description: formData.description,
      url: formData.url,
      categoryId: formData.categoryId,
      pricing: formData.pricing,
      category: formData.category
    }
    if (!inputFileRef.current?.files) {
      setIconError('No file selected')
      return
    } else {
      setIconError('')
      const response = await fetch(
        `/api/image/upload?filename=${inputFileRef.current.files[0].name}`,
        {
          method: 'POST',
          body: inputFileRef.current.files[0]
        }
      )
      const url = ((await response.json()) as PutBlobResult).url
      data = { ...data, icon: url }
      if (editMode && editingTool?.id) {
        // Update tool
        await fetch(`/api/tools/${editingTool?.id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        })
          .then((res) => {
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
        await fetch('/api/tools', {
          method: 'POST',
          body: JSON.stringify(data)
        })
          .then((res) => {
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
    await fetch(`/api/tools/${id}`, {
      method: 'DELETE'
    })
    fetchTools()
  }

  const handleCategoryChange = (e: { target: { value: string } }) => {
    const c = categories.filter((c: any) => c.name === e.target.value)
    setCategory(e.target.value)
    setFormData({ ...formData, category: e.target.value, categoryId: c.id })
  }

  const handlePricingChange = (e: { target: { value: string } }) => {
    setPricing(e.target.value)
    setFormData({ ...formData, pricing: e.target.value })
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Tools</h1>

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
            {tools &&
              tools?.map((tool: any) => (
                <tr key={tool.id}>
                  <td className='border px-4 py-2'>
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className='w-8 h-8 invert'
                    />
                  </td>
                  <td className='border px-4 py-2'>{tool.name}</td>
                  <td className='border px-4 py-2'>
                    {tool.description.slice(0, 250)}...
                  </td>
                  <td className='border px-4 py-2'>
                    <a
                      href={tool.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {tool.url}
                    </a>
                  </td>
                  <td className='h-auto align-middle border px-4 py-2'>
                    <div className='flex flex-row'>
                      <button
                        className='bg-blue-500 text-white px-4 py-3 mr-2'
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
        <h2 className='text-xl font-bold mt-4'>Add Tool</h2>
        {/* Add/Edit Form */}
        <form onSubmit={handleFormSubmit} className='flex flex-col mt-8'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleInputChange}
            className='max-w-52 block mb-4 p-2 border'
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
            placeholder='icon'
            ref={inputFileRef}
            className={`block mb-4 p-2 border ${
              iconError ? 'border-red-600' : 'border-transparent'
            }`}
          />
          {iconError ? <span className='text-red-600'>{iconError}</span> : null}
          <input
            type='text'
            name='url'
            placeholder='URL'
            value={formData.url}
            onChange={handleInputChange}
            className='max-w-52 block mb-4 p-2 border'
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className='px-4 py-2 mb-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2'
          >
            {categories.map((category: { id: number; name: string }) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={pricing}
            onChange={handlePricingChange}
            className='px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2'
          >
            <option value={'Free'}>Free</option>
            <option value={'Fremium'}>Freemium</option>
            <option value={'Paid'}>Paid</option>
          </select>
          <button
            type='submit'
            className='max-w-32 mt-4 bg-green-500 text-white px-4 py-2'
          >
            {editMode ? 'Update Tool' : 'Add Tool'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Tools
