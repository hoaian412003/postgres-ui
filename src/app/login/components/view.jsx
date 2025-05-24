'use client';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react'; 
import React from 'react';

export const LoginPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    return (
        <div className="flex min-h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
            <h1 className="text-5xl font-extrabold mb-4">Welcome</h1>
            <p className="mb-8 text-gray-600 text-center">Welcome to our project</p>

            <form className="w-full max-w-sm space-y-4">
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">
                <FaUser className="text-gray-500 mr-3" />
                <input
                type="text" name="username" id="username"
                placeholder="Username"
                className="bg-transparent w-full focus:outline-none"
                />
            </div>

            <div className="relative flex items-center px-4 py-3 bg-gray-100 rounded-lg focus-within:outline-2 focus-within:outline-black">         
                <FaLock className="text-gray-500 mr-3" />
                <input
                name="password" id="password"
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

            <div className="flex bg-base-100 border-base-300 rounded-box w-full p-4">
                <label className="label">
                    <input type="checkbox" defaultChecked className="checkbox" />
                        Remember me
                </label>
            </div>

            <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                SIGN IN
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