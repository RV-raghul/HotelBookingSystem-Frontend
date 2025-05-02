import React, { useEffect, useState } from 'react';
import hotelService from '../../service/hotel.service';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [bookingData, setBookingData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const bookings = await hotelService.bookingsPerDay();
      const revenue = await hotelService.revenuePerMonth();
      const ratings = await hotelService.averageRatings();

      // Format booking dates
      const formattedBookings = bookings.map(item => ({
        ...item,
        _id: dayjs(item._id).format('DD MMM')
      }));

      // Format revenue month labels
      const formattedRevenue = revenue.map(item => ({
        ...item,
        _id: dayjs(`${item._id}-01`).format('MMM YYYY')
      }));

      setBookingData(formattedBookings);
      setRevenueData(formattedRevenue);
      setRatingData(ratings);
      console.log(ratings)
    } catch (err) {
      console.error("Error fetching analytics data", err);
    }
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 bg-slate-200 ">
      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg> Bookings Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookingData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/></svg> Revenue Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalRevenue" fill="#82ca9d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 shadow rounded-2xl col-span-1 md:col-span-2">
  <h2 className="text-xl font-semibold mb-4 flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></svg> Average Ratings by Hotel</h2>
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={ratingData}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, 5]} />
      <YAxis dataKey="_id" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="AverageRating" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>

    </div>
  )
}

export default Dashboard;
