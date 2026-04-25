'use client';

import React, { useEffect } from 'react';

export default function FluidBackground() {
  useEffect(() => {
    // Check if script already exists to prevent duplicate loading on hot reloads
    if (!document.getElementById('fluid-script')) {
      const script = document.createElement('script');
      script.id = 'fluid-script';
      script.src = '/resources/OpenGL/webgl-fluid.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // In production you might want to clean this up, but for hot reload it's
      // safer to leave it or properly clean up the WebGL context.
    };
  }, []);

  return (
    <canvas
      id="fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'auto', // Auto so the fluid can receive mouse movements
        filter: 'invert(1)' // Invert so it turns black on white!
      }}
    />
  );
}
