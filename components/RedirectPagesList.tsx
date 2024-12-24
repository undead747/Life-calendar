import { faPiggyBank, faClock, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import TrelloIcon from './TrelloIcon'
import Image from 'next/image'

export default function RedirectPagesList() {
    return (
        <div className='absolute top-[76px] left-0 flex justify-end items-center z-[1] bg-white w-full h-10 shadow-lg pl-2 pr-2'>
            <a
                href="/home"
                className="flex items-center ml-8 text-black"
                style={{borderBottom: '2px solid black'}}
            >
                <FontAwesomeIcon
                    icon={faHouse}
                />
                <span className='text-xs ml-2 mt-1'>Home</span>
            </a>
            <a
                href="/home/pomodoro"
                className="flex items-center ml-8 text-black no-underline"
            >
                <FontAwesomeIcon
                    icon={faClock}
                />
                <span className='text-xs ml-2 mt-1'>Pomodoro timer</span>
            </a>
            <a
                href="https://budget-app-2022.web.app"
                target="_blank"
                className="flex items-center ml-8 text-black no-underline"
            >
                <FontAwesomeIcon
                    icon={faPiggyBank}
                />
                <span className='text-xs ml-2 mt-1'>Budget app</span>
            </a>
            <a
                href="https://trello.com/u/trncongminh3/boards"
                target="_blank"
                className="flex items-center ml-8 text-black no-underline"
            >
                <TrelloIcon />
                <span className='text-xs ml-2 mt-1'>Trello</span>
            </a>
            <a
                href='https://www.remit.co.jp/en/kaigaisoukin/exchangeratecommission/exchange/'
                target="_blank"
                className="flex items-center ml-8 text-black no-underline"
            >
                <span className='text-xs mt-1'>Sbi remit</span>
            </a>

            <a
                href='https://github.com/undead747'
                target="_blank"
                className="flex items-center ml-8 text-black no-underline"
            >
                <Image
                    alt="Gravatar image example" src="/images/github-mark.png"
                    width={20}
                    height={20}
                    style={{ imageRendering: 'pixelated' }}
                />
                <span className='text-xs ml-2 mt-1'>github</span>
            </a>
        </div>
    )
}
