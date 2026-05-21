import React from 'react';

interface PancaranLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function PancaranLogo({ className = 'h-10', iconOnly = false }: PancaranLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Normalized crisp SVG representation of Pancaran Group logo */}
      <svg
        viewBox="0 0 400 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Rounded rect container */}
        <rect x="10" y="10" width="110" height="110" rx="20" fill="#00A4E4" />
        
        {/* Custom dark blue overlap quadrant */}
        <path
          d="M10 30 C 10 20, 20 10, 30 10 L 120 10 C 120 10, 115 45, 100 70 C 80 105, 55 120, 30 120 C 18 120, 10 112, 10 100 Z"
          fill="#0B2C56"
        />
        
        {/* The smooth overlapping curved sweep white P shape */}
        <path
          d="M 25 105 
             C 45 65, 80 30, 115 30 
             C 120 40, 120 50, 105 65 
             C 90 78, 65 95, 52 112
             C 48 115, 40 115, 35 110 Z"
          fill="#FFFFFF"
        />
        <path
          d="M 15 80
             C 50 60, 90 60, 105 105
             C 95 115, 85 115, 75 100
             C 65 85, 30 85, 15 102 Z"
          fill="#FFFFFF"
        />

        {!iconOnly && (
          <>
            {/* "PANCARAN" text styled closely to the official typeface */}
            <text
              x="140"
              y="65"
              fill="#0B2C56"
              fontFamily="Outfit, Inter, sans-serif"
              fontWeight="800"
              fontSize="48"
              letterSpacing="1"
            >
              PANCARAN
            </text>
            
            {/* "GROUP" text aligned and styled in sky blue */}
            <text
              x="140"
              y="112"
              fill="#00A4E4"
              fontFamily="Outfit, Inter, sans-serif"
              fontWeight="800"
              fontSize="44"
              letterSpacing="2"
            >
              GROUP
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
