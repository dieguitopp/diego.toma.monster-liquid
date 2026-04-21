'use client';

import { useState } from 'react';

const tracks = [
  { id: '7xLD5nQoztdL0RPRA2XezN', name: 'Track 1' },
  { id: '3ZZq9396zv8pcn5GYVhxUi', name: 'Track 2' },
  { id: '1sTzDqhcrpB2BC8TOMeInR', name: 'Track 3' },
  { id: '4u307txePIagFC4K67AdBA', name: 'Track 4' },
  { id: '7v9Q0dAb9t7h8gJOkcJHay', name: 'Track 5' },
];

export default function SpotifyPlayer() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0].id);

  return (
    <div className="glass-card animate-fade-in" style={{ 
      width: '100%', 
      maxWidth: '400px', 
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase' }}>
        Favorite Tracks
      </div>
      
      <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.05)' }}>
        <iframe 
          src={`https://open.spotify.com/embed/track/${currentTrack}?utm_source=generator&theme=0`} 
          width="100%" 
          height="80" 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          style={{ display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => setCurrentTrack(track.id)}
            style={{
              padding: '0.4rem 0.65rem',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              background: currentTrack === track.id ? 'rgba(0,0,0,0.05)' : 'transparent',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: 'var(--foreground)',
              opacity: currentTrack === track.id ? 1 : 0.6
            }}
          >
            Track {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
