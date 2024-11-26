"use client"
import Background from "@/components/Background";
import ToggleSwitch from "@/components/ToggleSwitch";
import useFetch from "@/hooks/useFetch";
import useLocalStorage from "@/hooks/useLocalStorage"
import { STORAGE_KEY } from "@/lib/const"
import { formatDate } from "@/lib/customdate";
import { useState } from "react";
import Image from 'next/image';

interface ProgressBarProps {
    age: number;
    lifeExpectancy: number;
    ageRation: number;
    birth: string;
    currDateFormat: string;
    dieDateFormat: string;
}

interface WeekTableProps {
    weeksLived: number;
    totalWeeks: number;
}

function ProgressBar({ age, lifeExpectancy, ageRation, birth, currDateFormat, dieDateFormat }: ProgressBarProps) {
    return (
        <>
            <div className="text-sm text-white mt-2 ml-4">
                You have lived <span className="text-red-500">{Math.round(ageRation)}%</span> of your life
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[66%]">
                <div
                    className="w-36 absolute -top-36 transform -translate-x-1/2"
                    style={{ left: `${(age / lifeExpectancy) * 100 - 3}%` }}
                >
                    <Image src="/images/character.gif" alt="Character GIF" width={144} height={144} />
                </div>
                <div
                    className="w-36 absolute -top-36 transform -translate-x-1/2"
                    style={{ left: `${(age / lifeExpectancy) * 100 - 1}%` }}
                >
                    <Image src="/images/flag.png" alt="Flag" width={144} height={144} />
                </div>
                <div className="w-36 absolute -top-28 left-full transform -translate-x-1/2">
                    <Image src="/images/ghost.gif" alt="Ghost GIF" width={144} height={144} />
                </div>
                <progress
                    className="nes-progress is-pattern"
                    value={ageRation}
                    max="100"
                    style={{ borderImageRepeat: 'initial' }}
                ></progress>

                <span
                    className="nes-badge absolute top-15 left-0"
                    style={{ position: 'absolute', width: '15%' }}
                >
                    <span
                        className="is-success"
                        style={{
                            width: '140%',
                            backgroundColor: 'white',
                            color: 'black',
                            boxShadow: '0 .5em black,0 -.5em black,.5em 0 black,-.5em 0 black',
                        }}
                    >
                        {birth}
                    </span>
                </span>

                <span
                    className="nes-badge absolute top-15 before:content-[''] before:absolute before:-left-5 before:-top-3 before:w-4 before:h-6 before:border-l-white before:border-b-white before:border-l-4 before:border-b-4"
                    style={{
                        position: 'absolute',
                        width: '15%',
                        left: `${(age / lifeExpectancy) * 100 + 2}%`,
                    }}
                >
                    <span className="is-success">{age} yrs</span>
                </span>
                <span
                    className="nes-badge absolute top-28 before:content-[''] before:absolute before:-left-5 before:-top-10 before:w-4 before:h-14 before:border-l-white before:border-b-white before:border-l-4 before:border-b-4"
                    style={{
                        position: 'absolute',
                        width: '15%',
                        left: `${(age / lifeExpectancy) * 100 + 2}%`,
                    }}
                >
                    <span
                        className="is-success"
                        style={{ width: '140%' }}
                    >
                        {currDateFormat}
                    </span>
                </span>

                <div
                    className="nes-badge absolute top-15 left-[102%] before:content-[''] before:absolute before:-left-5 before:-top-3 before:w-4 before:h-6 before:border-l-white before:border-b-white before:border-l-4 before:border-b-4"
                    style={{ position: 'absolute', width: '15%' }}
                >
                    <span className="is-dark">{lifeExpectancy} yrs</span>
                </div>
                <div
                    className="nes-badge absolute top-28 left-[102%] before:content-[''] before:absolute before:-left-5 before:-top-10 before:w-4 before:h-14 before:border-l-white before:border-b-white before:border-l-4 before:border-b-4"
                    style={{ position: 'absolute', width: '15%' }}
                >
                    <span
                        className="is-dark"
                        style={{ width: '140%' }}
                    >
                        {dieDateFormat}
                    </span>
                </div>
            </div>
        </>
    );
}

function WeekTable({ weeksLived, totalWeeks }: WeekTableProps) {
    const weeks = Array.from({ length: totalWeeks }, (_, i) => i < weeksLived);

    return (
        <>
            <div className="mb-2 ml-1 mt-2">
                <span className="text-sm text-red-500 mr-6">lived weeks:{weeksLived}</span>
                <span className="text-sm text-green-500 mr-6">weeks left:{totalWeeks - weeksLived}</span>
                <span className="text-sm text-white">total weeks:{totalWeeks}</span>
            </div>
            <div className="flex flex-wrap gap-1 p-2">
                {weeks.map((lived, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 flex items-center justify-center text-xs font-bold 
                ${lived ? "bg-black text-red-500" : "bg-green-500 text-transparent"}`}
                        title={`Week ${index + 1} ${lived ? "(Lived)" : "(Remaining)"}`}
                    >
                        {lived ? "✖" : ""}
                    </div>
                ))}
            </div>
        </>
    );
}

// app/page.tsx hoặc pages/index.tsx
export default function Home() {
    const [storedValue] = useLocalStorage(STORAGE_KEY)
    const [isToggled, setIsToggled] = useState(false);

    const handleToggleChange = (state: boolean) => {
        setIsToggled(state);
    };

    let indicatorCode = 'SP.DYN.LE00.IN';
    if (storedValue) {
        if (storedValue.sex === 'male') {
            indicatorCode = 'SP.DYN.LE00.MA.IN';
        } else if (storedValue.sex === 'female') {
            indicatorCode = 'SP.DYN.LE00.FE.IN';
        }
    }

    const url = !storedValue ? '' : `https://api.worldbank.org/v2/country/${storedValue.country}/indicator/${indicatorCode}?format=json&date=2022:2022`;
    const { data } = useFetch(url);

    if (!data) return;

    let lifeExpectancy = 70;
    const today = new Date();
    const currYear = today.getFullYear();
    const currDateFormat = formatDate(today);
    const birth = new Date(storedValue.birth);
    const age = currYear - birth.getFullYear();

    if (data && Array.isArray(data)) {
        if (data[1][0].value) lifeExpectancy = Math.round(data[1][0].value);
    }
    birth.setFullYear(birth.getFullYear() + lifeExpectancy);
    const dieDateFormat = formatDate(birth);
    const ageRation = (age / lifeExpectancy) * 100;
    const totalWeeks = lifeExpectancy * 52;
    const weeksLived = Math.floor((today.getTime() - new Date(storedValue.birth).getTime()) / (7 * 24 * 60 * 60 * 1000));

    const renderByToggle = function () {
        if (!isToggled) return <ProgressBar
            age={age}
            lifeExpectancy={lifeExpectancy}
            ageRation={ageRation}
            birth={storedValue.birth}
            currDateFormat={currDateFormat}
            dieDateFormat={dieDateFormat}
        />

        return <WeekTable weeksLived={weeksLived} totalWeeks={totalWeeks} />;
    }

    return (
        <div className="w-screen h-screen">
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2] w-[99%] h-3/5 text-base sm:text-[12px] md:text-[12px] lg:text-base overflow-auto" style={{ zIndex: '2' }}>
                {renderByToggle()}
            </div>

            <Background style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
           
            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[99%] h-3/5 inset-0 z-[1]">
                <div className="w-full h-full  bg-black opacity-70 rounded-sm"></div>
                <div className="absolute -bottom-12 right-0 opacity-100">
                    <ToggleSwitch isChecked={isToggled} onToggle={handleToggleChange} />
                </div>
            </div>
        </div>
    )
}
