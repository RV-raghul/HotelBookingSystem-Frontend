import React, { useState } from "react";
import hotelService from "../../service/hotel.service";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const ReviewModal = ({ booking, onClose }) => {
  
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [showName, setShowName] = useState(true);
  
  const handleSubmit = async() => {
    const userId = sessionStorage.getItem('userID');
    const username = sessionStorage.getItem('username')
    
    try{
     const res = await hotelService.addReview({
        userId,
        hotelId: booking.hotelId,
        bookingId: booking.id,
        rating,
        description,
        showName,
        username
      })
      onClose();
      setDescription(""); setRating(0); setShowName(true);

    }
    catch(error){
      toast.error(error.response?.data?.message || "An error occurred while submitting your review.");
    }
    // Post to backend if needed
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          placeholder="Write your experience..."
        />
        <div className="mb-4">
          <p className="mb-1 font-medium">Rating:</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-1 font-medium">Show your name?</p>
          <label className="mr-4">
            <input
              type="radio"
              name="showName"
              value="yes"
              checked={showName}
              onChange={() => setShowName(true)}
              className="mr-1"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="showName"
              value="no"
              checked={!showName}
              onChange={() => setShowName(false)}
              className="mr-1"
            />
            No
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
