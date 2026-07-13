import React, { useState } from "react";
import axios from "axios";
import { 
  X, Upload, FileText, Calendar, Building2, CheckCircle, 
  Sparkles, Send, AlertCircle, Loader2, MapPin, Briefcase, 
  Users, DollarSign, Plus, Trash2, Lightbulb, Target, ChevronRight
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Dropdown Options
const LOCATIONS = [
  "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", 
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal", "Indore", "Nagpur",
  "Kochi", "Coimbatore", "Visakhapatnam", "Thiruvananthapuram", "Guwahati",
  "Pan India", "Remote - India", "United States", "United Kingdom", "Singapore", 
  "UAE", "Germany", "Remote - Global", "Other"
];

const BUSINESS_MODELS = ["B2B", "B2C", "B2B2C", "D2C", "SaaS", "Marketplace", "Consulting", "Manufacturing", "Services", "Other"];

const WORK_MODES = ["Work from Office", "Remote", "Hybrid (2-3 days office)", "Hybrid (3-4 days office)", "Field Work", "Client Location"];

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD"];

// Quick profile types for guided wizard
const PROFILE_TYPES = [
  { id: "engineering", label: "Engineering / Technology", icon: "💻" },
  { id: "sales", label: "Sales & Business Development", icon: "📈" },
  { id: "marketing", label: "Marketing & Communications", icon: "📣" },
  { id: "operations", label: "Operations & Support", icon: "⚙️" },
  { id: "finance", label: "Finance & Accounting", icon: "💰" },
  { id: "hr", label: "Human Resources", icon: "👥" },
  { id: "product", label: "Product & Design", icon: "🎨" },
  { id: "leadership", label: "Leadership / Management", icon: "👔" },
  { id: "other", label: "Other", icon: "📋" }
];

const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level (0-2 yrs)", min: 0, max: 2 },
  { id: "mid", label: "Mid Level (3-5 yrs)", min: 3, max: 5 },
  { id: "senior", label: "Senior (6-10 yrs)", min: 6, max: 10 },
  { id: "lead", label: "Lead / Principal (10+ yrs)", min: 10, max: 15 }
];

// Optional Quick Start Wizard for Staffing
const StaffingQuickWizard = ({ onComplete, onSkip }) => {
  const [wizardData, setWizardData] = useState({
    profileType: "",
    roleTitle: "",
    experienceLevel: "",
    keySkills: "",
    clientName: ""
  });

  const handleComplete = () => {
    const expLevel = EXPERIENCE_LEVELS.find(e => e.id === wizardData.experienceLevel);
    onComplete({
      title: wizardData.roleTitle,
      clientName: wizardData.clientName,
      experienceMin: expLevel?.min || 0,
      experienceMax: expLevel?.max || 5,
      keySkills: wizardData.keySkills
    });
  };

  const canComplete = wizardData.roleTitle.trim() && wizardData.clientName.trim();

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Quick Start Wizard</h3>
          <p className="text-sm text-gray-500">Tell us what you're looking for - we'll help structure the JD</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
          <input
            type="text"
            placeholder="e.g., ABC Technologies"
            value={wizardData.clientName}
            onChange={(e) => setWizardData(prev => ({ ...prev, clientName: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role Title *</label>
          <input
            type="text"
            placeholder="e.g., Senior Software Engineer"
            value={wizardData.roleTitle}
            onChange={(e) => setWizardData(prev => ({ ...prev, roleTitle: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Type</label>
          <select
            value={wizardData.profileType}
            onChange={(e) => setWizardData(prev => ({ ...prev, profileType: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select type...</option>
            {PROFILE_TYPES.map(p => (
              <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <select
            value={wizardData.experienceLevel}
            onChange={(e) => setWizardData(prev => ({ ...prev, experienceLevel: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select level...</option>
            {EXPERIENCE_LEVELS.map(e => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., Python, React, AWS, Leadership..."
          value={wizardData.keySkills}
          onChange={(e) => setWizardData(prev => ({ ...prev, keySkills: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onSkip}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Skip wizard, paste JD text directly
        </button>
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Pre-fill & Continue
        </button>
      </div>
    </div>
  );
};

// Multi-select chip component for locations
const LocationMultiSelect = ({ selected, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleLocation = (loc) => {
    if (selected.includes(loc)) {
      onChange(selected.filter(l => l !== loc));
    } else {
      onChange([...selected, loc]);
    }
  };
  
  const removeLocation = (loc) => {
    onChange(selected.filter(l => l !== loc));
  };
  
  return (
    <div className="relative">
      <div 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[42px] cursor-pointer bg-white flex flex-wrap gap-1 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">Select locations...</span>
        ) : (
          selected.map(loc => (
            <span key={loc} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              {loc}
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); removeLocation(loc); }}
                className="hover:text-emerald-900"
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
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map(loc => (
              <div
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-3 py-2 cursor-pointer hover:bg-emerald-50 flex items-center justify-between ${
                  selected.includes(loc) ? 'bg-emerald-50 text-emerald-700' : ''
                }`}
              >
                <span>{loc}</span>
                {selected.includes(loc) && <CheckCircle className="w-4 h-4 text-emerald-600" />}
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
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
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

const VendorJDUpload = ({ onClose, onSuccess }) => {
  const [showWizard, setShowWizard] = useState(true); // Show optional wizard first
  const [step, setStep] = useState(1); // 1: Upload, 2: Review & Submit
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("paste"); // paste or file
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState(null);
  const [jdTitle, setJdTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [requisitionDate, setRequisitionDate] = useState(new Date().toISOString().split('T')[0]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // New fields
  const [compensationMin, setCompensationMin] = useState("");
  const [compensationMax, setCompensationMax] = useState("");
  const [compensationCurrency, setCompensationCurrency] = useState("INR");
  const [locations, setLocations] = useState([]);
  const [experienceMin, setExperienceMin] = useState("");
  const [experienceMax, setExperienceMax] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [reportingTo, setReportingTo] = useState("");
  const [teamHandling, setTeamHandling] = useState("");
  const [responsibilities, setResponsibilities] = useState([""]);

  // Handle wizard completion - pre-populate form with wizard data
  const handleWizardComplete = (wizardData) => {
    setJdTitle(wizardData.title || "");
    setClientName(wizardData.clientName || "");
    setExperienceMin(wizardData.experienceMin?.toString() || "");
    setExperienceMax(wizardData.experienceMax?.toString() || "");
    
    // Pre-fill JD text with skills if provided
    if (wizardData.keySkills) {
      const skillsList = wizardData.keySkills.split(',').map(s => s.trim()).filter(Boolean);
      const prefilledText = `Role: ${wizardData.title}\n\nKey Skills Required:\n${skillsList.map(s => `• ${s}`).join('\n')}\n\n[Add more details about the role here...]`;
      setJdText(prefilledText);
    }
    
    setShowWizard(false);
  };

  const handleSkipWizard = () => {
    setShowWizard(false);
  };

  // Add/Remove responsibility
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };
  
  const removeResponsibility = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };
  
  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setLoading(true);
    
    const filename = uploadedFile.name.toLowerCase();
    
    // For TXT files, read directly
    if (filename.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJdText(event.target.result);
        setLoading(false);
      };
      reader.onerror = () => {
        alert("Failed to read file");
        setLoading(false);
      };
      reader.readAsText(uploadedFile);
    } 
    // For PDF, DOCX, DOC, and RTF files, use backend parser
    else if (filename.endsWith('.pdf') || filename.endsWith('.docx') || filename.endsWith('.doc') || filename.endsWith('.rtf')) {
      try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        const res = await axios.post(`${API}/jd/parse-file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (res.data.success && res.data.text) {
          setJdText(res.data.text);
        } else {
          alert("Could not extract text from file");
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        alert(err.response?.data?.detail || "Failed to parse file. Please try pasting the text instead.");
      } finally {
        setLoading(false);
      }
    }
    // Unsupported format
    else {
      alert("Unsupported file format. Please upload PDF, DOCX, DOC, RTF, or TXT files.");
      setFile(null);
      setLoading(false);
    }
  };

  const runAiAnalysis = async () => {
    if (!jdText.trim()) {
      alert("Please enter or upload JD text first");
      return;
    }
    
    setAnalyzing(true);
    try {
      const res = await axios.post(`${API}/jd/analyze`, {
        title: jdTitle || "Uploaded JD",
        company: clientName,
        raw_text: jdText
      });
      setAiAnalysis(res.data);
      if (!jdTitle && res.data.title) {
        setJdTitle(res.data.title);
      }
    } catch (e) {
      console.error("Error analyzing JD:", e);
      alert("Failed to analyze JD. You can still submit without analysis.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!jdText.trim()) {
      alert("Please enter or upload JD text");
      return;
    }
    if (!jdTitle.trim()) {
      alert("Please enter a job title");
      return;
    }
    if (!clientName.trim()) {
      alert("Please enter client name");
      return;
    }
    
    setSubmitting(true);
    try {
      // Filter out empty responsibilities
      const validResponsibilities = responsibilities.filter(r => r.trim());
      
      // Create the JD with vendor-specific fields
      // Note: No external application links - all applications go through RoleSense platform
      const res = await axios.post(`${API}/jd/vendor/upload`, {
        title: jdTitle,
        client_name: clientName,
        requisition_date: requisitionDate,
        raw_text: jdText,
        ai_analysis: aiAnalysis,
        // New fields
        compensation_min: compensationMin ? parseFloat(compensationMin) : null,
        compensation_max: compensationMax ? parseFloat(compensationMax) : null,
        compensation_currency: compensationCurrency,
        location: locations.length > 0 ? locations.join(", ") : null,
        locations: locations,
        experience_min: experienceMin ? parseInt(experienceMin) : null,
        experience_max: experienceMax ? parseInt(experienceMax) : null,
        business_model: businessModel || null,
        work_mode: workMode || null,
        reporting_to: reportingTo || null,
        team_handling: teamHandling || null,
        responsibilities: validResponsibilities.length > 0 ? validResponsibilities : null
      });
      
      // Auto-submit to active jobs
      await axios.post(`${API}/jd/${res.data.id}/submit`);
      
      alert(`JD published successfully!\n\nRequisition #: ${res.data.requisition_number || 'Generated'}\n\nGo to Active Jobs to get the RoleSense share link for social media.`);
      onSuccess && onSuccess();
      onClose();
    } catch (e) {
      console.error("Error submitting JD:", e);
      alert(e.response?.data?.detail || "Failed to submit JD. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-start justify-center pt-8 pb-20">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Quick JD Upload</h2>
                <p className="text-emerald-100 text-sm mt-1">Upload or paste client JD for fast publishing</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mt-6">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-emerald-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 1 ? 'bg-white text-emerald-600' : step > 1 ? 'bg-emerald-400 text-white' : 'bg-emerald-500/50'
                }`}>
                  {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                </div>
                <span className="text-sm font-medium">Upload JD</span>
              </div>
              <div className="w-12 h-0.5 bg-emerald-400/50" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-emerald-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 2 ? 'bg-white text-emerald-600' : 'bg-emerald-500/50'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Review & Publish</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 1 && (
              <div className="space-y-6">
                {/* Client Info */}
                {/* Optional Quick Start Wizard */}
                {showWizard && (
                  <StaffingQuickWizard 
                    onComplete={handleWizardComplete}
                    onSkip={handleSkipWizard}
                  />
                )}

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" /> Client Information
                  </h3>
                  
                  {/* Row 1: Client Name, Job Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter client company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                      <input
                        type="text"
                        value={jdTitle}
                        onChange={(e) => setJdTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>
                  </div>
                  
                  {/* Row 2: Location, Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" /> Locations * (Multiple)
                      </label>
                      <LocationMultiSelect
                        selected={locations}
                        onChange={setLocations}
                        options={LOCATIONS}
                      />
                      {locations.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">{locations.length} location(s) selected</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Briefcase className="w-4 h-4 inline mr-1" /> Experience (Years)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={experienceMin}
                          onChange={(e) => setExperienceMin(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                          placeholder="Min"
                        />
                        <span className="flex items-center text-gray-400">to</span>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={experienceMax}
                          onChange={(e) => setExperienceMax(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Row 3: Compensation */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <DollarSign className="w-4 h-4 inline mr-1" /> Compensation Offered
                    </label>
                    <div className="flex gap-2 items-center">
                      <select
                        value={compensationCurrency}
                        onChange={(e) => setCompensationCurrency(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 bg-white w-24"
                      >
                        {CURRENCIES.map(curr => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        value={compensationMin}
                        onChange={(e) => setCompensationMin(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Min (e.g., 500000)"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="number"
                        min="0"
                        value={compensationMax}
                        onChange={(e) => setCompensationMax(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Max (e.g., 800000)"
                      />
                      <span className="text-sm text-gray-500">/ Year</span>
                    </div>
                  </div>
                  
                  {/* Row 4: Business Model, Work Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Model</label>
                      <select
                        value={businessModel}
                        onChange={(e) => setBusinessModel(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="">Select Model</option>
                        {BUSINESS_MODELS.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                      <select
                        value={workMode}
                        onChange={(e) => setWorkMode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="">Select Mode</option>
                        {WORK_MODES.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Row 5: Reporting To, Team Handling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Users className="w-4 h-4 inline mr-1" /> Reporting To
                      </label>
                      <input
                        type="text"
                        value={reportingTo}
                        onChange={(e) => setReportingTo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Engineering Manager, VP Sales"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Users className="w-4 h-4 inline mr-1" /> Team Handling
                      </label>
                      <input
                        type="text"
                        value={teamHandling}
                        onChange={(e) => setTeamHandling(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., 5-10 members, No direct reports"
                      />
                    </div>
                  </div>
                  
                  {/* Row 6: Requisition Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requisition Date Received *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={requisitionDate}
                          onChange={(e) => setRequisitionDate(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* RoleSense Platform Application Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-1">Applications via RoleSense Platform</h4>
                      <p className="text-sm text-indigo-700 mb-3">
                        All candidate applications will be received through the RoleSense platform. This ensures:
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
                          Automatic pre-assessment & Career Trajectory analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          Centralized candidate pipeline management
                        </li>
                      </ul>
                      <div className="mt-4 pt-3 border-t border-indigo-200">
                        <p className="text-xs text-indigo-500">
                          🔗 A unique RoleSense job link will be generated after publishing. Share this link on LinkedIn, job boards, and social media.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Method Toggle */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                  <button
                    onClick={() => setUploadMethod("paste")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      uploadMethod === "paste" ? "bg-white shadow-sm text-gray-900" : "text-gray-600"
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Paste Text
                  </button>
                  <button
                    onClick={() => setUploadMethod("file")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      uploadMethod === "file" ? "bg-white shadow-sm text-gray-900" : "text-gray-600"
                    }`}
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload File
                  </button>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                  {uploadMethod === "paste" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Paste Job Description *
                      </label>
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 min-h-[300px]"
                        placeholder="Paste the complete job description here..."
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx,.rtf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="jd-file-upload"
                      />
                      <label 
                        htmlFor="jd-file-upload"
                        className="cursor-pointer block"
                      >
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-emerald-600" />
                        </div>
                        <p className="text-gray-700 font-medium">
                          {file ? file.name : "Click to upload JD file"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Supports TXT, PDF, DOC, DOCX, RTF
                        </p>
                      </label>
                      
                      {loading && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Reading file...
                        </div>
                      )}
                      
                      {jdText && !loading && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 text-left max-h-48 overflow-y-auto">
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{jdText.substring(0, 500)}...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Additional Responsibilities Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-amber-900 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Additional Responsibilities (Optional)
                    </h4>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={addResponsibility}
                      className="border-amber-300 hover:bg-amber-100"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  <p className="text-sm text-amber-700 mb-4">
                    Add any additional responsibilities not mentioned in the JD text above
                  </p>
                  <div className="space-y-3">
                    {responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => updateResponsibility(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                          placeholder={`Responsibility ${index + 1}`}
                        />
                        {responsibilities.length > 1 && (
                          <button
                            onClick={() => removeResponsibility(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Analysis Option */}
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        AI Analysis (Optional)
                      </h4>
                      <p className="text-sm text-purple-700 mt-1">
                        Extract skills, requirements, and get quality insights
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={runAiAnalysis}
                      disabled={analyzing || !jdText.trim()}
                      className="border-purple-300 hover:bg-purple-50"
                    >
                      {analyzing ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                      ) : (
                        <><Sparkles className="w-4 h-4 text-purple-600" /> Run Analysis</>
                      )}
                    </Button>
                  </div>
                  
                  {aiAnalysis && (
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      {/* Quality Score & Key Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-emerald-600">
                            {aiAnalysis.parsed_data?.quality_score || aiAnalysis.analysis?.quality_score || 'N/A'}%
                          </div>
                          <div className="text-xs text-gray-500">Quality Score</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {(aiAnalysis.parsed_data?.required_skills?.length || 0) + (aiAnalysis.parsed_data?.preferred_skills?.length || 0)}
                          </div>
                          <div className="text-xs text-gray-500">Skills Found</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-purple-600">
                            {aiAnalysis.parsed_data?.experience_years?.min != null 
                              ? `${aiAnalysis.parsed_data.experience_years.min}${aiAnalysis.parsed_data.experience_years.max ? '-' + aiAnalysis.parsed_data.experience_years.max : '+'} yrs`
                              : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">Experience</div>
                        </div>
                      </div>
                      
                      {/* Extracted Skills */}
                      {aiAnalysis.parsed_data?.required_skills?.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-purple-800 mb-2">Required Skills:</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.parsed_data.required_skills.map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Location & Salary */}
                      <div className="flex gap-4 mb-4 text-sm">
                        {aiAnalysis.parsed_data?.location && aiAnalysis.parsed_data.location !== 'Not specified' && (
                          <span className="text-gray-600">
                            📍 {aiAnalysis.parsed_data.location}
                          </span>
                        )}
                        {aiAnalysis.parsed_data?.salary_range?.min && (
                          <span className="text-gray-600">
                            💰 {aiAnalysis.parsed_data.salary_range.min}-{aiAnalysis.parsed_data.salary_range.max} {aiAnalysis.parsed_data.salary_range.currency}
                          </span>
                        )}
                      </div>
                      
                      {/* Quality Reason */}
                      {aiAnalysis.parsed_data?.why_quality_score && (
                        <div className="bg-white rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-600">
                            <strong className="text-gray-800">Analysis:</strong> {aiAnalysis.parsed_data.why_quality_score}
                          </p>
                        </div>
                      )}
                      
                      {/* Improvement Suggestions */}
                      {aiAnalysis.improvement_suggestions?.length > 0 && (
                        <div className="bg-amber-50 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-medium text-amber-800 mb-2">💡 Suggestions:</h5>
                          <ul className="text-sm text-amber-700 space-y-1">
                            {aiAnalysis.improvement_suggestions.map((suggestion, i) => (
                              <li key={i}>• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <p className="text-sm text-purple-700">
                        <CheckCircle className="w-4 h-4 inline text-green-500 mr-1" />
                        Analysis complete. Proceed to review and publish.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-900">Ready to Publish</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Job Title:</span>
                      <span className="ml-2 font-medium">{jdTitle}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <span className="ml-2 font-medium">{clientName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <span className="ml-2 font-medium">{locations.length > 0 ? locations.join(", ") : 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Experience:</span>
                      <span className="ml-2 font-medium">
                        {experienceMin || experienceMax ? `${experienceMin || 0}-${experienceMax || '+'} years` : 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Compensation:</span>
                      <span className="ml-2 font-medium">
                        {compensationMin || compensationMax 
                          ? `${compensationCurrency} ${compensationMin?.toLocaleString() || 0} - ${compensationMax?.toLocaleString() || 'Open'}` 
                          : 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Work Mode:</span>
                      <span className="ml-2 font-medium">{workMode || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Business Model:</span>
                      <span className="ml-2 font-medium">{businessModel || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Reporting To:</span>
                      <span className="ml-2 font-medium">{reportingTo || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Team Handling:</span>
                      <span className="ml-2 font-medium">{teamHandling || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Requisition Date:</span>
                      <span className="ml-2 font-medium">{new Date(requisitionDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">AI Analysis:</span>
                      <span className={`ml-2 font-medium ${aiAnalysis ? 'text-green-600' : 'text-gray-400'}`}>
                        {aiAnalysis ? 'Completed' : 'Skipped'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Responsibilities */}
                  {responsibilities.filter(r => r.trim()).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-emerald-200">
                      <span className="text-gray-500 text-sm">Additional Responsibilities:</span>
                      <ul className="mt-2 space-y-1">
                        {responsibilities.filter(r => r.trim()).map((resp, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-emerald-500">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* JD Preview */}
                <div className="border rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Job Description Preview</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{jdText}</p>
                  </div>
                </div>

                {/* Publish Notice */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Publishing Information</h5>
                      <p className="text-sm text-blue-700 mt-1">
                        This JD will be added to your Active Jobs and publish links will be generated for LinkedIn, Indeed, Naukri, Glassdoor, and other platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="text-sm text-gray-500">
              {step === 1 && jdText.length > 0 && (
                <span className="text-emerald-600">
                  {jdText.length} characters • Ready to proceed
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              
              {step === 1 ? (
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!jdText.trim() || !jdTitle.trim() || !clientName.trim()}
                >
                  Continue to Review
                </Button>
              ) : (
                <Button 
                  variant="success"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit & Publish</>
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

export default VendorJDUpload;
