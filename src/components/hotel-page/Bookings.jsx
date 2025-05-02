import React, { useEffect, useState } from "react";
import hotelService from "../../service/hotel.service";
import BookingCard from "./BookingCard";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";

const Bookings = () => {
  const userId = sessionStorage.getItem('userID');
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await hotelService.getBookingsByUser(userId);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter((b) => {
    const bookingStart = new Date(b.startDate);
    bookingStart.setHours(0, 0, 0, 0);
    return bookingStart >= today && b.status !== "CANCELLED";
  });

  const pastBookings = bookings.filter((b) => {
    const bookingEnd = new Date(b.endDate);
    bookingEnd.setHours(0, 0, 0, 0);
    return bookingEnd < today;
  });

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await hotelService.cancelBooking(bookingId) // Assumes your backend supports this
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error("Error cancelling booking:", err)
    }
  };

  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <h1 className="bg-black text-white text-xl md:text-2xl px-4 py-2 rounded-md mb-4">
        My Bookings
      </h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 header hover:cursor-pointer rounded ${tab === "upcoming" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 header hover:cursor-pointer rounded ${tab === "past" ? "bg-black text-white" : "bg-gray-200"}`}
        >
          Past
        </button>
      </div>

      {tab === "upcoming" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingBookings.length ? (
            upcomingBookings.map((booking) => (
              <div key={booking.id} className="relative">
                <BookingCard hotel={booking.hotelDetails} booking={booking} />
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 text-white rounded shadow bg-red-500 hover:scale-110 transition-transform duration-200"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming bookings.</p>
          )}
        </div>
      )}

      {tab === "past" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pastBookings.length ? (
            pastBookings.map((booking) => (
              <div key={booking.id} className="relative">
                <BookingCard hotel={booking.hotelDetails} booking={booking} />
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 text-white rounded shadow bg-yellow-500 hover:scale-110 transition-transform duration-200"
                  onClick={() => handleReviewClick(booking)}
                >
                  Write Review
                </button>
              </div>
            ))
          ) : (
            <p>No past bookings.</p>
          )}
        </div>
      )}

      {modalOpen && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => {
            setModalOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Bookings;
