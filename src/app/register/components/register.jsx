'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react'; 

export const RegisterPage = () =>  {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(prevState => !prevState);

	return(
        <div className="flex min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
            <h1 className="text-5xl font-extrabold mb-4">Register</h1>
            <p className="mb-8 text-gray-600 text-center">Please complete to create your account</p>
            <form className="w-full max-w-sm space-y-4">
            <div className="flex items-center ">
                <div className="flex-1 mr-2 items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">
                    <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    className="bg-transparent w-full focus:outline-none"
                    />
                </div>
                <div className="flex-1 items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">
                    <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    className="bg-transparent w-full focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">
                <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="bg-transparent w-full focus:outline-none"
                />
            </div>

            <div className="relative flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">         
            <FaLock className="text-gray-500 mr-3" />
            <input
                name="password"
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                className="bg-transparent w-full focus:outline-none"
                aria-label="Password"
                required
            />
            <button
                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-black hover:text-black transition-colors"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
            >
                {isVisible ? (
                <FaEye size={20} aria-hidden="true" />
                ) : (
                <FaEyeSlash size={20} aria-hidden="true" />
                )}
            </button>
            </div>

            <div className="relative flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">         
            <FaLock className="text-gray-500 mr-3" />
            <input
                name="confirm_password" 
                id="confirm_password"  
                type={isVisibleConfirm ? "text" : "password"} 
                placeholder="Confirm Password"
                className="bg-transparent w-full focus:outline-none"
                aria-label="Confirm Password"
                required
            />
            <button
                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-black hover:text-black transition-colors"
                type="button"
                onClick={toggleVisibilityConfirm}
                aria-label={isVisibleConfirm ? "Hide password" : "Show password"}
                aria-pressed={isVisibleConfirm}
                aria-controls="confirm_password"
            >
                {isVisibleConfirm ? (
                <FaEye size={20} aria-hidden="true" />
                ) : (
                <FaEyeSlash size={20} aria-hidden="true" />
                )}
            </button>
            </div>

            <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                SUBMIT
            </button>

            </form>
        </div>

        <div className="hidden md:flex md:w-1/2 items-center justify-center loading='lazy">
            <div className="p-8">
                <img
                src="./images/img_login_page.png"
                alt="Login"
                className="w-full h-full object-cover"
                />
            </div>
        </div>

        </div>
    )

}