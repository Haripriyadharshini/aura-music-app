import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useData } from './DataContext';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { songs } = useData();
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [listeningHistory, setListeningHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('AURA_HISTORY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('AURA_HISTORY', JSON.stringify(listeningHistory));
    } catch (e) {
      console.error('Failed to save listening history:', e);
    }
  }, [listeningHistory]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNextTrack();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, songs, isRepeat, isShuffle]);

  // Handle Play/Pause side-effects
  const playTrack = (song) => {
    if (!song) return;

    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
      return;
    }

    // New song selected
    setCurrentSong(song);
    audioRef.current.src = song.audio_url;
    audioRef.current.volume = isMuted ? 0 : volume;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      // Log to listening history
      setListeningHistory(prev => [
        {
          id: `${song.id}-${Date.now()}`,
          songId: song.id,
          title: song.title,
          artist: song.artist,
          album: song.album,
          cover_url: song.cover_url,
          audio_url: song.audio_url,
          played_at: new Date().toISOString()
        },
        ...prev.slice(0, 49) // Keep last 50 entries
      ]);
    }).catch(err => {
      console.error('Audio playback error:', err);
      setIsPlaying(false);
    });
  };

  const togglePlay = () => {
    if (!currentSong && songs.length > 0) {
      playTrack(songs[0]);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleNextTrack = () => {
    if (!songs || songs.length === 0) return;
    if (isRepeat && currentSong) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playTrack(songs[randomIndex]);
      return;
    }

    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playTrack(songs[nextIndex]);
  };

  const handlePrevTrack = () => {
    if (!songs || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playTrack(songs[prevIndex]);
  };

  const seekTo = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const changeVolume = (val) => {
    const newVol = parseFloat(val);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  };

  const clearHistory = () => {
    setListeningHistory([]);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isRepeat,
        listeningHistory,
        playTrack,
        togglePlay,
        handleNextTrack,
        handlePrevTrack,
        seekTo,
        changeVolume,
        toggleMute,
        setIsShuffle,
        setIsRepeat,
        clearHistory
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
