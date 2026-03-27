import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export function UpdateDetails() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '' });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const user = res.data.user;

        if (user) {
          setUserData(user);
          setEditForm({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || '',
            password: user.password || '',
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching user data from backend:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setUserData({ ...userData, ...editForm });
        setIsEditing(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const displayUser = userData || {
    firstName: 'Alex',
    lastName: 'Carter',
    username: 'alex.c@email.com',
    password: '*********',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F5F7] p-6 font-sans">
      <div className="bg-white rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-[440px]">
        <div className="bg-gradient-to-br from-[#2D3136] to-[#1E2024] rounded-[2rem] h-36 p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-start w-full relative z-10">
            <div></div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (userData) setIsEditing(!isEditing);
                }}
                className={`bg-white/90 p-2 rounded-full shadow-sm transition-colors ${
                  isEditing
                    ? 'text-red-500 hover:text-red-700'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                {isEditing ? (
                  /* Cross Icon */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  /* Edit Icon */
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div className="pb-1">
              <h1 className="text-white text-xl font-bold mb-1">
                Account Details
              </h1>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {isLoading ? 'Loading...' : 'User Account'}
              </p>
            </div>
            <button
              onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
              className={`${isEditing ? 'bg-blue-500 text-white' : 'bg-white text-[#1E2024]'} font-semibold text-sm px-5 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-colors shadow-lg`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
              {!isEditing && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 px-3 pb-3 flex gap-4">
          <div className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-2">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                    className="w-full text-[#1E2024] font-bold text-[14px] border-b-2 border-blue-400 outline-none bg-transparent"
                  />
                ) : (
                  <p className="text-[#1E2024] font-bold text-[15px] truncate pr-1">
                    {displayUser.firstName}
                  </p>
                )}
                <p className="text-gray-400 text-[13px] mt-0.5">Name</p>
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                    className="w-full text-[#1E2024] font-bold text-[14px] border-b-2 border-blue-400 outline-none bg-transparent"
                  />
                ) : (
                  <p className="text-[#1E2024] font-bold text-[15px] truncate pr-1">
                    {displayUser.lastName}
                  </p>
                )}
                <p className="text-gray-400 text-[13px] mt-0.5">Lastname</p>
              </div>
            </div>

            <div className="flex justify-between items-end mt-5">
              <div className="flex pr-4 min-w-0">
                <p className="text-[#1E2024] font-bold text-[15px] truncate pr-1">
                  {displayUser.username}
                </p>
              </div>
              {editForm.password != '' ? (
                <div className="flex pr-4 min-w-0">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm({ ...editForm, password: e.target.value })
                      }
                      className="w-full text-[#1E2024] font-bold text-[14px] border-b-2 border-blue-400 outline-none bg-transparent"
                    />
                  ) : (
                    <p className="text-[#1E2024] font-bold text-[15px] truncate pr-1">
                      {displayUser.password}
                    </p>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="text-right whitespace-nowrap"></div>
            </div>
            <div className="flex justify-center mt-10 items-center p-2">
              <div>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                  }}
                  className="bg-gradient-to-br from-[#2D3136] to-[#1E2024] rounded-[1rem] text-white text-md font-semibold mb-1 px-7 p-2"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
