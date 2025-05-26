'use client';
import React from 'react';
import { VerifyPrivateKey } from "./VerifyPrivateKey"
import { SetUpDatabase } from './SetupDatabase';
import { toast } from 'react-toastify';

export const SetupForm = () => {

  const [currentStep, setCurrentStep] = React.useState(0);

  const onVerify = (result) => {
    if (result) {
      setCurrentStep(1);
      toast.success('Private key verified successfully! Proceed to setup your database.');
    } else {
      toast.error('Invalid private key. Please try again.');
    }
  }

  const steps = [{
    name: 'Verify Key',
    render: () => <VerifyPrivateKey onVerify={onVerify} />
  }, {
    name: 'Setup Database',
    render: () => <SetUpDatabase />
  }]

  return <div className="w-full max-w-[400px]">
    <ul className="steps w-full">
      {steps.map((step, index) => (
        <li key={index} className={`step ${currentStep >= index ? 'step-primary' : ''}`}>
          <p className="font-bold">{step.name}</p>
        </li>
      ))}
    </ul>

    <div className="mt-4 w-full">
      {steps[currentStep].render()}
    </div>
  </div>
}
