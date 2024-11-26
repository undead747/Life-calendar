'use client'
import useFetch from '@/hooks/useFetch';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Country, STORAGE_KEY } from '@/lib/const';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    sex: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    birth: '',
    sex: '',
    country: '',
  });

  const { data: countries } = useFetch<Country[]>('https://restcountries.com/v3.1/all');

  const [,setUserInfo] = useLocalStorage(STORAGE_KEY) 

  const steps = [
    {
      label: 'Enter your name',
      input: (
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className={errors.name ? 'nes-input is-error' : 'nes-input'}
          style={{borderImageRepeat: 'initial' }}
          required
        />
      ),
      error: (
        <span className="nes-text is-error">{errors.name}</span>
      )
    },
    {
      label: 'Enter your date of birth',
      input: (
        <input
          type="date"
          value={formData.birth}
          onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
          placeholder="Birth"
          className={errors.birth ? 'nes-input is-error' : 'nes-input'}
          style={{borderImageRepeat: 'initial' }}
          required
        />
      ),
      error: (
        <span className="nes-text is-error">{errors.birth}</span>
      )
    },
    {
      label: 'Enter your sex',
      input: (

        <div className="nes-select">
          <select id="options"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            required
            className={errors.sex ? 'is-error' : ''}
            style={{borderImageRepeat: 'initial' }}
          >
            <option value="">--Select an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      ),
      error: (
        <span className="nes-text is-error">{errors.sex}</span>
      )
    },
    {
      label: 'Enter your country',
      input: (
        <div className="nes-select">
          <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}  style={{borderImageRepeat: 'initial' }} required>
            {
              countries?.sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((c) => (
                  <option key={c.cca2} value={c.cca2}>
                    {c.name.common}
                  </option>
                )) ?? null
            }
          </select>
        </div>
      ),
      error: (
        <span className="nes-text is-error">{errors.country}</span>
      )
    },
  ];

  const handleNext = () => {
    const newErrors = {
      name: currentStep === 0 && !formData.name ? "please enter your name" : "",
      birth: currentStep === 1 && !formData.birth ? "please enter your birth" : "",
      sex: currentStep === 2 && !formData.sex ? "please select your sex" : "",
      country: currentStep === 3 && !formData.country ? "please select your country" : ""
    };

    if (newErrors.name || newErrors.birth || newErrors.sex || newErrors.country) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", birth: "", sex: "", country: "" }); 
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setUserInfo(formData);
      router.push('/home');
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className='nes-field w-1/3'>
        <label htmlFor="name_field">{steps[currentStep].label}</label>
        {steps[currentStep].input}
        {steps[currentStep].error}
        <span className='mt-8 block'></span>
        <button className='nes-btn is-primary w-full' onClick={handleNext}  style={{borderImageRepeat: 'initial' }}>{currentStep < steps.length - 1 ? 'Next' : 'Submit'}</button>
      </div>
    </div>
  );
};

export default SignupPage;


