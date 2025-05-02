import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import HotelCard from './HotelCard';
import hotelService from '../../service/hotel.service';
import { ThreeCircles } from 'react-loader-spinner';

function HotelListing({ checkInDate, checkOutDate, guest, city }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true); // ← loading state
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (date === '') return null;

    const d = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: '2-digit',
    }).format(d);
    return formattedDate;
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true); // Start loading
        const res = await hotelService.getAllHotels({
          startDate: checkInDate,
          endDate: checkOutDate,
          guest: guest,
          location: city,
        });
        setHotels(res.data);
      } catch (err) {
        console.log('Error fetching hotels:', err);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (checkInDate && checkOutDate && guest && city) {
      fetchHotels();
    }
  }, [checkInDate, checkOutDate, guest, city]);

  const getDaysDifference = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysDifference =
    checkInDate && checkOutDate
      ? getDaysDifference(checkInDate, checkOutDate)
      : 0;

  return (
    <>
      {/* Header Section */}
      <div className="w-full flex justify-center mt-4 px-4">
        <div className="w-full max-w-6xl bg-blue-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between p-4 gap-4">
          {/* Details */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <InfoBlock
              img="src/components/assets/check-in.png"
              label="Check-In"
              value={formatDate(checkInDate)}
            />
            <InfoBlock
              img="src/components/assets/check-out.png"
              label="Check-Out"
              value={formatDate(checkOutDate)}
            />
            <InfoBlock
              img="src/components/assets/NightStay.png"
              label="Nights"
              value={daysDifference}
            />
            <InfoBlock
              img="src/components/assets/Guest.png"
              label="Guests"
              value={guest}
            />
          </div>

          {/* Button */}
          <div>
            <button
              className="pop-button subheader whitespace-nowrap"
              onClick={() => navigate('/book')}
            >
              Change Dates
            </button>
          </div>
        </div>
      </div>

      {/* Hotel List or Loading */}
      <div className="flex justify-center my-6 px-4">
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {loading ? (
            <div className="text-center text-lg flex justify-center items-center font-semibold text-gray-600">
              
               <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#000000"
                        ariaLabel="three-circles-loading"
                      />

            </div>
          ) : hotels.length > 0 ? (
            hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guestCount={guest}
                daysDifference={daysDifference}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No hotels found.</div>
          )}
        </div>
      </div>
    </>
  );
}

// InfoBlock Component
const InfoBlock = ({ img, label, value }) => (
  <div className="flex items-center border-r-2 pr-4 last:border-none">
    <img src={img} alt={label} className="w-8 h-8 md:w-10 md:h-10" />
    <div className="ml-2">
      <h1 className="text-sm subheader">{label}</h1>
      <h1 className="text-sm">{value}</h1>
    </div>
  </div>
);

export default HotelListing;
