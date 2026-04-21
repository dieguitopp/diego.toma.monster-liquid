import React from 'react';

interface SocialLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export default function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass-card animate-fade-in"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        width: '100%',
        maxWidth: '400px',
        fontSize: '0.95rem',
        fontWeight: 500,
        letterSpacing: '0.5px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
        <path d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    </a>
  );
}
