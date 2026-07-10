'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333941',
          color: '#e9ebee',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.12)',
          fontSize: '14.5px',
        },
        success: {
          iconTheme: {
            primary: '#e2761c',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
