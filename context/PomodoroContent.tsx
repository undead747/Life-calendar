'use client'
import { VIDEO_NAMES } from "@/lib/const";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface SelectedVideo {
    video: string | null;
    thumbnail: string | null;
}

export type PomodoroContextType = {
    selectedVideo: SelectedVideo | null;
    setSelectedVideo: (value: SelectedVideo | null) => void;
    isPopupVisible: boolean;
    setIsPopupVisible: (value: any) => void;
    isVideoListVisible: boolean;
    setIsVideoListVisible: (value: any) => void;
};

const defaultContextValue: PomodoroContextType = {
  selectedVideo: null,
  setSelectedVideo: () => null,
  isPopupVisible: false,
  setIsPopupVisible: () => null,
  isVideoListVisible: false,
  setIsVideoListVisible: () => null,
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

    useEffect(function(){
        const firstKey = Object.keys(VIDEO_NAMES)[0] as keyof typeof VIDEO_NAMES;
        setSelectedVideo({ video: VIDEO_NAMES[firstKey].video, thumbnail: VIDEO_NAMES[firstKey].thumbnail });
    },[])

    const returnValue = {
        selectedVideo,
        setSelectedVideo,
        isPopupVisible,
        setIsPopupVisible,
        isVideoListVisible,
        setIsVideoListVisible
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
