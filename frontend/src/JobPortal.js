import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Briefcase, MapPin, Building2, Clock, Search, Filter,
  ChevronRight, Users, Star, Send, Upload, FileText,
  CheckCircle, AlertCircle, X, Loader2, Globe, Calendar,
  DollarSign, GraduationCap, TrendingUp, Award, ArrowRight,
  ExternalLink, Linkedin, Twitter, Facebook, Mail, Phone,
  ChevronDown, Bookmark, Share2, Eye, Heart
} from "lucide-react";
import { RSCircleLogo } from "./RSLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UI Components ============
const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    ghost: "hover:bg-gray-100 text-gray-700"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return (
    <button 
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700"
  };
  return (
    <span className={`${variants[variant]} px-2.5 py-1 rounded-full text-xs font-medium`}>
      {children}
    </span>
  );
};

// ============ Job Portal Main Component ============
const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFunction, setFilterFunction] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterWorkMode, setFilterWorkMode] = useState("");
  const [filterSource, setFilterSource] = useState("all"); // all, corporate, staffing
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Application form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume_text: "",
    cover_letter: "",
    linkedin_url: "",
    current_company: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [parsing, setParsing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/jd/active/list`);
      setJobs(response.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setResumeFile(file);
    setParsing(true);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);
      
      const response = await axios.post(`${API}/jd/parse-file`, formDataObj);
      if (response.data.text) {
        setFormData(prev => ({ ...prev, resume_text: response.data.text }));
      }
    } catch (error) {
      console.error("Failed to parse resume:", error);
    } finally {
      setParsing(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob || !formData.name || !formData.email || !formData.resume_text) {
      alert("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    try {
      const applicationData = {
        candidate_name: formData.name,
        candidate_email: formData.email,
        candidate_phone: formData.phone,
        resume_text: formData.resume_text,
        cover_letter: formData.cover_letter,
        linkedin_url: formData.linkedin_url,
        current_company: formData.current_company,
        current_ctc: formData.current_ctc,
        expected_ctc: formData.expected_ctc,
        notice_period: formData.notice_period,
        source: "job_portal"
      };
      
      await axios.post(`${API}/apply/${selectedJob.id}`, applicationData);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowApplyModal(false);
        setSubmitSuccess(false);
        setFormData({
          name: "", email: "", phone: "", resume_text: "", cover_letter: "",
          linkedin_url: "", current_company: "", current_ctc: "", expected_ctc: "", notice_period: ""
        });
        setResumeFile(null);
      }, 3000);
    } catch (error) {
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get unique values for filters
  const functions = [...new Set(jobs.map(j => j.primary_function).filter(Boolean))];
  const locations = [...new Set(jobs.flatMap(j => j.basic_info?.locations_india || []))];

  const formatSalary = (min, max, currency = "INR") => {
    if (!min && !max) return "Not Disclosed";
    const format = (num) => {
      if (num >= 10000000) return `${(num/10000000).toFixed(1)}Cr`;
      if (num >= 100000) return `${(num/100000).toFixed(1)}L`;
      return num.toLocaleString();
    };
    return `${currency} ${format(min)} - ${format(max)}`;
  };

  // Filter jobs by source (corporate/staffing)
  const filteredJobs = jobs.filter(job => {
    const basicInfo = job.basic_info || {};
    const matchesSearch = !searchTerm || 
      (job.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (basicInfo.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.company?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (basicInfo.company_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.client_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !filterLocation || 
      (job.location?.toLowerCase().includes(filterLocation.toLowerCase())) ||
      (basicInfo.locations_india?.some(l => l.toLowerCase().includes(filterLocation.toLowerCase())));
    
    const matchesSource = filterSource === "all" || 
      (filterSource === "corporate" && job.source !== "vendor_upload") ||
      (filterSource === "staffing" && job.source === "vendor_upload");
    
    const matchesFunction = !filterFunction || job.primary_function === filterFunction;
    const matchesExperience = !filterExperience || 
      ((basicInfo.experience_min || 0) <= parseInt(filterExperience) && (basicInfo.experience_max || 99) >= parseInt(filterExperience));
    const matchesWorkMode = !filterWorkMode || basicInfo.work_mode?.includes(filterWorkMode);
    
    return matchesSearch && matchesLocation && matchesSource && matchesFunction && matchesExperience && matchesWorkMode;
  });

  const corporateJobs = jobs.filter(j => j.source !== "vendor_upload");
  const staffingJobs = jobs.filter(j => j.source === "vendor_upload");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header - Matching Landing Page Style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <RSCircleLogo size={40} />
              <div>
                <span className="text-xl font-semibold text-gray-900 tracking-tight">Role<span className="text-purple-600">Sense</span></span>
                <span className="block text-xs text-gray-500 font-light">Careers</span>
              </div>
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setFilterSource("all")}
                className={`text-sm transition-colors ${filterSource === "all" ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                All Jobs ({jobs.length})
              </button>
              <button 
                onClick={() => setFilterSource("corporate")}
                className={`text-sm transition-colors flex items-center gap-2 ${filterSource === "corporate" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Building2 className="w-4 h-4" />
                Corporate ({corporateJobs.length})
              </button>
              <button 
                onClick={() => setFilterSource("staffing")}
                className={`text-sm transition-colors flex items-center gap-2 ${filterSource === "staffing" ? "text-purple-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Users className="w-4 h-4" />
                Staffing Partners ({staffingJobs.length})
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
              >
                For Employers
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Matching Landing Page */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full text-white text-sm font-medium mb-8">
              <Briefcase className="w-4 h-4" />
              {jobs.length}+ Open Positions
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extralight text-gray-900 tracking-tight mb-6">
              Find Your{" "}
              <span className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-light max-w-2xl mx-auto mb-10">
              Browse opportunities from top corporate clients and staffing partners. 
              Apply directly with your resume.
            </p>
            
            {/* Search Bar - Premium Design */}
            <div className="bg-white rounded-2xl p-3 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{corporateJobs.length}</div>
                <div className="text-sm text-gray-500">Corporate Jobs</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{staffingJobs.length}</div>
                <div className="text-sm text-gray-500">Staffing Jobs</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-500">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Tabs */}
      <div className="md:hidden sticky top-20 z-30 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <button 
            onClick={() => setFilterSource("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filterSource === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            All ({jobs.length})
          </button>
          <button 
            onClick={() => setFilterSource("corporate")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filterSource === "corporate" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Corporate ({corporateJobs.length})
          </button>
          <button 
            onClick={() => setFilterSource("staffing")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filterSource === "staffing" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Staffing ({staffingJobs.length})
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-xs text-gray-500">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{[...new Set(jobs.map(j => j.basic_info?.company_name))].length}</div>
                <div className="text-xs text-gray-500">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{functions.length}</div>
                <div className="text-xs text-gray-500">Functions</div>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Function</label>
                <select
                  value={filterFunction}
                  onChange={(e) => setFilterFunction(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">All Functions</option>
                  {functions.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Experience (Years)</label>
                <select
                  value={filterExperience}
                  onChange={(e) => setFilterExperience(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Experience</option>
                  <option value="0">Fresher (0-1)</option>
                  <option value="2">2-4 Years</option>
                  <option value="5">5-8 Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Work Mode</label>
                <select
                  value={filterWorkMode}
                  onChange={(e) => setFilterWorkMode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any Mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterFunction("");
                    setFilterLocation("");
                    setFilterExperience("");
                    setFilterWorkMode("");
                    setSearchTerm("");
                  }}
                  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {filteredJobs.length} Jobs Found
              </h2>
              <select className="px-3 py-2 border rounded-lg text-sm">
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
                <option>Experience: Low to High</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onSelect={() => setSelectedJob(job)}
                    onApply={() => { setSelectedJob(job); setShowApplyModal(true); }}
                    isSelected={selectedJob?.id === job.id}
                    formatSalary={formatSalary}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Job Detail Panel (Desktop) */}
          {selectedJob && !showApplyModal && (
            <div className="hidden lg:block w-[450px] sticky top-24 h-fit">
              <JobDetailPanel 
                job={selectedJob} 
                onApply={() => setShowApplyModal(true)}
                onClose={() => setSelectedJob(null)}
                formatSalary={formatSalary}
              />
            </div>
          )}
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Apply for {selectedJob.basic_info?.title}</h2>
                <p className="text-gray-500">{selectedJob.basic_info?.company_name}</p>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-4">Thank you for applying. Your application is now under review.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
                  <p className="text-sm text-blue-800 font-medium mb-2">What happens next?</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Our team will review your application</li>
                    <li>• If shortlisted, you will receive a Pre-Assessment form</li>
                    <li>• Complete the assessment to proceed further</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-400 mt-4">Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="p-6 space-y-6">
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      {parsing ? (
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                      ) : resumeFile ? (
                        <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      )}
                      <p className="text-sm text-gray-600">
                        {resumeFile ? resumeFile.name : "Click to upload your resume"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </label>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                {/* Current Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                    <input
                      type="text"
                      value={formData.current_company}
                      onChange={(e) => setFormData({...formData, current_company: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                    <select
                      value={formData.notice_period}
                      onChange={(e) => setFormData({...formData, notice_period: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="Immediate">Immediate</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current CTC (LPA)</label>
                    <input
                      type="text"
                      value={formData.current_ctc}
                      onChange={(e) => setFormData({...formData, current_ctc: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected CTC (LPA)</label>
                    <input
                      type="text"
                      value={formData.expected_ctc}
                      onChange={(e) => setFormData({...formData, expected_ctc: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 15"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                  <textarea
                    value={formData.cover_letter}
                    onChange={(e) => setFormData({...formData, cover_letter: e.target.value})}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="Tell us why you're interested in this role..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting || !formData.resume_text} className="flex-1">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <RSCircleLogo size={32} />
                <span className="font-bold text-white">Role<span className="text-purple-400">Sense</span> Jobs</span>
              </div>
              <p className="text-sm">Your gateway to career opportunities from top companies.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/jobs" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Career Resources</a></li>
                <li><a href="#" className="hover:text-white">Resume Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Post a Job</a></li>
                <li><a href="/" className="hover:text-white">RoleSense Platform</a></li>
                <li><a href="/" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="mailto:info@rolesense.in" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm">
                <a href="mailto:info@rolesense.in" className="hover:text-white">info@rolesense.in</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 RoleSense. A product of ALLY EXECUTIVE HR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============ Job Card Component ============
const JobCard = ({ job, onSelect, onApply, isSelected, formatSalary }) => {
  const basicInfo = job.basic_info || {};
  const daysAgo = job.published_at ? Math.floor((Date.now() - new Date(job.published_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const isStaffing = job.source === "vendor_upload";
  
  return (
    <div 
      onClick={onSelect}
      className={`bg-white rounded-2xl border p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-gray-900 ring-2 ring-gray-900/10' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
            isStaffing ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
          }`}>
            {isStaffing ? (
              <Users className="w-7 h-7 text-purple-600" />
            ) : (
              <Building2 className="w-7 h-7 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{basicInfo.title || job.title}</h3>
            <p className="text-gray-600">{basicInfo.company_name || job.client_name || job.company}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isStaffing ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {isStaffing ? 'Staffing Partner' : 'Corporate'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View & Apply
        </button>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {basicInfo.locations_india?.join(", ") || job.location || "India"}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4" />
          {basicInfo.experience_min || job.experience_min || 0}-{basicInfo.experience_max || job.experience_max || 5} yrs
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign className="w-4 h-4" />
          {formatSalary(basicInfo.compensation_min || job.compensation_min, basicInfo.compensation_max || job.compensation_max, basicInfo.compensation_currency || job.compensation_currency)}
        </span>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">{job.primary_function || basicInfo.role_type || "General"}</Badge>
        <Badge>{basicInfo.work_mode || job.work_mode || "On-site"}</Badge>
        <Badge>{basicInfo.employment_type || "Full-time"}</Badge>
        {daysAgo <= 3 && <Badge variant="success">New</Badge>}
      </div>
    </div>
  );
};

// ============ Job Detail Panel ============
const JobDetailPanel = ({ job, onApply, onClose, formatSalary }) => {
  const basicInfo = job.basic_info || {};
  const competencies = job.competencies || {};
  const requirements = job.requirements || {};
  const responsibilities = job.responsibilities || [];
  const isStaffing = job.source === "vendor_upload";
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header with Job Info */}
      <div className={`p-6 border-b ${isStaffing ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg lg:hidden">
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 rounded-xl shadow flex items-center justify-center ${isStaffing ? 'bg-purple-100' : 'bg-white'}`}>
            {isStaffing ? (
              <Users className="w-8 h-8 text-purple-600" />
            ) : (
              <Building2 className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${isStaffing ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {isStaffing ? 'Staffing Partner' : 'Corporate'}
              </span>
              {job.requisition_number && (
                <span className="text-xs text-gray-500">#{job.requisition_number}</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{basicInfo.title || job.title}</h2>
            <p className="text-gray-600 font-medium">{basicInfo.company_name || job.client_name || job.company}</p>
          </div>
        </div>
        
        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{basicInfo.locations_india?.join(", ") || job.location || "India"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{basicInfo.experience_min || 0}-{basicInfo.experience_max || 5} years</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>{formatSalary(basicInfo.compensation_min, basicInfo.compensation_max, basicInfo.compensation_currency)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{basicInfo.work_mode || job.work_mode || "On-site"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{basicInfo.employment_type || "Full-time"}</span>
          </div>
          {basicInfo.reporting_to && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span>Reports to: {basicInfo.reporting_to}</span>
            </div>
          )}
        </div>
        
        {/* Apply Button */}
        <Button onClick={onApply} className="w-full" size="lg">
          <Send className="w-4 h-4" />
          Apply for this Position
        </Button>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="p-6 space-y-6 max-h-[500px] overflow-auto">
        
        {/* About Company */}
        {basicInfo.about_company && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              About the Company
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{basicInfo.about_company}</p>
          </div>
        )}
        
        {/* Job Description / Raw Text */}
        {(job.raw_text || job.ai_enhanced_jd_content) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Job Description
            </h3>
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border">
              {job.ai_enhanced_jd_content || job.raw_text}
            </div>
          </div>
        )}
        
        {/* Key Responsibilities */}
        {(responsibilities.length > 0 || job.responsibilities?.length > 0) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {(responsibilities.length > 0 ? responsibilities : job.responsibilities || []).map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <ChevronRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Must Have Skills */}
        {(competencies.must_have_technical?.length > 0 || competencies.must_have_skills?.length > 0) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600" />
              Must Have Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(competencies.must_have_technical || competencies.must_have_skills || []).map((skill, i) => (
                <Badge key={i} variant="info">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Good to Have Skills */}
        {(competencies.good_to_have_technical?.length > 0 || competencies.good_to_have_skills?.length > 0) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              Good to Have Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(competencies.good_to_have_technical || competencies.good_to_have_skills || []).map((skill, i) => (
                <Badge key={i} variant="default">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Requirements / Education */}
        {(basicInfo.education_level || basicInfo.education_field) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Educational Requirements
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {basicInfo.education_level && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {basicInfo.education_level} {basicInfo.education_field && `in ${basicInfo.education_field}`}
                </li>
              )}
              {basicInfo.certifications_required?.length > 0 && (
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>Certifications: {basicInfo.certifications_required.join(", ")}</span>
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Additional Info */}
        {(basicInfo.team_size || basicInfo.team_handling) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Additional Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {basicInfo.team_handling && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs mb-1">Team Handling</div>
                  <div className="text-gray-900 font-medium">{basicInfo.team_handling}</div>
                </div>
              )}
              {basicInfo.business_model && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-500 text-xs mb-1">Business Model</div>
                  <div className="text-gray-900 font-medium">{basicInfo.business_model}</div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Share This Job */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-900 mb-3">Share this Job</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="pt-4 border-t text-center">
          <p className="text-sm text-gray-500">
            Questions about this role? Contact us at{" "}
            <a href="mailto:info@rolesense.in" className="text-blue-600 hover:underline">
              info@rolesense.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPortal;
