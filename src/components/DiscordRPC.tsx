'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LanyardData {
  data: {
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Array<{
      name: string;
      details?: string;
      state?: string;
      assets?: {
        large_image?: string;
        large_text?: string;
      };
    }>;
    discord_user: {
      username: string;
      discriminator: string;
      avatar: string;
    };
  };
}

export default function DiscordRPC() {
  const [status, setStatus] = useState<LanyardData | null>(null);
  const userId = '1439796873467793429';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  const { discord_status, activities, discord_user } = status.data;
  
  const statusColors = {
    online: '#23a55a',
    idle: '#f0b232',
    dnd: '#f23f43',
    offline: '#80848e',
  };

  const currentActivity = activities.find(a => a.name !== 'Custom Status');

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', width: '100%', maxWidth: '400px', display: 'flex', gap: '1rem', alignItems: 'center', pointerEvents: 'auto' }}>
      <div style={{ position: 'relative' }}>
        <Image
          src={`https://cdn.discordapp.com/avatars/${userId}/${discord_user.avatar}.png`}
          alt={discord_user.username}
          width={64}
          height={64}
          style={{ borderRadius: '50%' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          backgroundColor: statusColors[discord_status],
          borderRadius: '50%',
          border: '3px solid #f8f9fa'
        }} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{discord_user.username}</span>
        <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>
          {currentActivity ? `Playing ${currentActivity.name}` : discord_status.charAt(0).toUpperCase() + discord_status.slice(1)}
        </span>
        {currentActivity?.details && (
          <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', opacity: 0.8 }}>
            {currentActivity.details}
          </span>
        )}
      </div>
    </div>
  );
}
