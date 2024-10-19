import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { downloadInvoiceAsPdf, printInvoice } from '@/utils/invoice'
import { Eye, FileDown, Printer } from 'lucide-react'
import { Invoice } from '@/types/interface'

export default function InvoiceComponent( prop: Invoice) {
  return (
    <Dialog open={prop.open} onOpenChange={prop.openChange}>
                  <DialogTrigger>
                    <button className=' p-2 rounded-sm bg-primary'><Eye size={20}/></button>
                  </DialogTrigger>
                  <DialogContent className=' bg-white border-none w-[95%] md:w-full max-w-[600px]'>
                    <div id='invoice-container' className=" bg-white px-6 py-8 w-full  mx-auto">
                        <div className=' flex items-center justify-center gap-2 text-white w-full'>
                            <img src="/logo.webp" alt="" width={50} />
                            <div className=' flex flex-col text-zinc-950'>
                                <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                                <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
                            </div>
                        </div>
                    <hr className=" my-2"/>
                    <div className="flex justify-between mb-6">
                        <h1 className="text-lg font-bold">Invoice</h1>
                        <div className="text-gray-700">
                            <div>Date: {prop.date}</div>
                            <div>Invoice #: {prop.invoiceNumber}</div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                        <div className="text-gray-700 mb-2">{prop.name}</div>
                        <div className="text-gray-700 mb-2">{prop.address}</div>
                        <div className="text-gray-700">{prop.email}</div>
                    </div>
                    <table className="w-full mb-8">
                        <thead>
                            <tr>
                                <th className="text-left font-bold text-gray-700">Description</th>
                                <th className="text-right font-bold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-left text-gray-700">{prop.description}</td>
                                <td className="text-right text-gray-700">{prop.amount}</td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-left font-bold text-gray-700">Total</td>
                                <td className="text-right font-bold text-gray-700">$225.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-gray-700 mb-2">Thank you for your business!</div>
                    <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                    <hr className="my-2"/>
                    
                    </div>

                     <div className=' flex items-center justify-end gap-2 px-4 pb-4'>
                        {/* <ButtonSecondary onClick={() => setDialog(false)}  name={'Close'}/>
                        <Button onClick={printInvoice} name={'Print'}/>
                        <Button onClick={downloadInvoiceAsPdf} name={'Download'}/> */}

                        <button onClick={printInvoice} className=' text-xs flex items-center gap-2 bg-primary p-2 text-zinc-100 rounded-sm'><Printer size={20}/>Print Invoice</button>
                        <button onClick={downloadInvoiceAsPdf} className=' text-xs flex items-center gap-2 bg-red-700 p-2 text-zinc-100 rounded-sm'><FileDown size={20}/>Download Pdf</button>
                    </div>
                    
                  </DialogContent>
              </Dialog>
  )
}
