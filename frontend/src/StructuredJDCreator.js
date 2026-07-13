import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  X, Plus, CheckCircle, ChevronRight, Building2, Sparkles, Lightbulb, Users, Target, Briefcase, Loader2
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Quick profile types for guided wizard
const PROFILE_TYPES = [
  { id: "engineering", label: "Engineering / Technology", icon: "💻", examples: "Software Engineer, DevOps, Data Scientist" },
  { id: "sales", label: "Sales & Business Development", icon: "📈", examples: "Sales Manager, Account Executive, BDR" },
  { id: "marketing", label: "Marketing & Communications", icon: "📣", examples: "Marketing Manager, Content Writer, SEO" },
  { id: "operations", label: "Operations & Support", icon: "⚙️", examples: "Operations Manager, Customer Support, Admin" },
  { id: "finance", label: "Finance & Accounting", icon: "💰", examples: "Accountant, Financial Analyst, Controller" },
  { id: "hr", label: "Human Resources", icon: "👥", examples: "HR Manager, Recruiter, L&D Specialist" },
  { id: "product", label: "Product & Design", icon: "🎨", examples: "Product Manager, UI/UX Designer, Researcher" },
  { id: "leadership", label: "Leadership / Management", icon: "👔", examples: "Director, VP, C-Level Executive" },
  { id: "other", label: "Other", icon: "📋", examples: "Specify your own requirements" }
];

const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level (0-2 years)", min: 0, max: 2 },
  { id: "mid", label: "Mid Level (3-5 years)", min: 3, max: 5 },
  { id: "senior", label: "Senior (6-10 years)", min: 6, max: 10 },
  { id: "lead", label: "Lead / Principal (10+ years)", min: 10, max: 15 },
  { id: "executive", label: "Executive / Director", min: 12, max: 20 }
];

// Guided Onboarding Wizard Component
const JDWizard = ({ onComplete, onSkip }) => {
  const [wizardStep, setWizardStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [wizardData, setWizardData] = useState({
    profileType: "",
    roleTitle: "",
    experienceLevel: "",
    keySkills: "",
    teamSize: "",
    additionalContext: ""
  });

  const handleProfileSelect = (profileId) => {
    setWizardData(prev => ({ ...prev, profileType: profileId }));
  };

  const handleExperienceSelect = (expId) => {
    setWizardData(prev => ({ ...prev, experienceLevel: expId }));
  };

  const handleGenerateJD = async () => {
    setGenerating(true);
    
    // Find experience range
    const expLevel = EXPERIENCE_LEVELS.find(e => e.id === wizardData.experienceLevel);
    const profileType = PROFILE_TYPES.find(p => p.id === wizardData.profileType);
    
    // Prepare data for JD generation
    const jdSeed = {
      title: wizardData.roleTitle || `${profileType?.label || 'Professional'} Role`,
      profile_type: wizardData.profileType,
      experience_min: expLevel?.min || 0,
      experience_max: expLevel?.max || 5,
      key_skills: wizardData.keySkills.split(',').map(s => s.trim()).filter(Boolean),
      team_size: wizardData.teamSize,
      additional_context: wizardData.additionalContext
    };

    // Simulate brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setGenerating(false);
    onComplete(jdSeed);
  };

  const canProceedStep1 = wizardData.profileType !== "";
  const canProceedStep2 = wizardData.roleTitle.trim() !== "" && wizardData.experienceLevel !== "";
  const canGenerate = wizardData.keySkills.trim() !== "";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">JD Intelligence Wizard</h2>
              <p className="text-indigo-100 text-sm">Let's create the perfect job description together</p>
            </div>
          </div>
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-all ${s <= wizardStep ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[60vh]">
          {/* Step 1: Profile Type */}
          {wizardStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">What type of profile are you hiring?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6">Select the department or function that best matches your hiring need</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROFILE_TYPES.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => handleProfileSelect(profile.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      wizardData.profileType === profile.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{profile.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{profile.label}</p>
                        <p className="text-xs text-gray-500">{profile.examples}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Role Details */}
          {wizardStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Tell us more about the role</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6">Provide basic details - don't worry about being precise, we'll help refine it</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What's the role title?</label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer, Marketing Manager, Sales Lead..."
                    value={wizardData.roleTitle}
                    onChange={(e) => setWizardData(prev => ({ ...prev, roleTitle: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience level needed?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EXPERIENCE_LEVELS.map(exp => (
                      <button
                        key={exp.id}
                        onClick={() => handleExperienceSelect(exp.id)}
                        className={`px-4 py-3 rounded-lg border text-left transition-all ${
                          wizardData.experienceLevel === exp.id
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team size this role will manage (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., 5-10 people, No direct reports, etc."
                    value={wizardData.teamSize}
                    onChange={(e) => setWizardData(prev => ({ ...prev, teamSize: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Generate */}
          {wizardStep === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">What skills are you looking for?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6">List the key competencies - be as vague or specific as you like</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key skills or competencies (comma separated)</label>
                  <textarea
                    placeholder="e.g., Python, leadership, problem solving, communication, cloud architecture..."
                    value={wizardData.keySkills}
                    onChange={(e) => setWizardData(prev => ({ ...prev, keySkills: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
                  />
                  <p className="text-xs text-gray-400 mt-1">Don't worry about being exhaustive - you can add more later</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any additional context? (optional)</label>
                  <textarea
                    placeholder="e.g., Fast-paced startup, working with Fortune 500 clients, building new product from scratch..."
                    value={wizardData.additionalContext}
                    onChange={(e) => setWizardData(prev => ({ ...prev, additionalContext: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-20"
                  />
                </div>

                {/* Preview Summary */}
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                  <h4 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Ready to generate your JD
                  </h4>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <p><strong>Role:</strong> {wizardData.roleTitle || 'Not specified'}</p>
                    <p><strong>Type:</strong> {PROFILE_TYPES.find(p => p.id === wizardData.profileType)?.label || 'Not specified'}</p>
                    <p><strong>Experience:</strong> {EXPERIENCE_LEVELS.find(e => e.id === wizardData.experienceLevel)?.label || 'Not specified'}</p>
                    <p><strong>Skills:</strong> {wizardData.keySkills || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
          <div>
            {wizardStep === 1 && (
              <button
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Skip wizard, create from scratch
              </button>
            )}
            {wizardStep > 1 && (
              <button
                onClick={() => setWizardStep(prev => prev - 1)}
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                ← Back
              </button>
            )}
          </div>
          <div>
            {wizardStep < 3 && (
              <button
                onClick={() => setWizardStep(prev => prev + 1)}
                disabled={wizardStep === 1 ? !canProceedStep1 : !canProceedStep2}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {wizardStep === 3 && (
              <button
                onClick={handleGenerateJD}
                disabled={!canGenerate || generating}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate JD
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Multi-select chip component for locations
const LocationMultiSelect = ({ selected, onChange, options, label, accentColor = "indigo" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleLocation = (loc) => {
    if (selected.includes(loc)) {
      onChange(selected.filter(l => l !== loc));
    } else {
      onChange([...selected, loc]);
    }
  };
  
  const removeLocation = (loc, e) => {
    e.stopPropagation();
    onChange(selected.filter(l => l !== loc));
  };
  
  const colorClasses = {
    indigo: { chip: "bg-indigo-100 text-indigo-800", hover: "hover:bg-indigo-50", selected: "bg-indigo-50 text-indigo-700", check: "text-indigo-600" },
    emerald: { chip: "bg-emerald-100 text-emerald-800", hover: "hover:bg-emerald-50", selected: "bg-emerald-50 text-emerald-700", check: "text-emerald-600" }
  };
  const colors = colorClasses[accentColor] || colorClasses.indigo;
  
  return (
    <div className="relative">
      <div 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[42px] cursor-pointer bg-white flex flex-wrap gap-1 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">Select {label}...</span>
        ) : (
          selected.map(loc => (
            <span key={loc} className={`${colors.chip} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
              {loc}
              <button 
                type="button"
                onClick={(e) => removeLocation(loc, e)}
                className="hover:opacity-70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
            {options?.map(loc => (
              <div
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-3 py-2 cursor-pointer ${colors.hover} flex items-center justify-between ${
                  selected.includes(loc) ? colors.selected : ''
                }`}
              >
                <span className="text-sm">{loc}</span>
                {selected.includes(loc) && <CheckCircle className={`w-4 h-4 ${colors.check}`} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-600",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StructuredJDCreator = ({ onClose, onSuccess }) => {
  const [showWizard, setShowWizard] = useState(true); // Start with wizard
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [masterData, setMasterData] = useState(null);
  const [competencyData, setCompetencyData] = useState(null);
  const [toolsData, setToolsData] = useState(null);
  
  const [basicInfo, setBasicInfo] = useState({
    company_name: "",
    about_company: "",
    title: "",
    role_type: "IT",
    business_model: "B2B",
    experience_min: 0,
    experience_max: 3,
    compensation_min: null,
    compensation_max: null,
    compensation_currency: "INR",
    compensation_type: "Per Annum",
    locations_india: [],
    locations_international: [],
    work_mode: "Work from Office",
    employment_type: "Full-time Permanent",
    education_level: "Bachelor's Degree",
    education_field: "Any Field"
  });
  
  const [competencies, setCompetencies] = useState({
    must_have_behavioral: [],
    must_have_functional: [],
    must_have_cognitive: [],
    must_have_skills: [],
    good_to_have_competencies: [],
    good_to_have_skills: [],
    trainable_competencies: [],
    tools_must_have: [],
    tools_good_to_have: []
  });
  
  // Consolidated skills - each skill has { name, type: 'required' | 'preferred' }
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillType, setSkillType] = useState("required"); // required or preferred
  
  const [responsibilities, setResponsibilities] = useState([""]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Handle wizard completion - pre-populate form with wizard data
  const handleWizardComplete = (jdSeed) => {
    // Map profile type to role type
    const roleTypeMap = {
      engineering: "IT",
      sales: "Sales",
      marketing: "Marketing",
      operations: "Operations",
      finance: "Finance",
      hr: "HR",
      product: "IT",
      leadership: "Leadership",
      other: "Other"
    };

    // Update basic info with wizard data
    setBasicInfo(prev => ({
      ...prev,
      title: jdSeed.title,
      role_type: roleTypeMap[jdSeed.profile_type] || "IT",
      experience_min: jdSeed.experience_min,
      experience_max: jdSeed.experience_max
    }));

    // Pre-populate skills from wizard
    if (jdSeed.key_skills && jdSeed.key_skills.length > 0) {
      setSkills(jdSeed.key_skills.map(skill => ({ name: skill, type: 'required' })));
    }

    // Add additional context to notes if provided
    if (jdSeed.additional_context) {
      setAdditionalNotes(jdSeed.additional_context);
    }

    // Add team management responsibility if team size specified
    if (jdSeed.team_size) {
      setResponsibilities([`Lead and manage a team of ${jdSeed.team_size}`, ""]);
    }

    setShowWizard(false);
  };

  const handleSkipWizard = () => {
    setShowWizard(false);
  };

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [optionsRes, compRes, toolsRes] = await Promise.all([
          axios.get(`${API}/master/jd-options`),
          axios.get(`${API}/master/competencies`),
          axios.get(`${API}/master/tools`)
        ]);
        setMasterData(optionsRes.data);
        setCompetencyData(compRes.data);
        setToolsData(toolsRes.data);
      } catch (e) {
        console.error("Error fetching master data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterData();
  }, []);

  // Add skill with type
  const addSkill = () => {
    if (!skillInput.trim()) return;
    setSkills(prev => [...prev, { name: skillInput.trim(), type: skillType }]);
    setSkillInput("");
  };

  // Remove skill
  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  // Toggle skill type
  const toggleSkillType = (index) => {
    setSkills(prev => prev.map((skill, i) => 
      i === index ? { ...skill, type: skill.type === 'required' ? 'preferred' : 'required' } : skill
    ));
  };

  // Get skills by type for validation and submission
  const getRequiredSkills = () => skills.filter(s => s.type === 'required').map(s => s.name);
  const getPreferredSkills = () => skills.filter(s => s.type === 'preferred').map(s => s.name);

  // Legacy skill functions for compatibility
  const addSkillLegacy = (type) => {
    // Not used anymore but kept for compatibility
  };

  const removeSkillLegacy = (type, index) => {
    // Not used anymore but kept for compatibility
  };

  const toggleCompetency = (category, id) => {
    setCompetencies(prev => {
      const current = prev[category] || [];
      if (current.includes(id)) {
        return { ...prev, [category]: current.filter(c => c !== id) };
      } else {
        return { ...prev, [category]: [...current, id] };
      }
    });
  };

  const toggleTool = (category, tool) => {
    setCompetencies(prev => {
      const current = prev[category] || [];
      if (current.includes(tool)) {
        return { ...prev, [category]: current.filter(t => t !== tool) };
      } else {
        return { ...prev, [category]: [...current, tool] };
      }
    });
  };

  const addResponsibility = () => setResponsibilities([...responsibilities, ""]);
  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };
  const removeResponsibility = (index) => setResponsibilities(responsibilities.filter((_, i) => i !== index));

  const validateStep1 = () => basicInfo.company_name && basicInfo.title && basicInfo.role_type;
  const validateStep2 = () => getRequiredSkills().length >= 4 && getPreferredSkills().length >= 3;

  const handleSubmit = async () => {
    if (!validateStep2()) {
      alert("Please add at least 4 required skills (⭐) and 3 preferred skills (◯)");
      return;
    }
    
    setSaving(true);
    try {
      // Convert consolidated skills to competencies format for API
      const updatedCompetencies = {
        ...competencies,
        must_have_skills: getRequiredSkills(),
        good_to_have_skills: getPreferredSkills()
      };
      
      // Note: No external application links - all applications go through RoleSense platform
      const response = await axios.post(`${API}/jd/structured/create`, {
        basic_info: basicInfo,
        competencies: updatedCompetencies,
        responsibilities: responsibilities.filter(r => r.trim()),
        additional_notes: additionalNotes
      });
      // Pass the new JD ID to the onSuccess callback
      onSuccess && onSuccess(response.data?.id);
      onClose();
    } catch (e) {
      console.error("Error creating JD:", e);
      alert(e.response?.data?.detail || "Failed to create JD. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Loading JD Builder...</p>
        </div>
      </div>
    );
  }

  // Show wizard first
  if (showWizard) {
    return (
      <JDWizard 
        onComplete={handleWizardComplete} 
        onSkip={handleSkipWizard}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-start justify-center pt-8 pb-20">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Create Job Description</h2>
                <p className="text-indigo-200 text-sm mt-1">Human-controlled, structured JD creation</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Steps */}
            <div className="flex items-center gap-4 mt-6">
              {[{ num: 1, label: "Basic Info" }, { num: 2, label: "Competencies" }, { num: 3, label: "Review" }].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === s.num ? 'bg-white text-indigo-600' : 
                    step > s.num ? 'bg-indigo-400 text-white' : 'bg-indigo-500/50 text-indigo-200'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-2 text-sm ${step === s.num ? 'text-white font-medium' : 'text-indigo-200'}`}>{s.label}</span>
                  {i < 2 && <ChevronRight className="w-5 h-5 mx-3 text-indigo-300" />}
                </div>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={basicInfo.company_name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, company_name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      value={basicInfo.title}
                      onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About the Company</label>
                  <textarea
                    value={basicInfo.about_company}
                    onChange={(e) => setBasicInfo({ ...basicInfo, about_company: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Brief description of the company..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Type *</label>
                    <select
                      value={basicInfo.role_type}
                      onChange={(e) => setBasicInfo({ ...basicInfo, role_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.role_types?.map(rt => <option key={rt} value={rt}>{rt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Model</label>
                    <select
                      value={basicInfo.business_model}
                      onChange={(e) => setBasicInfo({ ...basicInfo, business_model: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.business_models?.map(bm => <option key={bm} value={bm}>{bm}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                    <select
                      value={basicInfo.work_mode}
                      onChange={(e) => setBasicInfo({ ...basicInfo, work_mode: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.work_modes?.map(wm => <option key={wm} value={wm}>{wm}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Range *</label>
                    <select
                      value={`${basicInfo.experience_min}-${basicInfo.experience_max}`}
                      onChange={(e) => {
                        const range = masterData?.experience_ranges?.find(r => `${r.min}-${r.max}` === e.target.value);
                        if (range) setBasicInfo({ ...basicInfo, experience_min: range.min, experience_max: range.max });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.experience_ranges?.map(er => (
                        <option key={er.label} value={`${er.min}-${er.max}`}>{er.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      value={basicInfo.employment_type}
                      onChange={(e) => setBasicInfo({ ...basicInfo, employment_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.employment_types?.map(et => <option key={et} value={et}>{et}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compensation Min</label>
                    <input
                      type="number"
                      value={basicInfo.compensation_min || ""}
                      onChange={(e) => setBasicInfo({ ...basicInfo, compensation_min: e.target.value ? Number(e.target.value) : null })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compensation Max</label>
                    <input
                      type="number"
                      value={basicInfo.compensation_max || ""}
                      onChange={(e) => setBasicInfo({ ...basicInfo, compensation_max: e.target.value ? Number(e.target.value) : null })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={basicInfo.compensation_currency}
                      onChange={(e) => setBasicInfo({ ...basicInfo, compensation_currency: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.currencies?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={basicInfo.compensation_type}
                      onChange={(e) => setBasicInfo({ ...basicInfo, compensation_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.compensation_types?.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">India Locations (Multiple)</label>
                    <LocationMultiSelect
                      selected={basicInfo.locations_india}
                      onChange={(locs) => setBasicInfo({ ...basicInfo, locations_india: locs })}
                      options={masterData?.india_locations}
                      label="India locations"
                      accentColor="indigo"
                    />
                    {basicInfo.locations_india.length > 0 && (
                      <p className="text-xs text-indigo-600 mt-1">{basicInfo.locations_india.length} location(s) selected</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">International Locations (Multiple)</label>
                    <LocationMultiSelect
                      selected={basicInfo.locations_international}
                      onChange={(locs) => setBasicInfo({ ...basicInfo, locations_international: locs })}
                      options={masterData?.international_locations}
                      label="International locations"
                      accentColor="indigo"
                    />
                    {basicInfo.locations_international.length > 0 && (
                      <p className="text-xs text-indigo-600 mt-1">{basicInfo.locations_international.length} location(s) selected</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                    <select
                      value={basicInfo.education_level}
                      onChange={(e) => setBasicInfo({ ...basicInfo, education_level: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.education_levels?.map(el => <option key={el} value={el}>{el}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Field</label>
                    <select
                      value={basicInfo.education_field}
                      onChange={(e) => setBasicInfo({ ...basicInfo, education_field: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {masterData?.education_fields?.map(ef => <option key={ef} value={ef}>{ef}</option>)}
                    </select>
                  </div>
                </div>
                
                {/* RoleSense Platform Application Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-900 mb-1">Applications via RoleSense Platform</h3>
                      <p className="text-sm text-indigo-700 mb-3">
                        All candidate applications will be received through the RoleSense platform. Benefits:
                      </p>
                      <ul className="text-sm text-indigo-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          Auto-routing to Resume Repository with AI classification
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          Instant recruiter notifications for new applications
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          Automatic Career Trajectory & HR Fitment analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          Centralized candidate pipeline management
                        </li>
                      </ul>
                      <p className="text-xs text-indigo-500 mt-3">
                        🔗 A unique RoleSense job link will be generated after publishing. Share this link on LinkedIn, job boards, and social media.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Competencies */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Consolidated Skills Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">Skills *</h3>
                  <p className="text-sm text-indigo-700 mb-4">
                    Add skills and mark each as <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">⭐ Required</span> or 
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs ml-1">◯ Preferred</span>
                    (Min: 4 Required, 3 Preferred)
                  </p>
                  
                  {/* Skill Input */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Type a skill (e.g., Python, React, Project Management)"
                    />
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => setSkillType('required')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          skillType === 'required' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ⭐ Required
                      </button>
                      <button 
                        onClick={() => setSkillType('preferred')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          skillType === 'preferred' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ◯ Preferred
                      </button>
                    </div>
                    <Button variant="primary" onClick={addSkill}>
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  
                  {/* Skills Display */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-all ${
                          skill.type === 'required' 
                            ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        <button 
                          onClick={() => toggleSkillType(i)} 
                          className="hover:scale-110 transition-transform"
                          title="Click to toggle Required/Preferred"
                        >
                          {skill.type === 'required' ? '⭐' : '◯'}
                        </button>
                        {skill.name}
                        <button onClick={() => removeSkill(i)} className="hover:text-red-600 ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-gray-400 italic">No skills added yet. Start typing above!</p>
                    )}
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="flex gap-6 text-sm">
                    <div className={`flex items-center gap-2 ${getRequiredSkills().length >= 4 ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="font-medium">⭐ Required:</span> 
                      <span className={`px-2 py-0.5 rounded ${getRequiredSkills().length >= 4 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {getRequiredSkills().length}/4
                      </span>
                      {getRequiredSkills().length >= 4 && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className={`flex items-center gap-2 ${getPreferredSkills().length >= 3 ? 'text-green-600' : 'text-amber-600'}`}>
                      <span className="font-medium">◯ Preferred:</span> 
                      <span className={`px-2 py-0.5 rounded ${getPreferredSkills().length >= 3 ? 'bg-green-100' : 'bg-amber-100'}`}>
                        {getPreferredSkills().length}/3
                      </span>
                      {getPreferredSkills().length >= 3 && <CheckCircle className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                
                {/* Core/Behavioral Competencies */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Core/Behavioral Competencies</h3>
                  <p className="text-sm text-blue-700 mb-4">Select competencies essential for this role.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {competencyData?.core_behavioral?.map(comp => (
                      <label key={comp.id} className={`flex items-start gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                        competencies.must_have_behavioral.includes(comp.id) ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}>
                        <input
                          type="checkbox"
                          checked={competencies.must_have_behavioral.includes(comp.id)}
                          onChange={() => toggleCompetency('must_have_behavioral', comp.id)}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{comp.name}</div>
                          <div className="text-xs text-gray-500">{comp.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Cognitive Competencies */}
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Cognitive Competencies</h3>
                  <p className="text-sm text-purple-700 mb-4">Mental abilities required for this role.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {competencyData?.cognitive?.map(comp => (
                      <label key={comp.id} className={`flex items-start gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                        competencies.must_have_cognitive.includes(comp.id) ? 'bg-purple-100 border-purple-400' : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}>
                        <input
                          type="checkbox"
                          checked={competencies.must_have_cognitive.includes(comp.id)}
                          onChange={() => toggleCompetency('must_have_cognitive', comp.id)}
                          className="mt-1"
                        />
                        <div className="text-sm font-medium text-gray-900">{comp.name}</div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Tools & Technologies */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tools & Technologies</h3>
                  <p className="text-sm text-gray-600 mb-4">Select tools relevant to this role.</p>
                  
                  {Object.entries(basicInfo.role_type === 'IT' ? (toolsData?.it_tools || {}) : (toolsData?.non_it_tools || {})).map(([category, tools]) => (
                    <div key={category} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {tools.map(tool => (
                          <button
                            key={tool}
                            onClick={() => toggleTool('tools_must_have', tool)}
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                              competencies.tools_must_have.includes(tool) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {tool}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Responsibilities */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Key Responsibilities</h3>
                  <p className="text-sm text-green-700 mb-4">Define the main responsibilities for this role.</p>
                  
                  {responsibilities.map((resp, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => updateResponsibility(i, e.target.value)}
                        className="flex-1 border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder={`Responsibility ${i + 1}`}
                      />
                      {responsibilities.length > 1 && (
                        <button onClick={() => removeResponsibility(i)} className="text-red-500 hover:text-red-700"><X className="w-5 h-5" /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={addResponsibility} className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1 mt-2">
                    <Plus className="w-4 h-4" /> Add Responsibility
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-900">Review Your Job Description</h3>
                  </div>
                  <p className="text-emerald-700">Please review all the details before submitting.</p>
                </div>
                
                <div className="bg-white border rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" /> Basic Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-gray-500">Company:</span> <span className="font-medium">{basicInfo.company_name}</span></div>
                    <div><span className="text-gray-500">Title:</span> <span className="font-medium">{basicInfo.title}</span></div>
                    <div><span className="text-gray-500">Role Type:</span> <span className="font-medium">{basicInfo.role_type}</span></div>
                    <div><span className="text-gray-500">Experience:</span> <span className="font-medium">{basicInfo.experience_min}-{basicInfo.experience_max} years</span></div>
                    <div><span className="text-gray-500">Work Mode:</span> <span className="font-medium">{basicInfo.work_mode}</span></div>
                    <div><span className="text-gray-500">Employment:</span> <span className="font-medium">{basicInfo.employment_type}</span></div>
                    {basicInfo.compensation_min && (
                      <div><span className="text-gray-500">Compensation:</span> <span className="font-medium">{basicInfo.compensation_currency} {basicInfo.compensation_min?.toLocaleString()} - {basicInfo.compensation_max?.toLocaleString()} {basicInfo.compensation_type}</span></div>
                    )}
                    {basicInfo.locations_india.length > 0 && (
                      <div className="col-span-2"><span className="text-gray-500">India:</span> <span className="font-medium">{basicInfo.locations_india.join(", ")}</span></div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white border rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Skills & Competencies</h4>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-red-700">⭐ Required Skills ({getRequiredSkills().length}):</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getRequiredSkills().map((skill, i) => (
                        <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">⭐ {skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-amber-700">◯ Preferred Skills ({getPreferredSkills().length}):</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getPreferredSkills().map((skill, i) => (
                        <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  {competencies.must_have_behavioral.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-blue-700">Behavioral Competencies:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {competencies.must_have_behavioral.map(id => {
                          const comp = competencyData?.core_behavioral?.find(c => c.id === id);
                          return comp && <span key={id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{comp.name}</span>;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {competencies.tools_must_have.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Tools:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {competencies.tools_must_have.map((tool, i) => (
                          <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {responsibilities.filter(r => r.trim()).length > 0 && (
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {responsibilities.filter(r => r.trim()).map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="text-sm text-gray-500">
              {step === 2 && (
                <span className={validateStep2() ? 'text-green-600' : 'text-red-600'}>
                  {validateStep2() 
                    ? '✓ All requirements met' 
                    : `Need ${Math.max(0, 4 - getRequiredSkills().length)} more required (⭐), ${Math.max(0, 3 - getPreferredSkills().length)} more preferred (◯)`}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
              
              {step < 3 ? (
                <Button 
                  variant="primary" 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !validateStep1() : !validateStep2()}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit} disabled={saving}>
                  {saving ? (
                    <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Creating...</>
                  ) : (
                    <><CheckCircle className="w-4 h-4" /> Create JD</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuredJDCreator;