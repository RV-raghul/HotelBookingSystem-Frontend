import React, { useEffect, useState } from "react";
import hotelService from "../../service/hotel.service";
import BookingCard from "../hotel-page/BookingCard";
import toast from "react-hot-toast";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("booked");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await hotelService.getAllBookings(); // response is already the data array
        console.log(res.data);
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to fetch bookings.");
      }
    };
    fetchBookings();
  }, []);
  

  const bookedBookings = bookings.filter(b => b.status === "BOOKED");
  const cancelledBookings = bookings.filter(b => b.status === "CANCELLED");


  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <h1 className="bg-black text-white text-xl md:text-2xl px-4 py-2 rounded-md mb-4">
        All Bookings
      </h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("booked")}
          className={`px-4 py-2 header rounded hover:cursor-pointer ${tab === "booked" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          Booked
        </button>
        <button
          onClick={() => setTab("cancelled")}
          className={`px-4 py-2 header rounded hover:cursor-pointer ${tab === "cancelled" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          Cancelled
        </button>
      </div>

      {tab === "booked" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookedBookings.length ? (
            bookedBookings.map((booking) => (
              <div key={booking._id} className="relative">
                <BookingCard hotel={booking.hotelDetails} booking={booking} />
              </div>
            ))
          ) : (
            <p>No booked reservations.</p>
          )}
        </div>
      )}

      {tab === "cancelled" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cancelledBookings.length ? (
            cancelledBookings.map((booking) => (
              <div key={booking._id}>
                <BookingCard hotel={booking.hotelDetails} booking={booking} />
              </div>
            ))
          ) : (
            <p>No cancelled reservations.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
