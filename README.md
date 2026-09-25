# AURA - Dynamic Luxury Music Streaming Web App

A Spotify-inspired luxury music streaming web application built with **React, CSS (Glassmorphism design system), Supabase client, and Cloudinary media streams**.

## Features

- **Dark Luxury Glassmorphic Design**: Charcoal background (`#07090e`), electric cyan accents (`#00f2fe`), glass panel blur, and ReactBits ambient gradient mesh backdrop.
- **Dynamic Backend**: Connected directly to Supabase (`songs` table) with automatic offline demo dataset fallback.
- **Audio Engine**: Plays audio directly from Cloudinary MP3 streams with full controls (play/pause, seek, volume, next/prev, shuffle, repeat, mute).
- **6 Dynamic Pages**:
  1. **Home**: Hero animated carousel, Quick Mix grid, track recommendations.
  2. **Search**: Live instant filter by Title, Artist, or Album.
  3. **Library**: Saved user Liked Songs collection.
  4. **Listening History**: Timestamped audio play event log with one-click replay.
  5. **Profile**: Listener VIP statistics dashboard and top artists breakdown.
  6. **Admin**: Full song CRUD interface to Add, Edit, Delete, and View tracks with live database sync.

## Supabase Database Setup

The complete SQL schema and initial seed data is saved in [`supabase_schema.sql`](file:///d:/placement/supabase_schema.sql).

### Steps to setup Supabase:
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor**.
3. Copy the contents of [`supabase_schema.sql`](file:///d:/placement/supabase_schema.sql) and run it.
4. Copy your **Project URL** and **Anon Key** into `.env` or click **Configure Supabase URL & Keys** in the app navbar.

## Running Locally

```bash
npm install
npm run dev
```
