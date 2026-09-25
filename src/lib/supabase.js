import { createClient } from '@supabase/supabase-js';

// Read environment variables or custom local storage credentials
const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('AURA_SUPABASE_URL') : null;
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('AURA_SUPABASE_KEY') : null;

export const SUPABASE_URL = storedUrl || import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = storedKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http'));
};

export const getSupabaseClient = (customUrl, customKey) => {
  const url = customUrl || SUPABASE_URL;
  const key = customKey || SUPABASE_ANON_KEY;
  
  if (url && key && url.startsWith('http')) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return null;
};

export const supabase = getSupabaseClient();
