import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import hotelService from "../../service/hotel.service";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const hasPostedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hotelId = searchParams.get("hotelId");
    const hotelName = searchParams.get("hotelName");
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const guests = searchParams.get("guests");
    const price = searchParams.get("price");

    const createBooking = async () => {
      if (hasPostedRef.current) return;
      hasPostedRef.current = true;

      try {
        const payload = {
          hotelId,
          hotelName,
          userId,
          startDate,
          endDate,
          guests,
          totalPrice: price,
          status: "BOOKED",
        };

        const res = await hotelService.createBooking(payload);
        console.log("✅ Booking saved:", res);
      } catch (err) {
        console.error("❌ Failed to save booking", err);
      }
    };

    if (hotelId && hotelName && userId && startDate && endDate && guests && price) {
      createBooking();
    }
  }, [searchParams]);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 h-[90vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 24 24" className="text-black w-20 h-20">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600 mt-3">Thank you for your booking. Your payment was received successfully.</p>
        <p className="text-gray-500 mt-1">We hope you enjoy your stay!</p>

        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="pop-button transition-colors text-white font-medium py-2 px-6 rounded-full shadow-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
