import React, { useState, useEffect, useCallback } from "react";
import "@/App.css";
import axios from "axios";
import { 
  Briefcase, Users, Search, GitBranch, BarChart3, 
  Plus, ChevronRight, ChevronDown, FileText, Zap, Target, 
  CheckCircle, XCircle, AlertCircle, Clock,
  ArrowRight, Sparkles, Brain, Eye, MessageSquare,
  Filter, Download, Upload, Trash2, Edit, X,
  TrendingUp, Award, GraduationCap, Building2,
  Mail, Phone, Calendar, Tag, MoreVertical, LogOut,
  Send, ExternalLink, Linkedin, Twitter, Facebook,
  FileDown, RefreshCw, PlayCircle, PauseCircle, Copy,
  HelpCircle, ClipboardList, Hash, Globe, FolderTree,
  Folder, FolderOpen, UserPlus, FileUser,
  Inbox, ArrowUpRight, Star, Link2, Bot, Activity, Bell, Lock
} from "lucide-react";
import LandingPage from "./LandingPage";
import StructuredJDCreator from "./StructuredJDCreator";
import StructuredJDEditor from "./StructuredJDEditor";
import VendorJDUpload from "./VendorJDUpload";
import SocialShareButtons from "./SocialShareButtons";
import CareerTrajectory from "./CareerTrajectory";
import CandidateQuestionnaire from "./CandidateQuestionnaire";
import PreAssessmentForm from "./PreAssessmentForm";
import PublicJobApplication from "./PublicJobApplication";
import CareersPage from "./CareersPage";
import JobPortal from "./JobPortal";
import AdminPanel from "./AdminPanel";
import JoinPage from "./JoinPage";
import LogoConcepts from "./LogoConcepts";
import { NetworkLogo } from "./NetworkLogo";
import { 
  LensLogoClassic, 
  LensLogoModern, 
  LensLogoBold, 
  LensLogoElegant, 
  LensLogoTarget, 
  LensLogoFocus, 
  LensLogoMinimal, 
  LensLogoInsight,
  LensLogo
} from "./LensLogo";
import {
  RSCircleLogo,
  RSCircleOutline,
  RSCircleBold,
  RSCircleLight,
  RSCircleDouble,
  RSCircleGradient,
  RSCircleClean,
  RSCircleThin
} from "./RSLogo";

// Lens Logo Preview Component
const LensLogoPreview = () => {
  const logos = [
    { name: "Classic", component: LensLogoClassic, desc: "Traditional magnifying glass" },
    { name: "Modern", component: LensLogoModern, desc: "Concentric analysis rings" },
    { name: "Bold", component: LensLogoBold, desc: "Strong, filled lens" },
    { name: "Elegant", component: LensLogoElegant, desc: "Thin, refined strokes" },
    { name: "Target", component: LensLogoTarget, desc: "Crosshair precision" },
    { name: "Focus", component: LensLogoFocus, desc: "Aperture/camera style" },
    { name: "Minimal", component: LensLogoMinimal, desc: "Ultra clean, simple" },
    { name: "Insight", component: LensLogoInsight, desc: "Scan lines, data feel" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-light text-center mb-2">RoleSense Lens Logo Options</h1>
        <p className="text-gray-500 text-center mb-8">Lens + RS = Deep Analysis + Talent Intelligence</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {logos.map(({ name, component: Logo, desc }) => (
            <div key={name} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <Logo size={64} />
              </div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Full logo preview with text */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-light mb-6 text-center">Full Logo Preview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {logos.map(({ name, component: Logo }) => (
              <div key={name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Logo size={40} />
                <span className="text-lg font-medium">Role<span className="text-purple-600">Sense</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Dark background preview */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-light mb-6 text-center text-white">On Dark Background</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {logos.map(({ name, component: Logo }) => (
              <div key={name} className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl">
                <Logo size={40} />
                <span className="text-lg font-medium text-white">Role<span className="text-purple-400">Sense</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-teal-600 hover:text-teal-700">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UI Components ============

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

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input 
      className={`px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${className}`}
      {...props}
    />
  </div>
);

const TextArea = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea 
      className={`px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none ${className}`}
      {...props}
    />
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700"
  };
  
  return (
    <span className={`${variants[variant]} px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const ScoreIndicator = ({ score, size = "md", showLabel = true }) => {
  const getColor = (s) => {
    if (s >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (s >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };
  
  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl"
  };
  
  return (
    <div className={`${sizes[size]} ${getColor(score)} rounded-full border-2 flex items-center justify-center font-bold`}>
      {score}
    </div>
  );
};

const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-inner">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          activeTab === tab.id
            ? "bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-slate-900"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 max-w-md mb-6">{description}</p>
    {action}
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
  </div>
);

// ============ Main Components ============

// Dashboard Component
const Dashboard = ({ stats, onNavigate, userType, activeJobs = [] }) => {
  const isCorporate = userType === 'corporate';
  const userName = localStorage.getItem("rolesense_user_name") || "User";
  const userCompany = localStorage.getItem("rolesense_user_company") || "";
  const [trajectoryStats, setTrajectoryStats] = useState(null);
  
  // Fetch trajectory stats
  useEffect(() => {
    const fetchTrajectoryStats = async () => {
      try {
        const res = await axios.get(`${API}/trajectory/stats`);
        setTrajectoryStats(res.data);
      } catch (err) {
        console.error("Failed to fetch trajectory stats:", err);
      }
    };
    fetchTrajectoryStats();
  }, []);
  
  // Process steps for synopsis
  const processSteps = [
    {
      step: 1,
      title: "Create JD",
      description: "Build structured job descriptions using JD Builder with competencies, skills, and requirements",
      icon: FileText,
      action: "jd-intelligence",
      color: "indigo"
    },
    {
      step: 2,
      title: "Analyze & Enhance",
      description: "AI analyzes your JD, provides suggestions, generates screening questions and social posts",
      icon: Sparkles,
      action: "jd-intelligence",
      color: "indigo"
    },
    {
      step: 3,
      title: "Submit & Publish",
      description: "Submit to Active Jobs, get requisition number, publish to LinkedIn, Indeed, Naukri & more",
      icon: Send,
      action: "active-jobs",
      color: "emerald"
    },
    {
      step: 4,
      title: "Receive Applications",
      description: "Candidates apply via published job links, applications tracked in Active Jobs hub",
      icon: Inbox,
      action: "active-jobs",
      color: "emerald"
    },
    {
      step: 5,
      title: "Auto-Route Resumes",
      description: "AI classifies resumes by function & sub-function, routes to correct repository folders",
      icon: FolderTree,
      action: "repository",
      color: "purple"
    },
    {
      step: 6,
      title: "Career Trajectory Analysis",
      description: "Deep fitment analysis with 12 indicators, 6 predictive scores & hiring recommendations",
      icon: Activity,
      action: "career-trajectory",
      color: "amber"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      indigo: { bg: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
      emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
      blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      amber: { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
      rose: { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" }
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome Section - Smaller */}
      <div className={`rounded-2xl p-6 text-white relative overflow-hidden ${
        isCorporate 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-slate-800 via-cyan-800 to-slate-900'
      }`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-gray-300 text-xs mb-1">Welcome back,</p>
            <h1 className="text-2xl font-light mb-1">{userCompany || userName}</h1>
            {userCompany && userName && (
              <p className="text-sm text-gray-300 flex items-center gap-2">
                {isCorporate ? <Building2 className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                {userName}
              </p>
            )}
          </div>
          <div className={`hidden lg:flex flex-col items-end gap-2`}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
              isCorporate 
                ? 'bg-white/10 border-white/10'
                : 'bg-white/10 border-cyan-500/30'
            }`}>
              {isCorporate ? <Building2 className="w-4 h-4 text-gray-300" /> : <Briefcase className="w-4 h-4 text-cyan-300" />}
              <span className="text-xs text-gray-200 font-medium">{isCorporate ? 'Corporate Recruiter' : 'Staffing Partner'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Buckets - JD Intelligence, Active Jobs, Resume Repository, Smart Search & Career Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Bucket 1: JD Intelligence */}
        <div 
          onClick={() => onNavigate("jd-intelligence")}
          className={`group cursor-pointer rounded-xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isCorporate 
              ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:shadow-indigo-500/20'
              : 'bg-gradient-to-br from-teal-600 to-teal-700 hover:shadow-teal-500/20'
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-lg font-semibold mb-1">JD Intelligence</h2>
            <p className={`text-xs mb-4 ${isCorporate ? 'text-indigo-100' : 'text-teal-100'}`}>
              {isCorporate ? 'Create & analyze job descriptions' : 'Upload & manage client JDs'}
            </p>
            
            <div className={`grid grid-cols-2 gap-2 pt-3 border-t ${isCorporate ? 'border-white/20' : 'border-white/20'}`}>
              <div>
                <div className="text-xl font-bold">{stats?.totals?.job_descriptions || 0}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-indigo-200' : 'text-teal-200'}`}>Draft JDs</div>
              </div>
              <div>
                <div className="text-xl font-bold">{activeJobs.reduce((sum, j) => sum + (j.screening_questions?.length || 0), 0)}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-indigo-200' : 'text-teal-200'}`}>Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bucket 2: Active Jobs & Applications */}
        <div 
          onClick={() => onNavigate("active-jobs")}
          className={`group cursor-pointer rounded-xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isCorporate 
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700 hover:shadow-emerald-500/20'
              : 'bg-gradient-to-br from-cyan-600 to-blue-600 hover:shadow-cyan-500/20'
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-lg font-semibold mb-1">Active Jobs</h2>
            <p className={`text-xs mb-4 ${isCorporate ? 'text-emerald-100' : 'text-cyan-100'}`}>Publish jobs & receive applications</p>
            
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20">
              <div>
                <div className="text-xl font-bold">{activeJobs.filter(j => j.status === 'active').length}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-emerald-200' : 'text-cyan-200'}`}>Active Jobs</div>
              </div>
              <div>
                <div className="text-xl font-bold">{stats?.totals?.candidates || 0}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-emerald-200' : 'text-cyan-200'}`}>Applications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bucket 3: Resume Repository */}
        <div 
          onClick={() => onNavigate("repository")}
          className={`group cursor-pointer rounded-xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isCorporate 
              ? 'bg-gradient-to-br from-purple-600 to-purple-700 hover:shadow-purple-500/20'
              : 'bg-gradient-to-br from-violet-600 to-purple-600 hover:shadow-violet-500/20'
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FolderTree className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-lg font-semibold mb-1">Resume Repository</h2>
            <p className={`text-xs mb-4 ${isCorporate ? 'text-purple-100' : 'text-violet-100'}`}>Auto-routed resumes by function</p>
            
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20">
              <div>
                <div className="text-xl font-bold">7</div>
                <div className={`text-[10px] ${isCorporate ? 'text-purple-200' : 'text-violet-200'}`}>Functions</div>
              </div>
              <div>
                <div className="text-xl font-bold">30+</div>
                <div className={`text-[10px] ${isCorporate ? 'text-purple-200' : 'text-violet-200'}`}>Folders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bucket 4: Career Trajectory */}
        <div 
          onClick={() => onNavigate("career-trajectory")}
          className={`group cursor-pointer rounded-xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isCorporate 
              ? 'bg-gradient-to-br from-amber-500 to-orange-600 hover:shadow-amber-500/20'
              : 'bg-gradient-to-br from-rose-500 to-pink-600 hover:shadow-rose-500/20'
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-lg font-semibold mb-1">Career Trajectory</h2>
            <p className={`text-xs mb-4 ${isCorporate ? 'text-amber-100' : 'text-rose-100'}`}>AI-powered fitment analysis with flag indicators</p>
            
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
              <div>
                <div className="text-xl font-bold">{trajectoryStats?.total_assessments || 0}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-amber-200' : 'text-rose-200'}`}>Assessed</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="text-xl font-bold">{trajectoryStats?.by_flag?.green || 0}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-amber-200' : 'text-rose-200'}`}>Green</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="text-xl font-bold">{trajectoryStats?.by_flag?.red || 0}</div>
                <div className={`text-[10px] ${isCorporate ? 'text-amber-200' : 'text-rose-200'}`}>Red</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bucket 5: Smart Search / Matching */}
        <div 
          onClick={() => onNavigate("smart-search")}
          className={`group cursor-pointer rounded-xl p-5 text-white relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            isCorporate 
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:shadow-cyan-500/20'
              : 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:shadow-sky-500/20'
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-lg font-semibold mb-1">Smart Search</h2>
            <p className={`text-xs mb-4 ${isCorporate ? 'text-cyan-100' : 'text-sky-100'}`}>AI-powered candidate matching & search</p>
            
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
              <div>
                <div className="text-xl font-bold">--</div>
                <div className={`text-[10px] ${isCorporate ? 'text-cyan-200' : 'text-sky-200'}`}>Searches</div>
              </div>
              <div>
                <div className="text-xl font-bold">--</div>
                <div className={`text-[10px] ${isCorporate ? 'text-cyan-200' : 'text-sky-200'}`}>Matched</div>
              </div>
              <div>
                <div className="text-xl font-bold">--</div>
                <div className={`text-[10px] ${isCorporate ? 'text-cyan-200' : 'text-sky-200'}`}>Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Synopsis - Step by Step Guide */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Recruitment Workflow Guide
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Follow these steps for an optimized hiring process</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {processSteps.map((step, index) => {
            const colorClasses = getColorClasses(step.color);
            return (
              <div 
                key={step.step}
                onClick={() => onNavigate(step.action)}
                className={`relative p-3 rounded-lg border ${colorClasses.border} ${colorClasses.light} cursor-pointer hover:shadow-md transition-all group`}
              >
                {/* Step Number */}
                <div className={`absolute -top-2 -left-1 w-6 h-6 ${colorClasses.bg} rounded-full flex items-center justify-center text-white text-xs font-bold shadow`}>
                  {step.step}
                </div>
                
                <div className="pt-2">
                  <div className={`w-8 h-8 ${colorClasses.light} rounded-lg flex items-center justify-center mb-2`}>
                    <step.icon className={`w-4 h-4 ${colorClasses.text}`} />
                  </div>
                  <h4 className="font-medium text-gray-900 text-xs mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-tight line-clamp-2">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shareable Careers Link - Prominent Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                📢 Shareable Careers Link
              </h3>
              <p className="text-indigo-100 text-sm">Post this on LinkedIn, Twitter, job sites - candidates apply directly!</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-white/10 rounded-lg px-4 py-2.5 border border-white/20 font-mono text-sm">
              {window.location.origin}/careers
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + '/careers');
                alert('✅ Careers link copied!\n\nShare on:\n• LinkedIn\n• Twitter\n• Job Boards\n• Company Website\n• WhatsApp');
              }}
              className="px-5 py-2.5 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-md"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <a
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Preview Page
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div 
          onClick={() => onNavigate("jd-intelligence")}
          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-gray-100 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-indigo-100 group-hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
              <Briefcase className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 ml-auto group-hover:text-indigo-600 transition-colors" />
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.totals?.job_descriptions || 0}</div>
          <div className="text-[10px] text-gray-500">Job Descriptions</div>
        </div>
        
        <div 
          onClick={() => onNavigate("candidates")}
          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-gray-100 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 group-hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
              <Users className="w-4 h-4 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 ml-auto group-hover:text-purple-600 transition-colors" />
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.totals?.candidates || 0}</div>
          <div className="text-[10px] text-gray-500">Candidates</div>
        </div>
        
        <div 
          onClick={() => onNavigate("career-trajectory")}
          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-gray-100 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-amber-100 group-hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
              <Activity className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors" />
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 ml-auto group-hover:text-amber-600 transition-colors" />
          </div>
          <div className="text-xl font-bold text-gray-900">{trajectoryStats?.total_assessments || 0}</div>
          <div className="text-[10px] text-gray-500">Assessments</div>
        </div>
        
        <div 
          onClick={() => onNavigate("matching")}
          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-gray-100 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-100 group-hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
              <Target className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 ml-auto group-hover:text-emerald-600 transition-colors" />
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.totals?.matches || 0}</div>
          <div className="text-[10px] text-gray-500">Matches</div>
        </div>
        
        <div 
          onClick={() => onNavigate("pipeline")}
          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border border-gray-100 group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-rose-100 group-hover:bg-rose-600 rounded-lg flex items-center justify-center transition-colors">
              <GitBranch className="w-4 h-4 text-rose-600 group-hover:text-white transition-colors" />
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 ml-auto group-hover:text-rose-600 transition-colors" />
          </div>
          <div className="text-xl font-bold text-gray-900">{Object.values(stats?.pipeline || {}).reduce((a, b) => a + b, 0)}</div>
          <div className="text-[10px] text-gray-500">In Pipeline</div>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-emerald-500" />
            Active Jobs
            {activeJobs.filter(j => j.status === 'active').length > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                {activeJobs.filter(j => j.status === 'active').length} Open
              </span>
            )}
          </h3>
          <button 
            onClick={() => onNavigate("jd-intelligence")}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {activeJobs.filter(j => j.status === 'active').length > 0 ? (
          <div className="space-y-3">
            {activeJobs.filter(j => j.status === 'active').slice(0, 5).map((job) => (
              <div 
                key={job.id}
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                onClick={() => onNavigate("jd-intelligence")}
              >
                {/* Status indicator */}
                <div className="relative">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                
                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{job.title}</h4>
                    {job.analysis?.quality_score && (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        job.analysis.quality_score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                        job.analysis.quality_score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {job.analysis.quality_score}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {job.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {job.company}
                      </span>
                    )}
                    {job.requisition_number && (
                      <span className="flex items-center gap-1 font-mono">
                        <Hash className="w-3 h-3" />
                        {job.requisition_number}
                      </span>
                    )}
                    {job.requisition_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(job.requisition_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden md:flex items-center gap-4 text-sm">
                  {job.parsed_data?.required_skills?.length > 0 && (
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{job.parsed_data.required_skills.length}</div>
                      <div className="text-xs text-gray-500">Skills</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {job.basic_info?.experience_min !== undefined && job.basic_info?.experience_max !== undefined
                        ? `${job.basic_info.experience_min}-${job.basic_info.experience_max}y`
                        : job.parsed_data?.experience_years?.min != null && job.parsed_data?.experience_years?.max != null
                          ? `${job.parsed_data.experience_years.min}-${job.parsed_data.experience_years.max}y`
                          : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">Exp.</div>
                  </div>
                  {job.screening_questions?.length > 0 && (
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{job.screening_questions.length}</div>
                      <div className="text-xs text-gray-500">Questions</div>
                    </div>
                  )}
                </div>

                {/* Action */}
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <PlayCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-3">No active jobs yet</p>
            <button
              onClick={() => onNavigate("jd-intelligence")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Job Posting
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate("jd-intelligence")}
          className="flex items-center gap-4 p-5 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors text-left group"
        >
          <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors">
            <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Analyze JD</div>
            <div className="text-sm text-gray-500">Extract requirements & insights</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
        </button>
        
        <button 
          onClick={() => onNavigate("repository")}
          className="flex items-center gap-4 p-5 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors text-left group"
        >
          <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-600 rounded-xl flex items-center justify-center transition-colors">
            <FolderTree className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Browse Resumes</div>
            <div className="text-sm text-gray-500">Pre-vetted by function & skill</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600 transition-colors" />
        </button>
        
        <button 
          onClick={() => onNavigate("search")}
          className="flex items-center gap-4 p-5 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors text-left group"
        >
          <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-colors">
            <Search className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Smart Search</div>
            <div className="text-sm text-gray-500">Natural language discovery</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

// JD Intelligence Component - Enhanced with Structured JD Creation
const JDIntelligence = ({ userType = 'corporate' }) => {
  const isVendor = userType === 'vendor';
  const [activeTab, setActiveTab] = useState(isVendor ? "upload" : "create"); // create, upload, analyze, active
  const [showStructuredCreator, setShowStructuredCreator] = useState(false);
  const [showStructuredEditor, setShowStructuredEditor] = useState(false);
  const [showVendorUpload, setShowVendorUpload] = useState(false);
  const [structuredJDs, setStructuredJDs] = useState([]);
  const [jds, setJds] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScreeningModal, setShowScreeningModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showSubmitOptions, setShowSubmitOptions] = useState(false);
  const [generatingAiJd, setGeneratingAiJd] = useState(false);
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedStructuredJD, setSelectedStructuredJD] = useState(null);
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [formData, setFormData] = useState({ title: "", company: "", raw_text: "" });
  const [editFormData, setEditFormData] = useState({ title: "", company: "", raw_text: "" });

  const fetchJDs = useCallback(async () => {
    try {
      const [allRes, activeRes, structuredRes] = await Promise.all([
        axios.get(`${API}/jd/list`),
        axios.get(`${API}/jd/active/list`),
        axios.get(`${API}/jd/structured/list`).catch(() => ({ data: [] }))
      ]);
      // Filter out active JDs from JD Intelligence - only show drafts
      setJds(allRes.data.filter(jd => jd.status !== 'active'));
      setActiveJobs(activeRes.data);
      // Filter out active/submitted structured JDs - only show drafts in JD Intelligence
      setStructuredJDs(structuredRes.data.filter(jd => jd.status !== 'active'));
    } catch (e) {
      console.error("Error fetching JDs:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJDs();
  }, [fetchJDs]);

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDownloadMenu && !e.target.closest('.download-menu-container')) {
        setShowDownloadMenu(false);
      }
      if (showSubmitOptions && !e.target.closest('.submit-options-container')) {
        setShowSubmitOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDownloadMenu, showSubmitOptions]);

  const analyzeJD = async () => {
    if (!formData.title || !formData.raw_text) return;
    setAnalyzing(true);
    try {
      const res = await axios.post(`${API}/jd/analyze`, formData);
      setJds([res.data, ...jds]);
      setShowModal(false);
      setFormData({ title: "", company: "", raw_text: "" });
      setSelectedJD(res.data);
    } catch (e) {
      console.error("Error analyzing JD:", e);
      alert("Failed to analyze JD. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const submitJD = async (jdId) => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/jd/${jdId}/submit`);
      // Remove from draft list, add to active list
      setJds(jds.filter(j => j.id !== jdId));
      setActiveJobs([res.data, ...activeJobs]);
      setSelectedJD(res.data);
      setActiveTab("active");
      alert(`Job submitted successfully! Requisition #: ${res.data.requisition_number}`);
    } catch (e) {
      console.error("Error submitting JD:", e);
      alert(e.response?.data?.detail || "Failed to submit job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateScreeningQuestions = async (jdId) => {
    setGeneratingQuestions(true);
    try {
      const res = await axios.post(`${API}/jd/${jdId}/generate-screening-questions`);
      setScreeningQuestions(res.data.questions);
      setShowScreeningModal(true);
    } catch (e) {
      console.error("Error generating questions:", e);
      alert("Failed to generate screening questions. Please try again.");
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const loadScreeningQuestions = async (jdId) => {
    try {
      const res = await axios.get(`${API}/jd/${jdId}/screening-questions`);
      setScreeningQuestions(res.data.questions || []);
      setShowScreeningModal(true);
    } catch (e) {
      console.error("Error loading questions:", e);
    }
  };

  const saveScreeningQuestions = async () => {
    if (!selectedJD) return;
    try {
      await axios.put(`${API}/jd/${selectedJD.id}/screening-questions`, {
        questions: screeningQuestions
      });
      alert("Screening questions saved successfully!");
      // Update local state
      const updatedJD = { ...selectedJD, screening_questions: screeningQuestions };
      setSelectedJD(updatedJD);
      if (activeTab === "active") {
        setActiveJobs(activeJobs.map(j => j.id === selectedJD.id ? updatedJD : j));
      } else {
        setJds(jds.map(j => j.id === selectedJD.id ? updatedJD : j));
      }
      setShowScreeningModal(false);
    } catch (e) {
      console.error("Error saving questions:", e);
      alert("Failed to save questions. Please try again.");
    }
  };

  const downloadJD = async (jdId, format) => {
    try {
      // For PDF and DOCX, we need to handle binary response
      const response = await axios.get(`${API}/jd/${jdId}/download/${format}`, {
        responseType: 'blob'
      });
      
      // Get filename from content-disposition header or construct it
      const contentDisposition = response.headers['content-disposition'];
      let filename = `job_description.${format}`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename=(.+)/);
        if (match) filename = match[1];
      }
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: format === 'pdf' ? 'application/pdf' : 
              format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 
              'text/plain'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.error("Error downloading JD:", e);
      alert("Failed to download. Please try again.");
    }
  };

  const closeJob = async (jdId) => {
    if (!window.confirm("Are you sure you want to close this job?")) return;
    try {
      await axios.post(`${API}/jd/${jdId}/close`);
      setActiveJobs(activeJobs.map(j => j.id === jdId ? { ...j, status: 'closed' } : j));
      if (selectedJD?.id === jdId) {
        setSelectedJD({ ...selectedJD, status: 'closed' });
      }
    } catch (e) {
      console.error("Error closing job:", e);
    }
  };

  const reopenJob = async (jdId) => {
    try {
      await axios.post(`${API}/jd/${jdId}/reopen`);
      setActiveJobs(activeJobs.map(j => j.id === jdId ? { ...j, status: 'active' } : j));
      if (selectedJD?.id === jdId) {
        setSelectedJD({ ...selectedJD, status: 'active' });
      }
    } catch (e) {
      console.error("Error reopening job:", e);
    }
  };

  const openEditModal = (jd) => {
    setEditFormData({
      title: jd.title,
      company: jd.company || "",
      raw_text: jd.raw_text
    });
    setShowEditModal(true);
  };

  const updateJD = async () => {
    if (!selectedJD) return;
    try {
      const res = await axios.put(`${API}/jd/${selectedJD.id}`, editFormData);
      // Update in lists
      if (activeTab === "active") {
        setActiveJobs(activeJobs.map(j => j.id === selectedJD.id ? res.data : j));
      } else {
        setJds(jds.map(j => j.id === selectedJD.id ? res.data : j));
      }
      setSelectedJD(res.data);
      setShowEditModal(false);
      alert("Job description updated successfully!");
    } catch (e) {
      console.error("Error updating JD:", e);
      alert("Failed to update. Please try again.");
    }
  };

  // Generate AI-Enhanced JD content
  const generateAiEnhancedJD = async (jdId) => {
    setGeneratingAiJd(true);
    try {
      const res = await axios.post(`${API}/jd/structured/${jdId}/generate-ai-jd`);
      setSelectedStructuredJD(res.data);
      // Update in list
      setStructuredJDs(structuredJDs.map(j => j.id === jdId ? res.data : j));
      alert("AI-Enhanced JD generated successfully!");
    } catch (e) {
      console.error("Error generating AI JD:", e);
      alert("Failed to generate AI-enhanced JD. Please try again.");
    } finally {
      setGeneratingAiJd(false);
    }
  };

  // Download JD with version option
  const downloadStructuredJD = (jdId, version = "human") => {
    window.open(`${API}/jd/structured/${jdId}/download/pdf?version=${version}`, '_blank');
    setShowDownloadMenu(false);
  };

  const deleteJD = async (id) => {
    if (!window.confirm("Are you sure you want to delete this JD?")) return;
    try {
      await axios.delete(`${API}/jd/${id}`);
      setJds(jds.filter(j => j.id !== id));
      setActiveJobs(activeJobs.filter(j => j.id !== id));
      if (selectedJD?.id === id) setSelectedJD(null);
    } catch (e) {
      console.error("Error deleting JD:", e);
    }
  };

  // Delete Structured JD
  const deleteStructuredJD = async (id) => {
    if (!window.confirm("Are you sure you want to delete this structured JD? This action cannot be undone.")) return;
    try {
      await axios.delete(`${API}/jd/structured/${id}`);
      setStructuredJDs(structuredJDs.filter(j => j.id !== id));
      if (selectedStructuredJD?.id === id) setSelectedStructuredJD(null);
      alert("JD deleted successfully");
    } catch (e) {
      console.error("Error deleting structured JD:", e);
      alert("Failed to delete JD: " + (e.response?.data?.detail || e.message));
    }
  };

  // Submit JD to Active Jobs
  const submitJDToActiveJobs = async (jdId, isStructured = false) => {
    try {
      if (isStructured) {
        await axios.post(`${API}/jd/structured/${jdId}/submit`, { version: 'human' });
      } else {
        await axios.post(`${API}/jd/${jdId}/submit`);
      }
      await fetchJDs();
      setSelectedStructuredJD(null);
      setSelectedJD(null);
      alert('JD submitted to Active Jobs successfully!');
    } catch (e) {
      alert('Failed to submit JD: ' + (e.response?.data?.detail || e.message));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (loading) return <LoadingSpinner />;

  const currentList = activeTab === "active" ? activeJobs : jds;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JD Intelligence</h1>
          <p className="text-gray-500">
            {isVendor ? "Upload, manage, and publish client job descriptions" : "Analyze, submit, and manage job descriptions"}
          </p>
        </div>
        {!isVendor && (
          <Button onClick={() => setShowModal(true)} data-testid="analyze-jd-btn">
            <Plus className="w-4 h-4" />
            Analyze JD
          </Button>
        )}
      </div>

      {/* Tabs - Different for Vendor vs Corporate */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {isVendor && (
          <button
            onClick={() => { setActiveTab("upload"); setSelectedJD(null); setSelectedStructuredJD(null); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "upload" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload JD
          </button>
        )}
        <button
          onClick={() => { setActiveTab("create"); setSelectedJD(null); setSelectedStructuredJD(null); }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "create" 
              ? "bg-white text-gray-900 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Plus className="w-4 h-4" />
          {isVendor ? 'Create JD (Optional)' : `Create JD (${structuredJDs.filter(j => !j.requisition_number).length})`}
        </button>
        {!isVendor && (
          <button
            onClick={() => { setActiveTab("analyze"); setSelectedJD(null); setSelectedStructuredJD(null); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "analyze" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            Analyze JDs ({jds.filter(j => !j.requisition_number).length})
          </button>
        )}
      </div>

      {/* Vendor Quick Upload Tab Content */}
      {activeTab === "upload" && isVendor && (
        <div className="space-y-6">
          {/* Compact Upload Section for Vendor */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Upload Client JD</h2>
                <p className="text-teal-100 text-sm">
                  Upload JD files or paste text directly. Add client info and publish.
                </p>
              </div>
              <button 
                onClick={() => setShowVendorUpload(true)} 
                className="px-4 py-2 bg-white text-teal-700 hover:bg-teal-50 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                <Upload className="w-4 h-4" /> Upload JD
              </button>
            </div>
          </div>

          {/* Recent Drafts - Only show JDs that haven't been submitted */}
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Drafts</h3>
            {(() => {
              // Filter out JDs that have been submitted (have requisition_number)
              const draftJDs = [...jds, ...structuredJDs].filter(job => !job.requisition_number);
              
              if (draftJDs.length === 0) {
                return (
                  <div className="text-center py-6">
                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No draft JDs</p>
                    <p className="text-xs text-gray-400 mt-1">Upload your first JD or check Active Jobs for submitted ones</p>
                  </div>
                );
              }
              
              return (
                <div className="space-y-3">
                  {draftJDs.slice(0, 10).map(job => {
                    const isStructured = !!job.basic_info;
                    return (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{job.basic_info?.title || job.title}</h4>
                          <p className="text-xs text-gray-500 truncate">{job.basic_info?.company_name || job.client_name || job.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700">Draft</span>
                            {isStructured && <span className="px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-700">Structured</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          {/* Edit Button */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              if (isStructured) {
                                setSelectedStructuredJD(job);
                                setShowStructuredEditor(true);
                              } else {
                                setSelectedJD(job);
                                setActiveTab("create");
                              }
                            }}
                            title="Edit JD"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          
                          {/* Delete Button */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 hover:border-red-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isStructured) {
                                deleteStructuredJD(job.id);
                              } else {
                                deleteJD(job.id);
                              }
                            }}
                            title="Delete JD"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          
                          {/* Submit Button */}
                          <Button 
                            size="sm" 
                            variant="success"
                            onClick={(e) => {
                              e.stopPropagation();
                              submitJDToActiveJobs(job.id, isStructured);
                            }}
                            title="Submit to Active Jobs"
                          >
                            <Send className="w-3 h-3" /> Post
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Create JD Tab Content */}
      {activeTab === "create" && (
        <div className="space-y-6">
          {/* Hero Section */}
          <div className={`rounded-2xl p-8 text-white ${isVendor ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {isVendor ? 'JD Builder (Optional)' : 'Human-Controlled JD Builder'}
                </h2>
                <p className={`max-w-xl ${isVendor ? 'text-gray-300' : 'text-indigo-100'}`}>
                  {isVendor 
                    ? 'Use this builder if you need to create a structured JD from scratch. Otherwise, use Quick Upload for faster processing.'
                    : 'Create structured job descriptions with predefined competencies, skills, and requirements. No AI black box - you define every parameter.'
                  }
                </p>
              </div>
              <button 
                onClick={() => setShowStructuredCreator(true)} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-md transition-all ${isVendor ? 'bg-white text-gray-700 hover:bg-gray-100' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
              >
                <Plus className="w-5 h-5" />
                Create New JD
              </button>
            </div>
          </div>

          {/* Structured JDs List - Only show drafts (not submitted) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              // Filter out JDs that have been submitted (have requisition_number)
              const draftStructuredJDs = structuredJDs.filter(j => !j.requisition_number);
              
              if (draftStructuredJDs.length === 0) {
                return (
                  <div className="col-span-full">
                    <EmptyState 
                      icon={FileText}
                      title="No Draft JDs"
                      description={structuredJDs.length > 0 
                        ? "All JDs have been submitted to Active Jobs" 
                        : "Create your first structured JD using dropdowns and selections"}
                      action={
                        <Button onClick={() => setShowStructuredCreator(true)}>
                          <Plus className="w-4 h-4" />
                          Create JD
                        </Button>
                      }
                    />
                  </div>
                );
              }
              
              return draftStructuredJDs.map(sjd => (
                <Card 
                  key={sjd.id}
                  className={`p-5 cursor-pointer transition-all hover:shadow-lg ${
                    selectedStructuredJD?.id === sjd.id ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onClick={() => setSelectedStructuredJD(sjd)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{sjd.basic_info?.title}</h3>
                      <p className="text-sm text-gray-500">{sjd.basic_info?.company_name}</p>
                    </div>
                    <Badge variant="warning">Draft</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">{sjd.basic_info?.role_type}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{sjd.basic_info?.experience_min}-{sjd.basic_info?.experience_max} yrs</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{sjd.basic_info?.work_mode}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    {sjd.competencies?.must_have_skills?.length || 0} must-have skills • {sjd.competencies?.good_to_have_skills?.length || 0} good-to-have
                  </div>
                  
                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStructuredJD(sjd);
                        setShowStructuredEditor(true);
                      }}
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStructuredJD(sjd.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        submitJDToActiveJobs(sjd.id, true);
                      }}
                    >
                      <Send className="w-3 h-3" /> Post
                    </Button>
                  </div>
                </Card>
              ));
            })()}
          </div>

          {/* Selected Structured JD Detail */}
          {selectedStructuredJD && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedStructuredJD.basic_info?.title}</h3>
                  <p className="text-gray-500">{selectedStructuredJD.basic_info?.company_name}</p>
                  {selectedStructuredJD.status === 'active' && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Active Job
                    </span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* Edit Button - Always visible */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowStructuredEditor(true)}
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Button>
                  
                  {/* Delete Button - Only for drafts */}
                  {!selectedStructuredJD.requisition_number && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50 hover:border-red-300"
                      onClick={() => deleteStructuredJD(selectedStructuredJD.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  )}
                  
                  {/* Download Dropdown - Always visible */}
                  <div className="relative download-menu-container">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                    >
                      <Download className="w-4 h-4" /> Download <ChevronDown className="w-3 h-3" />
                    </Button>
                    {showDownloadMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-gray-500 px-3 py-1 uppercase">Download Options</div>
                          <button
                            onClick={() => downloadStructuredJD(selectedStructuredJD.id, 'human')}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 rounded-lg text-left border border-transparent hover:border-indigo-200"
                          >
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">Human JD (PDF)</div>
                              <div className="text-xs text-gray-500">Structured format - Always available</div>
                            </div>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                          <button
                            onClick={() => selectedStructuredJD.ai_enhanced_jd_content ? downloadStructuredJD(selectedStructuredJD.id, 'ai') : null}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left border border-transparent ${
                              selectedStructuredJD.ai_enhanced_jd_content 
                                ? 'hover:bg-purple-50 hover:border-purple-200 cursor-pointer' 
                                : 'opacity-60 cursor-not-allowed bg-gray-50'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedStructuredJD.ai_enhanced_jd_content ? 'bg-purple-100' : 'bg-gray-200'}`}>
                              <Bot className={`w-4 h-4 ${selectedStructuredJD.ai_enhanced_jd_content ? 'text-purple-600' : 'text-gray-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">AI-Enhanced JD (PDF)</div>
                              <div className="text-xs text-gray-500">
                                {selectedStructuredJD.ai_enhanced_jd_content 
                                  ? 'Professional AI-formatted - Ready' 
                                  : 'Run "Analyze with AI" first'}
                              </div>
                            </div>
                            {selectedStructuredJD.ai_enhanced_jd_content ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                          </button>
                          {!selectedStructuredJD.ai_enhanced_jd_content && (
                            <div className="mt-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                              <p className="text-xs text-amber-700">
                                <strong>Tip:</strong> Click "Analyze with AI" below to generate the AI-enhanced version for download.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Button with Options */}
                  <div className="relative submit-options-container">
                    <Button 
                      variant="success"
                      size="sm"
                      onClick={async () => {
                        // If AI enhanced exists, show options, otherwise submit directly
                        if (selectedStructuredJD.ai_enhanced_jd_content) {
                          setShowSubmitOptions(!showSubmitOptions);
                        } else {
                          try {
                            await axios.post(`${API}/jd/structured/${selectedStructuredJD.id}/submit`, { version: 'human' });
                            await fetchJDs();
                            setSelectedStructuredJD(null); // Clear selection as JD moves to Active Jobs
                            alert('JD submitted to Active Jobs successfully! Go to Active Jobs tab to view.');
                          } catch (e) {
                            alert('Failed to submit JD: ' + (e.response?.data?.detail || e.message));
                          }
                        }
                      }}
                    >
                      <Send className="w-4 h-4" /> Submit to Active Jobs <ChevronDown className="w-3 h-3" />
                    </Button>
                    {showSubmitOptions && selectedStructuredJD.ai_enhanced_jd_content && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-gray-500 px-3 py-1 uppercase">Choose Version to Submit</div>
                          <button
                            onClick={async () => {
                              setShowSubmitOptions(false);
                              try {
                                await axios.post(`${API}/jd/structured/${selectedStructuredJD.id}/submit`, { version: 'human' });
                                await fetchJDs();
                                setSelectedStructuredJD(null); // Clear selection as JD moves to Active Jobs
                                alert('Human JD submitted to Active Jobs successfully! Go to Active Jobs tab to view.');
                              } catch (e) {
                                alert('Failed to submit JD: ' + (e.response?.data?.detail || e.message));
                              }
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 rounded-lg text-left border border-transparent hover:border-indigo-200"
                          >
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">Submit Human JD</div>
                              <div className="text-xs text-gray-500">Original structured format</div>
                            </div>
                          </button>
                          <button
                            onClick={async () => {
                              setShowSubmitOptions(false);
                              try {
                                await axios.post(`${API}/jd/structured/${selectedStructuredJD.id}/submit`, { version: 'ai' });
                                await fetchJDs();
                                setSelectedStructuredJD(null); // Clear selection as JD moves to Active Jobs
                                alert('AI-Enhanced JD submitted to Active Jobs successfully! Go to Active Jobs tab to view.');
                              } catch (e) {
                                alert('Failed to submit JD: ' + (e.response?.data?.detail || e.message));
                              }
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-purple-50 rounded-lg text-left border border-transparent hover:border-purple-200"
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Bot className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">Submit AI-Enhanced JD</div>
                              <div className="text-xs text-gray-500">Professional AI-formatted version</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Experience</div>
                  <div className="font-semibold">{selectedStructuredJD.basic_info?.experience_min}-{selectedStructuredJD.basic_info?.experience_max} years</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Role Type</div>
                  <div className="font-semibold">{selectedStructuredJD.basic_info?.role_type}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Work Mode</div>
                  <div className="font-semibold">{selectedStructuredJD.basic_info?.work_mode}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Employment</div>
                  <div className="font-semibold">{selectedStructuredJD.basic_info?.employment_type}</div>
                </div>
              </div>

              {selectedStructuredJD.basic_info?.compensation_min && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
                  <div className="text-sm text-emerald-700">
                    <strong>Compensation:</strong> {selectedStructuredJD.basic_info?.compensation_currency} {selectedStructuredJD.basic_info?.compensation_min?.toLocaleString()} - {selectedStructuredJD.basic_info?.compensation_max?.toLocaleString()} {selectedStructuredJD.basic_info?.compensation_type}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Must-Have Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStructuredJD.competencies?.must_have_skills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-amber-700 mb-2">Good-to-Have Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStructuredJD.competencies?.good_to_have_skills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>

                {selectedStructuredJD.competencies?.tools_must_have?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStructuredJD.competencies?.tools_must_have?.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{tool}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStructuredJD.responsibilities?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {selectedStructuredJD.responsibilities?.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* AI Analysis Section */}
              {!selectedStructuredJD.ai_analysis && selectedStructuredJD.status !== 'active' && (
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          AI Analysis & Enhancement
                        </h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Get AI-powered insights, suggestions, and social post snippets for your JD
                        </p>
                      </div>
                      <Button 
                        variant="primary"
                        disabled={analyzing}
                        onClick={async () => {
                          setAnalyzing(true);
                          try {
                            const res = await axios.post(`${API}/jd/structured/${selectedStructuredJD.id}/ai-analyze`);
                            setSelectedStructuredJD(res.data);
                            fetchJDs();
                          } catch (e) {
                            alert('Failed to analyze JD');
                          } finally {
                            setAnalyzing(false);
                          }
                        }}
                      >
                        {analyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Analyzing... (10-15 sec)
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" /> Analyze with AI
                          </>
                        )}
                      </Button>
                    </div>
                    {analyzing && (
                      <div className="mt-4 bg-white/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          <div>
                            <p className="text-sm font-medium text-purple-900">AI is analyzing your JD...</p>
                            <p className="text-xs text-purple-600">This typically takes 10-15 seconds. Please wait.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AI Analysis Results */}
              {selectedStructuredJD.ai_analysis && (
                <div className="mt-6 pt-6 border-t space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      AI Analysis Results
                    </h4>
                    
                    {/* Generate AI-Enhanced JD Button */}
                    {!selectedStructuredJD.ai_enhanced_jd_content && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => generateAiEnhancedJD(selectedStructuredJD.id)}
                        disabled={generatingAiJd}
                      >
                        {generatingAiJd ? (
                          <><div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full" /> Generating...</>
                        ) : (
                          <><Bot className="w-4 h-4 text-purple-600" /> Generate AI JD</>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {/* AI-Enhanced JD Available Notice */}
                  {selectedStructuredJD.ai_enhanced_jd_content && (
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-purple-900">AI-Enhanced JD Available</h5>
                            <p className="text-sm text-purple-700">
                              Professional version ready for download
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateAiEnhancedJD(selectedStructuredJD.id)}
                            disabled={generatingAiJd}
                          >
                            <RefreshCw className={`w-4 h-4 ${generatingAiJd ? 'animate-spin' : ''}`} /> Re-generate
                          </Button>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => downloadStructuredJD(selectedStructuredJD.id, 'ai')}
                          >
                            <Download className="w-4 h-4" /> Download AI JD
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quality Scores */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-700">
                        {selectedStructuredJD.ai_analysis.validation?.overall_quality_score || 0}%
                      </div>
                      <div className="text-xs text-emerald-600">Overall Quality</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">
                        {selectedStructuredJD.ai_analysis.validation?.completeness_score || 0}%
                      </div>
                      <div className="text-xs text-blue-600">Completeness</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700">
                        {selectedStructuredJD.ai_analysis.validation?.clarity_score || 0}%
                      </div>
                      <div className="text-xs text-purple-600">Clarity</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-700">
                        {selectedStructuredJD.ai_analysis.validation?.market_competitiveness_score || 0}%
                      </div>
                      <div className="text-xs text-amber-600">Market Fit</div>
                    </div>
                  </div>

                  {/* Generated Summary */}
                  {selectedStructuredJD.ai_analysis.generated_summary && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                      <h5 className="font-medium text-indigo-900 mb-2">Generated Job Summary</h5>
                      <p className="text-sm text-indigo-800">{selectedStructuredJD.ai_analysis.generated_summary}</p>
                    </div>
                  )}

                  {/* Enhanced Description */}
                  {selectedStructuredJD.ai_analysis.enhanced_description && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Enhanced Description</h5>
                      <p className="text-sm text-gray-700">{selectedStructuredJD.ai_analysis.enhanced_description}</p>
                    </div>
                  )}

                  {/* Improvement Suggestions */}
                  {selectedStructuredJD.ai_analysis.improvement_suggestions?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <h5 className="font-medium text-amber-900 mb-3">Improvement Suggestions</h5>
                      <div className="space-y-3">
                        {selectedStructuredJD.ai_analysis.improvement_suggestions.map((sug, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              sug.priority === 'high' ? 'bg-red-100 text-red-700' :
                              sug.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {sug.priority}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{sug.area}</div>
                              <div className="text-sm text-gray-600">{sug.suggestion}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Post Snippets */}
                  {selectedStructuredJD.ai_analysis.social_post_snippets && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Social Media Snippets
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Linkedin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{selectedStructuredJD.ai_analysis.social_post_snippets.linkedin}</p>
                            <button 
                              onClick={() => navigator.clipboard.writeText(selectedStructuredJD.ai_analysis.social_post_snippets.linkedin)}
                              className="text-xs text-blue-600 hover:underline mt-1"
                            >
                              Copy to clipboard
                            </button>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Twitter className="w-5 h-5 text-gray-800 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{selectedStructuredJD.ai_analysis.social_post_snippets.twitter}</p>
                            <button 
                              onClick={() => navigator.clipboard.writeText(selectedStructuredJD.ai_analysis.social_post_snippets.twitter)}
                              className="text-xs text-blue-600 hover:underline mt-1"
                            >
                              Copy to clipboard
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Posting Status */}
                  <div className={`rounded-xl p-4 flex items-center justify-between ${
                    selectedStructuredJD.ai_analysis.posting_ready 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {selectedStructuredJD.ai_analysis.posting_ready ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <div className={`font-medium ${selectedStructuredJD.ai_analysis.posting_ready ? 'text-emerald-900' : 'text-red-900'}`}>
                          {selectedStructuredJD.ai_analysis.posting_ready ? 'Ready for Posting!' : 'Not Ready for Posting'}
                        </div>
                        {selectedStructuredJD.ai_analysis.posting_blockers?.length > 0 && (
                          <div className="text-sm text-red-700">
                            Blockers: {selectedStructuredJD.ai_analysis.posting_blockers.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedStructuredJD.ai_analysis.posting_ready && selectedStructuredJD.status !== 'active' && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`${API}/jd/structured/${selectedStructuredJD.id}/download/pdf`, '_blank')}
                        >
                          <Download className="w-4 h-4" /> PDF
                        </Button>
                        <Button 
                          variant="success"
                          size="sm"
                          onClick={async () => {
                            try {
                              const res = await axios.post(`${API}/jd/structured/${selectedStructuredJD.id}/submit`);
                              setSelectedStructuredJD(res.data);
                              fetchJDs();
                              alert(`JD submitted successfully! Requisition #: ${res.data.requisition_number}`);
                            } catch (e) {
                              alert('Failed to submit JD');
                            }
                          }}
                        >
                          <Send className="w-4 h-4" /> Submit to Active Jobs
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Publish Links for Active JDs */}
                  {selectedStructuredJD.status === 'active' && selectedStructuredJD.publish_links && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4">
                      <h5 className="font-medium text-indigo-900 mb-3 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" /> Share Job on Social Media
                      </h5>
                      <p className="text-sm text-indigo-700 mb-4">
                        Click to open share dialog - post directly to your feed with pre-filled content!
                      </p>
                      
                      {/* Social Media Share Buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        {selectedStructuredJD.publish_links.linkedin_post && (
                          <a
                            href={selectedStructuredJD.publish_links.linkedin_post}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396] transition-all text-sm font-medium"
                          >
                            <Linkedin className="w-5 h-5" /> Post to LinkedIn
                          </a>
                        )}
                        {selectedStructuredJD.publish_links.twitter && (
                          <a
                            href={selectedStructuredJD.publish_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
                          >
                            <Twitter className="w-5 h-5" /> Post to X/Twitter
                          </a>
                        )}
                        {selectedStructuredJD.publish_links.facebook && (
                          <a
                            href={selectedStructuredJD.publish_links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all text-sm font-medium"
                          >
                            <Facebook className="w-5 h-5" /> Share on Facebook
                          </a>
                        )}
                      </div>
                      
                      {/* Job Board Links */}
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Job Boards</h6>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['indeed', 'naukri', 'glassdoor'].filter(p => selectedStructuredJD.publish_links[p]).map(platform => (
                          <a
                            key={platform}
                            href={selectedStructuredJD.publish_links[platform]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:shadow-md transition-all text-xs capitalize"
                          >
                            <Globe className="w-3 h-3 text-gray-600" />
                            {platform}
                          </a>
                        ))}
                      </div>
                      
                      {/* Application Info */}
                      {(selectedStructuredJD.application_email || selectedStructuredJD.application_link) && (
                        <div className="mt-4 pt-3 border-t border-indigo-200">
                          <p className="text-sm text-indigo-800">
                            <strong>Apply via:</strong>{' '}
                            {selectedStructuredJD.application_email && (
                              <a href={`mailto:${selectedStructuredJD.application_email}`} className="text-indigo-600 hover:underline">
                                {selectedStructuredJD.application_email}
                              </a>
                            )}
                            {selectedStructuredJD.application_link && (
                              <a href={selectedStructuredJD.application_link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                {selectedStructuredJD.application_link}
                              </a>
                            )}
                          </p>
                        </div>
                      )}
                      
                      <p className="text-xs text-indigo-600 mt-3">
                        Requisition #: {selectedStructuredJD.requisition_number}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Analyze Tab Content */}
      {activeTab === "analyze" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* JD List - Only show drafts (not submitted) */}
          <div className="lg:col-span-1 space-y-4">
            {(() => {
              // Filter out JDs that have been submitted (have requisition_number)
              const draftJDs = jds.filter(j => !j.requisition_number);
              
              if (draftJDs.length === 0) {
                return (
                  <EmptyState 
                    icon={FileText}
                    title="No Draft JDs"
                    description={jds.length > 0 
                      ? "All JDs have been submitted to Active Jobs" 
                      : "Start by analyzing your first job description"}
                    action={(
                      <Button onClick={() => setShowModal(true)}>
                        <Plus className="w-4 h-4" />
                        Analyze JD
                      </Button>
                    )}
                  />
                );
              }
              
              return draftJDs.map(jd => (
                <Card 
                  key={jd.id}
                  className={`p-4 cursor-pointer transition-all ${selectedJD?.id === jd.id ? "ring-2 ring-indigo-500" : "hover:shadow-md"}`}
                  onClick={() => setSelectedJD(jd)}
                  data-testid={`jd-card-${jd.id}`}
                >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{jd.title}</h3>
                    </div>
                    {jd.company && <p className="text-sm text-gray-500">{jd.company}</p>}
                  </div>
                  <ScoreIndicator score={jd.analysis?.quality_score || 0} size="sm" />
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge variant="warning">Draft</Badge>
                  {jd.requisition_date && (
                    <Badge variant="default">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(jd.requisition_date).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteJD(jd.id); }}
                    className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                    title="Delete JD"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Button 
                    size="sm" 
                    variant="success"
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      submitJDToActiveJobs(jd.id, false);
                    }}
                  >
                    <Send className="w-3 h-3" /> Post
                  </Button>
                </div>
              </Card>
              ));
            })()}
          </div>

        {/* JD Details */}
        <div className="lg:col-span-2">
          {selectedJD ? (
            <Card className="p-6">
              {/* Header with Actions */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{selectedJD.title}</h2>
                    <Badge variant={selectedJD.status === 'active' ? "success" : selectedJD.status === 'closed' ? "default" : "info"}>
                      {selectedJD.status === 'active' ? 'Active' : selectedJD.status === 'closed' ? 'Closed' : 'Draft'}
                    </Badge>
                  </div>
                  {selectedJD.company && <p className="text-gray-500">{selectedJD.company}</p>}
                  {selectedJD.requisition_number && (
                    <p className="text-sm text-indigo-600 font-mono mt-1">
                      Requisition: {selectedJD.requisition_number}
                    </p>
                  )}
                </div>
                <ScoreIndicator score={selectedJD.analysis?.quality_score || 0} size="md" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-xl">
                {selectedJD.status === 'draft' && (
                  <Button 
                    onClick={() => submitJD(selectedJD.id)}
                    disabled={submitting}
                    variant="success"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit & Activate
                  </Button>
                )}
                
                {selectedJD.status === 'active' && (
                  <>
                    {/* Social Media Share Buttons */}
                    <SocialShareButtons job={selectedJD} />
                    
                    <Button variant="outline" onClick={() => setShowPublishModal(true)}>
                      <Globe className="w-4 h-4" />
                      Job Boards
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (selectedJD.screening_questions?.length > 0) {
                          setScreeningQuestions(selectedJD.screening_questions);
                          setShowScreeningModal(true);
                        } else {
                          generateScreeningQuestions(selectedJD.id);
                        }
                      }}
                      disabled={generatingQuestions}
                    >
                      {generatingQuestions ? (
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ClipboardList className="w-4 h-4" />
                      )}
                      Screening Questions
                    </Button>
                    <Button variant="outline" onClick={() => closeJob(selectedJD.id)}>
                      <PauseCircle className="w-4 h-4" />
                      Close Job
                    </Button>
                  </>
                )}

                {selectedJD.status === 'closed' && (
                  <Button variant="outline" onClick={() => reopenJob(selectedJD.id)}>
                    <PlayCircle className="w-4 h-4" />
                    Reopen Job
                  </Button>
                )}

                <Button variant="outline" onClick={() => openEditModal(selectedJD)}>
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>

                <div className="relative group">
                  <Button variant="outline">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button 
                      onClick={() => downloadJD(selectedJD.id, 'txt')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Download as TXT
                    </button>
                    <button 
                      onClick={() => downloadJD(selectedJD.id, 'pdf')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Download as PDF
                    </button>
                    <button 
                      onClick={() => downloadJD(selectedJD.id, 'docx')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Download as DOCX
                    </button>
                  </div>
                </div>
              </div>

              {/* Graphical JD Summary Card */}
              {selectedJD.parsed_data && (
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Job Overview at a Glance
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {/* Quality Score */}
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${
                        (selectedJD.analysis?.quality_score || 0) >= 80 ? 'text-emerald-400' :
                        (selectedJD.analysis?.quality_score || 0) >= 60 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {selectedJD.analysis?.quality_score || 0}%
                      </div>
                      <div className="text-xs text-gray-300 mt-1">Quality Score</div>
                    </div>
                    
                    {/* Experience */}
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {selectedJD.parsed_data.experience_years?.min !== null && selectedJD.parsed_data.experience_years?.max !== null
                          ? `${selectedJD.parsed_data.experience_years.min}-${selectedJD.parsed_data.experience_years.max}`
                          : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {selectedJD.parsed_data.experience_years?.min !== null ? 'Years Exp.' : 'Not specified in JD'}
                      </div>
                    </div>
                    
                    {/* Required Skills Count */}
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-emerald-400">
                        {selectedJD.parsed_data.required_skills?.length || 0}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">Required Skills</div>
                    </div>
                    
                    {/* Seniority */}
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-purple-400 capitalize">
                        {selectedJD.parsed_data.seniority_level || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">Seniority</div>
                    </div>
                  </div>

                  {/* Skills Bar Chart */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Required Skills Mini Bar */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Required Skills</span>
                        <span className="text-xs text-emerald-400">{selectedJD.parsed_data.required_skills?.length || 0}</span>
                      </div>
                      <div className="flex gap-1">
                        {(selectedJD.parsed_data.required_skills || []).slice(0, 8).map((_, i) => (
                          <div key={i} className="flex-1 h-2 bg-emerald-500 rounded-full" />
                        ))}
                        {Array(Math.max(0, 8 - (selectedJD.parsed_data.required_skills?.length || 0))).fill(0).map((_, i) => (
                          <div key={`empty-${i}`} className="flex-1 h-2 bg-white/10 rounded-full" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Preferred Skills Mini Bar */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Preferred Skills</span>
                        <span className="text-xs text-amber-400">{selectedJD.parsed_data.preferred_skills?.length || 0}</span>
                      </div>
                      <div className="flex gap-1">
                        {(selectedJD.parsed_data.preferred_skills || []).slice(0, 8).map((_, i) => (
                          <div key={i} className="flex-1 h-2 bg-amber-500 rounded-full" />
                        ))}
                        {Array(Math.max(0, 8 - (selectedJD.parsed_data.preferred_skills?.length || 0))).fill(0).map((_, i) => (
                          <div key={`empty-${i}`} className="flex-1 h-2 bg-white/10 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                    {selectedJD.parsed_data.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Globe className="w-3 h-3" />
                        {selectedJD.parsed_data.location}
                      </div>
                    )}
                    {selectedJD.parsed_data.employment_type && (
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Briefcase className="w-3 h-3" />
                        {selectedJD.parsed_data.employment_type}
                      </div>
                    )}
                    {selectedJD.parsed_data.department && (
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Building2 className="w-3 h-3" />
                        {selectedJD.parsed_data.department}
                      </div>
                    )}
                    {selectedJD.analysis?.red_flags?.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        {selectedJD.analysis.red_flags.length} Red Flag{selectedJD.analysis.red_flags.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {selectedJD.screening_questions?.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-blue-400">
                        <ClipboardList className="w-3 h-3" />
                        {selectedJD.screening_questions.length} Screening Q's
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Why Score */}
              {selectedJD.analysis?.why_quality_score && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-indigo-900 mb-1">Quality Score Analysis</h4>
                      <p className="text-sm text-indigo-700">{selectedJD.analysis.why_quality_score}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Extraction Confidence Indicator */}
              {selectedJD.parsed_data?.extraction_confidence && (
                <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
                  selectedJD.parsed_data.extraction_confidence === 'high' 
                    ? 'bg-emerald-50 border border-emerald-100' 
                    : selectedJD.parsed_data.extraction_confidence === 'medium'
                    ? 'bg-amber-50 border border-amber-100'
                    : 'bg-red-50 border border-red-100'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedJD.parsed_data.extraction_confidence === 'high' 
                      ? 'bg-emerald-500' 
                      : selectedJD.parsed_data.extraction_confidence === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`} />
                  <div>
                    <span className={`text-sm font-medium ${
                      selectedJD.parsed_data.extraction_confidence === 'high' 
                        ? 'text-emerald-800' 
                        : selectedJD.parsed_data.extraction_confidence === 'medium'
                        ? 'text-amber-800'
                        : 'text-red-800'
                    }`}>
                      Extraction Confidence: {selectedJD.parsed_data.extraction_confidence.charAt(0).toUpperCase() + selectedJD.parsed_data.extraction_confidence.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {selectedJD.parsed_data.extraction_confidence === 'high' 
                        ? 'JD clearly stated most requirements' 
                        : selectedJD.parsed_data.extraction_confidence === 'medium'
                        ? 'Some requirements were inferred from context'
                        : 'JD was vague - consider adding more details'}
                    </p>
                  </div>
                </div>
              )}

              {/* Parsed Data */}
              {selectedJD.parsed_data && (
                <div className="space-y-6">
                  {/* Summary */}
                  {selectedJD.parsed_data.summary && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                      <p className="text-gray-600">{selectedJD.parsed_data.summary}</p>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedJD.parsed_data.required_skills?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedJD.parsed_data.required_skills.map((skill, i) => (
                            <Badge key={i} variant="success">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedJD.parsed_data.preferred_skills?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          Preferred Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedJD.parsed_data.preferred_skills.map((skill, i) => (
                            <Badge key={i} variant="warning">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Experience & Education */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        Experience Required
                      </h4>
                      {selectedJD.parsed_data.experience_years?.min !== null && selectedJD.parsed_data.experience_years?.max !== null ? (
                        <>
                          <p className="text-gray-600">
                            {selectedJD.parsed_data.experience_years.min} - {selectedJD.parsed_data.experience_years.max} years
                          </p>
                          {selectedJD.parsed_data.experience_years.source_text && (
                            <p className="text-xs text-gray-400 mt-1 italic">
                              Source: "{selectedJD.parsed_data.experience_years.source_text}"
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-400 italic">Not specified in JD</p>
                      )}
                    </div>
                    {selectedJD.parsed_data.seniority_level && selectedJD.parsed_data.seniority_level !== 'Not specified' && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          Seniority Level
                        </h4>
                        <p className="text-gray-600 capitalize">{selectedJD.parsed_data.seniority_level}</p>
                      </div>
                    )}
                  </div>

                  {/* Red Flags */}
                  {selectedJD.analysis?.red_flags?.length > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Red Flags
                      </h4>
                      <ul className="space-y-1">
                        {selectedJD.analysis.red_flags.map((flag, i) => (
                          <li key={i} className="text-sm text-red-700">• {flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvement Suggestions */}
                  {selectedJD.improvement_suggestions?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Improvement Suggestions
                      </h4>
                      <ul className="space-y-1">
                        {selectedJD.improvement_suggestions.map((suggestion, i) => (
                          <li key={i} className="text-sm text-amber-700">• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6">
              <EmptyState 
                icon={Eye}
                title="Select a JD"
                description="Click on a job description from the list to view its analysis"
              />
            </Card>
          )}
        </div>
      </div>
      )}

      {/* Structured JD Creator Modal */}
      {showStructuredCreator && (
        <StructuredJDCreator 
          onClose={() => setShowStructuredCreator(false)} 
          onSuccess={async (newJdId) => {
            await fetchJDs();
            setShowStructuredCreator(false);
            // Auto-select the newly created JD to show Edit/Download/Submit options
            if (newJdId) {
              try {
                const res = await axios.get(`${API}/jd/structured/${newJdId}`);
                setSelectedStructuredJD(res.data);
              } catch (e) {
                console.error("Error fetching new JD:", e);
              }
            }
            // Move to analyze tab after JD creation
            setActiveTab("analyze");
          }}
        />
      )}

      {/* Structured JD Editor Modal */}
      {showStructuredEditor && selectedStructuredJD && (
        <StructuredJDEditor 
          jd={selectedStructuredJD}
          onClose={() => setShowStructuredEditor(false)} 
          onSuccess={() => {
            fetchJDs();
            // Refresh the selected JD
            axios.get(`${API}/jd/structured/${selectedStructuredJD.id}`)
              .then(res => setSelectedStructuredJD(res.data))
              .catch(() => {});
          }}
        />
      )}

      {/* Vendor JD Upload Modal */}
      {showVendorUpload && (
        <VendorJDUpload 
          onClose={() => setShowVendorUpload(false)} 
          onSuccess={() => {
            fetchJDs();
            setShowVendorUpload(false);
            setSelectedJD(null);
            // Move to analyze tab after JD upload
            setActiveTab("analyze");
          }}
        />
      )}

      {/* Analyze JD Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Analyze Job Description" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Job Title *"
              placeholder="e.g., Senior Software Engineer"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              data-testid="jd-title-input"
            />
            <Input 
              label="Company"
              placeholder="e.g., Acme Corp"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              data-testid="jd-company-input"
            />
          </div>
          <TextArea 
            label="Job Description *"
            placeholder="Paste the full job description here..."
            rows={12}
            value={formData.raw_text}
            onChange={(e) => setFormData({...formData, raw_text: e.target.value})}
            data-testid="jd-text-input"
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button 
              onClick={analyzeJD} 
              disabled={analyzing || !formData.title || !formData.raw_text}
              data-testid="submit-jd-btn"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Publish Links Modal */}
      <Modal isOpen={showPublishModal} onClose={() => setShowPublishModal(false)} title="Publish Job to Job Sites" size="md">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Click on any platform below to publish your job listing:</p>
          
          <div className="space-y-3">
            {selectedJD?.publish_links && Object.entries(selectedJD.publish_links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  {platform === 'linkedin' && <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Linkedin className="w-5 h-5 text-white" /></div>}
                  {platform === 'twitter' && <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center"><Twitter className="w-5 h-5 text-white" /></div>}
                  {platform === 'facebook' && <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center"><Facebook className="w-5 h-5 text-white" /></div>}
                  {!['linkedin', 'twitter', 'facebook'].includes(platform) && (
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div>
                  )}
                  <span className="font-medium capitalize">{platform}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Or copy the job details:</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => copyToClipboard(`${selectedJD?.title} at ${selectedJD?.company}\n\n${selectedJD?.raw_text}`)}
            >
              <Copy className="w-4 h-4" />
              Copy Job Description
            </Button>
          </div>
        </div>
      </Modal>

      {/* Screening Questions Modal */}
      <Modal isOpen={showScreeningModal} onClose={() => setShowScreeningModal(false)} title="Screening Questions" size="xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              AI-generated questions for phone screening based on job requirements
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateScreeningQuestions(selectedJD?.id)}
                disabled={generatingQuestions}
              >
                <RefreshCw className={`w-4 h-4 ${generatingQuestions ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
              <Button size="sm" onClick={saveScreeningQuestions}>
                <CheckCircle className="w-4 h-4" />
                Save Questions
              </Button>
            </div>
          </div>

          {screeningQuestions.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No screening questions yet. Click "Regenerate" to create them.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {screeningQuestions.map((q, i) => (
                <div key={q.id || i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                      <Badge variant={q.difficulty === 'easy' ? 'success' : q.difficulty === 'hard' ? 'danger' : 'warning'}>
                        {q.difficulty}
                      </Badge>
                      <Badge variant="info">{q.skill_area}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{q.time_estimate}</span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-3">{q.question}</h4>
                  
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-2">
                    <h5 className="text-xs font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Expected Answer
                    </h5>
                    <p className="text-sm text-emerald-700">{q.expected_answer}</p>
                  </div>

                  {q.red_flags && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-2">
                      <h5 className="text-xs font-semibold text-red-800 mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Red Flags to Watch
                      </h5>
                      <p className="text-sm text-red-700">{q.red_flags}</p>
                    </div>
                  )}

                  {q.follow_up && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Follow-up Question
                      </h5>
                      <p className="text-sm text-blue-700">{q.follow_up}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Edit JD Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Job Description" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Job Title *"
              placeholder="e.g., Senior Software Engineer"
              value={editFormData.title}
              onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
            />
            <Input 
              label="Company"
              placeholder="e.g., Acme Corp"
              value={editFormData.company}
              onChange={(e) => setEditFormData({...editFormData, company: e.target.value})}
            />
          </div>
          <TextArea 
            label="Job Description *"
            placeholder="Edit the job description..."
            rows={12}
            value={editFormData.raw_text}
            onChange={(e) => setEditFormData({...editFormData, raw_text: e.target.value})}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button onClick={updateJD}>
              <CheckCircle className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============ Active Jobs Hub Component ============
const ActiveJobsHub = ({ userType = 'corporate' }) => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState("jobs"); // jobs, applications
  const isVendor = userType === 'vendor';

  const fetchData = useCallback(async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        axios.get(`${API}/jd/active/list`),
        axios.get(`${API}/repository/all-resumes`)
      ]);
      // jobsRes.data is an array directly
      const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : [];
      setActiveJobs(jobs.filter(j => j.status === 'active'));
      setApplications(appsRes.data?.resumes || []);
    } catch (e) {
      console.error("Error fetching data:", e);
      setActiveJobs([]);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to close this job?")) return;
    try {
      await axios.post(`${API}/jd/${jobId}/close`);
      fetchData();
    } catch (e) {
      console.error("Error closing job:", e);
    }
  };

  const reopenJob = async (jobId) => {
    try {
      await axios.post(`${API}/jd/${jobId}/reopen`);
      fetchData();
    } catch (e) {
      console.error("Error reopening job:", e);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Jobs & Applications</h1>
          <p className="text-gray-500">Manage published jobs and track incoming applications</p>
        </div>
        <div className="flex gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("jobs")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                viewMode === "jobs" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <PlayCircle className="w-4 h-4 inline mr-2" />
              Active Jobs ({activeJobs.length})
            </button>
            <button
              onClick={() => setViewMode("applications")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                viewMode === "applications" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Applications ({applications.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeJobs.length}</div>
              <div className="text-xs text-gray-500">Active Jobs</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
              <div className="text-xs text-gray-500">Total Applications</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeJobs.reduce((sum, j) => sum + Object.keys(j.publish_links || {}).length, 0)}</div>
              <div className="text-xs text-gray-500">Publish Links</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{applications.filter(a => a.status === 'new').length}</div>
              <div className="text-xs text-gray-500">New Applications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Default Careers Link - Shareable Application Link */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">RoleSense Careers Page</h3>
              <p className="text-indigo-100 text-sm">Share this link on LinkedIn, job boards & social media. All resumes auto-route to Resume Repository.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20">
              <code className="text-sm">{window.location.origin}/careers</code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + '/careers');
                alert('RoleSense Careers page link copied!\n\n📢 Share this on:\n• LinkedIn\n• Twitter/X\n• Facebook\n• Job Boards (Indeed, Naukri, Glassdoor)\n• Your Website\n\n✅ All applications will be auto-routed to Resume Repository.');
              }}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <a
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-indigo-100">All active jobs displayed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-indigo-100">Direct candidate applications</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-indigo-100">Auto-routed to Resume Repository</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-indigo-100">AI classification & assessment</span>
          </div>
        </div>
      </div>

      {/* Active Jobs View */}
      {viewMode === "jobs" && (
        <div className="space-y-4">
          {activeJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <PlayCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No Active Jobs</h3>
              <p className="text-gray-500 text-sm mb-4">Create and submit a JD from JD Intelligence to publish it here</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requisition #</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Business/Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Link</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Applications</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeJobs.map(job => {
                      const jobApps = applications.filter(a => a.applied_job_id === job.id);
                      const receivedCount = jobApps.length;
                      const reviewedCount = jobApps.filter(a => a.status === 'reviewed' || a.status === 'shortlisted').length;
                      const location = job.basic_info?.locations_india?.join(', ') || job.parsed_data?.location || 'Not specified';
                      const jobLink = job.rolesense_job_link || job.publish_links?.rolesense || `/jobs/${job.id}`;
                      
                      return (
                        <tr 
                          key={job.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedJob?.id === job.id ? 'bg-emerald-50' : ''}`}
                          onClick={() => setSelectedJob(job)}
                        >
                          <td className="px-4 py-3">
                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-indigo-600">
                              {job.requisition_number || 'N/A'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {job.requisition_date ? new Date(job.requisition_date).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{job.basic_info?.title || job.title}</div>
                            <div className="text-xs text-gray-400">{job.basic_info?.department || ''}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {job.basic_info?.company_name || job.company || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-[150px] truncate" title={location}>
                            {location}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <a
                                href={jobLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-200 transition-colors"
                              >
                                <Briefcase className="w-3 h-3" />
                                Apply Link
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(window.location.origin + jobLink);
                                  alert('Job link copied to clipboard!');
                                }}
                                className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="Copy Link"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold ${receivedCount > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                                {receivedCount}
                              </span>
                              <span className="text-gray-300">/</span>
                              <span className={`text-sm ${reviewedCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                                {reviewedCount} reviewed
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); closeJob(job.id); }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                title="Close Job"
                              >
                                <PauseCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Selected Job Details */}
          {selectedJob && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedJob.basic_info?.title || selectedJob.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{selectedJob.basic_info?.company_name}</span>
                    <span>•</span>
                    <span>Req #: {selectedJob.requisition_number}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* RoleSense Job Link - Primary Share Link */}
              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900">RoleSense Job Link</h4>
                      <p className="text-sm text-indigo-600">Share this link on social media for candidates to apply</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedJob.rolesense_job_link || selectedJob.publish_links?.rolesense || `/jobs/${selectedJob.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Link
                    </a>
                    <button
                      onClick={() => {
                        const link = window.location.origin + (selectedJob.rolesense_job_link || selectedJob.publish_links?.rolesense || `/jobs/${selectedJob.id}`);
                        navigator.clipboard.writeText(link);
                        alert('Job link copied! Share this on LinkedIn, Twitter, or any social media.');
                      }}
                      className="px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white rounded-lg border border-indigo-100">
                  <code className="text-xs text-indigo-700 break-all">
                    {window.location.origin}{selectedJob.rolesense_job_link || selectedJob.publish_links?.rolesense || `/jobs/${selectedJob.id}`}
                  </code>
                </div>
              </div>

              {/* Social Share Links Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  Share to Social Media
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedJob.publish_links && Object.entries(selectedJob.publish_links)
                    .filter(([platform]) => platform !== 'rolesense')
                    .map(([platform, url], idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {platform === 'linkedin' || platform === 'linkedin_post' ? <Linkedin className="w-4 h-4 text-blue-600" /> :
                         platform === 'twitter' ? <Twitter className="w-4 h-4 text-sky-500" /> :
                         platform === 'facebook' ? <Facebook className="w-4 h-4 text-blue-700" /> :
                         <Globe className="w-4 h-4 text-gray-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 capitalize">{platform.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-500">Click to open</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Applications for this job */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  Applications ({applications.filter(a => a.applied_job_id === selectedJob.id).length})
                </h3>
                <div className="space-y-2">
                  {applications.filter(a => a.applied_job_id === selectedJob.id).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">{app.name?.charAt(0) || '?'}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{app.name}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                  {applications.filter(a => a.applied_job_id === selectedJob.id).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No applications yet for this job</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Applications View */}
      {viewMode === "applications" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Applied For</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requisition</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Routed To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{app.name}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{app.applied_job_title || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {app.applied_requisition_number || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.source === 'linkedin' ? 'bg-blue-100 text-blue-700' :
                        app.source === 'indeed' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {app.source || 'Direct'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {app.created_at ? new Date(app.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-gray-600">{app.primary_function}</span>
                      <div className="text-xs text-gray-400">{app.sub_function}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {applications.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Inbox className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No applications received yet</p>
                <p className="text-sm">Applications will appear here when candidates apply to your active jobs</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============ Resume Repository Component ============
const ResumeRepository = () => {
  const [folders, setFolders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedSubFunction, setSelectedSubFunction] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [allResumes, setAllResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showBulkTrajectoryModal, setShowBulkTrajectoryModal] = useState(false);
  const [routing, setRouting] = useState(false);
  const [creatingTestData, setCreatingTestData] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", resume_text: "", job_id: "" });
  const [activeJobs, setActiveJobs] = useState([]);
  const [viewMode, setViewMode] = useState("folders"); // "folders" or "notifications"
  const [notificationFilters, setNotificationFilters] = useState({
    requisition_id: "",
    business_name: "",
    date_from: "",
    date_to: "",
    source: ""
  });
  const [selectedForTrajectory, setSelectedForTrajectory] = useState([]);
  
  // Get user organization from localStorage for subscription checks
  const [userOrganization, setUserOrganization] = useState(null);
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("rolesense_user_data");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserOrganization(userData.organization);
      }
    } catch (e) {
      console.error("Error loading user data:", e);
    }
  }, []);
  const [creatingTrajectory, setCreatingTrajectory] = useState(false);

  const fetchFolders = useCallback(async () => {
    try {
      const [foldersRes, statsRes, jobsRes, allResumesRes] = await Promise.all([
        axios.get(`${API}/repository/folders`),
        axios.get(`${API}/repository/stats`),
        axios.get(`${API}/jd/active/list`),
        axios.get(`${API}/repository/all-resumes`)
      ]);
      setFolders(foldersRes.data);
      setStats(statsRes.data);
      setActiveJobs(jobsRes.data.filter(j => j.status === 'active'));
      setAllResumes(allResumesRes.data?.resumes || []);
      
      // Auto-expand folders with resumes
      const expanded = {};
      foldersRes.data.forEach(f => {
        if (f.resume_count > 0 || statsRes.data.by_function[f.name] > 0) {
          expanded[f.name] = true;
        }
      });
      setExpandedFolders(expanded);
    } catch (e) {
      console.error("Error fetching folders:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const fetchResumes = async (functionName, subFunction = null) => {
    try {
      let url = `${API}/repository/folder/${functionName}`;
      if (subFunction) {
        url += `?sub_function=${encodeURIComponent(subFunction)}`;
      }
      const res = await axios.get(url);
      setResumes(res.data);
    } catch (e) {
      console.error("Error fetching resumes:", e);
    }
  };

  const selectFolder = (functionName, subFunction = null) => {
    setSelectedFunction(functionName);
    setSelectedSubFunction(subFunction);
    setSelectedResume(null);
    fetchResumes(functionName, subFunction);
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const routeResume = async () => {
    if (!formData.name || !formData.resume_text) return;
    setRouting(true);
    try {
      const res = await axios.post(`${API}/repository/route`, formData);
      setShowAddModal(false);
      setFormData({ name: "", email: "", phone: "", resume_text: "", job_id: "" });
      fetchFolders();
      // Select the folder it was routed to
      selectFolder(res.data.primary_function, res.data.sub_function);
      alert(`Resume routed to: ${res.data.primary_function} > ${res.data.sub_function}\nConfidence: ${(res.data.confidence_score * 100).toFixed(0)}%`);
    } catch (e) {
      console.error("Error routing resume:", e);
      alert("Failed to route resume. Please try again.");
    } finally {
      setRouting(false);
    }
  };

  const submitApplication = async () => {
    if (!formData.name || !formData.resume_text || !formData.job_id) return;
    setRouting(true);
    try {
      const res = await axios.post(`${API}/apply/${formData.job_id}`, {
        job_id: formData.job_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_text: formData.resume_text,
        source: "job_link"
      });
      setShowApplicationModal(false);
      setFormData({ name: "", email: "", phone: "", resume_text: "", job_id: "" });
      fetchFolders();
      alert(`Application submitted!\nRouted to: ${res.data.routed_to.function} > ${res.data.routed_to.sub_function}`);
    } catch (e) {
      console.error("Error submitting application:", e);
      alert(e.response?.data?.detail || "Failed to submit application.");
    } finally {
      setRouting(false);
    }
  };

  const createTestCandidates = async () => {
    setCreatingTestData(true);
    try {
      const res = await axios.post(`${API}/repository/test-candidates`);
      fetchFolders();
      alert(`${res.data.message}\n\nRouting Results:\n${res.data.results.map(r => `${r.name} → ${r.routed_to}`).join('\n')}`);
    } catch (e) {
      console.error("Error creating test candidates:", e);
      alert("Failed to create test candidates.");
    } finally {
      setCreatingTestData(false);
    }
  };

  const updateResumeStatus = async (resumeId, newStatus) => {
    try {
      await axios.put(`${API}/repository/resume/${resumeId}/status`, { status: newStatus });
      // Update local state
      setResumes(resumes.map(r => r.id === resumeId ? { ...r, status: newStatus } : r));
      if (selectedResume?.id === resumeId) {
        setSelectedResume({ ...selectedResume, status: newStatus });
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewed': return 'bg-purple-100 text-purple-700';
      case 'shortlisted': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'hired': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFunctionIcon = (name) => {
    switch (name) {
      case 'HR': return Users;
      case 'IT': return Brain;
      case 'Finance': return TrendingUp;
      case 'Marketing': return Target;
      case 'Operations': return Zap;
      case 'Supply Chain': return GitBranch;
      case 'Administration': return Building2;
      default: return Folder;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Repository</h1>
          <p className="text-gray-500">Auto-routed resumes by function and sub-function</p>
        </div>
        <div className="flex gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("folders")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "folders" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FolderTree className="w-4 h-4 inline mr-1" />
              Folders
            </button>
            <button
              onClick={() => setViewMode("notifications")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "notifications" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Bell className="w-4 h-4 inline mr-1" />
              Notifications
            </button>
          </div>
          {selectedForTrajectory.length > 0 && (
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowBulkTrajectoryModal(true)}
            >
              <Activity className="w-4 h-4" />
              Analyze Fitment ({selectedForTrajectory.length})
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowApplicationModal(true)}>
            <Link2 className="w-4 h-4" />
            Simulate Application
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            Route Resume
          </Button>
        </div>
      </div>

      {/* Notification Dashboard View */}
      {viewMode === "notifications" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              Filter Resumes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Requisition ID</label>
                <input
                  type="text"
                  placeholder="REQ-..."
                  value={notificationFilters.requisition_id}
                  onChange={(e) => setNotificationFilters(prev => ({ ...prev, requisition_id: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Business/Function</label>
                <input
                  type="text"
                  placeholder="IT, HR, Finance..."
                  value={notificationFilters.business_name}
                  onChange={(e) => setNotificationFilters(prev => ({ ...prev, business_name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Source</label>
                <select
                  value={notificationFilters.source}
                  onChange={(e) => setNotificationFilters(prev => ({ ...prev, source: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Sources</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="indeed">Indeed</option>
                  <option value="naukri">Naukri</option>
                  <option value="glassdoor">Glassdoor</option>
                  <option value="direct">Direct</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Date From</label>
                <input
                  type="date"
                  value={notificationFilters.date_from}
                  onChange={(e) => setNotificationFilters(prev => ({ ...prev, date_from: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Date To</label>
                <input
                  type="date"
                  value={notificationFilters.date_to}
                  onChange={(e) => setNotificationFilters(prev => ({ ...prev, date_to: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" size="sm" onClick={() => setNotificationFilters({ requisition_id: "", business_name: "", date_from: "", date_to: "", source: "" })}>
                Clear Filters
              </Button>
              <Button size="sm" onClick={fetchFolders}>
                <Search className="w-4 h-4" /> Apply Filters
              </Button>
            </div>
          </div>

          {/* Tabular Resume Notifications */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-gray-400" />
                Resume Notifications
                <span className="text-sm font-normal text-gray-400">({allResumes.length} total)</span>
              </h3>
              {selectedForTrajectory.length > 0 && (
                <span className="text-sm text-purple-600 font-medium">
                  {selectedForTrajectory.length} selected for Career Trajectory Analysis
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedForTrajectory(allResumes.map(r => r.id));
                          } else {
                            setSelectedForTrajectory([]);
                          }
                        }}
                        checked={selectedForTrajectory.length === allResumes.length && allResumes.length > 0}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requisition ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Job Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Function</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date Received</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trajectory</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allResumes.filter(resume => {
                    if (notificationFilters.requisition_id && !resume.applied_requisition_number?.toLowerCase().includes(notificationFilters.requisition_id.toLowerCase())) return false;
                    if (notificationFilters.business_name && !resume.primary_function?.toLowerCase().includes(notificationFilters.business_name.toLowerCase()) && !resume.applied_job_title?.toLowerCase().includes(notificationFilters.business_name.toLowerCase())) return false;
                    if (notificationFilters.source && !resume.source?.toLowerCase().includes(notificationFilters.source.toLowerCase())) return false;
                    return true;
                  }).map(resume => (
                    <tr key={resume.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedForTrajectory.includes(resume.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedForTrajectory(prev => [...prev, resume.id]);
                            } else {
                              setSelectedForTrajectory(prev => prev.filter(id => id !== resume.id));
                            }
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{resume.name}</div>
                        <div className="text-xs text-gray-500">{resume.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {resume.applied_requisition_number || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{resume.applied_job_title || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{resume.primary_function}</span>
                        <div className="text-xs text-gray-400">{resume.sub_function}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resume.source === 'linkedin' ? 'bg-blue-100 text-blue-700' :
                          resume.source === 'indeed' ? 'bg-purple-100 text-purple-700' :
                          resume.source === 'naukri' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {resume.source || 'Direct'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resume.status)}`}>
                          {resume.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {resume.trajectory_assessment_id ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            Linked
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                            Not Linked
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setSelectedResume(resume); setViewMode("folders"); }}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!resume.trajectory_assessment_id && (
                            <button
                              onClick={async () => {
                                try {
                                  await axios.post(`${API}/repository/bulk-trajectory`, { resume_ids: [resume.id] });
                                  fetchFolders();
                                  alert("Career Trajectory assessment created!");
                                } catch (e) {
                                  alert("Failed to create assessment");
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded"
                              title="Create Trajectory Assessment"
                            >
                              <Activity className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allResumes.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Inbox className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No resumes received yet</p>
                  <p className="text-sm">Resumes will appear here when candidates apply to your active jobs</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Folders View */}
      {viewMode === "folders" && (
        <>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {folders.map(folder => {
          const Icon = getFunctionIcon(folder.name);
          const count = stats?.by_function[folder.name] || 0;
          return (
            <div 
              key={folder.name}
              onClick={() => { selectFolder(folder.name); toggleFolder(folder.name); }}
              className={`bg-white rounded-xl p-4 cursor-pointer transition-all border ${
                selectedFunction === folder.name && !selectedSubFunction 
                  ? 'border-indigo-500 ring-2 ring-indigo-100' 
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500 truncate">{folder.name}</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folder Tree */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-gray-400" />
            Folder Structure
          </h3>
          <div className="space-y-1">
            {folders.map(folder => {
              const Icon = getFunctionIcon(folder.name);
              const isExpanded = expandedFolders[folder.name];
              const count = stats?.by_function[folder.name] || 0;
              
              return (
                <div key={folder.id}>
                  <button
                    onClick={() => { toggleFolder(folder.name); selectFolder(folder.name); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      selectedFunction === folder.name && !selectedSubFunction
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                    {isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Folder className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="flex-1 text-left text-sm font-medium">{folder.name}</span>
                    {count > 0 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{count}</span>
                    )}
                  </button>
                  
                  {isExpanded && folder.sub_folders_data && (
                    <div className="ml-6 mt-1 space-y-0.5">
                      {folder.sub_folders_data.map(sub => {
                        const subCount = stats?.by_sub_function?.find(
                          s => s._id.function === folder.name && s._id.sub === sub.name
                        )?.count || 0;
                        
                        return (
                          <button
                            key={sub.id}
                            onClick={() => selectFolder(folder.name, sub.name)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                              selectedSubFunction === sub.name && selectedFunction === folder.name
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <FileText className="w-3 h-3" />
                            <span className="flex-1 text-left text-xs truncate">{sub.name}</span>
                            {subCount > 0 && (
                              <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{subCount}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Resume List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileUser className="w-4 h-4 text-gray-400" />
            {selectedSubFunction ? `${selectedFunction} > ${selectedSubFunction}` : selectedFunction || 'All Resumes'}
            <span className="text-sm font-normal text-gray-400">({resumes.length})</span>
          </h3>
          
          {resumes.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No resumes in this folder</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {resumes.map(resume => (
                <div
                  key={resume.id}
                  onClick={() => setSelectedResume(resume)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedResume?.id === resume.id
                      ? 'bg-indigo-50 border border-indigo-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{resume.name}</h4>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getStatusColor(resume.status)}`}>
                      {resume.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{resume.parsed_data?.current_role || 'No role'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">
                      {(resume.confidence_score * 100).toFixed(0)}% match
                    </span>
                    {resume.applied_job_title && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded truncate">
                        {resume.applied_job_title}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resume Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          {selectedResume ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedResume.name}</h2>
                  <p className="text-gray-500">{selectedResume.parsed_data?.current_role || 'No role specified'}</p>
                </div>
                <select
                  value={selectedResume.status}
                  onChange={(e) => updateResumeStatus(selectedResume.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(selectedResume.status)} border-0`}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>

              {/* Routing Info */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <FolderTree className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-indigo-900">
                      {selectedResume.primary_function} → {selectedResume.sub_function}
                    </span>
                  </div>
                  <Badge variant="info">
                    {(selectedResume.confidence_score * 100).toFixed(0)}% Confidence
                  </Badge>
                </div>
                <p className="text-sm text-indigo-700">{selectedResume.routing_reason}</p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                {selectedResume.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedResume.email}
                  </div>
                )}
                {selectedResume.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedResume.phone}
                  </div>
                )}
                {selectedResume.applied_job_title && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    Applied for: {selectedResume.applied_job_title}
                  </div>
                )}
              </div>

              {/* Action Buttons - Three Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {/* Send Pre-assessment Button */}
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.post(`${API}/preassessment/send/${selectedResume.id}`, null, {
                        params: { job_id: selectedResume.applied_job_id || null }
                      });
                      if (response.data.success) {
                        alert(`Pre-Assessment sent successfully!\n\nCandidate: ${selectedResume.email}\nLink: ${response.data.preassessment_link}\n\nThe candidate will complete the HR Fitment questionnaire.`);
                        // Refresh resume data
                        fetchAllResumes();
                      } else {
                        alert(response.data.message || 'Pre-assessment already sent');
                      }
                    } catch (err) {
                      alert('Failed to send pre-assessment: ' + (err.response?.data?.detail || err.message));
                    }
                  }}
                  disabled={selectedResume.preassessment_status === 'sent' || selectedResume.preassessment_status === 'completed'}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedResume.preassessment_status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                      : selectedResume.preassessment_status === 'sent'
                      ? 'bg-amber-100 text-amber-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    {selectedResume.preassessment_status === 'completed' ? 'Completed' 
                     : selectedResume.preassessment_status === 'sent' ? 'Sent' 
                     : 'Send Pre-assessment'}
                  </span>
                  <span className="lg:hidden">Pre-assess</span>
                </button>

                {/* Career Trajectory Button - Prompts for subscription */}
                <button
                  onClick={async () => {
                    // Check subscription status first
                    const hasSubscription = userOrganization?.modules_enabled?.career_trajectory;
                    if (!hasSubscription) {
                      const proceed = window.confirm(
                        '🔒 Career Trajectory Module - Premium Feature\n\n' +
                        'This module requires an active subscription.\n\n' +
                        'Features included:\n' +
                        '• Deep career analysis with AI insights\n' +
                        '• Manual HR questionnaire for detailed evaluation\n' +
                        '• Employment history validation\n' +
                        '• Compensation trajectory analysis\n' +
                        '• Comprehensive PDF/DOCX reports\n\n' +
                        'Contact: info@rolesense.in\n\n' +
                        'Click OK to send a subscription inquiry email.'
                      );
                      if (proceed) {
                        window.open('mailto:info@rolesense.in?subject=Career Trajectory Module Subscription Inquiry&body=Hi RoleSense Team,%0D%0A%0D%0AI am interested in activating the Career Trajectory Module for my organization.%0D%0A%0D%0APlease share the pricing and features.%0D%0A%0D%0ARegards', '_blank');
                      }
                      return;
                    }
                    try {
                      const response = await axios.post(`${API}/trajectory/from-resume/${selectedResume.id}`, null, {
                        params: { target_role: selectedResume.applied_job_title || null }
                      });
                      if (response.data.success) {
                        alert(`Career Trajectory Assessment ${response.data.existing ? 'found' : 'created'}!\n\nAssessment ID: ${response.data.assessment_id}\n\nNavigate to Career Trajectory module to view the full report.`);
                      }
                    } catch (err) {
                      alert('Failed to create assessment: ' + (err.response?.data?.detail || err.message));
                    }
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm font-medium relative ${
                    userOrganization?.modules_enabled?.career_trajectory
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {!userOrganization?.modules_enabled?.career_trajectory && (
                    <Lock className="w-3 h-3 absolute -top-1 -right-1 text-amber-600 bg-amber-100 rounded-full p-0.5" />
                  )}
                  <Activity className="w-4 h-4" />
                  <span className="hidden lg:inline">Career Trajectory</span>
                  <span className="lg:hidden">Trajectory</span>
                </button>

                {/* Competency Report Button */}
                <button
                  onClick={async () => {
                    try {
                      // Generate competency report
                      const response = await axios.post(`${API}/competency-report/generate/${selectedResume.id}`, null, {
                        params: { report_type: 'basic' }
                      });
                      
                      // Show download options
                      const downloadChoice = window.confirm(
                        `Competency Report Generated!\n\nCandidate: ${selectedResume.name}\nType: Basic Report\n\nClick OK to download PDF or Cancel for DOCX`
                      );
                      
                      const format = downloadChoice ? 'pdf' : 'docx';
                      window.open(`${API}/competency-report/${response.data.id}/download/${format}`, '_blank');
                    } catch (err) {
                      alert('Failed to generate report: ' + (err.response?.data?.detail || err.message));
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden lg:inline">Competency Report</span>
                  <span className="lg:hidden">Report</span>
                </button>
              </div>

              {/* Pre-assessment Status Indicator */}
              {selectedResume.preassessment_status && (
                <div className={`p-3 rounded-lg ${
                  selectedResume.preassessment_status === 'completed' 
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-amber-50 border border-amber-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {selectedResume.preassessment_status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      selectedResume.preassessment_status === 'completed' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      Pre-assessment {selectedResume.preassessment_status === 'completed' ? 'Completed' : 'Pending Response'}
                    </span>
                  </div>
                  {selectedResume.hr_fitment_analysis && (
                    <p className="text-xs text-gray-600 mt-1">HR Fitment data available for Competency Report</p>
                  )}
                </div>
              )}

              {/* Matched Skills */}
              {selectedResume.matched_skills?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.matched_skills.map((skill, i) => (
                      <Badge key={i} variant="success">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Tags */}
              {selectedResume.skill_tags?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-500" />
                    Auto-Tagged Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.skill_tags.map((tag, i) => (
                      <Badge key={i} variant="info">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Interview Questions */}
              {selectedResume.suggested_interview_questions?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-purple-500" />
                    AI-Generated Interview Questions
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {selectedResume.suggested_interview_questions.length} questions
                    </span>
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedResume.suggested_interview_questions.map((q, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                            {q.skill_area}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            q.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium mb-2">{q.question}</p>
                        <div className="bg-emerald-50 rounded p-2 border border-emerald-100">
                          <p className="text-xs text-emerald-700">
                            <strong>Expected:</strong> {q.expected_answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Data */}
              {selectedResume.parsed_data && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedResume.parsed_data.experience_years && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Experience</div>
                      <div className="font-semibold text-gray-900">{selectedResume.parsed_data.experience_years} years</div>
                    </div>
                  )}
                  {selectedResume.parsed_data.education && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Education</div>
                      <div className="font-semibold text-gray-900 text-sm truncate">{selectedResume.parsed_data.education}</div>
                    </div>
                  )}
                  {selectedResume.parsed_data.top_skills?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Top Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedResume.parsed_data.top_skills.slice(0, 6).map((skill, i) => (
                          <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Source & Date */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Source: <span className="font-medium text-gray-700 capitalize">{selectedResume.source}</span>
                </span>
                {selectedResume.source_quality_score && (
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                    selectedResume.source_quality_score >= 1.3 ? 'bg-emerald-100 text-emerald-700' :
                    selectedResume.source_quality_score >= 1.0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    Quality: {selectedResume.source_quality_score}x
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(selectedResume.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Eye className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm">Select a resume to view details</p>
            </div>
          )}
        </div>
      </div>
      </>
      )}

      {/* Bulk Trajectory Assessment Modal */}
      <Modal 
        isOpen={showBulkTrajectoryModal} 
        onClose={() => setShowBulkTrajectoryModal(false)} 
        title="Create Career Trajectory Assessments" 
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Bulk Fitment Analysis</h4>
                <p className="text-sm text-purple-700 mt-1">
                  You are about to create Career Trajectory assessments for <strong>{selectedForTrajectory.length} resumes</strong>. 
                  This will enable deep fitment analysis using 12 career indicators and 6 predictive scores.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Candidates:</h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {allResumes.filter(r => selectedForTrajectory.includes(r.id)).map(resume => (
                <div key={resume.id} className="flex items-center justify-between text-sm py-1">
                  <span className="font-medium text-gray-900">{resume.name}</span>
                  <span className="text-gray-500">{resume.applied_job_title || resume.primary_function}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowBulkTrajectoryModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={creatingTrajectory}
              onClick={async () => {
                setCreatingTrajectory(true);
                try {
                  const res = await axios.post(`${API}/repository/bulk-trajectory`, { 
                    resume_ids: selectedForTrajectory 
                  });
                  setShowBulkTrajectoryModal(false);
                  setSelectedForTrajectory([]);
                  fetchFolders();
                  alert(`Successfully created ${res.data.created_count} Career Trajectory assessments!`);
                } catch (e) {
                  console.error("Error creating bulk assessments:", e);
                  alert("Failed to create assessments. Please try again.");
                } finally {
                  setCreatingTrajectory(false);
                }
              }}
            >
              {creatingTrajectory ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Activity className="w-4 h-4" />
              )}
              Create Assessments
            </Button>
          </div>
        </div>
      </Modal>

      {/* Route Resume Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Route Resume to Repository" size="lg">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Paste a resume below and our AI will automatically classify and route it to the appropriate functional folder.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input 
              label="Email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <Input 
            label="Phone"
            placeholder="+1-555-0100"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <TextArea 
            label="Resume Text *"
            placeholder="Paste the complete resume text here..."
            rows={12}
            value={formData.resume_text}
            onChange={(e) => setFormData({...formData, resume_text: e.target.value})}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={routeResume} disabled={routing || !formData.name || !formData.resume_text}>
              {routing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Routing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Route with AI
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Simulate Application Modal */}
      <Modal isOpen={showApplicationModal} onClose={() => setShowApplicationModal(false)} title="Simulate Job Application" size="lg">
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-700">
              <strong>Test the full flow:</strong> Select a job, enter applicant details, and the system will automatically route the resume to the correct folder with AI-generated interview questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Job to Apply *</label>
              <select
                value={formData.job_id}
                onChange={(e) => setFormData({...formData, job_id: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- Select an active job --</option>
                {activeJobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title} - {job.company || 'No company'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Source *</label>
              <select
                value={formData.source || 'linkedin'}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="linkedin">LinkedIn (1.2x quality)</option>
                <option value="indeed">Indeed (1.0x quality)</option>
                <option value="glassdoor">Glassdoor (1.1x quality)</option>
                <option value="referral">Employee Referral (1.5x quality)</option>
                <option value="career_page">Career Page (1.3x quality)</option>
                <option value="social_post">Social Media Post (0.9x quality)</option>
                <option value="agency">Recruitment Agency (1.1x quality)</option>
                <option value="campus">Campus Recruitment (0.85x quality)</option>
                <option value="job_fair">Job Fair (0.8x quality)</option>
                <option value="direct">Direct Application (1.0x quality)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Applicant Name *"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input 
              label="Email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <Input 
            label="Phone"
            placeholder="+1-555-0200"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <TextArea 
            label="Resume *"
            placeholder="Paste the applicant's resume here..."
            rows={10}
            value={formData.resume_text}
            onChange={(e) => setFormData({...formData, resume_text: e.target.value})}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowApplicationModal(false)}>Cancel</Button>
            <Button onClick={submitApplication} disabled={routing || !formData.name || !formData.resume_text || !formData.job_id}>
              {routing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Candidates Component
const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", raw_resume: "" });

  const fetchCandidates = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/candidates`);
      setCandidates(res.data);
    } catch (e) {
      console.error("Error fetching candidates:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const analyzeCandidate = async () => {
    if (!formData.name || !formData.raw_resume) return;
    setAnalyzing(true);
    try {
      const res = await axios.post(`${API}/candidate/analyze`, formData);
      setCandidates([res.data, ...candidates]);
      setShowModal(false);
      setFormData({ name: "", email: "", phone: "", raw_resume: "" });
      setSelectedCandidate(res.data);
    } catch (e) {
      console.error("Error analyzing candidate:", e);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const deleteCandidate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
    try {
      await axios.delete(`${API}/candidate/${id}`);
      setCandidates(candidates.filter(c => c.id !== id));
      if (selectedCandidate?.id === id) setSelectedCandidate(null);
    } catch (e) {
      console.error("Error deleting candidate:", e);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-500">Manage and analyze candidate profiles</p>
        </div>
        <Button onClick={() => setShowModal(true)} data-testid="add-candidate-btn">
          <Plus className="w-4 h-4" />
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate List */}
        <div className="lg:col-span-1 space-y-4">
          {candidates.length === 0 ? (
            <EmptyState 
              icon={Users}
              title="No Candidates"
              description="Add your first candidate to analyze their profile"
              action={
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="w-4 h-4" />
                  Add Candidate
                </Button>
              }
            />
          ) : (
            candidates.map(candidate => (
              <Card 
                key={candidate.id}
                className={`p-4 cursor-pointer transition-all ${selectedCandidate?.id === candidate.id ? "ring-2 ring-indigo-500" : "hover:shadow-md"}`}
                onClick={() => setSelectedCandidate(candidate)}
                data-testid={`candidate-card-${candidate.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {candidate.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {candidate.parsed_data?.current_role || candidate.email || "No role specified"}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteCandidate(candidate.id); }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="info" className="capitalize">{candidate.pipeline_stage}</Badge>
                  {candidate.parsed_data?.total_experience_years && (
                    <Badge variant="default">{candidate.parsed_data.total_experience_years} yrs exp</Badge>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Candidate Details */}
        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCandidate.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                  {selectedCandidate.parsed_data?.current_role && (
                    <p className="text-gray-600">{selectedCandidate.parsed_data.current_role}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    {selectedCandidate.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedCandidate.email}
                      </span>
                    )}
                    {selectedCandidate.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedCandidate.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Why Analysis */}
              {selectedCandidate.analysis?.why_analysis && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-indigo-900 mb-1">AI Analysis</h4>
                      <p className="text-sm text-indigo-700">{selectedCandidate.analysis.why_analysis}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Parsed Data */}
              {selectedCandidate.parsed_data && (
                <div className="space-y-6">
                  {/* Summary */}
                  {selectedCandidate.parsed_data.summary && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Professional Summary</h4>
                      <p className="text-gray-600">{selectedCandidate.parsed_data.summary}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {selectedCandidate.parsed_data.skills && (
                    <div className="space-y-3">
                      {selectedCandidate.parsed_data.skills.technical?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Technical Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCandidate.parsed_data.skills.technical.map((skill, i) => (
                              <Badge key={i} variant="info">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedCandidate.parsed_data.skills.soft?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Soft Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCandidate.parsed_data.skills.soft.map((skill, i) => (
                              <Badge key={i} variant="purple">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Experience */}
                  {selectedCandidate.parsed_data.experience?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                      <div className="space-y-4">
                        {selectedCandidate.parsed_data.experience.map((exp, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{exp.title}</h5>
                                <p className="text-sm text-gray-500">{exp.company}</p>
                              </div>
                              <Badge variant="default">{exp.duration}</Badge>
                            </div>
                            {exp.highlights?.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {exp.highlights.map((h, j) => (
                                  <li key={j} className="text-sm text-gray-600">• {h}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths & Concerns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCandidate.analysis?.strengths?.length > 0 && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                        <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {selectedCandidate.analysis.strengths.map((s, i) => (
                            <li key={i} className="text-sm text-emerald-700">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedCandidate.analysis?.potential_concerns?.length > 0 && (
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Areas to Explore
                        </h4>
                        <ul className="space-y-1">
                          {selectedCandidate.analysis.potential_concerns.map((c, i) => (
                            <li key={i} className="text-sm text-amber-700">• {c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Ideal Roles */}
                  {selectedCandidate.analysis?.ideal_roles?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.analysis.ideal_roles.map((role, i) => (
                          <Badge key={i} variant="success">{role}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6">
              <EmptyState 
                icon={Eye}
                title="Select a Candidate"
                description="Click on a candidate from the list to view their profile analysis"
              />
            </Card>
          )}
        </div>
      </div>

      {/* Add Candidate Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Candidate" size="lg">
        <div className="space-y-4">
          <Input 
            label="Full Name *"
            placeholder="e.g., John Smith"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            data-testid="candidate-name-input"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              data-testid="candidate-email-input"
            />
            <Input 
              label="Phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              data-testid="candidate-phone-input"
            />
          </div>
          <TextArea 
            label="Resume / Profile *"
            placeholder="Paste the candidate's resume or profile information here..."
            rows={12}
            value={formData.raw_resume}
            onChange={(e) => setFormData({...formData, raw_resume: e.target.value})}
            data-testid="candidate-resume-input"
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button 
              onClick={analyzeCandidate} 
              disabled={analyzing || !formData.name || !formData.raw_resume}
              data-testid="submit-candidate-btn"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Matching Component
const Matching = () => {
  const [jds, setJds] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedJD, setSelectedJD] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jdsRes, candidatesRes, matchesRes] = await Promise.all([
          axios.get(`${API}/jd/list`),
          axios.get(`${API}/candidates`),
          axios.get(`${API}/matches`)
        ]);
        setJds(jdsRes.data);
        setCandidates(candidatesRes.data);
        setMatches(matchesRes.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const analyzeMatch = async () => {
    if (!selectedJD || !selectedCandidate) return;
    setAnalyzing(true);
    setMatchResult(null);
    try {
      const res = await axios.post(`${API}/match/analyze`, {
        jd_id: selectedJD.id,
        candidate_id: selectedCandidate.id
      });
      setMatchResult(res.data);
      setMatches([res.data, ...matches]);
    } catch (e) {
      console.error("Error analyzing match:", e);
      alert("Failed to analyze match. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Role-Candidate Matching</h1>
        <p className="text-gray-500">Get explainable match analysis with detailed reasoning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Select JD */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Select Job Description
          </h3>
          {jds.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No job descriptions available. Create one first.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {jds.map(jd => (
                <div 
                  key={jd.id}
                  onClick={() => setSelectedJD(jd)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedJD?.id === jd.id 
                      ? "bg-blue-50 border-2 border-blue-500" 
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                  data-testid={`match-jd-${jd.id}`}
                >
                  <div className="font-medium text-gray-900">{jd.title}</div>
                  {jd.company && <div className="text-sm text-gray-500">{jd.company}</div>}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Select Candidate */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Select Candidate
          </h3>
          {candidates.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No candidates available. Add one first.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {candidates.map(candidate => (
                <div 
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCandidate?.id === candidate.id 
                      ? "bg-emerald-50 border-2 border-emerald-500" 
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                  data-testid={`match-candidate-${candidate.id}`}
                >
                  <div className="font-medium text-gray-900">{candidate.name}</div>
                  <div className="text-sm text-gray-500">
                    {candidate.parsed_data?.current_role || candidate.email || "No role specified"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button 
          size="lg"
          onClick={analyzeMatch}
          disabled={!selectedJD || !selectedCandidate || analyzing}
          data-testid="analyze-match-btn"
        >
          {analyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Match...
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              Analyze Match
            </>
          )}
        </Button>
      </div>

      {/* Match Result */}
      {matchResult && (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Match Analysis</h3>
              <p className="text-gray-500">
                {matchResult.candidate_name} → {matchResult.jd_title}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <ScoreIndicator score={matchResult.overall_score} size="lg" />
                <div className="text-sm text-gray-500 mt-1">Match Score</div>
              </div>
            </div>
          </div>

          {/* Why Explanation */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-indigo-900 mb-1">Why this match score?</h4>
                <p className="text-sm text-indigo-700">{matchResult.why_explanation}</p>
              </div>
            </div>
          </div>

          {/* Hiring Recommendation */}
          {matchResult.hiring_recommendation && (
            <div className={`rounded-xl p-4 mb-6 ${
              matchResult.hiring_recommendation.includes("yes") 
                ? "bg-emerald-50 border border-emerald-100" 
                : matchResult.hiring_recommendation.includes("no")
                  ? "bg-red-50 border border-red-100"
                  : "bg-amber-50 border border-amber-100"
            }`}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {matchResult.hiring_recommendation.includes("yes") ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : matchResult.hiring_recommendation.includes("no") ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                Recommendation: <span className="capitalize">{matchResult.hiring_recommendation}</span>
              </h4>
              <p className="text-sm">{matchResult.recommendation_reasoning}</p>
            </div>
          )}

          {/* Match Breakdown */}
          {matchResult.match_breakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(matchResult.match_breakdown).map(([key, data]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900 capitalize">{key.replace("_", " ")}</h5>
                    <ScoreIndicator score={data.score} size="sm" />
                  </div>
                  {data.why && <p className="text-sm text-gray-600">{data.why}</p>}
                  {data.matched?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {data.matched.map((item, i) => (
                        <Badge key={i} variant="success">{item}</Badge>
                      ))}
                    </div>
                  )}
                  {data.missing?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {data.missing.map((item, i) => (
                        <Badge key={i} variant="danger">{item}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchResult.strengths?.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {matchResult.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {matchResult.gaps?.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Gaps to Address
                </h4>
                <ul className="space-y-2">
                  {matchResult.gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interview Focus Areas */}
          {matchResult.interview_focus_areas?.length > 0 && (
            <div className="mt-6 bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Interview Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.interview_focus_areas.map((area, i) => (
                  <Badge key={i} variant="purple">{area}</Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

// Smart Search Component
const SmartSearch = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await axios.post(`${API}/search`, { query });
      setResults(res.data);
    } catch (e) {
      console.error("Error searching:", e);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Smart Search</h1>
        <p className="text-gray-500">Find candidates using natural language - no Boolean required</p>
      </div>

      {/* Search Input */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="e.g., 'Senior Python developers with AWS experience who have led teams'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              data-testid="smart-search-input"
            />
          </div>
          <Button 
            size="lg"
            onClick={handleSearch}
            disabled={searching || !query.trim()}
            data-testid="smart-search-btn"
          >
            {searching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Search
          </Button>
        </div>
        
        {/* Example Queries */}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Try:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Full-stack engineers with React and Node.js",
              "Product managers with B2B SaaS experience",
              "Data scientists skilled in Python and ML"
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setQuery(example)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Interpretation */}
          {results.interpretation && (
            <Card className="p-4 bg-indigo-50 border-indigo-100">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-indigo-900">Search Interpretation</h4>
                  <p className="text-sm text-indigo-700">{results.interpretation}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Found {results.total_count} candidate{results.total_count !== 1 ? "s" : ""}
            </h3>
          </div>

          {/* Candidate Results */}
          {results.candidates?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.candidates.map(candidate => (
                <Card key={candidate.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.name?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                      <p className="text-sm text-gray-500">
                        {candidate.parsed_data?.current_role || "No role specified"}
                      </p>
                      {candidate.parsed_data?.skills?.technical && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {candidate.parsed_data.skills.technical.slice(0, 5).map((skill, i) => (
                            <Badge key={i} variant="info">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={Search}
              title="No matches found"
              description="Try adjusting your search query or add more candidates"
            />
          )}
        </div>
      )}
    </div>
  );
};

// Pipeline Component
const Pipeline = () => {
  const [stages, setStages] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stagesRes, candidatesRes] = await Promise.all([
          axios.get(`${API}/pipeline/overview`),
          axios.get(`${API}/candidates`)
        ]);
        setStages(stagesRes.data);
        setCandidates(candidatesRes.data);
      } catch (e) {
        console.error("Error fetching pipeline data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const moveCandidate = async (candidateId, newStage) => {
    try {
      await axios.post(`${API}/pipeline/move/${candidateId}`, { stage: newStage });
      setCandidates(candidates.map(c => 
        c.id === candidateId ? {...c, pipeline_stage: newStage} : c
      ));
    } catch (e) {
      console.error("Error moving candidate:", e);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hiring Pipeline</h1>
        <p className="text-gray-500">Track candidates through your hiring process</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map(stage => {
            const stageCandidates = candidates.filter(c => c.pipeline_stage === stage.id);
            return (
              <div 
                key={stage.id}
                className="w-72 flex-shrink-0"
              >
                <div 
                  className="flex items-center justify-between p-3 rounded-t-xl"
                  style={{ backgroundColor: stage.color + "20" }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-semibold text-gray-900">{stage.name}</span>
                  </div>
                  <Badge variant="default">{stage.candidate_count}</Badge>
                </div>
                
                <div className="bg-gray-50 rounded-b-xl p-3 min-h-[400px] space-y-3">
                  {stageCandidates.map(candidate => (
                    <Card key={candidate.id} className="p-3" data-testid={`pipeline-card-${candidate.id}`}>
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {candidate.name?.charAt(0) || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{candidate.name}</h4>
                          <p className="text-xs text-gray-500 truncate">
                            {candidate.parsed_data?.current_role || "No role"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Stage Selector */}
                      <select
                        value={candidate.pipeline_stage}
                        onChange={(e) => moveCandidate(candidate.id, e.target.value)}
                        className="mt-2 w-full text-xs p-1.5 border border-gray-200 rounded-lg bg-white"
                      >
                        {stages.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </Card>
                  ))}
                  
                  {stageCandidates.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============ Main Dashboard App ============

const DashboardApp = ({ onLogout, userType: initialUserType }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentView, setCurrentView] = useState(initialUserType || 'corporate'); // 'corporate' or 'vendor'
  const [userOrganization, setUserOrganization] = useState(null);
  const userName = localStorage.getItem("rolesense_user_name") || "User";
  const userEmail = localStorage.getItem("rolesense_user_email") || "";
  const userCompany = localStorage.getItem("rolesense_user_company") || "";
  const isCorporate = currentView === 'corporate';
  const userType = currentView === 'corporate' ? 'corporate' : 'vendor';

  // Fetch user organization for subscription status
  useEffect(() => {
    const fetchUserOrg = async () => {
      try {
        const storedUser = localStorage.getItem("rolesense_user_data");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserOrganization(userData.organization);
        }
      } catch (e) {
        console.error("Error loading user data:", e);
      }
    };
    fetchUserOrg();
  }, []);

  // Switch view handler
  const switchView = (view) => {
    setCurrentView(view);
    localStorage.setItem("rolesense_user_type", view);
    setActiveTab("dashboard"); // Reset to dashboard when switching
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activeJobsRes] = await Promise.all([
          axios.get(`${API}/dashboard/stats`),
          axios.get(`${API}/jd/active/list`)
        ]);
        setStats(statsRes.data);
        setActiveJobs(activeJobsRes.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, [activeTab]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "jd-intelligence", label: "JD Intelligence", icon: FileText },
    { id: "active-jobs", label: "Active Jobs", icon: PlayCircle },
    { id: "repository", label: "Resume Repository", icon: FolderTree },
    { id: "career-trajectory", label: "Career Trajectory", icon: Activity },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "matching", label: "Matching", icon: Target },
    { id: "search", label: "Smart Search", icon: Search },
    { id: "pipeline", label: "Pipeline", icon: GitBranch }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard stats={stats} onNavigate={setActiveTab} userType={userType} activeJobs={activeJobs} />;
      case "jd-intelligence":
        return <JDIntelligence userType={userType} />;
      case "active-jobs":
        return <ActiveJobsHub userType={userType} />;
      case "career-trajectory":
        return <CareerTrajectory />;
      case "repository":
        return <ResumeRepository />;
      case "candidates":
        return <Candidates />;
      case "matching":
        return <Matching />;
      case "search":
        return <SmartSearch />;
      case "pipeline":
        return <Pipeline />;
      default:
        return <Dashboard stats={stats} onNavigate={setActiveTab} userType={userType} activeJobs={activeJobs} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex font-light">
      {/* Dark Sidebar - different color for vendor */}
      <aside className={`${sidebarOpen ? "w-72" : "w-20"} ${isCorporate ? 'bg-gray-900' : 'bg-slate-900'} flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className={`p-6 border-b ${isCorporate ? 'border-gray-800' : 'border-slate-800'}`}>
          <div className="flex items-center gap-3">
            <RSCircleLogo size={40} />
            {sidebarOpen && (
              <div>
                <h1 className="font-medium text-white">Role<span className="text-purple-400">Sense</span></h1>
                <p className={`text-xs ${isCorporate ? 'text-gray-500' : 'text-cyan-400'}`}>
                  {isCorporate ? 'Corporate Recruiting' : 'Staffing Partner'}
                </p>
              </div>
            )}
          </div>
          
          {/* View Switcher */}
          {sidebarOpen && (
            <div className="mt-4 flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => switchView('corporate')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  isCorporate 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Corporate
              </button>
              <button
                onClick={() => switchView('vendor')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  !isCorporate 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Staffing
              </button>
            </div>
          )}
        </div>

        {/* User Info with Company */}
        {sidebarOpen && (
          <div className={`p-4 border-b ${isCorporate ? 'border-gray-800' : 'border-emerald-800'}`}>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isCorporate ? 'bg-gray-800/50' : 'bg-emerald-800/50'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCorporate ? 'bg-indigo-600' : 'bg-teal-600'}`}>
                <span className="text-white font-medium">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{userName}</div>
                {userCompany && (
                  <div className={`text-xs truncate ${isCorporate ? 'text-gray-400' : 'text-emerald-300'}`}>{userCompany}</div>
                )}
                <div className={`text-xs truncate mt-0.5 px-2 py-0.5 rounded inline-block ${
                  isCorporate ? 'bg-indigo-500/20 text-indigo-300' : 'bg-teal-500/20 text-teal-300'
                }`}>
                  {isCorporate ? 'Corporate' : 'Staffing Vendor'}
                </div>
              </div>
            </div>
            {/* Sign Out Button - Always Visible */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
              className={`w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5 rounded-xl transition-colors border ${
                isCorporate 
                  ? 'text-red-400 hover:text-white hover:bg-red-500/20 border-red-500/30 hover:border-red-500/50'
                  : 'text-red-300 hover:text-white hover:bg-red-500/20 border-red-400/30 hover:border-red-400/50'
              }`}
              data-testid="sign-out-btn"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}
        
        {/* Sign Out Button when sidebar collapsed */}
        {!sidebarOpen && (
          <div className={`p-4 border-b ${isCorporate ? 'border-gray-800' : 'border-emerald-800'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
              className={`w-full flex items-center justify-center p-3 rounded-xl transition-colors border ${
                isCorporate 
                  ? 'text-red-400 hover:text-white hover:bg-red-500/20 border-red-500/30 hover:border-red-500/50'
                  : 'text-red-300 hover:text-white hover:bg-red-500/20 border-red-400/30 hover:border-red-400/50'
              }`}
              data-testid="sign-out-btn"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const isLocked = item.id === 'career-trajectory' && !userOrganization?.modules_enabled?.career_trajectory;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isLocked) {
                    const proceed = window.confirm(
                      '🔒 Career Trajectory Module - Premium Feature\n\n' +
                      'This module requires an active subscription.\n\n' +
                      'Features included:\n' +
                      '• Deep career analysis with AI insights\n' +
                      '• Manual HR questionnaire for detailed evaluation\n' +
                      '• Employment history validation\n' +
                      '• Compensation trajectory analysis\n' +
                      '• Comprehensive PDF/DOCX reports\n\n' +
                      'Contact: info@rolesense.in\n\n' +
                      'Click OK to send a subscription inquiry email.'
                    );
                    if (proceed) {
                      window.open('mailto:info@rolesense.in?subject=Career Trajectory Module Subscription Inquiry&body=Hi RoleSense Team,%0D%0A%0D%0AI am interested in activating the Career Trajectory Module for my organization.%0D%0A%0D%0APlease share the pricing and features.%0D%0A%0D%0ARegards', '_blank');
                    }
                    return;
                  }
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                  activeTab === item.id
                    ? isCorporate 
                      ? "bg-white/10 text-white"
                      : "bg-cyan-500/20 text-white"
                    : isCorporate
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-normal">{item.label}</span>}
                {isLocked && sidebarOpen && (
                  <Lock className="w-3.5 h-3.5 ml-auto text-amber-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`p-4 border-t ${isCorporate ? 'border-gray-800' : 'border-slate-800'} space-y-2`}>
          {/* User Email */}
          {sidebarOpen && (
            <div className="px-2 py-2 mb-2">
              <p className={`text-xs truncate ${isCorporate ? 'text-gray-500' : 'text-cyan-400'}`}>{userEmail}</p>
            </div>
          )}
          
          {/* Toggle Sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
              isCorporate ? 'text-gray-600 hover:text-gray-400' : 'text-cyan-400 hover:text-cyan-200'
            }`}
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-normal text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-sm text-gray-500">
                {isCorporate ? 'Corporate Recruiting Dashboard' : 'Staffing Vendor Dashboard'} 
                {userCompany && <span className="text-gray-400"> • {userCompany}</span>}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              {/* User Menu with Sign Out - Click based */}
              <div className="relative user-menu-container">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm ${
                    isCorporate ? 'bg-gray-900' : 'bg-emerald-700'
                  }`}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{userEmail}</p>
                      {userCompany && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          {isCorporate ? <Building2 className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          {userCompany}
                        </p>
                      )}
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                        isCorporate ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isCorporate ? 'Corporate Recruiter' : 'Staffing Vendor'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// ============ Main App with Landing Page ============

function App() {
  const [showApp, setShowApp] = useState(false);
  const [userType, setUserType] = useState(null);

  // Check for public routes
  const pathname = window.location.pathname;
  const isQuestionnairePath = pathname.includes('/trajectory/questionnaire/');
  const isPreassessmentPath = pathname.includes('/trajectory/preassessment/');
  const isHRPreassessmentPath = pathname.includes('/preassessment/') && !pathname.includes('/trajectory/');
  const isPublicJobPath = pathname.includes('/jobs/') && pathname.includes('/apply');
  const isRoleSenseCareersPage = pathname === '/careers';  // RoleSense internal careers
  const isJobPortalPage = pathname === '/jobs' || pathname === '/browse-jobs';  // B2C Job Portal
  const isJobDetailPage = pathname.startsWith('/jobs/') && !pathname.includes('/apply');
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');
  const isJoinPath = pathname === '/join';  // Invitation join page
  const isLogoConceptsPath = pathname === '/logo-concepts';  // Logo concepts page
  const isLensLogoPath = pathname === '/lens-logos';  // Lens logo preview page

  // Check if user came from landing page before
  useEffect(() => {
    const appState = localStorage.getItem("rolesense_app_state");
    const storedUserType = localStorage.getItem("rolesense_user_type");
    if (appState === "app" && storedUserType) {
      setUserType(storedUserType);
      setShowApp(true);
    }
  }, []);

  const handleEnterApp = (type) => {
    localStorage.setItem("rolesense_app_state", "app");
    localStorage.setItem("rolesense_user_type", type);
    setUserType(type);
    setShowApp(true);
  };

  const handleAdminLogin = (admin) => {
    // Navigate to admin panel after successful login
    window.location.href = '/admin';
  };

  const handleBackToLanding = () => {
    // Clear all rolesense localStorage items
    localStorage.removeItem("rolesense_app_state");
    localStorage.removeItem("rolesense_user_type");
    localStorage.removeItem("rolesense_user_name");
    localStorage.removeItem("rolesense_user_email");
    localStorage.removeItem("rolesense_user_company");
    localStorage.removeItem("rolesense_logged_in");
    setShowApp(false);
    setUserType(null);
  };

  // Render Join Page (for invitation signups)
  if (isJoinPath) {
    return <JoinPage />;
  }

  // Render Logo Concepts Page
  if (isLogoConceptsPath) {
    return <LogoConcepts />;
  }

  // Render Lens Logo Preview Page
  if (isLensLogoPath) {
    return <LensLogoPreview />;
  }

  // Render Admin Panel
  if (isAdminPath) {
    return <AdminPanel />;
  }

  // Render Job Portal (B2C) - Browse jobs from corporate/staffing clients
  if (isJobPortalPage || isJobDetailPage) {
    return <JobPortal />;
  }

  // Render RoleSense internal careers page
  if (isRoleSenseCareersPage) {
    return <CareersPage />;
  }

  // Render public job application page
  if (isPublicJobPath) {
    return <PublicJobApplication />;
  }

  // Render questionnaire/preassessment for candidates (public route)
  if (isQuestionnairePath || isPreassessmentPath) {
    return <CandidateQuestionnaire />;
  }

  // Render HR Pre-assessment form for candidates (public route)
  if (isHRPreassessmentPath) {
    return <PreAssessmentForm />;
  }

  if (showApp) {
    return <DashboardApp onLogout={handleBackToLanding} userType={userType} />;
  }

  return <LandingPage onEnterApp={handleEnterApp} onAdminLogin={handleAdminLogin} />;
}

export default App;
