import React from "react";

/**
 * Lens Logo for RoleSense
 * Concept: Lens/Magnifying glass with RS - representing deep analysis of talent
 * 
 * Design Philosophy:
 * - Lens represents deep analysis, insight, and "sensing" talent
 * - RS monogram represents the brand identity
 * - Combined: Deep analysis to find the right role fit
 */

// Variation 1: Classic Lens with RS inside
export const LensLogoClassic = ({ size = 40, className = "" }) => {
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
      
      {/* Lens circle - outer ring */}
      <circle cx="22" cy="22" r="14" stroke="#14B8A6" strokeWidth="3" fill="none" />
      
      {/* Lens glass effect - inner gradient */}
      <circle cx="22" cy="22" r="11" fill="#0D9488" opacity="0.2" />
      
      {/* Lens highlight */}
      <ellipse cx="17" cy="17" rx="3" ry="2" fill="#14B8A6" opacity="0.4" />
      
      {/* RS text inside lens */}
      <text 
        x="22" 
        y="26" 
        textAnchor="middle" 
        fill="#F0FDFA" 
        fontSize="12" 
        fontWeight="700" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Lens handle */}
      <line x1="32" y1="32" x2="42" y2="42" stroke="#14B8A6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

// Variation 2: Modern Lens with RS and data lines
export const LensLogoModern = ({ size = 40, className = "" }) => {
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
      
      {/* Outer lens ring */}
      <circle cx="21" cy="21" r="13" stroke="#14B8A6" strokeWidth="2.5" fill="none" />
      
      {/* Inner analysis rings - representing deep scanning */}
      <circle cx="21" cy="21" r="9" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="21" cy="21" r="5" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.3" />
      
      {/* Center fill */}
      <circle cx="21" cy="21" r="8" fill="#0D9488" opacity="0.15" />
      
      {/* RS text */}
      <text 
        x="21" 
        y="25" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="11" 
        fontWeight="800" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Lens handle - sleek */}
      <path d="M31 31 L42 42" stroke="#14B8A6" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="42" cy="42" r="2" fill="#14B8A6" />
    </svg>
  );
};

// Variation 3: Bold Lens - RS prominent
export const LensLogoBold = ({ size = 40, className = "" }) => {
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
      
      {/* Lens body - filled */}
      <circle cx="20" cy="20" r="13" fill="#14B8A6" />
      
      {/* Inner circle - dark for contrast */}
      <circle cx="20" cy="20" r="10" fill="#0F172A" />
      
      {/* RS text - large and bold */}
      <text 
        x="20" 
        y="25" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="13" 
        fontWeight="900" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Lens handle */}
      <path d="M30 30 L41 41" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

// Variation 4: Elegant Lens - thin strokes
export const LensLogoElegant = ({ size = 40, className = "" }) => {
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
      
      {/* Outer lens - elegant thin stroke */}
      <circle cx="20" cy="20" r="12" stroke="#14B8A6" strokeWidth="1.5" fill="none" />
      
      {/* Lens glass - subtle fill */}
      <circle cx="20" cy="20" r="10" fill="#14B8A6" opacity="0.1" />
      
      {/* Lens reflection arc */}
      <path d="M12 14 Q14 10 20 10" stroke="#14B8A6" strokeWidth="1" fill="none" opacity="0.5" />
      
      {/* RS - stylized */}
      <text 
        x="20" 
        y="24" 
        textAnchor="middle" 
        fill="#F0FDFA" 
        fontSize="10" 
        fontWeight="600" 
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        RS
      </text>
      
      {/* Handle - elegant angled */}
      <line x1="29" y1="29" x2="40" y2="40" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Handle grip detail */}
      <line x1="38" y1="38" x2="42" y2="42" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

// Variation 5: Target Lens - crosshair style
export const LensLogoTarget = ({ size = 40, className = "" }) => {
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
      
      {/* Outer lens */}
      <circle cx="20" cy="20" r="13" stroke="#14B8A6" strokeWidth="2" fill="none" />
      
      {/* Target crosshairs */}
      <line x1="20" y1="8" x2="20" y2="14" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="20" x2="14" y2="20" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="20" x2="32" y2="20" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Center RS */}
      <circle cx="20" cy="20" r="7" fill="#0D9488" opacity="0.2" />
      <text 
        x="20" 
        y="24" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="9" 
        fontWeight="800" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Handle */}
      <path d="M30 30 L40 40" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// Variation 6: Focus Lens - aperture style
export const LensLogoFocus = ({ size = 40, className = "" }) => {
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
      
      {/* Aperture blades effect */}
      <g opacity="0.3">
        <path d="M20 7 L24 15 L16 15 Z" fill="#14B8A6" />
        <path d="M33 20 L25 24 L25 16 Z" fill="#14B8A6" />
        <path d="M20 33 L16 25 L24 25 Z" fill="#14B8A6" />
        <path d="M7 20 L15 16 L15 24 Z" fill="#14B8A6" />
      </g>
      
      {/* Outer lens ring */}
      <circle cx="20" cy="20" r="13" stroke="#14B8A6" strokeWidth="2" fill="none" />
      
      {/* Inner aperture rings */}
      <circle cx="20" cy="20" r="9" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.4" />
      
      {/* Center */}
      <circle cx="20" cy="20" r="6" fill="#14B8A6" />
      <text 
        x="20" 
        y="24" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="8" 
        fontWeight="900" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Handle */}
      <line x1="30" y1="30" x2="41" y2="41" stroke="#14B8A6" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

// Variation 7: Minimal Lens - ultra clean
export const LensLogoMinimal = ({ size = 40, className = "" }) => {
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
      
      {/* Simple lens outline */}
      <circle cx="20" cy="20" r="11" stroke="#14B8A6" strokeWidth="2.5" fill="none" />
      
      {/* RS - clean typography */}
      <text 
        x="20" 
        y="24" 
        textAnchor="middle" 
        fill="#14B8A6" 
        fontSize="10" 
        fontWeight="700" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Minimal handle */}
      <line x1="28" y1="28" x2="40" y2="40" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

// Variation 8: Insight Lens - with scan lines
export const LensLogoInsight = ({ size = 40, className = "" }) => {
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
      
      {/* Lens outer */}
      <circle cx="20" cy="20" r="13" stroke="#14B8A6" strokeWidth="2" fill="none" />
      
      {/* Scan lines - horizontal */}
      <g stroke="#0D9488" strokeWidth="0.75" opacity="0.4">
        <line x1="9" y1="14" x2="31" y2="14" />
        <line x1="9" y1="18" x2="31" y2="18" />
        <line x1="9" y1="22" x2="31" y2="22" />
        <line x1="9" y1="26" x2="31" y2="26" />
      </g>
      
      {/* Center highlight */}
      <circle cx="20" cy="20" r="6" fill="#14B8A6" opacity="0.2" />
      
      {/* RS */}
      <text 
        x="20" 
        y="24" 
        textAnchor="middle" 
        fill="#F0FDFA" 
        fontSize="10" 
        fontWeight="700" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
      
      {/* Handle with detail */}
      <line x1="30" y1="30" x2="41" y2="41" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="41" r="2.5" fill="#0D9488" />
    </svg>
  );
};

// Default export - the most balanced option
export const LensLogo = LensLogoModern;

export default LensLogo;
