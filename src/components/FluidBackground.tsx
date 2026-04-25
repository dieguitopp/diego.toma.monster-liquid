'use client';

import React from 'react';

export default function FluidBackground() {
  return (
    <iframe
      src="/resources/OpenGL/fluid.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: -1,
        pointerEvents: 'auto', // Needs to be auto to receive mouse/touch events
      }}
      title="Fluid Background"
    />
  );
}
