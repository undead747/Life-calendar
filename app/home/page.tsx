"use client"
import Background from "@/components/Background";
import useFetch from "@/hooks/useFetch";
import useLocalStorage from "@/hooks/useLocalStorage"
import { STORAGE_KEY } from "@/lib/const"
import { formatDate } from "@/lib/customdate";

// app/page.tsx hoặc pages/index.tsx
export default function Home() {
    const [storedValue, setValue] = useLocalStorage(STORAGE_KEY)
    let indicatorCode = 'SP.DYN.LE00.IN';
    if (storedValue.sex === 'male') {
        indicatorCode = 'SP.DYN.LE00.MA.IN';
    } else if (storedValue.sex === 'female') {
        indicatorCode = 'SP.DYN.LE00.FE.IN';
    }

    let lifeExpectancy = 70;
    const today = new Date();
    let currYear = today.getFullYear();
    let currDateFormat = formatDate(today);
    let birth = new Date(storedValue.birth);
    let age = currYear - birth.getFullYear();
    
    const { data, loading, error } = useFetch(`https://api.worldbank.org/v2/country/${storedValue.country}/indicator/${indicatorCode}?format=json&date=2022:2022`);
    if (data && Array.isArray(data)) {
        if (data[1][0].value) lifeExpectancy = Math.round(data[1][0].value);
    }
    birth.setFullYear(birth.getFullYear() + lifeExpectancy);
    let dieDateFormat = formatDate(birth);
    let ageRation = (age / lifeExpectancy) * 100;

    return (
        <div className="w-screen h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 text-base sm:text-[12px] md:text-[12px] lg:text-base">
                <img className="w-36 absolute -top-36 transform -translate-x-1/2" src="/images/character.gif" alt="Description of GIF" style={{ left: `${(age / lifeExpectancy) * 100 - 3}%` }} />
                <img className="w-36 absolute -top-36 transform -translate-x-1/2" src="/images/flag.png" alt="Description of GIF" style={{ left: `${(age / lifeExpectancy) * 100 - 1}%` }} />
                <img className="w-36 absolute -top-28 left-full transform -translate-x-1/2" src="/images/ghost.gif" alt="Description of GIF" />
                <progress className="nes-progress is-pattern" value={ageRation} max="100" style={{borderImageRepeat: 'initial' }}></progress>

                <span className="nes-badge absolute top-15 left-0"  style={{ position: 'absolute', width: "15%" }}>
                    <span className="is-success" style={{width: "140%", backgroundColor: "white", color: "black", boxShadow: "0 .5em black,0 -.5em black,.5em 0 black,-.5em 0 black"}}>{storedValue.birth}</span>
                </span>

                <span className="nes-badge absolute top-15 before:content-[''] before:absolute before:-left-5 before:-top-3 before:w-4 before:h-6 before:border-l-black before:border-b-black before:border-l-4 before:border-b-4"  style={{ position: 'absolute', width: "15%", left: `${(age / lifeExpectancy) * 100 + 2}%` }}>
                    <span className="is-success">{age} yrs</span>
                </span>
                <span className="nes-badge absolute top-28 before:content-[''] before:absolute before:-left-5 before:-top-10 before:w-4 before:h-14 before:border-l-black before:border-b-black before:border-l-4 before:border-b-4" style={{ position: 'absolute', width: "15%", left: `${(age / lifeExpectancy) * 100 + 2}%` }}>
                    <span className="is-success" style={{width: "140%"}}>{currDateFormat}</span>
                </span>

                <div className="nes-badge absolute top-15 left-[102%]  before:content-[''] before:absolute before:-left-5 before:-top-3 before:w-4 before:h-6 before:border-l-black before:border-b-black before:border-l-4 before:border-b-4" style={{ position: 'absolute', width: "15%" }}>
                    <span className="is-dark">{lifeExpectancy} yrs</span>
                </div>
                <div className="nes-badge absolute top-28 left-[102%]  before:content-[''] before:absolute before:-left-5 before:-top-10 before:w-4 before:h-14 before:border-l-black before:border-b-black before:border-l-4 before:border-b-4"  style={{ position: 'absolute', width: "15%" }}>
                    <span className="is-dark" style={{width: "140%"}}>{dieDateFormat}</span>
                </div>
            </div>

            <Background style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        </div>
    )
}
