import React from "react";

/**
 * Network Analytics Logo for RoleSense
 * Concept 5: Connected nodes representing talent network mapping and deep analysis
 * 
 * Design Philosophy:
 * - Central node represents the "core intelligence"
 * - Surrounding nodes represent talent/candidates/data points
 * - Connecting lines represent deep analysis and relationships
 * - Teal/Blue color scheme represents trust, technology, and intelligence
 */

// Main Network Logo Component - SVG Based
export const NetworkLogo = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Connection lines - representing deep analysis */}
      <g stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        {/* Center to outer nodes */}
        <line x1="24" y1="24" x2="24" y2="10" />
        <line x1="24" y1="24" x2="36" y2="17" />
        <line x1="24" y1="24" x2="36" y2="31" />
        <line x1="24" y1="24" x2="24" y2="38" />
        <line x1="24" y1="24" x2="12" y2="31" />
        <line x1="24" y1="24" x2="12" y2="17" />
        
        {/* Outer node connections - network effect */}
        <line x1="24" y1="10" x2="36" y2="17" opacity="0.3" />
        <line x1="36" y1="17" x2="36" y2="31" opacity="0.3" />
        <line x1="36" y1="31" x2="24" y2="38" opacity="0.3" />
        <line x1="24" y1="38" x2="12" y2="31" opacity="0.3" />
        <line x1="12" y1="31" x2="12" y2="17" opacity="0.3" />
        <line x1="12" y1="17" x2="24" y2="10" opacity="0.3" />
      </g>
      
      {/* Outer nodes - representing talent/data points */}
      <circle cx="24" cy="10" r="3.5" fill="#14B8A6" />
      <circle cx="36" cy="17" r="3" fill="#0D9488" />
      <circle cx="36" cy="31" r="3" fill="#0D9488" />
      <circle cx="24" cy="38" r="3.5" fill="#14B8A6" />
      <circle cx="12" cy="31" r="3" fill="#0D9488" />
      <circle cx="12" cy="17" r="3" fill="#0D9488" />
      
      {/* Center node - core intelligence with glow effect */}
      <circle cx="24" cy="24" r="8" fill="#0D9488" opacity="0.3" />
      <circle cx="24" cy="24" r="6" fill="#14B8A6" />
      <circle cx="24" cy="24" r="3" fill="#F0FDFA" />
    </svg>
  );
};

// Animated version with subtle pulse
export const NetworkLogoAnimated = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes nodePulse {
            0%, 100% { r: 3; }
            50% { r: 3.5; }
          }
          .connection-line {
            animation: pulse 2s ease-in-out infinite;
          }
          .outer-node {
            animation: nodePulse 2s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Background rounded square */}
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      
      {/* Connection lines */}
      <g stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" className="connection-line">
        <line x1="24" y1="24" x2="24" y2="10" />
        <line x1="24" y1="24" x2="36" y2="17" style={{ animationDelay: '0.2s' }} />
        <line x1="24" y1="24" x2="36" y2="31" style={{ animationDelay: '0.4s' }} />
        <line x1="24" y1="24" x2="24" y2="38" style={{ animationDelay: '0.6s' }} />
        <line x1="24" y1="24" x2="12" y2="31" style={{ animationDelay: '0.8s' }} />
        <line x1="24" y1="24" x2="12" y2="17" style={{ animationDelay: '1s' }} />
      </g>
      
      {/* Outer network connections */}
      <g stroke="#0D9488" strokeWidth="1" strokeLinecap="round" opacity="0.2">
        <line x1="24" y1="10" x2="36" y2="17" />
        <line x1="36" y1="17" x2="36" y2="31" />
        <line x1="36" y1="31" x2="24" y2="38" />
        <line x1="24" y1="38" x2="12" y2="31" />
        <line x1="12" y1="31" x2="12" y2="17" />
        <line x1="12" y1="17" x2="24" y2="10" />
      </g>
      
      {/* Outer nodes */}
      <circle cx="24" cy="10" r="3.5" fill="#14B8A6" />
      <circle cx="36" cy="17" r="3" fill="#0D9488" className="outer-node" />
      <circle cx="36" cy="31" r="3" fill="#0D9488" className="outer-node" style={{ animationDelay: '0.3s' }} />
      <circle cx="24" cy="38" r="3.5" fill="#14B8A6" />
      <circle cx="12" cy="31" r="3" fill="#0D9488" className="outer-node" style={{ animationDelay: '0.6s' }} />
      <circle cx="12" cy="17" r="3" fill="#0D9488" className="outer-node" style={{ animationDelay: '0.9s' }} />
      
      {/* Center node with glow */}
      <circle cx="24" cy="24" r="8" fill="#0D9488" opacity="0.3" />
      <circle cx="24" cy="24" r="6" fill="#14B8A6" />
      <circle cx="24" cy="24" r="3" fill="#F0FDFA" />
    </svg>
  );
};

// Alternative: More abstract network with hexagon center (representing structured analysis)
export const NetworkLogoHex = ({ size = 40, className = "" }) => {
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
      
      {/* Network connections */}
      <g stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        {/* Radial connections from center */}
        <line x1="24" y1="24" x2="24" y2="8" />
        <line x1="24" y1="24" x2="38" y2="16" />
        <line x1="24" y1="24" x2="38" y2="32" />
        <line x1="24" y1="24" x2="24" y2="40" />
        <line x1="24" y1="24" x2="10" y2="32" />
        <line x1="24" y1="24" x2="10" y2="16" />
      </g>
      
      {/* Hexagon outer ring connections */}
      <g stroke="#14B8A6" strokeWidth="1" strokeLinecap="round" opacity="0.3">
        <line x1="24" y1="8" x2="38" y2="16" />
        <line x1="38" y1="16" x2="38" y2="32" />
        <line x1="38" y1="32" x2="24" y2="40" />
        <line x1="24" y1="40" x2="10" y2="32" />
        <line x1="10" y1="32" x2="10" y2="16" />
        <line x1="10" y1="16" x2="24" y2="8" />
      </g>
      
      {/* Data nodes */}
      <circle cx="24" cy="8" r="3" fill="#14B8A6" />
      <circle cx="38" cy="16" r="2.5" fill="#0D9488" />
      <circle cx="38" cy="32" r="2.5" fill="#0D9488" />
      <circle cx="24" cy="40" r="3" fill="#14B8A6" />
      <circle cx="10" cy="32" r="2.5" fill="#0D9488" />
      <circle cx="10" cy="16" r="2.5" fill="#0D9488" />
      
      {/* Center hexagon - structured intelligence */}
      <polygon 
        points="24,17 30,20.5 30,27.5 24,31 18,27.5 18,20.5" 
        fill="#14B8A6" 
        stroke="#0D9488" 
        strokeWidth="1"
      />
      <circle cx="24" cy="24" r="3" fill="#F0FDFA" />
    </svg>
  );
};

// Minimal version for small sizes
export const NetworkLogoMini = ({ size = 32, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="32" height="32" rx="8" fill="#0F172A" />
      
      {/* Simplified connections */}
      <g stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="16" y1="16" x2="16" y2="7" />
        <line x1="16" y1="16" x2="24" y2="12" />
        <line x1="16" y1="16" x2="24" y2="20" />
        <line x1="16" y1="16" x2="16" y2="25" />
        <line x1="16" y1="16" x2="8" y2="20" />
        <line x1="16" y1="16" x2="8" y2="12" />
      </g>
      
      {/* Outer nodes */}
      <circle cx="16" cy="7" r="2.5" fill="#14B8A6" />
      <circle cx="24" cy="12" r="2" fill="#0D9488" />
      <circle cx="24" cy="20" r="2" fill="#0D9488" />
      <circle cx="16" cy="25" r="2.5" fill="#14B8A6" />
      <circle cx="8" cy="20" r="2" fill="#0D9488" />
      <circle cx="8" cy="12" r="2" fill="#0D9488" />
      
      {/* Center */}
      <circle cx="16" cy="16" r="5" fill="#14B8A6" />
      <circle cx="16" cy="16" r="2.5" fill="#F0FDFA" />
    </svg>
  );
};

// Version with "RS" text inside network
export const NetworkLogoWithText = ({ size = 48, className = "" }) => {
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
      
      {/* Network connections */}
      <g stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <line x1="24" y1="24" x2="24" y2="9" />
        <line x1="24" y1="24" x2="37" y2="16" />
        <line x1="24" y1="24" x2="37" y2="32" />
        <line x1="24" y1="24" x2="24" y2="39" />
        <line x1="24" y1="24" x2="11" y2="32" />
        <line x1="24" y1="24" x2="11" y2="16" />
      </g>
      
      {/* Outer ring */}
      <g stroke="#14B8A6" strokeWidth="1" opacity="0.25">
        <line x1="24" y1="9" x2="37" y2="16" />
        <line x1="37" y1="16" x2="37" y2="32" />
        <line x1="37" y1="32" x2="24" y2="39" />
        <line x1="24" y1="39" x2="11" y2="32" />
        <line x1="11" y1="32" x2="11" y2="16" />
        <line x1="11" y1="16" x2="24" y2="9" />
      </g>
      
      {/* Data nodes */}
      <circle cx="24" cy="9" r="3" fill="#14B8A6" />
      <circle cx="37" cy="16" r="2.5" fill="#0D9488" />
      <circle cx="37" cy="32" r="2.5" fill="#0D9488" />
      <circle cx="24" cy="39" r="3" fill="#14B8A6" />
      <circle cx="11" cy="32" r="2.5" fill="#0D9488" />
      <circle cx="11" cy="16" r="2.5" fill="#0D9488" />
      
      {/* Center circle with RS */}
      <circle cx="24" cy="24" r="9" fill="#14B8A6" />
      <text 
        x="24" 
        y="28" 
        textAnchor="middle" 
        fill="#0F172A" 
        fontSize="11" 
        fontWeight="700" 
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        RS
      </text>
    </svg>
  );
};

// Full Logo with Company Name
export const FullNetworkLogo = ({ iconSize = 40, className = "", showTagline = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <NetworkLogo size={iconSize} />
      <div className="flex flex-col">
        <span className="text-xl tracking-tight font-medium">
          Role<span className="text-purple-500">Sense</span>
        </span>
        {showTagline && (
          <span className="text-xs text-gray-500">Talent Intelligence Platform</span>
        )}
      </div>
    </div>
  );
};

// Export default as the main logo
export default NetworkLogo;
