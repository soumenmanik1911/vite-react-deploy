import React from 'react'


const Navbar = () => {
  const handleRefresh = () => {
    // Refresh the current page
    window.location.reload();
  };
  return (
    
        <div className='sticky top-0'><nav className="flex justify-between bg-slate-800 text-white py-4 ">
        <div className="logo mx-4">
          <span className="font-bold  text-2xl cursor-pointer hover:bg-slate-700  hover:font-extrabold hover:rounded-full hover:p-3"  onClick={handleRefresh}>i-task</span>
        </div>
          <ul className="flex gap-8 text-white mx-4 font-semibold text-xl">
              <li className='cursor-pointer hover:bg-slate-700  hover:font-extrabold hover:rounded-full hover:p-1'> Home</li>
              <li className='cursor-pointer hover:bg-slate-700  hover:font-extrabold hover:rounded-full hover:p-1'>contact</li>
              
          </ul>
      </nav></div>
      
    
  )
}

export default Navbar
