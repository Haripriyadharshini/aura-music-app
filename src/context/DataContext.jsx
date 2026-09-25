import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getSupabaseClient } from '../lib/supabase';
import { DEFAULT_SONGS } from '../lib/defaultSongs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [songs, setSongs] = useState(DEFAULT_SONGS);
  const [loading, setLoading] = useState(true);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('AURA_FAVORITES');
      return saved ? JSON.parse(saved) : ['demo-song-1'];
    } catch {
      return ['demo-song-1'];
    }
  });

  // Fetch all songs from Supabase or fallback
  const fetchSongs = async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setSongs(data);
          setIsUsingSupabase(true);
        } else {
          // Table exists but empty, initialize with defaults
          setSongs(DEFAULT_SONGS);
          setIsUsingSupabase(true);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local default dataset:', err.message);
        setSongs(DEFAULT_SONGS);
        setIsUsingSupabase(false);
      }
    } else {
      setSongs(DEFAULT_SONGS);
      setIsUsingSupabase(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Save favorites to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem('AURA_FAVORITES', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to persist favorites:', e);
    }
  }, [favorites]);

  const toggleFavorite = (songId) => {
    setFavorites(prev => 
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  // Add Song
  const addSong = async (songData) => {
    const newSongObj = {
      ...songData,
      id: isSupabaseConfigured() ? undefined : `custom-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('songs')
          .insert([songData])
          .select();

        if (error) throw error;
        if (data && data[0]) {
          setSongs(prev => [data[0], ...prev]);
          return { success: true, song: data[0] };
        }
      } catch (err) {
        console.error('Supabase Add Error:', err);
        // Fallback local addition if database fails
        const fallback = { ...newSongObj, id: `local-${Date.now()}` };
        setSongs(prev => [fallback, ...prev]);
        return { success: true, song: fallback, warn: err.message };
      }
    }

    setSongs(prev => [newSongObj, ...prev]);
    return { success: true, song: newSongObj };
  };

  // Edit Song
  const editSong = async (id, updatedData) => {
    if (isSupabaseConfigured() && !id.toString().startsWith('demo-') && !id.toString().startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('songs')
          .update(updatedData)
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.error('Supabase Edit Error:', err);
      }
    }

    setSongs(prev => prev.map(s => (s.id === id ? { ...s, ...updatedData } : s)));
    return { success: true };
  };

  // Delete Song
  const deleteSong = async (id) => {
    if (isSupabaseConfigured() && !id.toString().startsWith('demo-') && !id.toString().startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('songs')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (err) {
        console.error('Supabase Delete Error:', err);
      }
    }

    setSongs(prev => prev.filter(s => s.id !== id));
    return { success: true };
  };

  return (
    <DataContext.Provider
      value={{
        songs,
        loading,
        isUsingSupabase,
        favorites,
        toggleFavorite,
        addSong,
        editSong,
        deleteSong,
        refetchSongs: fetchSongs
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
