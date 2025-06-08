'use client'

import { verifyRootPrivateKey } from "../actions";
import React from "react";
import { savePrivateKeyAction } from "@/actions/session";



export const VerifyPrivateKey = ({
  onVerify,
}) => {

  const [loading, setLoading] = React.useState(false);
  const [privateKey, setPrivateKey] = React.useState('');
  const handleVerify = async () => {
    setLoading(true);
    const result = await verifyRootPrivateKey(privateKey);
    if (result) {
      savePrivateKeyAction(privateKey);
    }
    onVerify(result);
    setLoading(false);
  }

  return <div>
    <legend className="fieldset-legend">Your private key</legend>
    <textarea className="textarea w-full" placeholder="Enter your private key here" onChange={(e) => setPrivateKey(e.target.value)} />

    <button className="btn btn-primary mt-4 w-full" onClick={handleVerify} disabled={loading || !privateKey}>
      {loading ? <span className="loading loading-spinner"></span> : 'Verify Key'}
    </button>
  </div>
}
