'use client'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'
import { toast } from 'react-toastify'
export const dynamic = 'force-dynamic'
function Categories() {
  const [categories, setCategories] = useState<any>([])
  const [formData, setFormData] = useState<{ name: string }>({
    name: ''
  })

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)

  const fetchCategories = async () => {
    setLoading(true)
    const response = await fetch('/api/categories')
    const data = await response.json()
    setCategories(data)
    setLoading(false)
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
    if (formData.name === '') {
      toast.error('Add name')
      return
    }
    setSubmitting(true)
    var slug = formData.name
      .split(' ')
      .map((s) => s.toLowerCase())
      .join('-')
    if (editMode && editingCategory?.id) {
      // Update tool
      await fetch(`/api/categories/${editingCategory?.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: formData.name, slug: slug })
      })
        .then((res) => {
          setSubmitting(false)

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
        body: JSON.stringify({ name: formData.name, slug: slug })
      })
        .then((res) => {
          console.log('====================================')
          console.log('res --->', res)
          console.log('====================================')
          setSubmitting(false)
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
    setLoading(true)
    fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((d) => {
        setCategories(d)
        setLoading(false)
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err ---->', err)
        console.log('====================================')
      })
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Categories</h1>
        <>
          {/* Tool List Table */}
          {loading === false ? (
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-2 px-4'>Name</th>
                </tr>
              </thead>
              <tbody>
                {categories.length
                  ? categories.map((category: any) => (
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
                    ))
                  : null}
              </tbody>
            </table>
          ) : (
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white'></div>
            </div>
          )}
        </>
        <h2 className='text-xl font-bold mt-4'>Add Tool</h2>
        {/* Add/Edit Form */}
        <form onSubmit={handleFormSubmit} className='flex flex-col mt-8'>
          {submitting === false ? (
            <>
              <label>
                Name <span className='text-red-500'>*</span>
              </label>
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
                className='max-w-48 mt-4 bg-green-500 text-white px-4 py-2'
              >
                {editMode ? 'Update Category' : 'Add Category'}
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

export default Categories
