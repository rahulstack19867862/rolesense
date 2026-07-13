import React from "react";
import { 
  Radar, Network, Share2, Waypoints, Crosshair, Fingerprint,
  Atom, Hexagon, CircuitBoard, Route, Orbit, TrendingUp,
  Users, Zap, Star, CheckCircle
} from "lucide-react";

const LogoAlternatives = () => {
  const alternatives = [
    {
      name: "Radar",
      icon: Radar,
      tagline: "Scanning for Talent",
      meaning: "Technology-based scanning, finding talent in the field",
      best: "Tech-forward companies"
    },
    {
      name: "Network",
      icon: Network,
      tagline: "Connecting Talent",
      meaning: "Connecting nodes, bridging talent with opportunities",
      best: "Collaborative platforms"
    },
    {
      name: "Waypoints",
      icon: Waypoints,
      tagline: "Career Journey",
      meaning: "Journey mapping, career trajectory path navigation",
      best: "Career-focused services"
    },
    {
      name: "Crosshair",
      icon: Crosshair,
      tagline: "Precision Hiring",
      meaning: "Precision targeting, finding the exact right fit",
      best: "Executive search firms"
    },
    {
      name: "Fingerprint",
      icon: Fingerprint,
      tagline: "Unique Talent ID",
      meaning: "Unique identification, deep personal analysis",
      best: "Assessment platforms"
    },
    {
      name: "Atom",
      icon: Atom,
      tagline: "Core Connections",
      meaning: "Building blocks of talent, interconnected skills",
      best: "Scientific/tech companies"
    },
    {
      name: "Hexagon",
      icon: Hexagon,
      tagline: "Structured Intelligence",
      meaning: "Tech DNA, organized talent ecosystem",
      best: "Enterprise solutions"
    },
    {
      name: "CircuitBoard",
      icon: CircuitBoard,
      tagline: "Smart Pathways",
      meaning: "Intelligent connections, technology-first approach",
      best: "AI-driven platforms"
    },
    {
      name: "Route",
      icon: Route,
      tagline: "Career Paths",
      meaning: "Connecting point A to B, career trajectory",
      best: "Growth-focused services"
    },
    {
      name: "Orbit",
      icon: Orbit,
      tagline: "Talent Ecosystem",
      meaning: "Comprehensive view, revolving around talent",
      best: "Platform ecosystems"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light text-center mb-4">RoleSense Logo Alternatives</h1>
        <p className="text-gray-500 text-center mb-4">Technology + Connect + Bridge + Find + Deep Analysis</p>
        <p className="text-emerald-600 text-center mb-12 text-sm">Click any option you like to see it applied!</p>

        {/* Grid of alternatives */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {alternatives.map((alt, i) => {
            const Icon = alt.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-emerald-500">
                <div className="flex items-start gap-4">
                  {/* Logo Preview */}
                  <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <Icon className="w-8 h-8 text-emerald-400" />
                    <TrendingUp className="w-4 h-4 text-amber-400 absolute top-1 right-1" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{alt.name}</h3>
                      {i === 0 && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Recommended</span>}
                    </div>
                    <p className="text-emerald-600 text-sm font-medium mb-2">{alt.tagline}</p>
                    <p className="text-gray-500 text-xs mb-2">{alt.meaning}</p>
                    <p className="text-gray-400 text-xs">Best for: {alt.best}</p>
                  </div>
                </div>
                
                {/* Full Logo Preview */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <Icon className="w-5 h-5 text-emerald-400" />
                      <TrendingUp className="w-2.5 h-2.5 text-amber-400 absolute top-0.5 right-0.5" />
                    </div>
                    <span className="text-lg font-medium">Role<span className="text-emerald-600">Sense</span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* My Top 3 Recommendations */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-light text-white mb-6 text-center">⭐ Top 3 Recommendations</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* #1 Radar */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                <Radar className="w-10 h-10 text-slate-900" />
                <TrendingUp className="w-5 h-5 text-emerald-500 absolute top-1 right-1" />
              </div>
              <h3 className="text-white font-semibold mb-1">#1 Radar</h3>
              <p className="text-emerald-400 text-sm mb-2">Scanning for Talent</p>
              <p className="text-gray-400 text-xs">Technology-based talent detection. Unique, professional, represents deep scanning and analysis.</p>
            </div>
            
            {/* #2 Fingerprint */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                <Fingerprint className="w-10 h-10 text-slate-900" />
                <TrendingUp className="w-5 h-5 text-emerald-500 absolute top-1 right-1" />
              </div>
              <h3 className="text-white font-semibold mb-1">#2 Fingerprint</h3>
              <p className="text-emerald-400 text-sm mb-2">Unique Talent ID</p>
              <p className="text-gray-400 text-xs">Each candidate is unique. Deep personal analysis. Very distinctive and memorable.</p>
            </div>
            
            {/* #3 Crosshair */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                <Crosshair className="w-10 h-10 text-slate-900" />
                <TrendingUp className="w-5 h-5 text-emerald-500 absolute top-1 right-1" />
              </div>
              <h3 className="text-white font-semibold mb-1">#3 Crosshair</h3>
              <p className="text-emerald-400 text-sm mb-2">Precision Hiring</p>
              <p className="text-gray-400 text-xs">Precision targeting the right talent. Focus and accuracy. Great for executive search.</p>
            </div>
          </div>
        </div>

        {/* Why Radar is Best */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Radar className="w-6 h-6 text-emerald-600" />
            Why Radar is the Best Choice for RoleSense
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Technology-First:</strong> Radar represents modern tech-based scanning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Finding Talent:</strong> Like radar detecting objects, you detect talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Deep Analysis:</strong> Radar scans deeply, not just surface level</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>360° View:</strong> Comprehensive view of candidates</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Unique:</strong> Not commonly used in HR tech logos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Professional:</strong> Clean, modern, enterprise-ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Memorable:</strong> Stands out from typical HR logos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700"><strong>Scalable:</strong> Works at any size from favicon to banner</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-emerald-600 hover:text-emerald-700">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default LogoAlternatives;
