import React, { useState, useEffect } from 'react';

interface Track {
    id: number;
    track: string;
  }
  
  const TrackDropdown = ({ onSelectTrack }: { onSelectTrack: (selectedTrack: string) => void }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://hng6-r5y3.onrender.com/api/tracks', {
          headers: {
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setTracks(data.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div>
      <label>Track *</label>
      <select
        value={selectedTrack}
        onChange={(e) => {
          setSelectedTrack(e.target.value);
          onSelectTrack(e.target.value);
        }}
      >
        <option value="">Select a track</option>
        {tracks.map((track) => (
          <option key={track.id} value={track.track}>
            {track.track}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackDropdown;
