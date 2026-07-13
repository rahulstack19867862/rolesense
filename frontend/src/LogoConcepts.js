import React from "react";
import { 
  Compass, Target, TrendingUp, Search, Users, Brain, 
  GitBranch, Eye, Zap, ArrowUpRight, CheckCircle, Hexagon,
  Circle, Square, Triangle, Star
} from "lucide-react";

const LogoConcepts = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light text-center mb-4">RoleSense Logo Concepts</h1>
        <p className="text-gray-500 text-center mb-12">Visual representations of brand identity options</p>

        {/* Concept 1: Compass/Target */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-light mb-2">Concept 1: The Compass/Target</h2>
          <p className="text-gray-500 mb-8">Symbolizes guidance, precision, and finding the right fit</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Variation 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <Compass className="w-12 h-12 text-emerald-400" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Navy + Emerald</span>
            </div>
            
            {/* Variation 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-4 relative">
                <Target className="w-10 h-10 text-white" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Target + Check</span>
            </div>
            
            {/* Variation 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <div className="relative">
                  <Compass className="w-10 h-10 text-slate-900" />
                  <Users className="w-5 h-5 text-emerald-600 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Outlined Style</span>
            </div>
            
            {/* Variation 4 */}
            <div className="flex flex-col items-center p-6 bg-slate-900 rounded-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-12 h-12 text-white" />
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Gradient Green</span>
            </div>
          </div>
        </div>

        {/* Concept 2: Path/Trajectory */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-light mb-2">Concept 2: The Path/Trajectory</h2>
          <p className="text-gray-500 mb-8">Represents career growth, progression, and upward movement</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Variation 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-emerald-400" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Growth Arrow</span>
            </div>
            
            {/* Variation 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-gradient-to-tr from-slate-800 via-slate-700 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <GitBranch className="w-12 h-12 text-white" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Branch Path</span>
            </div>
            
            {/* Variation 3 - RS Monogram */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-3xl font-bold">
                  <span className="text-white">R</span>
                  <span className="text-emerald-400">S</span>
                </div>
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">RS Monogram</span>
            </div>
            
            {/* Variation 4 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-white border-4 border-slate-900 rounded-full flex items-center justify-center mb-4 relative">
                <ArrowUpRight className="w-10 h-10 text-slate-900" />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Rise + Achieve</span>
            </div>
          </div>
        </div>

        {/* Concept 3: Lens/Insight */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-light mb-2">Concept 3: The Lens/Insight</h2>
          <p className="text-gray-500 mb-8">Symbolizes clarity, visibility, and making talent visible</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Variation 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-amber-400" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Search Lens</span>
            </div>
            
            {/* Variation 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-slate-900 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-12 h-12 text-amber-400" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Insight Eye</span>
            </div>
            
            {/* Variation 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center mb-4 relative">
                <Search className="w-10 h-10 text-slate-900" />
                <Users className="w-5 h-5 text-emerald-600 absolute top-4 right-4" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Find Talent</span>
            </div>
            
            {/* Variation 4 */}
            <div className="flex flex-col items-center p-6 bg-slate-900 rounded-2xl">
              <div className="w-24 h-24 rounded-full border-4 border-amber-400 flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Aperture Check</span>
            </div>
          </div>
        </div>

        {/* Concept 4: Human + Data Fusion */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-light mb-2">Concept 4: Human + Data Fusion</h2>
          <p className="text-gray-500 mb-8">Represents human intelligence combined with AI/structured data</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Variation 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-12 h-12 text-indigo-400" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Brain/Intelligence</span>
            </div>
            
            {/* Variation 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-slate-900 rounded-2xl flex items-center justify-center mb-4 relative">
                <Users className="w-10 h-10 text-white" />
                <Zap className="w-5 h-5 text-amber-400 absolute top-3 right-3" />
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Human + Power</span>
            </div>
            
            {/* Variation 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-24 h-24 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <div className="relative">
                  <Hexagon className="w-14 h-14 text-slate-900" />
                  <Users className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <span className="text-lg font-medium">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Structured Human</span>
            </div>
            
            {/* Variation 4 */}
            <div className="flex flex-col items-center p-6 bg-slate-900 rounded-2xl">
              <div className="w-24 h-24 flex items-center justify-center mb-4 relative">
                <div className="w-20 h-20 border-2 border-indigo-400 rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Smart Verified</span>
            </div>
          </div>
        </div>

        {/* Concept 5: Recommended - Combined */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-light mb-2 text-white">⭐ Recommended: Combined Concept</h2>
          <p className="text-gray-400 mb-8">Best elements from all concepts - professional, modern, and meaningful</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Final Recommendation 1 */}
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur">
              <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                    <div className="text-2xl font-bold">
                      <span className="text-white">R</span>
                      <span className="text-emerald-400">S</span>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500 absolute -top-1 -right-1" />
                </div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-emerald-400 mt-1">TOP PICK</span>
            </div>
            
            {/* Final Recommendation 2 */}
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur">
              <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <div className="text-3xl font-bold text-white">RS</div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Gradient Bold</span>
            </div>
            
            {/* Final Recommendation 3 */}
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-emerald-400" />
                </div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Classic Circle</span>
            </div>
            
            {/* Final Recommendation 4 */}
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur">
              <div className="w-28 h-28 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-emerald-500/30">
                <div className="relative">
                  <Brain className="w-12 h-12 text-emerald-400" />
                  <div className="absolute -bottom-1 -right-1 text-xs font-bold text-white bg-emerald-500 px-1.5 py-0.5 rounded">RS</div>
                </div>
              </div>
              <span className="text-lg font-medium text-white">Role Sense</span>
              <span className="text-xs text-gray-400 mt-1">Brain + Badge</span>
            </div>
          </div>
        </div>

        {/* Color Palettes */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-light mb-6">Recommended Color Palettes</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200">
              <h3 className="font-medium mb-4">Professional Trust</h3>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800" title="#1E293B"></div>
                <div className="w-12 h-12 rounded-lg bg-emerald-600" title="#059669"></div>
                <div className="w-12 h-12 rounded-lg bg-amber-500" title="#F59E0B"></div>
              </div>
              <p className="text-sm text-gray-500">Best for enterprise clients</p>
            </div>
            
            <div className="p-6 rounded-2xl border border-gray-200">
              <h3 className="font-medium mb-4">Modern Tech</h3>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-900" title="#111827"></div>
                <div className="w-12 h-12 rounded-lg bg-teal-500" title="#14B8A6"></div>
                <div className="w-12 h-12 rounded-lg bg-indigo-500" title="#6366F1"></div>
              </div>
              <p className="text-sm text-gray-500">Tech-forward image</p>
            </div>
            
            <div className="p-6 rounded-2xl border border-gray-200">
              <h3 className="font-medium mb-4">HR Warmth</h3>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800" title="#1F2937"></div>
                <div className="w-12 h-12 rounded-lg bg-emerald-500" title="#10B981"></div>
                <div className="w-12 h-12 rounded-lg bg-orange-500" title="#F97316"></div>
              </div>
              <p className="text-sm text-gray-500">HR-friendly appeal</p>
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

export default LogoConcepts;
