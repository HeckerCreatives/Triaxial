import { Eye } from 'lucide-react'
import React from 'react'

interface ButtonProps {
  name: string;
  onClick: () => void;
  disabled: boolean
}

export default function Viewbtn( prop: ButtonProps) {
  return (
    <button disabled={prop.disabled} onClick={prop.onClick} className=' p-2 rounded-sm bg-red-700 text-zinc-100 text-xs flex items-center gap-1'><Eye size={15}/>{prop.name}</button>
  )
}
