// components/AudioPlayer.tsx
import { faBackwardStep, faForwardStep, faPause, faPlay, faTrashAlt, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';

interface YoutubeData {
  title: string | null,
  author: string | null,
  thumbnail: string | null,
  duration: Duration | null,
}

interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Track {
  title: string | null,
  author: string | null,
  thumbnail: string | null,
  url: string | null,
  id: number,
  duration: Duration | null
}

const getYoutubeTitle = async (url: string, apiKey: string): Promise<YoutubeData | null> => {
  try {
    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return null;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
    );
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const { snippet, contentDetails } = data.items[0];
      const isoDuration = contentDetails.duration;

      return {
        title: snippet.title,
        author: snippet.channelTitle,
        thumbnail: snippet.thumbnails.default.url,
        duration: parseISODuration(isoDuration),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching YouTube title:', error);
    return null;
  }
};

const parseISODuration = (isoDuration: string) => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) return { hours: 0, minutes: 0, seconds: 0 };

  const hours = parseInt(matches[1] || '0', 10);
  const minutes = parseInt(matches[2] || '0', 10);
  const seconds = parseInt(matches[3] || '0', 10);

  return { hours, minutes, seconds };
};

function cleanYouTubeUrl(url: string) {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get('v');

  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return url;
}

const Player = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const maxTrackId = useRef<number>(0);

  const addToQueue = async (url: string) => {
    url = cleanYouTubeUrl(url);
    const data = await getYoutubeTitle(url, 'AIzaSyCl--8u1rSWP_BSn8QXjilA8Q5yvlljSrk');
    const newTrack: Track = {
      title: data?.title || null,
      author: data?.author || null,
      thumbnail: data?.thumbnail || null,
      url: url,
      id: maxTrackId.current,
      duration: data?.duration || null
    };

    setQueue((prevQueue) => [...prevQueue, newTrack]);
    maxTrackId.current = maxTrackId.current + 1;
  };

  const playNextTrack = () => {
    if (currentTrack === null) return;

    let currIdx = queue.findIndex(item => item.id === currentTrack.id);
    if (currIdx === (queue.length - 1)) currIdx = 0;
    else currIdx = currIdx + 1;

    const nextTrack = queue[currIdx];
    setCurrentTrack(nextTrack);
    setPlaying(true);
  };

  const playPrevTrack = () => {
    if (currentTrack === null) return;

    let currIdx = queue.findIndex(item => item.id === currentTrack.id);
    if (currIdx === 0) currIdx = queue.length - 1;
    else currIdx = currIdx - 1;

    const prevTrack = queue[currIdx];
    setCurrentTrack(prevTrack);
    setPlaying(true);
  };

  const togglePlay = (idx: number | null) => {
    let currIdx = 0;
    if (idx === null && playing) {
      setPlaying(false);
      return;
    }

    if (idx === null && !playing && currentTrack !== null) {
      setPlaying(true);
      return;
    }

    if (idx !== null) currIdx = idx;
    const nextTrack = queue[currIdx];
    setCurrentTrack(nextTrack);
    setPlaying(true);
  }

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const formatTime = (duration: { hours: number; minutes: number; seconds: number }) => {
    const { hours, minutes, seconds } = duration;
    const timeParts = [hours > 0 ? hours : null, minutes, seconds]
      .filter((part) => part !== null)
      .map((part) => String(part).padStart(2, '0'));
    return timeParts.join(':');
  };

  const formatDuration = (duration: Duration): string => {
    const { hours, minutes, seconds } = duration;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    if (hours > 0) {
      const formattedHours = String(hours).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const removeTrack = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation(); // Prevent parent event triggers
  
    setQueue((prevQueue) => {
      const updatedQueue = prevQueue.filter((track) => track.id !== id);
  
      if (currentTrack?.id === id) {
        if (updatedQueue.length > 0) {
          const currentIndex = prevQueue.findIndex((track) => track.id === id);
          const nextIndex = (currentIndex + 1) % updatedQueue.length;
          setCurrentTrack(updatedQueue[nextIndex]);
        } else {
          setCurrentTrack(null);
          setCurrentTime(0);
          setPlaying(false);
        }
      }
  
      return updatedQueue;
    });
  };
  

  return (
    <div className='w-[42vw]'>
      <h1 className="text-xl font-bold mb-8">Music Player</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        className="w-full border border-gray-300 text-black rounded p-2 mb-12"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const input = e.target as HTMLInputElement;
            addToQueue(input.value);
            input.value = '';
          }
        }}
      />

      <div>
        <div className='flex mb-4'>
          <p className="text-sm font-semibold mb-0 truncate">{currentTrack?.title}</p>
        </div>

        <div className="relative w-full h-2 bg-gray-400 rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mb-4 text-gray-400">
          <span>{formatTime({ hours: 0, minutes: Math.floor(currentTime / 60), seconds: Math.floor(currentTime % 60) })}</span>
          <span>{currentTrack?.duration ? formatTime(currentTrack.duration) : '00:00'}</span>
        </div>
        <div className='flex justify-between items-center mb-12'>
          <div className='flex justify-center items-center'>
            <button
              onClick={() => playPrevTrack()}
              className="mr-[30px] text-white w-10 h-10 flex justify-center items-center rounded-full shadow-md focus:outline-none hover:outline-none"
            >
              <FontAwesomeIcon
                icon={faBackwardStep}
                size='2x'
              />
            </button>
            <button
              onClick={() => togglePlay(null)}
              className="mr-[30px] bg-gray-800 text-white w-16 h-16 flex justify-center items-center rounded-full shadow-md focus:outline-none hover:outline-none"
            >
              {
                playing ? <FontAwesomeIcon
                  icon={faPause}
                  size='2x'
                />
                  : <FontAwesomeIcon
                    icon={faPlay}
                    size='2x'
                  />
              }
            </button>
            <button
              onClick={() => playNextTrack()}
              className=" text-white w-10 h-10 flex justify-center items-center rounded-full shadow-md focus:outline-none hover:outline-none"
            >
              <FontAwesomeIcon
                icon={faForwardStep}
                size='2x'
              />
            </button>
          </div>
          <div className="flex w-[25%] justify-center items-center">
            <FontAwesomeIcon icon={faVolumeUp} className="mr-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-red rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className='h-[25vh] overflow-y-auto mb-0 rounded-sm'>
          <p className='text-[12px] mb-4'>Playlist: </p>
          <ul className="list-disc bg-[#1e1b1b] mb-0" style={{ height: 'calc(100% - 35px)' }}>
            {queue.map((track, index) => (
              <li key={index} onClick={() => togglePlay(index)} className={`flex items-center ${track.id === currentTrack?.id ? 'bg-neutral-800' : 'bg-[#1e1b1b]'} border-b-[1px] border-b-[rgba(255,255,255,0.1)]`}>
                <Image className='m-2 mr-4 w-[40px] h-[40px] rounded-sm' src={track.thumbnail || ''} alt="Character GIF" width={50} height={50} />
                <div className='flex flex-col mr-8' style={{ width: 'calc(100% - 240px)' }}>
                  <span className="text-[12px] text-gray-200 truncate">{track.title}</span>
                  <span className="text-[12px] text-gray-400 truncate mt-1">{track.author}</span>
                </div>
                <span className='ml-auto mr-2 text-[12px] text-gray-400'>
                  {track.duration ? formatDuration(track.duration) : '00:00'}
                </span>
                <span className='ml-auto mr-2 text-[12px] text-gray-400'>
                  <button
                    onClick={(e) => removeTrack(e, track.id)}
                    className=" text-gray-100 w-10 h-10 flex justify-center items-center rounded-full shadow-md focus:outline-none hover:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size='2x'
                    />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {currentTrack && currentTrack.url && (
          <ReactPlayer
            url={currentTrack.url}
            playing={playing}
            onEnded={playNextTrack}
            onProgress={handleProgress}
            width="0"
            height="0"
            style={{ display: 'none' }}
            config={{
              file: {
                forceAudio: true,
              },
            }}
            volume={volume}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
