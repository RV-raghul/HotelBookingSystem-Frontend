import React, { useState } from 'react'
import { Plus } from 'react-feather'
import { Link, useLocation } from 'react-router'

function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(false)

  const sidebarList = [
    {
    id:1,
    path:"/dashboard",
    name:"Dashboard",
    icon:(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>)
    },
    {
      id:2,
      path:"/create",
      name:"Create",
      icon:(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>)
    },
    {
      id:3,
      path:"/allBookings",
      name:"Bookings",
      icon:(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>)
    },
    {
      id:4,
      path:"/review",
      name:"Reviews",
      icon:(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m363-390 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>)
    }
]


  return <>
  <div onMouseEnter={() => setIsExpanded(true)}
  onMouseLeave={() => setIsExpanded(false)}
  className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
    <div className='my-10'>
    {
    sidebarList.map((item) =>{
      return(
    <Link key={item.id} to={item.path}>
    <div  className={`flex p-3 items-center hover:cursor-pointer transition-all ease-in
      ${location.pathname === item.path ? "border-l-4 rounded-sm border-black bg-gray-400 transition-all header" : ""}`}>
      <span className='icon mr-2'>{item.icon}</span>
      {
        isExpanded && <span className='text header'>{item.name}</span>
      }
    </div>
    </Link>
      )
    })
  }
   </div>
  </div>
  </>
}

export default Sidebar
