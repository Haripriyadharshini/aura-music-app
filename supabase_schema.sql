-- ================================================
-- AURA MUSIC APP - SUPABASE DATABASE SCHEMA SCRIPT
-- ================================================

-- 1. Create songs table
CREATE TABLE IF NOT EXISTS public.songs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Access Policy
CREATE POLICY "Allow public read access" 
ON public.songs 
FOR SELECT 
USING (true);

-- 4. Create Public Full Access Policy (For Admin Management)
CREATE POLICY "Allow full access for demo" 
ON public.songs 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- ================================================
-- OPTIONAL INITIAL SEED DATA (Provided Cloudinary Audio URLs)
-- ================================================

INSERT INTO public.songs (title, artist, album, cover_url, audio_url)
VALUES 
(
    'Neelothi',
    'Justin Prabhakaran, Vikram Prabhu',
    'Sirai',
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
    'https://res.cloudinary.com/tkicjdgq/video/upload/v1790311777/Sirai_-_Neelothi_Video_Song_Vikram_PrabhuL_K_Akshay_Kumar_Justin_PrabhakaranSuresh_R_7_Screen_-_Seven_Screen_Studio.mp3'
),
(
    'Usure Needhan Pulla',
    'G.V. Prakash Kumar, Soori',
    'Mandaadi',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    'https://res.cloudinary.com/tkicjdgq/video/upload/v1790311695/Usure_Needhan_Pulla_Video_Song_Mandaadi_Soori_Suhas_GV_Prakash_Kumar_Mathimaran_-_RS_Infotainment.mp3'
),
(
    'Pattampoochi',
    'G.V. Prakash Kumar, Suriya',
    'Vishwanath and Sons',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    'https://res.cloudinary.com/tkicjdgq/video/upload/v1790311445/Pattampoochi_Lyric_Video_Vishwanath_and_Suriya_Mamitha_Baiju_G.V._Prakash_Venky_Atluri_-_Aditya_Music_Tamil.mp3'
);
