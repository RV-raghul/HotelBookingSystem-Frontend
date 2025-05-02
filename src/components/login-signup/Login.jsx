import React from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import apiService from '../../service/api.service';
import ApiRoutes from '../../utils/ApiRoutes';
import logo from '../assets/Logo_black.png'

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;

      if (email && password) {
        const res = await apiService.post(
          ApiRoutes.LOGIN.url,
          { email, password },
          { authentication: ApiRoutes.LOGIN.authentication }
        );

        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.data.role);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('userID', res.data.id);
        setIsAuthenticated(true);

        if (res.data.role === 'ADMIN') {
          navigate('/dashboard');
        } else if (res.data.role === 'USER') {
          navigate('/book');
        }
        toast.success(res.message);
      } else {
        toast.error('Email and Password are required!');
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || 'Something went wrong! Try again later'
      );
    }
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center w-full min-h-screen p-4">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full md:w-[90vw] lg:w-[70vw] shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="border-black border-b-2 md:border-b-0 md:border-r-2 w-full md:w-1/3 p-6 flex flex-col justify-center items-center bg-gray-50">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 playwrite-hu-header">onlyHotels</h1>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center font-extrabold mb-4 header">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
            <label className="font-semibold subheader text-gray-700">Email ID</label>
            <input
              name="email"
              type="text"
              placeholder="Enter Email"
              className="p-2 h-10 border-2 rounded-sm"
            />
            <label className="font-semibold text-gray-700 subheader">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="p-2 h-10 border-2 rounded-sm"
            />
            <button className="mt-4 border-2 subheader pop-button border-black h-10 rounded-sm bg-black text-white hover:bg-gray-800 transition">
              Login
            </button>
          </form>
          <p className="mt-4 text-sm subheader">
            Don't have an account?{' '}
            <span
              className="text-blue-700 subheader hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
