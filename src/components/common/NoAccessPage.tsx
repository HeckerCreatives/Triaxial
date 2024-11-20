import { TriangleAlert } from 'lucide-react'
import React from 'react'

export default function NoAccessPage() {
  return (
    <div className=' w-full h-full flex items-center justify-center bg-secondary'>
        <p className=' text-red-600 text-sm flex items-center justify-center gap-2'><TriangleAlert size={15}/>You are not authorized to view this page.</p>

    </div>
  )
}
