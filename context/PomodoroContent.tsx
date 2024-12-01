'use client'
import { VIDEO_NAMES } from "@/lib/const";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export interface SelectedVideo {
    video: string | null;
    thumbnail: string | null;
    audio: string | null;
}

export type PomodoroContextType = {
    selectedVideo: SelectedVideo | null;
    toggleSelectVideo: (value: SelectedVideo) => void;
    isPopupVisible: boolean;
    setIsPopupVisible: (value: any) => void;
    isVideoListVisible: boolean;
    setIsVideoListVisible: (value: any) => void;
    isAudioPlaying: boolean;
    togglePlayPause: (value: any) => void;
    isPLayerPopupVisible: boolean;
    setIsPLayerPopupVisible: (value: any) => void;
};

const defaultContextValue: PomodoroContextType = {
    selectedVideo: null,
    toggleSelectVideo: () => null,
    isPopupVisible: false,
    setIsPopupVisible: () => null,
    isVideoListVisible: false,
    setIsVideoListVisible: () => null,
    isAudioPlaying: false,
    togglePlayPause: () => null,
    isPLayerPopupVisible: false,
    setIsPLayerPopupVisible: () => null
};

// Create a context with a default value
const PomodoroContext = createContext<PomodoroContextType>(defaultContextValue);

interface PomodoroProviderProps {
    children: ReactNode;
}

export const PomodoroProvider: React.FC<PomodoroProviderProps> = ({ children }) => {
    const [selectedVideo, setSelectedVideo] = useState<SelectedVideo | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [isVideoListVisible, setIsVideoListVisible] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPLayerPopupVisible, setIsPLayerPopupVisible] = useState<boolean>(false);

    useEffect(function () {
        const firstKey = Object.keys(VIDEO_NAMES)[0] as keyof typeof VIDEO_NAMES;
        setSelectedVideo({ video: VIDEO_NAMES[firstKey].video, thumbnail: VIDEO_NAMES[firstKey].thumbnail, audio: VIDEO_NAMES[firstKey].audio });

        const audio = VIDEO_NAMES[firstKey].audio;
        if (audio) {
            const sound = new Audio(audio);
            audioRef.current = sound;
            sound.loop = true;

            return () => {
                sound.pause();
                audioRef.current = null;
            };
        }
    }, [])

    const togglePlayPause = async () => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.pause();
                setIsAudioPlaying(false);
            } else {
                try {
                    await audioRef.current.play();
                    setIsAudioPlaying(true);
                } catch (error) {
                    console.warn("Audio playback failed:", error);
                }
            }
        }
    };

    const toggleSelectVideo = async function (video: SelectedVideo) {
        setSelectedVideo({ video: video.video, thumbnail: video.thumbnail, audio: video.audio });
        setIsVideoListVisible(false);

        if (video.audio && audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;

            const sound = new Audio(video.audio);
            audioRef.current = sound;
            sound.loop = true;

            try {
                await audioRef.current.play();
                setIsAudioPlaying(true);
            } catch (error) {
                console.warn("Audio playback failed:", error);
            }
        }
    }

    const returnValue = {
        selectedVideo,
        toggleSelectVideo,
        isPopupVisible,
        setIsPopupVisible,
        isVideoListVisible,
        setIsVideoListVisible,
        isAudioPlaying,
        setIsAudioPlaying,
        togglePlayPause,
        isPLayerPopupVisible,
        setIsPLayerPopupVisible
    };

    return (
        <PomodoroContext.Provider value={returnValue}>
            {children}
        </PomodoroContext.Provider>
    );
};

// Custom hook for consuming the context
export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);
    if (!context) {
        throw new Error("usePomodoroContext must be used within a PomodoroProvider");
    }
    return context;
};
