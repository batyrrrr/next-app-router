import React from 'react'

const Button = ({ children }) => {
  return (
    <button className='text-violet-700 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none'>{children}</button>
  )
}

export default Button