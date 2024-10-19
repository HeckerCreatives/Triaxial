import React from 'react'

interface ButtonProps {
  name: string;
  onClick: () => void;
}

export default function ButtonDanger(prop: ButtonProps) {
  return (
   <button onClick={prop.onClick} className=' text-xs py-2 px-6 rounded-sm bg-red-600 text-white'>
        {prop.name}
    </button>
  )
}
