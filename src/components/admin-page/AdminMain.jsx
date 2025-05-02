import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import Create from './Create'
import Dashboard from './Dashboard'
import AdminBookings from './AdminBookings'
import Review from './Review'

function AdminMain({setIsAuthenticated}) {
  return <>
  <Navbar setIsAuthenticated={setIsAuthenticated}/>
  <div className='flex'>
    <Sidebar/>
    <div className='ml-15 flex-1'>
    <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/create' element={<Create />} />
        <Route path='/review' element={<Review />} />
        <Route path='/allBookings' element={<AdminBookings/>} />
        <Route path='*' element={<Dashboard/>} />
    </Routes>
    </div>
  </div>
  </>
}

export default AdminMain
