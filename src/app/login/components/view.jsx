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
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg">Enter Your Key Here</legend>
            <textarea className="textarea h-24 w-full" type="hidden" placeholder="Private key"></textarea>
          </fieldset>

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
