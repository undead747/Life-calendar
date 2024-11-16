export const STORAGE_KEY = "USERINFO";
export const WEATHER_STORAGE_KEY = "WEATHER_STORAGE";
export const WEATHER_KEY = "d2ae86fd2e26a1f67f5c3e70e474dd80"; 
export const VIDEO_NAMEs = {
};

export interface Country {
    cca2: string;
    name: {
      common: string;
    };
}

export interface Weather{
    name: string;
    main: {
        temp: number
    };
    weather: {description: string; icon: string, main: string }[];   
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    dt: number;
}