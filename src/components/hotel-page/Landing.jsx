import React from 'react';
import { useNavigate } from 'react-router';
import { guests, indianCity } from '../common/Constants.jsx';

function Landing({
  checkInDate,
  checkOutDate,
  guest,
  city,
  setCheckInDate,
  setCheckOutDate,
  setGuest,
  setCity,
}) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(checkInDate, checkOutDate, guest, city);
    navigate('/hotels');
  };

  const getNextDate = (date) => {
    if (!date) return '';
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const isButtonDisabled = !(checkInDate && checkOutDate && guest && city);

  return (
    <div className="bg flex justify-center items-center w-full min-h-[40vh] px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-6xl p-6 flex flex-col gap-6">
        {/* Inputs Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Check-In */}
          <div className="flex flex-col">
            <label className="font-semibold subheader text-gray-700 mb-1">Check-In</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => {
                setCheckInDate(e.target.value);
                setCheckOutDate('');
              }}
              min={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col">
            <label className="font-semibold subheader text-gray-700 mb-1">Check-Out</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={getNextDate(checkInDate)}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label className="font-semibold subheader text-gray-700 mb-1">Guests</label>
            <select
              name="guests"
              value={guest || ''}
              onChange={(e) => setGuest(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="" disabled>
                Select an option
              </option>
              {guests.map((guest) => (
                <option key={guest.id} value={guest.name}>
                  {guest.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="font-semibold subheader text-gray-700 mb-1">City</label>
            <select
              name="city"
              value={city || ''}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="" disabled>
                Select an option
              </option>
              {indianCity.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center">
          <button
            className={`px-6 py-2 rounded bg-black text-white font-semibold transition ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
            disabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
