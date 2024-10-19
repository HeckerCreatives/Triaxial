import React from 'react'

interface ButtonProps {
  name: string;
  color: string;
  onClick: () => void;
}

export default function Actionbtn(prop: ButtonProps) {
  return (
   <button onClick={prop.onClick} className={`text-xs py-2 px-6 rounded-sm ${prop.color} text-white`}>
        {prop.name}
    </button>
  )
}
