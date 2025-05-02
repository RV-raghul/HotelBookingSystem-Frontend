const ApiRoutes = {
    LOGIN : {
        url: 'user/signin',
        authentication:false,
        notify:true
    },
    SIGNUP : {
        url: 'user/signup',
        authentication:false,
        notify:true
    },
    ADDHOTEL : {
        url: 'hotel/create',
        authentication:true,
        notify:true
    },
    GET_HOTELS :{
        url: 'hotel/getHotels',
        authentication:true,
        notify:false
    },
    GET_HOTEL_BY_ID :{
        url: 'hotel/getHotels',
        authentication:true,
        notify:false
    },
    CHECKOUT : {
        url: 'booking/payment',
        authentication:true,
        notify:false
    },
    CREATE_BOOKING : {
        url: 'booking/create',
        authentication:true,
        notify:true
    },
    GET_BOOKINGS_BY_USER : {
        url: 'booking/getBookingByUser',
        authentication:true,
        notify:false
        },
    ADD_REVIEW : {
        url: 'review/add', authentication: true, notify: true
    },
    GET_ALL_REVIEWS:{
        url: 'review/getAll', authentication: true, notify: false
    },
    DELETE_REVIEW_BY_ID:{
        url: 'review/delete', authentication: true, notify: true
    },
    GET_PROFILE:{
        url:'profile/getprofile',
        authentication: true, notify: false
    },
    CREATE_PROFILE:{
        url:'profile/createprofile',
        authentication:true,
        notify:'true'
    },
    UPDATE_PROFILE:{
        url:'profile/updateprofile',
        authentication:true,
        notify:'true'
    },
    BOOKINGS_PER_DAY:{
        url:'dashboard/bookings-per-day',
        authentication:true,
        notify:false
    },
    REVENUE_PER_MONTH:{
        url:'dashboard/revenue-per-month',
        authentication:true,
        notify:false
    },
    AVERAGE_RATINGS:{
        url:'dashboard/average-ratings',
        authentication:true,
        notify:false
    },
    CANCEL_BOOKING:{
        url:'booking/cancel',
        authentication:true,
        notify:true
    },
    GET_ALL_BOOKINGS:{
        url:'booking/getAllBookings',
        authentication:true,
        notify:false
    }
}



export default ApiRoutes