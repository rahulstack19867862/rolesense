import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  X, Plus, CheckCircle, ChevronRight, Building2, Save, AlertCircle
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

const StructuredJDEditor = ({ jd, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [masterData, setMasterData] = useState(null);
  const [competencyData, setCompetencyData] = useState(null);
  const [toolsData, setToolsData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  
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
  
  const [responsibilities, setResponsibilities] = useState([""]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [goodToHaveSkillInput, setGoodToHaveSkillInput] = useState("");

  // Load existing JD data
  useEffect(() => {
    if (jd) {
      setBasicInfo(jd.basic_info || {
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
      setCompetencies(jd.competencies || {
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
      setResponsibilities(jd.responsibilities?.length > 0 ? jd.responsibilities : [""]);
      setAdditionalNotes(jd.additional_notes || "");
    }
  }, [jd]);

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

  const handleFieldChange = (setter) => (value) => {
    setter(value);
    setHasChanges(true);
  };

  const addSkill = (type) => {
    const input = type === 'must_have' ? skillInput : goodToHaveSkillInput;
    if (!input.trim()) return;
    
    if (type === 'must_have') {
      setCompetencies(prev => ({ ...prev, must_have_skills: [...prev.must_have_skills, input.trim()] }));
      setSkillInput("");
    } else {
      setCompetencies(prev => ({ ...prev, good_to_have_skills: [...prev.good_to_have_skills, input.trim()] }));
      setGoodToHaveSkillInput("");
    }
    setHasChanges(true);
  };

  const removeSkill = (type, index) => {
    if (type === 'must_have') {
      setCompetencies(prev => ({ ...prev, must_have_skills: prev.must_have_skills.filter((_, i) => i !== index) }));
    } else {
      setCompetencies(prev => ({ ...prev, good_to_have_skills: prev.good_to_have_skills.filter((_, i) => i !== index) }));
    }
    setHasChanges(true);
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
    setHasChanges(true);
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
    setHasChanges(true);
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
    setHasChanges(true);
  };
  
  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
    setHasChanges(true);
  };
  
  const removeResponsibility = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const validateStep1 = () => basicInfo.company_name && basicInfo.title && basicInfo.role_type;
  const validateStep2 = () => competencies.must_have_skills.length >= 4 && competencies.good_to_have_skills.length >= 3;

  const handleSave = async () => {
    if (!validateStep2()) {
      alert("Please add at least 4 must-have skills and 3 good-to-have skills");
      return;
    }
    
    setSaving(true);
    try {
      await axios.put(`${API}/jd/structured/${jd.id}`, {
        basic_info: basicInfo,
        competencies: competencies,
        responsibilities: responsibilities.filter(r => r.trim()),
        additional_notes: additionalNotes
      });
      setHasChanges(false);
      onSuccess && onSuccess();
      onClose();
    } catch (e) {
      console.error("Error updating JD:", e);
      alert(e.response?.data?.detail || "Failed to update JD. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Loading JD Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-start justify-center pt-8 pb-20">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Edit Job Description</h2>
                <p className="text-amber-100 text-sm mt-1">
                  Modify your JD • {hasChanges && <span className="text-yellow-200">Unsaved changes</span>}
                </p>
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
                    step === s.num ? 'bg-white text-amber-600' : 
                    step > s.num ? 'bg-amber-400 text-white' : 'bg-amber-500/50 text-amber-200'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-2 text-sm ${step === s.num ? 'text-white font-medium' : 'text-amber-200'}`}>{s.label}</span>
                  {i < 2 && <ChevronRight className="w-5 h-5 mx-3 text-amber-300" />}
                </div>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-amber-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">You are editing an existing JD. Changes will be saved when you click "Save Changes".</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={basicInfo.company_name}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, company_name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      value={basicInfo.title}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
                  <textarea
                    value={basicInfo.about_company || ""}
                    onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, about_company: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    rows={3}
                    placeholder="Brief description of the company..."
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Type *</label>
                    <select
                      value={basicInfo.role_type}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, role_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      {masterData?.role_types?.map(rt => (
                        <option key={rt} value={rt}>{rt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Model</label>
                    <select
                      value={basicInfo.business_model}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, business_model: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      {masterData?.business_models?.map(bm => (
                        <option key={bm} value={bm}>{bm}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Experience</label>
                    <input
                      type="number"
                      value={basicInfo.experience_min}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, experience_min: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Experience</label>
                    <input
                      type="number"
                      value={basicInfo.experience_max}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, experience_max: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      min={0}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                    <select
                      value={basicInfo.work_mode}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, work_mode: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      {masterData?.work_modes?.map(wm => (
                        <option key={wm} value={wm}>{wm}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      value={basicInfo.employment_type}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, employment_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      {masterData?.employment_types?.map(et => (
                        <option key={et} value={et}>{et}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                    <select
                      value={basicInfo.education_level}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, education_level: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      {masterData?.education_levels?.map(el => (
                        <option key={el} value={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compensation Min</label>
                    <input
                      type="number"
                      value={basicInfo.compensation_min || ""}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, compensation_min: e.target.value ? parseFloat(e.target.value) : null })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., 1000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compensation Max</label>
                    <input
                      type="number"
                      value={basicInfo.compensation_max || ""}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, compensation_max: e.target.value ? parseFloat(e.target.value) : null })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., 1500000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={basicInfo.compensation_currency}
                      onChange={(e) => handleFieldChange(setBasicInfo)({ ...basicInfo, compensation_currency: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Competencies */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Must-Have Skills */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Must-Have Skills *</h3>
                  <p className="text-sm text-red-700 mb-4">Add at least 4 essential skills required for this role.</p>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('must_have')}
                      className="flex-1 border border-red-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                      placeholder="Type a skill and press Enter"
                    />
                    <Button variant="danger" onClick={() => addSkill('must_have')}>
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {competencies.must_have_skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button onClick={() => removeSkill('must_have', i)} className="hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className={`text-sm mt-2 ${competencies.must_have_skills.length >= 4 ? 'text-green-600' : 'text-red-600'}`}>
                    {competencies.must_have_skills.length}/4 minimum skills added
                  </p>
                </div>
                
                {/* Good-to-Have Skills */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Good-to-Have Skills *</h3>
                  <p className="text-sm text-amber-700 mb-4">Add at least 3 preferred skills.</p>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={goodToHaveSkillInput}
                      onChange={(e) => setGoodToHaveSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('good_to_have')}
                      className="flex-1 border border-amber-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                      placeholder="Type a skill and press Enter"
                    />
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => addSkill('good_to_have')}>
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {competencies.good_to_have_skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button onClick={() => removeSkill('good_to_have', i)} className="hover:text-amber-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className={`text-sm mt-2 ${competencies.good_to_have_skills.length >= 3 ? 'text-green-600' : 'text-amber-600'}`}>
                    {competencies.good_to_have_skills.length}/3 minimum skills added
                  </p>
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
                              competencies.tools_must_have.includes(tool) ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

                {/* Additional Notes */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Notes</h3>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => {
                      setAdditionalNotes(e.target.value);
                      setHasChanges(true);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                    rows={3}
                    placeholder="Any additional information about this role..."
                  />
                </div>
              </div>
            )}
            
            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-amber-600" />
                    <h3 className="text-lg font-semibold text-amber-900">Review Your Changes</h3>
                  </div>
                  <p className="text-amber-700">Please review all the changes before saving.</p>
                </div>
                
                <div className="bg-white border rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-600" /> Basic Information
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
                  </div>
                </div>
                
                <div className="bg-white border rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Skills & Competencies</h4>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-red-700">Must-Have Skills ({competencies.must_have_skills.length}):</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {competencies.must_have_skills.map((skill, i) => (
                        <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-amber-700">Good-to-Have Skills ({competencies.good_to_have_skills.length}):</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {competencies.good_to_have_skills.map((skill, i) => (
                        <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
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
                <span className={competencies.must_have_skills.length >= 4 && competencies.good_to_have_skills.length >= 3 ? 'text-green-600' : 'text-red-600'}>
                  {competencies.must_have_skills.length >= 4 && competencies.good_to_have_skills.length >= 3 
                    ? '✓ All requirements met' 
                    : `Need ${Math.max(0, 4 - competencies.must_have_skills.length)} more must-have, ${Math.max(0, 3 - competencies.good_to_have_skills.length)} more good-to-have`}
                </span>
              )}
              {hasChanges && <span className="ml-2 text-amber-600">• Unsaved changes</span>}
            </div>
            
            <div className="flex items-center gap-3">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
              
              {step < 3 ? (
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !validateStep1() : !validateStep2()}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="success" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Saving...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Changes</>
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

export default StructuredJDEditor;
