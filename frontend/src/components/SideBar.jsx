import { useState } from 'react'
import { X } from 'lucide-react'

 const Appsidebar = ({children, sidebaropen, setSidebaropen}) => {
  return (
    <>
      <div className={`fixed bg-white w-64 h-screen shadow transition-transform ${sidebaropen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static `}>
        <div className='p-4 flex justify-between uppercase border-b '> 
          <div className='font-bold text-xl'>Logo</div> 
          <button onClick={()=>setSidebaropen(false)} className='font-bold lg:hidden'><X/></button>
        </div>
        <div className='p-4 space-y-2'>
            {children}
        </div>
      </div>
    </>

  )
}

export default Appsidebar
