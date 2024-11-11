"use client"
import useLocalStorage from '@/hooks/useLocalStorage'
import { STORAGE_KEY } from '@/lib/const'
import React, { useEffect } from 'react'
import Weather from './WeatherReport'

export default function Header() {
    const [storedValue, setValue] = useLocalStorage(STORAGE_KEY)

    return (
        <div className='absolute top-0 left-0 h-1/4 w-full flex justify-between'>
            <div className='mt-2 ml-2 w-[6/11]'>
                <Weather />
            </div>

            <div className="flex items-center rounded-full bg-white p-2 shadow-lg h-10 mt-2 mr-2">
                <img className="nes-avatar is-rounded w-full bg-black" alt="Gravatar image example" src="/images/character.gif" style={{ imageRendering: 'pixelated' }} />
                <span className='text-sm ms-2'>{storedValue.name}</span>
            </div>
        </div>
    )
}
