'use client'

import { CiCirclePlus } from "react-icons/ci";
import { CreateAccountDialog } from "./create-account";

export const Header = () => {

  const openModal = () => {
    (document.getElementById('create-account') as any).showModal()
  }

  return <div className="flex mt-10 mb-4">
    <button className="btn btn-primary ml-auto" onClick={openModal} >
      <CiCirclePlus size={24} />
      <p className="font-bold">Create Account</p>
    </button>
    <CreateAccountDialog />
  </div>
}
