import React from 'react'

export default function Invoice() {
  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-full max-w-[700px] mx-auto mt-8">
        <div className=' flex items-center justify-center gap-2 text-white w-full'>
            <img src="/logo.webp" alt="" width={50} />
            <div className=' flex flex-col text-zinc-950'>
                <h2 className=' text-lg font-bold uppercase tracking-widest'>Triaxial</h2>
                <h2 className=' text-sm font-bold uppercase'>Consulting</h2>
            </div>
        </div>
    <hr className="mb-2"/>
    <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Invoice</h1>
        <div className="text-gray-700">
            <div>Date: 01/05/2023</div>
            <div>Invoice #: INV12345</div>
        </div>
    </div>
    <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">John Doe</div>
        <div className="text-gray-700 mb-2">123 Main St.</div>
        <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
        <div className="text-gray-700">johndoe@example.com</div>
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
                <td className="text-left text-gray-700">Product 1</td>
                <td className="text-right text-gray-700">$100.00</td>
            </tr>
            <tr>
                <td className="text-left text-gray-700">Product 2</td>
                <td className="text-right text-gray-700">$50.00</td>
            </tr>
            <tr>
                <td className="text-left text-gray-700">Product 3</td>
                <td className="text-right text-gray-700">$75.00</td>
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
    </div>
  )
}
