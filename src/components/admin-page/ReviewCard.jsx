import React, { useState } from 'react';
import { Trash2 } from 'react-feather';

function ReviewCard({ review, onDelete }) {
  const {
    hotelName,
    hotelLocation,
    hotelImage,
    username,
    description,
    rating,
    showName,
    createdAt
  } = review;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(review.id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-full sm:w-[400px] border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between">
      <img src={hotelImage} alt="Hotel" className="w-full h-48 object-cover rounded-md" />
      
      <div className="mt-3">
        <h2 className="text-lg font-semibold subheader">{hotelName}</h2>
        <p className="text-sm text-gray-500 subheader">{hotelLocation}</p>
        <p className="text-sm mt-2 subheader">Rating: ⭐ {rating}</p>
        <p className="text-sm mt-1 subheader">{description}</p>
        {showName && <p className="text-xs subheader text-gray-600 mt-1">By: {username}</p>}
        <p className="text-xs subheader text-gray-400 mt-1">On: {new Date(createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleDeleteClick}
          className=" pop-button flex items-center subheader gap-1 text-sm"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {showConfirm && (
        <div className="mt-3 p-3 border rounded bg-gray-50 text-sm">
          <p>Are you sure you want to delete this review?</p>
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={cancelDelete} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
