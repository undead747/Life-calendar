"use client"
import useLocalStorage from '@/hooks/useLocalStorage'
import { STORAGE_KEY } from '@/lib/const'
import React, { useEffect } from 'react'
import Weather from './WeatherReport'
import useWeather from '@/hooks/useWeather'
import Clock from './Clock'

export default function Header() {
    const [storedValue, setValue] = useLocalStorage(STORAGE_KEY)
    return (
        <div className='absolute top-0 left-0 w-full flex justify-between z-[2] bg-white shadow-lg'>
            <div className='mt-2 ml-2 w-auto'>
                <Weather />
            </div>

            <Clock />

            <div className="flex items-center">
                <img className="nes-avatar is-rounded w-full bg-black" alt="Gravatar image example" src="/images/character.gif" style={{ imageRendering: 'pixelated' }} />
                <span className='text-xs ms-2'>{storedValue.name}</span>
            </div>
        </div>
    )
}
