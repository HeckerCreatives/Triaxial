import React from 'react'

interface ButtonProps {
  name: string;
  onClick: () => void;
}

export default function ButtonSecondary(prop: ButtonProps) {
  return (
   <button onClick={prop.onClick} className=' text-xs py-2 px-6 rounded-sm bg-primary text-white'>
        {prop.name}
    </button>
  )
}
