import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Viewtable() {
  return (
    <div className=' w-full gap-4 p-4 mt-[170px] h-full bg-secondary'>

        <div className=' flex flex-col w-full p-4 rounded-sm'>
            <p className=' text-zinc-100 text-lg'>Workload</p>
            <Table className=' mt-4 text-sm'>
            <TableHeader className=''>
                <TableRow>
                <TableHead className="">Id</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="">End Date</TableHead>
                <TableHead className="">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=' text-zinc-300'>
                <TableRow>
                <TableCell className="">00001</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>00/00/00</TableCell>
                <TableCell className="">00/00/00</TableCell>
                <TableCell className=" text-purple-500">Pending</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>

      
    </div>
  )
}
