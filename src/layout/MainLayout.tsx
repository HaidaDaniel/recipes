import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

import Navbar from '../components/Navbar'
import Loader from '../components/ui/Loader'

export default function MainLayout() {
  return (
    <div className="p-4">
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Outlet />
      </Suspense>
    </div>
  )
}
