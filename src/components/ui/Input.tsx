import React from 'react'
import { cn } from '../../libs/utils/common'
type InputProps = {
    label: string,
    error?: string,
    required?: boolean,
}
const Input = ({
    label,
    error = "",
    required = false,
}: InputProps) => {
  return (
      <div>
          {
                label && <label className='block mb-2 text-sm font-medium text-gray-300'>{label} {required && <span>*</span>}</label>
          }
          <input type="text" className={cn("w-full bg-gray-700 text-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none") } />
            {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  )
}

export default Input
