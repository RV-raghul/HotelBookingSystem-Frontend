import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import hotelService from '../../service/hotel.service';
import rupeeImg from '../assets/rupee.png';
import locationImg from '../assets/location.png';
import guestImg from '../assets/Guest.png';
import typeImg from '../assets/type.png';
import wifiImg from '../assets/Modem.png';
import tvImage from '../assets/tvImage.png';
import acImage from '../assets/acImage.png';
import petImage from '../assets/PetImage.png';
import barImage from '../assets/barImage.png';
import verified from '../assets/Verified.png';
import notVerified from '../assets/notVerified.png';
import starIcon from '../assets/star.png';
import { ThreeCircles } from 'react-loader-spinner';

function Details() {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await hotelService.getHotelById(id);
        setHotel(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchHotelDetails();
    },2000)
    
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#000000"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-6xl mt-4 bg-slate-200 rounded-lg p-4 shadow-lg">
        <h1 className="bg-black text-white text-xl md:text-2xl px-4 py-2 rounded-md mb-4">Hotel Details</h1>

        {/* Image & Basic Info */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <img src={hotel.image} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <h2 className="header text-2xl">{hotel.title}</h2>
            <p className="text-lg">{hotel.description}</p>
            <div className="flex items-center gap-2 text-lg">
              <img src={rupeeImg} alt="Rupee" className="w-5 h-5" />
              <span className="subheader">{hotel.price} / night</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <img src={locationImg} alt="Location" className="w-5 h-5" />
              <span className="subheader">{hotel.location}</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <img src={guestImg} alt="Guest" className="w-6 h-6" />
              <span className="subheader">{hotel.guest}</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <img src={typeImg} alt="Type" className="w-6 h-6" />
              <span className="subheader">{hotel.type}</span>
            </div>
          </div>
        </div>

        {/* Characteristics Header */}
        <h1 className="bg-black mt-6 text-white text-xl md:text-2xl px-4 py-2 rounded-md">Characteristics</h1>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
          {[{ label: 'Wi-Fi', img: wifiImg, desc: 'Stay connected with high-speed Wi-Fi throughout the hotel.', available: hotel.wifi },
            { label: 'AC', img: acImage, desc: 'Modern air conditioning in all rooms for comfort.', available: hotel.ac },
            { label: 'Television', img: tvImage, desc: 'In-room flat-screen TVs with popular channels.', available: hotel.tv },
            { label: 'Pets', img: petImage, desc: 'We welcome pets—because they deserve a vacation too!', available: hotel.pet },
            { label: 'Bar', img: barImage, desc: 'Unwind at our cozy on-site bar with fine drinks.', available: hotel.bar },
          ].map((item, idx) => (
            <div key={idx} className="border-2 border-slate-100 shadow-lg bg-white rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex justify-center">
                <img className="w-24 h-24 object-contain rounded-xl" src={item.img} alt={item.label} />
              </div>
              <h2 className="subheader text-center mt-2">{item.label}</h2>
              <p className="text-center text-sm mt-1">{item.desc}</p>
              <div className="flex justify-center mt-2">
                <img src={item.available ? verified : notVerified} alt="Verification status" className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        {hotel.reviews && hotel.reviews.length > 0 && (
          <>
            <h1 className="bg-black mt-6 text-white text-xl md:text-2xl px-4 py-2 rounded-md">Reviews</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {hotel.reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-lg">
                      {review.showName ? review.username : 'Unknown User'}
                    </h2>
                    <div className="flex items-center gap-1">
                      <img src={starIcon} alt="Rating" className="w-4 h-4" />
                      <span className="text-sm">{review.rating} / 5</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Details;
