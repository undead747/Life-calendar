'use client'

import {usePomodoroContext } from "@/context/PomodoroContent";
import { VIDEO_NAMES } from "@/lib/const";
import { useRef } from "react";

const VideoList = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { toggleSelectVideo } = usePomodoroContext();

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-full">
            {/* Scroll Buttons */}
            <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 z-[1] transform -translate-y-1/2 bg-gray-800 text-white w-9 h-10 flex justify-center items-center rounded-md shadow-md hover:bg-gray-700 focus:outline-none hover:outline-none"
            >
                &lt;
            </button>
            <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 z-[1] transform -translate-y-1/2 bg-gray-800 text-white w-9 h-10 flex justify-center items-center rounded-md shadow-md hover:bg-gray-700 focus:outline-none hover:outline-none"
            >
                &gt;
            </button>

            {/* Video List */}
            <div
                ref={scrollRef}
                className="flex space-x-4 w-screen h-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ps-4 pe-4 pt-2 pb-2 bg-black bg-opacity-65"
            >
                {Object.keys(VIDEO_NAMES).map((key) => {
                    const video = VIDEO_NAMES[key as keyof typeof VIDEO_NAMES];
                    return (
                        <div key={key} className="flex-shrink-0" onClick={() => toggleSelectVideo(video)}>
                            <div className="relative h-full">
                                <img
                                    src={video.thumbnail}
                                    alt={`Thumbnail for ${key}`}
                                    className="w-48 h-full object-cover rounded-md shadow-md"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VideoList;
