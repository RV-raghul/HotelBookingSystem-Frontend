import React,{useState} from 'react'
import { Routes, Route, Navigate} from 'react-router'
import Navbar from '../common/Navbar'
import Landing from './Landing'
import HotelListing from './HotelListing'
import HotelDetails from './Details'
import PaymentSuccess from './PaymentSuccess'
import Bookings from './Bookings'
import Profile from './Profile'
function HotelMain({setIsAuthenticated}) {

      const [checkInDate, setCheckInDate] = useState("");
      const [checkOutDate, setCheckOutDate] = useState("");
      const [guest, setGuest] = useState("");
      const [city, setCity] = useState("");




  return <>

 

  <div className='flex flex-col'>
    <Navbar setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
        <Route path="/book" element={<Landing 
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setGuest={setGuest}
        setCity={setCity}
        city={city}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guest={guest}
      />} />

      <Route path="/hotels" element={<HotelListing 
                        checkInDate={checkInDate} 
                        checkOutDate={checkOutDate}
                        guest={guest}
                        city={city} />} />
      <Route path="/details/:id" element={<HotelDetails />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path='/bookings' element={<Bookings/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/book" />} />
    </Routes> 
  </div>
  </>
}

export default HotelMain
