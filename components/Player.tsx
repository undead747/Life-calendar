import React, { useState } from 'react'

export default function Player() {
    const [url, setUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async () => {
      setError('');
      setAudioUrl('');
      setLoading(true);
    　//TODO
      setLoading(false);
    };
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">YouTube to MP3 Player</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            {loading ? 'Loading...' : 'Get MP3'}
          </button>
        </form>
  
        {error && <p className="text-red-500 text-center">{error}</p>}
  
        {audioUrl && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    );
  };
