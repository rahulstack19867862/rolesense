import React from "react";

/**
 * RS Circle Logo for RoleSense
 * Clean, minimal design with RS in monospace font inside a circle
 * Updated with purple accent to match hero page
 */

// Main RS Circle Logo - Purple accent to match hero
export const RSCircleLogo = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background - Dark slate */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Gradient circle - Purple accent matching hero */}
      <defs>
        <linearGradient id="logoGradient" x1="8" y1="8" x2="40" y2="40">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="16" fill="url(#logoGradient)" />
      
      {/* RS Text - Monospace style */}
      <text 
        x="24" 
        y="29" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="14" 
        fontWeight="700" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Outlined circle
export const RSCircleOutline = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Circle outline */}
      <circle cx="24" cy="24" r="15" stroke="#14B8A6" strokeWidth="2.5" fill="none" />
      
      {/* RS Text - Monospace */}
      <text 
        x="24" 
        y="29" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="13" 
        fontWeight="700" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Filled with dark text
export const RSCircleBold = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Circle - filled teal */}
      <circle cx="24" cy="24" r="17" fill="#14B8A6" />
      
      {/* RS Text - Bold monospace */}
      <text 
        x="24" 
        y="30" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="16" 
        fontWeight="800" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-1"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Light/minimal style
export const RSCircleLight = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Circle - subtle fill */}
      <circle cx="24" cy="24" r="15" fill="#14B8A6" opacity="0.15" />
      <circle cx="24" cy="24" r="15" stroke="#14B8A6" strokeWidth="1.5" fill="none" />
      
      {/* RS Text */}
      <text 
        x="24" 
        y="29" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="13" 
        fontWeight="600" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Double ring
export const RSCircleDouble = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Outer ring */}
      <circle cx="24" cy="24" r="17" stroke="#14B8A6" strokeWidth="1.5" fill="none" opacity="0.5" />
      
      {/* Inner circle - filled */}
      <circle cx="24" cy="24" r="13" fill="#14B8A6" />
      
      {/* RS Text */}
      <text 
        x="24" 
        y="29" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="12" 
        fontWeight="700" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Gradient circle
export const RSCircleGradient = ({ size = 40, className = "" }) => {
  const gradientId = `rsGradient-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Circle with gradient */}
      <circle cx="24" cy="24" r="16" fill={`url(#${gradientId})`} />
      
      {/* RS Text */}
      <text 
        x="24" 
        y="29" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="14" 
        fontWeight="700" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Clean square background
export const RSCircleClean = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background - rounded */}
      <rect width="48" height="48" rx="10" fill="#0F172A" />
      
      {/* Circle */}
      <circle cx="24" cy="24" r="14" fill="#14B8A6" />
      
      {/* RS Text - Clean monospace */}
      <text 
        x="24" 
        y="28.5" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="13" 
        fontWeight="700" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="-0.5"
      >
        RS
      </text>
    </svg>
  );
};

// Variation: Thin elegant
export const RSCircleThin = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Thin circle */}
      <circle cx="24" cy="24" r="15" stroke="#14B8A6" strokeWidth="1" fill="none" />
      
      {/* RS Text - lighter weight */}
      <text 
        x="24" 
        y="28" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="12" 
        fontWeight="500" 
        fontFamily="'SF Mono', 'Fira Code', 'Roboto Mono', 'Consolas', monospace"
        letterSpacing="0"
      >
        RS
      </text>
    </svg>
  );
};

// Default export
export const RSLogo = RSCircleLogo;
export default RSLogo;
