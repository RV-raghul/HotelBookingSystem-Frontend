import React from 'react'
import locationImg from '../assets/location.png'
import guestImage from '../assets/Guest.png';


function BookingCard({hotel,booking}) {
  return (
    <div className="border-2 shadow-2xl p-4 rounded bg-white">
    <img src={hotel.image} alt={hotel.title} className="w-full h-40 object-cover rounded" />
    <h3 className="text-xl font-bold mt-2 header">{hotel.title}</h3>
    <div className="flex items-center gap-2">
        <img src={locationImg} className="w-5 h-5" alt="Location" />
        <span className='subheader'>{hotel.location}</span>
    </div>
    <div className="flex items-center gap-2">
        <img src={guestImage} className="w-5 h-5" alt="Guest" />
        <span className='subheader'>{booking.guests}</span>
    </div>
    <p><strong className='header'>From:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
    <p><strong className='header'>To:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
    <p><strong className='header'>Status:</strong> {booking.status}</p>
  </div>
  )
}

export default BookingCard
