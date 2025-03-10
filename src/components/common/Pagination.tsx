'use client'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  total: number
  onPageChange: (page: number) => void
}

export default function PaginitionComponent({ currentPage, total, onPageChange }: PaginationProps) {
  const next = () => {
    if (currentPage <= total) {
      onPageChange(currentPage + 1)
    }
  }

  const prev = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <div className="flex items-center justify-center w-full mt-6">

        <div className=' flex items-center gap-6 text-xs'>
     
            <button onClick={prev}  disabled={currentPage === 0} className=' bg-zinc-900 py-2 px-4 flex items-center justify-center gap-2'><ChevronLeft size={15}/></button>
            <p className=' flex items-center justify-center gap-6 text-xs'>{currentPage + 1} / {total}</p>
            <button onClick={next} disabled={currentPage + 1 === total} className='bg-zinc-900 py-2 px-4 flex items-center justify-center gap-2'><ChevronRight size={15}/></button>
          

        </div>
        
     
    </div>
  )
}
