'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { clearCookie } from '../utils/helperFunc';
import { addtoken, adduserdata } from '../store/slices/authSlice';
import { useAppDispatch } from '../store/store';

const LogoutButton = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch()
    
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Make POST request to logout
            dispatch(adduserdata(null))
            dispatch(addtoken(null))
            clearCookie('admin-auth-token')
            await axios.post('/api/logout');
            // Redirect user to the login page after logout
            router.push('/admin');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoggingOut(false);

        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
    );
};

export default LogoutButton;
