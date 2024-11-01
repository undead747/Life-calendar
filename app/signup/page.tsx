'use client'
import React, { useState } from 'react';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Mảng các trường dữ liệu
  const steps = [
    {
      label: 'Enter your name',
      input: (
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          required
        />
      ),
    },
    {
      label: 'Enter your email',
      input: (
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          required
        />
      ),
    },
    {
      label: 'Enter your password',
      input: (
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          required
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Xử lý đăng ký, có thể gửi dữ liệu lên server
      console.log('Form data:', formData);
      // Reset form hoặc điều hướng đến trang khác
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <div>
        <p>{steps[currentStep].label}</p>
        {steps[currentStep].input}
      </div>
      <button onClick={handleNext}>{currentStep < steps.length - 1 ? 'Next' : 'Submit'}</button>
    </div>
  );
};

export default SignupPage;