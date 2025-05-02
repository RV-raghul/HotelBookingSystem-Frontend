import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router';
import { ThreeCircles } from 'react-loader-spinner'; // ⬅️ Import loader
import wifiImage from '../assets/wifi.png';
import acImage from '../assets/ac.png';
import tvImage from '../assets/tv.png';
import barImage from '../assets/local_bar.png';
import petImage from '../assets/pet.png';
import locationImage from '../assets/location.png';
import rupeeImage from '../assets/rupee.png';
import guestImage from '../assets/Guest.png';
import hotelService from '../../service/hotel.service';

function HotelCard({ hotel, checkInDate, checkOutDate, guestCount, daysDifference }) {
  const stripePromise = loadStripe('pk_test_51RDJjvQdErvDXXj2pYqful4Isq0HBQtcVZcyOdRn5ja07eGwCO1ugL9PLtbGpCdXGhVE9EVMuSajwZCToqGvJPz80065CxuZB0');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id, title, description, image, guest, location, price, type, ac, bar, pet, wifi, tv } = hotel;

  const handleCheckOut = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await hotelService.checkOut({
        hotelID: id,
        userId: sessionStorage.getItem('userID'),
        price: price * daysDifference,
        hotelName: title,
        startDate: checkInDate,
        endDate: checkOutDate,
        guests: guestCount,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.sessionId });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-blue-100 rounded-lg p-4 flex flex-col md:flex-row md:items-start gap-6 shadow-md">
      {/* Hotel Image */}
      <div className="flex-shrink-0">
        <img src={image} alt="" className="w-full md:w-[300px] h-[200px] object-cover rounded-lg" />
      </div>

      {/* Hotel Info */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-2xl font-semibold flex gap-2 header">{title}</h2>
        <p className="text-sm text-gray-700 subheader">{description}</p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-sm mt-2">
          <div className="flex items-center gap-2">
            <img src={rupeeImage} className="w-5 h-5" alt="Price" />
            <span className="font-semibold subheader">{price}</span> <span className="text-gray-500 subheader">per night</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={locationImage} className="w-5 h-5" alt="Location" />
            <span className='subheader'>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={guestImage} className="w-5 h-5" alt="Guest" />
            <span className='subheader'>{guest}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          {wifi && <img className="w-6 h-6" src={wifiImage} alt="Wi-Fi" />}
          {ac && <img className="w-6 h-6" src={acImage} alt="AC" />}
          {tv && <img className="w-6 h-6" src={tvImage} alt="TV" />}
          {pet && <img className="w-6 h-6" src={petImage} alt="Pet Friendly" />}
          {bar && <img className="w-6 h-6" src={barImage} alt="Bar" />}
          <span className="ml-2 font-medium subheader">{type}</span>
        </div>
      </div>

      {/* Action Buttons or Loader */}
      <div className="flex gap-3 mt-4 md:mt-0 md:flex-col justify-center md:justify-end items-center md:items-end">
        {isLoading ? (
          <ThreeCircles
            visible={true}
            height="40"
            width="40"
            color="#000000"
            ariaLabel="three-circles-loading"
          />
        ) : (
          <>
            <button
              className="bg-white border pop-button subheader px-4 py-2 rounded-md text-sm hover:bg-blue-50 "
              onClick={() => navigate(`/details/${id}`)}
            >
              View Details
            </button>
            <button
              className="pop-button subheader text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              onClick={handleCheckOut}
            >
              Select
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HotelCard;
