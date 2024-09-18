'use client'
import DashboardLayout from '../components/DashboardLayout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className='text-2xl font-bold'>Welcome to the Dashboard</h1>
      <p>
        Select a category from the left to manage Feature Tools, Categories, or
        Tools.
      </p>
    </DashboardLayout>
  )
}
