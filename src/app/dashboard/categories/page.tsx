'use client'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'

function Categories() {
  const [categories, setCategories] = useState<any>([])
  const [formData, setFormData] = useState<any>({
    name: ''
  })

  const [editMode, setEditMode] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const fetchCategories = async () => {
    const response = await fetch('/api/categories')
    const data = await response.json()
    setCategories(data)
  }
  // Fetch tools from the backend
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (editMode && editingCategory?.id) {
      // Update tool
      await fetch(`/api/categories/${editingCategory?.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: formData.name })
      })
        .then((res) => {
          console.log('====================================')
          console.log('res -->', res)
          console.log('====================================')
        })
        .catch((err) => {
          console.log('====================================')
          console.log('err updating --->', err)
          console.log('====================================')
        })
    } else {
      // Create new tool
      await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name: formData.name })
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
    // Refresh tools list
    setFormData({
      name: ''
    })
    setEditMode(false)
    fetchCategories()
  }

  const handleEdit = (category: any) => {
    setEditMode(true)
    setEditingCategory(category)
    setFormData(category)
  }

  const handleDelete = async (id: any) => {
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    })
    fetchCategories()
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Categories</h1>

        {/* Tool List Table */}
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4'>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any) => (
              <tr key={category.id}>
                <td className='border px-4 py-2'>{category.name}</td>

                <td className='h-auto align-middle justify-center border px-4 py-2'>
                  <div className='flex flex-row justify-center'>
                    <button
                      className='bg-blue-500 text-white px-4 py-3 mr-2'
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 text-white px-4 py-2'
                      onClick={() => handleDelete(category.id)}
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

export default Categories
