import apiService from "./api.service";
import ApiRoutes from "../utils/ApiRoutes";
import toast from 'react-hot-toast'

const addHotel = async(payload={}) => {
    let res = await apiService.post(
        ApiRoutes.ADDHOTEL.url,
        payload,
        {
            authentication:ApiRoutes.ADDHOTEL.authentication
        }
    )
    if(ApiRoutes.ADDHOTEL.notify)
        toast.success(res.message)
    return res
}


const getAllHotels = async (payload = {}) => {
    let res = await apiService.get(
      ApiRoutes.GET_HOTELS.url,
      {
        params: payload,  // send as query params
      },
      {
        authentication: ApiRoutes.GET_HOTELS.authentication,
      }
    );
  
    if (ApiRoutes.GET_HOTELS.notify) toast.success(res.message);
  
    return res;
  };


  const checkOut = async( payload = {}) => {
    let res = await apiService.post(
      ApiRoutes.CHECKOUT.url,
      payload,
      {
        authentication: ApiRoutes.CHECKOUT.authentication
        }
        );
        if(ApiRoutes.CHECKOUT.notify)
          toast.success(res.message)
        return res
  }

  const getHotelById = async (id) => {
    const res = await apiService.get(
      `${ApiRoutes.GET_HOTEL_BY_ID.url}/${id}`,
      { authentication: ApiRoutes.GET_HOTEL_BY_ID.authentication }
    );
    if (ApiRoutes.GET_HOTEL_BY_ID.notify) toast.success(res.message);
    return res;
  };

  const createBooking = async(payload={}) => {
    let res = await apiService.post(
      ApiRoutes.CREATE_BOOKING.url,
      payload,
      {
        authentication: ApiRoutes.CREATE_BOOKING.authentication
        }
        );
        if(ApiRoutes.CREATE_BOOKING.notify)
          toast.success(res.message)
        return res
  }


  const getBookingsByUser = async(id) => {
    const res = await apiService.get(
      `${ApiRoutes.GET_BOOKINGS_BY_USER.url}/${id}`,
      { authentication: ApiRoutes.GET_BOOKINGS_BY_USER.authentication }
      );
      if(ApiRoutes.GET_BOOKINGS_BY_USER.notify)
        toast.success(res.message)
      return res
  }

  const addReview = async(payload={}) => {
    let res = await apiService.post(
      ApiRoutes.ADD_REVIEW.url, payload, { authentication: ApiRoutes.ADD_REVIEW.authentication });
      if (ApiRoutes.ADD_REVIEW.notify) toast.success(res.message); 
      return res;
  }

  const getAllReviews = async() => {
    const res = await apiService.get(
      ApiRoutes.GET_ALL_REVIEWS.url, { authentication: ApiRoutes.GET_ALL_REVIEWS.authentication });
      if (ApiRoutes.GET_ALL_REVIEWS.notify) toast.success(res.message); 
      return res;
  }

  const deleteReviewById = async(id) => {
    const res = await apiService.delete(`${ApiRoutes.DELETE_REVIEW_BY_ID.url}/${id}`, 
      { authentication: ApiRoutes.DELETE_REVIEW_BY_ID.authentication });
    if (ApiRoutes.DELETE_REVIEW_BY_ID.notify) toast.success(res.message); 
    return res;
  }

  const getProfile = async() => {
    const res = await apiService.get(ApiRoutes.GET_PROFILE.url,
      { authentication: ApiRoutes.GET_PROFILE.authentication });
      if ( ApiRoutes.GET_PROFILE.notify) 
        toast.success(res.message)
      return res;
  }

  const createProfile = async(payload={}) => {
    const res = await apiService.post(
      ApiRoutes.CREATE_PROFILE.url,
      payload,
      { authentication: ApiRoutes.CREATE_PROFILE.authentication}
    )
    if( ApiRoutes.CREATE_PROFILE.notify)
      toast.success(res.message)
    return res
  }
  const updateProfile = async(payload={}) => {
    const res = await apiService.post(
      ApiRoutes.UPDATE_PROFILE.url,
      payload,
      { authentication: ApiRoutes.UPDATE_PROFILE.authentication}
    )
    if( ApiRoutes.UPDATE_PROFILE.notify)
      toast.success(res.message)
    return res
  }

  const bookingsPerDay = async() => {
    const res = await apiService.get(
      ApiRoutes.BOOKINGS_PER_DAY.url,
      { authentication: ApiRoutes.BOOKINGS_PER_DAY.authentication}
    )
    if( ApiRoutes.BOOKINGS_PER_DAY.notify)
      toast.success(res.message)
    return res
  }

  const revenuePerMonth = async() => {
    const res = await apiService.get(
      ApiRoutes.REVENUE_PER_MONTH.url,
      { authentication: ApiRoutes.REVENUE_PER_MONTH.authentication}
    )
    if( ApiRoutes.REVENUE_PER_MONTH.notify)
      toast.success(res.message)
    return res
  }


  const averageRatings = async() => {
    const res = await apiService.get(
      ApiRoutes.AVERAGE_RATINGS.url,
      { authentication: ApiRoutes.AVERAGE_RATINGS.authentication}
    )
    if( ApiRoutes.AVERAGE_RATINGS.notify)
      toast.success(res.message)
    return res
  }


  const cancelBooking = async(bookingId) => {
    const res = await apiService.put(
      `${ApiRoutes.CANCEL_BOOKING.url}/${bookingId}`,

    { authentication: ApiRoutes.CANCEL_BOOKING.authentication}
    )
    if( ApiRoutes.CANCEL_BOOKING.notify)
      toast.success(res.message)
    return res
  }

  const getAllBookings = async() => {
    const res = await apiService.get(
      ApiRoutes.GET_ALL_BOOKINGS.url,
    { authentication: ApiRoutes.GET_ALL_BOOKINGS.authentication}
    )
    if( ApiRoutes.GET_ALL_BOOKINGS.notify)
      toast.success(res.message)
    return res
  }
  





export default {
    addHotel,
    getAllHotels,
    getHotelById,
    checkOut,
    createBooking,
    getBookingsByUser,
    addReview,
    getAllReviews,
    deleteReviewById,
    getProfile,
    createProfile,
    updateProfile,
    bookingsPerDay,
    revenuePerMonth,
    averageRatings,
    cancelBooking,
    getAllBookings
}



