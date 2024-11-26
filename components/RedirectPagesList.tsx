import { faPiggyBank, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import TrelloIcon from './TrelloIcon'
import Image from 'next/image'

export default function RedirectPagesList() {
    return (
        <div className='absolute top-[76px] left-0 flex justify-end items-center z-[1] bg-white w-full h-10 shadow-lg pl-2 pr-2'>
            <div className="flex items-center bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-sm">
                <FontAwesomeIcon
                    icon={faPlus}
                />
                <span className='text-xs ml-2 mt-1'>Add</span>
            </div>

            <div className="flex items-center ml-8">
                <FontAwesomeIcon
                    icon={faPiggyBank}
                />
                <span className='text-xs ml-2 mt-1'>Budget app</span>
            </div>
            <div className="flex items-center ml-8">
                <TrelloIcon />
                <span className='text-xs ml-2 mt-1'>Trello</span>
            </div>
            <div className="flex items-center ml-8">
                <span className='text-xs mt-1'>Sbi remit</span>
            </div>
            <div className="flex items-center ml-8">
                <Image
                    className="nes-avatar" alt="Gravatar image example" src="/images/github-mark.png"
                    width={20}
                    height={20}
                    style={{ imageRendering: 'pixelated'}}
                />
                <span className='text-xs ml-2 mt-1'>github</span>
            </div>

        </div>
    )
}
