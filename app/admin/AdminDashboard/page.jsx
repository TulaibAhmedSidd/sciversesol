// app/admin/AdminDashboard.js
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTabScreen from './TabScreen/User';
import CategoryTabScreen from './TabScreen/Category';
import ProductTabScreen from './TabScreen/Product';
import BrandTabScreen from './TabScreen/Brand';
import StatTabScreen from './TabScreen/Stats';
import PlanManagement from './TabScreen/Plan';
import LogoutButton from "@components/LogoutButton";
import { useAppSelector } from '@/app/store/store';
import WhatsappTabScreen from './TabScreen/WhatsApp';
import Testimonial from './TabScreen/Testimonial';
import Teammember from './TabScreen/Teammember';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('member'); // Default tab is 'categories'
  const userdata = useAppSelector((state) => state?.auth?.userdata);
  console.log('userdata :', userdata)
  let username = userdata?.name
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-[100px] w-full">
      <div className='w-full text-end flex align-middle items-center justify-end my-2' >
        <h2 className="font-bold text-center" style={{ fontSize: '2rem', paddingRight: '20px', margin: '0px' }} >Welcome, {username}</h2>
        <LogoutButton />
      </div>
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Tabs Navigation */}
      <div className="flex flex-col mb-6 flex-wrap justify-evenly gap-1 align-top w-full md:flex-row">
        {/* <button
          onClick={() => setActiveTab('categories')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'categories' ? 'bg-[linear-gradient(to right, #1e3a8a, #9333ea)]' : 'bg-blue-300'}`}
        >
          Product Categories
        </button> */}
        {/* <button
          onClick={() => setActiveTab('brands')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'brands' ? 'bg-[linear-gradient(to right, #1e3a8a, #9333ea)]' : 'bg-blue-300'}`}
        >
          Brands
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'products' ? 'bg-[linear-gradient(to right, #1e3a8a, #9333ea)]' : 'bg-blue-300'}`}
        >
          Products
        </button> */}
        <button
          onClick={() => setActiveTab('member')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'member' ? 'bg-blue-900' : 'bg-blue-300'}`}
        >
          Team member
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'users' ? 'bg-blue-900' : 'bg-blue-300'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'whatsapp' ? 'bg-blue-900' : 'bg-blue-300'}`}
        >
          WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'stats' ? 'bg-blue-900' : 'bg-blue-300'}`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab('testimonial')}
          className={` flex-1 w-full px-4 py-2 rounded-md text-white ${activeTab === 'testimonial' ? 'bg-blue-900' : 'bg-blue-300'}`}
        >
          Testimonial
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'categories' && (
        <div>
          <CategoryTabScreen />
        </div>
      )}

      {activeTab === 'brands' && (
        <BrandTabScreen />
      )}

      {activeTab === 'products' && (
        <ProductTabScreen />
      )}
      {activeTab === 'member' && (
        <Teammember />
      )}
      {activeTab === 'plan' && (
        <PlanManagement />
      )}
      {activeTab === 'whatsapp' && (
        <WhatsappTabScreen />
      )}
      {activeTab === 'stats' && (
        <StatTabScreen />
      )}
      {activeTab === 'testimonial' && (
        <Testimonial />
      )}

      {activeTab === 'users' && (
        <div>
          <UserTabScreen />
          {/* <p className="text-gray-600">Here you can manage users.</p> */}
          {/* Add User management UI here */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
