"use client"
import useLocalStorage from '@/hooks/useLocalStorage'
import { STORAGE_KEY } from '@/lib/const'
import React from 'react'
import Weather from './WeatherReport'
import Clock from './Clock'

export default function Header() {
    const [storedValue] = useLocalStorage(STORAGE_KEY)

    return (
        <div className='absolute top-0 left-0 w-full flex items-center justify-between z-[2] bg-white shadow-lg pl-2 pr-2 pt-1 pb-1'>
            <div className='w-auto'>
                <Weather />
            </div>

            <Clock />

            <div className="flex items-center">
                <img className="nes-avatar is-rounded w-full bg-black" alt="Gravatar image example" src="/images/character.gif" style={{ imageRendering: 'pixelated' }} />
                <span className='text-xs ms-2'>{storedValue?.name}</span>
            </div>
        </div>
    )
}
