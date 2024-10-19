"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Delete, Trash, Eye } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonSecondary from '@/components/common/ButtonSecondary'
import Button from '@/components/common/Button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, useSearchParams } from 'next/navigation'




export default function Dueon() {
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const router = useRouter()
  const search = useSearchParams()
  const tab = search.get('active')

  return (
    <div className=' w-full h-full flex justify-center bg-secondary p-4 text-zinc-100'>

      <div className=' w-full flex flex-col max-w-[1720px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-zinc-100 w-full max-w-[1720px]'>
        <table className="table-auto w-full border-collapse ">
          <thead className=' bg-secondary h-[77px]'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[80px] font-normal'>Job no</th>
              <th className=' font-normal w-[80px]'>Client</th>
              <th className=' font-normal w-[80px]'>Project Name</th>
              <th className=' font-normal w-[80px]'>Job Manager</th>
              <th className=' font-normal w-[80px]'>Job Component</th>
   
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                <td className=" h-[20px] "></td>
                
              </tr>
            ))}
          
        </tbody>
        </table>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' font-normal border border-slate-500 py-2'>M</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>W</th>
                <th className=' font-normal border border-slate-500 py-2'>T</th>
                <th className=' font-normal border border-slate-500 py-2'>F</th>
                <th className=' font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
        </table>

       </div>

       <div className=' flex flex-col w-full'>
          <table className="table-auto border-collapse border border-slate-500">
          
          <thead className=' bg-secondary'>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>M</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>W</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>T</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'>F</th>
                <th className=' w-[80px] font-normal border border-slate-500 py-2'></th>
              </tr>
            <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2'>19-Aug 2024</th>
              <th className=' w-[80px] font-normal border border-slate-500 py-2 text-red-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 35 }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : ' bg-red-100'}>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
                <td className="border border-slate-700 h-[20px]"></td>
              </tr>
            ))}
          
        </tbody>
          </table>

       </div>

      </div>
       
        
      </div>
        
    </div>
  )
}
