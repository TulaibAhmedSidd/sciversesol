// app/login/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@/app/components/Button';
import { getCookie } from "@utils/helperFunc";
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { addtoken, adduserdata } from '@/app/store/slices/authSlice';
import Loading from "../../components/Loading";


const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(null);
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state?.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        // On successful login, store a cookie or session and redirect to admin dashboard
        document.cookie = `admin-auth-token=${response?.data?.token}`;
        dispatch(adduserdata(response?.data?.user))
        dispatch(addtoken(response?.data?.token))
        router.push('/admin');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setloading(false)

    }
  };

  if (token) {
    router.push('/admin');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="Email"
              className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="Password"
              className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ?
              <Loading text='Logging' fontSize='13px' />
              : 'Login'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default LoginPage;
