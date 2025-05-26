import React from 'react';
import { SetupForm } from './components/SetupForm';

const SetupPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <h1 className="text-5xl font-extrabold mb-4">Welcome</h1>
        <p className="mb-8 text-gray-600 text-center">You must setup your database first</p>
        <SetupForm />
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

export default SetupPage;
