'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter() {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // Using a fresh CountAPI key to start from 0
        const res = await fetch('https://api.countapi.xyz/hit/diego-toma-monster-bio-v1/visits');
        const data = await res.json();
        if (data.value) {
          setViews(data.value);
        } else {
          // Fallback if API returns empty
          const stored = localStorage.getItem('profile_views');
          setViews(stored ? parseInt(stored) : 0);
        }
      } catch (error) {
        // Fallback on error
        const stored = localStorage.getItem('profile_views');
        const current = stored ? parseInt(stored) : 0;
        const next = current + 1;
        localStorage.setItem('profile_views', next.toString());
        setViews(next);
      }
    };

    fetchViews();
  }, []);

  return (
    <div className="animate-fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '0.75rem',
      marginTop: '0.5rem'
    }}>
      <div className="glass-card" style={{ 
        padding: '0.4rem 1.2rem', 
        borderRadius: '100px',
        fontSize: '0.85rem',
        fontWeight: 500,
        opacity: 0.8
      }}>
        Profile Views
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: 600,
        color: 'var(--foreground)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>{views.toLocaleString()}</span>
      </div>
    </div>
  );
}
