import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock,
  User, Mail, Phone, Briefcase, Building2, GraduationCap,
  ChevronRight, ChevronDown, Plus, Search, Filter,
  Eye, Edit, Trash2, Send, RefreshCw, Download,
  FileText, Target, Award, BarChart3, Calendar,
  ArrowRight, ArrowUpRight, Sparkles, Brain, Zap,
  X, Check, AlertCircle, Info, Link2, Copy,
  Activity, TrendingDown, Minus, MapPin, Home,
  DollarSign, Users, Heart, Shield, Upload, FileUp,
  Gauge, Timer, UserCheck, Ban, ThumbsUp, ThumbsDown
} from "lucide-react";

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
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white"
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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
  </div>
);

// Flag Indicator Component
const FlagIndicator = ({ flag, size = "md" }) => {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };
  
  const colors = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
    pending: "bg-gray-300"
  };
  
  const icons = {
    green: CheckCircle,
    yellow: AlertTriangle,
    red: XCircle,
    pending: Clock
  };
  
  const Icon = icons[flag] || Clock;
  
  return (
    <div className={`${sizes[size]} ${colors[flag]} rounded-full flex items-center justify-center`}>
      <Icon className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3"} text-white`} />
    </div>
  );
};

// Score Ring Component
const ScoreRing = ({ score, size = "md", showLabel = true }) => {
  const getColor = (s) => {
    if (s >= 71) return { stroke: "#10B981", bg: "bg-emerald-50", text: "text-emerald-600" };
    if (s >= 41) return { stroke: "#F59E0B", bg: "bg-amber-50", text: "text-amber-600" };
    return { stroke: "#EF4444", bg: "bg-red-50", text: "text-red-600" };
  };
  
  const sizes = {
    sm: { container: "w-16 h-16", text: "text-lg", label: "text-[8px]" },
    md: { container: "w-24 h-24", text: "text-2xl", label: "text-xs" },
    lg: { container: "w-32 h-32", text: "text-3xl", label: "text-sm" }
  };
  
  const color = getColor(score);
  const circumference = 2 * Math.PI * 40;
  const progress = ((100 - score) / 100) * circumference;
  
  return (
    <div className={`${sizes[size].container} relative`}>
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50%" cy="50%" r="40%" fill="none" stroke={color.stroke} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={progress}
          strokeLinecap="round" className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${sizes[size].text} font-bold ${color.text}`}>{Math.round(score)}</span>
        {showLabel && <span className={`${sizes[size].label} text-gray-500`}>Score</span>}
      </div>
    </div>
  );
};

// Predictive Score Gauge
const PredictiveGauge = ({ label, score, inverse = false, icon: Icon }) => {
  // For inverse scores (like risk), lower is better
  const getColor = (s, inv) => {
    if (inv) {
      if (s <= 30) return { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-100" };
      if (s <= 60) return { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-100" };
      return { bg: "bg-red-500", text: "text-red-600", light: "bg-red-100" };
    }
    if (s >= 70) return { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-100" };
    if (s >= 40) return { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-100" };
    return { bg: "bg-red-500", text: "text-red-600", light: "bg-red-100" };
  };
  
  const color = getColor(score, inverse);
  
  return (
    <div className={`p-3 rounded-lg ${color.light}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-4 h-4 ${color.text}`} />}
          <span className="text-xs font-medium text-gray-700">{label}</span>
        </div>
        <span className={`text-sm font-bold ${color.text}`}>{Math.round(score)}%</span>
      </div>
      <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
        <div className={`h-full ${color.bg} transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

// Hiring Recommendation Badge
const HiringRecommendationBadge = ({ recommendation }) => {
  const config = {
    proceed: { bg: "bg-emerald-100", text: "text-emerald-800", icon: ThumbsUp, label: "Proceed" },
    proceed_with_caution: { bg: "bg-amber-100", text: "text-amber-800", icon: AlertTriangle, label: "Proceed with Caution" },
    hold: { bg: "bg-orange-100", text: "text-orange-800", icon: Clock, label: "Hold" },
    reject: { bg: "bg-red-100", text: "text-red-800", icon: Ban, label: "Reject" }
  };
  
  const c = config[recommendation] || config.hold;
  const Icon = c.icon;
  
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${c.bg}`}>
      <Icon className={`w-5 h-5 ${c.text}`} />
      <span className={`font-semibold ${c.text}`}>{c.label}</span>
    </div>
  );
};

// Non-Disclosure Flag Alert
const NonDisclosureAlert = ({ flags }) => {
  if (!flags || flags.length === 0) return null;
  
  return (
    <Card className="p-4 border-red-200 bg-red-50">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-red-800 mb-2">Non-Disclosure Flags Detected</h4>
          <ul className="space-y-1">
            {flags.map((flag, idx) => (
              <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${flag.severity === 'red' ? 'bg-red-500' : 'bg-amber-500'}`} />
                {flag.message} <span className="text-red-500 font-medium">(-{flag.penalty} pts)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

// Indicator Score Bar
const IndicatorBar = ({ indicator, onClick }) => {
  const getBarColor = (flag) => {
    if (flag === "green") return "bg-emerald-500";
    if (flag === "yellow") return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getBgColor = (flag) => {
    if (flag === "green") return "bg-emerald-50 border-emerald-200";
    if (flag === "yellow") return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };
  
  return (
    <div 
      className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getBgColor(indicator.flag)}`}
      onClick={() => onClick && onClick(indicator)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <FlagIndicator flag={indicator.flag} size="sm" />
          <span className="text-xs font-medium text-gray-800 line-clamp-1">{indicator.indicator_name}</span>
        </div>
        <span className="text-xs font-bold text-gray-700">{Math.round(indicator.score)}</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${getBarColor(indicator.flag)} transition-all duration-500`} style={{ width: `${indicator.score}%` }} />
      </div>
    </div>
  );
};

// Employment History Card
const EmploymentHistoryCard = ({ job, index }) => (
  <div className="relative pl-8 pb-6 last:pb-0">
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-200" />
    <div className="absolute left-[-4px] top-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white" />
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{job.designation_at_exit || job.designation_at_joining}</h4>
          <p className="text-sm text-gray-600">{job.employer_name}</p>
        </div>
        <Badge variant={job.end_date === "Present" ? "success" : "default"}>
          {job.end_date === "Present" ? "Current" : job.end_date}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs mt-3">
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="w-3 h-3" />
          {job.start_date} - {job.end_date || "Present"}
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="w-3 h-3" />
          {job.location}
        </div>
        {job.ctc_at_joining && (
          <div className="flex items-center gap-1 text-gray-500">
            <DollarSign className="w-3 h-3" />
            ₹{(job.ctc_at_joining / 100000).toFixed(1)}L → ₹{(job.ctc_at_exit / 100000).toFixed(1)}L
          </div>
        )}
        {job.hike_percentage && (
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            +{job.hike_percentage}% hike
          </div>
        )}
      </div>
      {job.promotions && job.promotions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Promotions:</p>
          {job.promotions.map((p, i) => (
            <div key={i} className="text-xs text-indigo-600">
              {p.from_role} → {p.to_role} ({p.hike_percent}% hike)
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Create Assessment Modal - Pre-Assessment Workflow
const CreateAssessmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    candidate_email: "",
    candidate_phone: "",
    resume_text: "",
    assessment_type: "pre_assessment",
    data_collection_mode: "recruiter_post_application",
    target_role: "",
    target_industry: "",
    target_location: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/trajectory/assessment/create`, formData);
      onSuccess(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create assessment");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Career Trajectory - Pre-Assessment" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}
        
        {/* Workflow Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Pre-Assessment Form Workflow</h3>
              <p className="text-indigo-100 text-sm mt-1">
                Candidate will receive a 42-question quick-select form aligned with 12 career indicators. 
                Designed for completion in under 5 minutes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="flex items-center justify-between px-2">
          {[
            { num: 1, label: "Initiate", icon: Send },
            { num: 2, label: "42 Questions", icon: FileText },
            { num: 3, label: "12 Indicators", icon: BarChart3 },
            { num: 4, label: "AI Analysis", icon: Brain }
          ].map((item, idx) => (
            <div key={item.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  idx === 0 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-600 mt-1">{item.label}</span>
              </div>
              {idx < 3 && <ChevronRight className="w-5 h-5 text-gray-300 mx-2" />}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Input label="Candidate Name *" value={formData.candidate_name}
            onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
            placeholder="John Doe" required />
          <Input label="Email *" type="email" value={formData.candidate_email}
            onChange={(e) => setFormData({ ...formData, candidate_email: e.target.value })}
            placeholder="john@example.com" required />
          <Input label="Phone" value={formData.candidate_phone}
            onChange={(e) => setFormData({ ...formData, candidate_phone: e.target.value })}
            placeholder="+91 98765 43210" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Input label="Target Role" value={formData.target_role}
            onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
            placeholder="Senior Software Engineer" />
          <Input label="Target Industry" value={formData.target_industry}
            onChange={(e) => setFormData({ ...formData, target_industry: e.target.value })}
            placeholder="Technology / SaaS" />
          <Input label="Target Location" value={formData.target_location}
            onChange={(e) => setFormData({ ...formData, target_location: e.target.value })}
            placeholder="Bangalore" />
        </div>
        
        {/* Data Collection Mode - Fixed to Pre Assessment */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-800">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">Data Collection Mode: Pre Assessment - Recruiter Post Application</span>
          </div>
          <p className="text-xs text-blue-600 mt-1 ml-6">
            Pre-assessment form will be sent to candidate after resume submission. Recruiter can also manually trigger if needed.
          </p>
        </div>
        
        {/* Indicators Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            12 Career Trajectory Indicators
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              "Career Progression", "Job Stability", "Industry Alignment",
              "Skills Evolution", "Education Alignment", "Employment Gaps",
              "Cultural Fit", "Compensation Trajectory", "Location Mobility",
              "Joining Intent", "Counter-Offer Risk", "Retention Stability"
            ].map((indicator, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                {indicator}
              </div>
            ))}
          </div>
        </div>
        
        <TextArea label="Resume / Profile Text (Optional - for enhanced AI analysis)"
          value={formData.resume_text}
          onChange={(e) => setFormData({ ...formData, resume_text: e.target.value })}
          placeholder="Paste candidate's resume text here for deeper analysis..."
          rows={4}
        />
        
        {/* Action Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            Upon creation, an email with the Pre-Assessment form link will be sent to the candidate. 
            The form contains 42 quick-select questions designed for completion in under 5 minutes.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading || !formData.candidate_name || !formData.candidate_email}>
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send Pre-Assessment</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Assessment Detail View - Enhanced with Predictive Scores
const AssessmentDetailView = ({ assessment, onBack, onRefresh }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [recruiterNotes, setRecruiterNotes] = useState(assessment.recruiter_notes || "");
  const [recruiterDecision, setRecruiterDecision] = useState(assessment.recruiter_decision || "");
  const [saving, setSaving] = useState(false);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [resending, setResending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reanalyzeMessage, setReanalyzeMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  
  const questionnaireLink = `${window.location.origin}/trajectory/questionnaire/${assessment.id}?token=${assessment.access_token}`;
  const preassessmentLink = `${window.location.origin}/trajectory/preassessment/${assessment.id}?token=${assessment.access_token}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(preassessmentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleResendPreassessment = async () => {
    setResending(true);
    setActionMessage(null);
    try {
      const response = await axios.post(`${API}/trajectory/assessment/${assessment.id}/resend-preassessment`);
      setActionMessage({
        type: "success",
        text: response.data.message || "Pre-assessment form resent to candidate"
      });
      setTimeout(() => setActionMessage(null), 5000);
    } catch (err) {
      setActionMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to resend pre-assessment"
      });
    } finally {
      setResending(false);
    }
  };
  
  const handleSaveRecruiterInput = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/trajectory/assessment/${assessment.id}/recruiter`, {
        recruiter_notes: recruiterNotes,
        recruiter_decision: recruiterDecision
      });
      onRefresh();
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };
  
  const handleReanalyze = async () => {
    setReanalyzing(true);
    setReanalyzeMessage(null);
    try {
      const response = await axios.post(`${API}/trajectory/assessment/${assessment.id}/analyze`);
      const result = response.data;
      
      if (result.recalculated === false) {
        // No changes detected - scores remain unchanged
        setReanalyzeMessage({
          type: "info",
          text: "No changes detected. Scores remain unchanged. Add new data or questionnaire responses to update scores."
        });
      } else {
        // Recalculated with new scores
        setReanalyzeMessage({
          type: "success",
          text: "Analysis recalculated with updated inputs."
        });
        onRefresh();
      }
      
      // Auto-hide message after 5 seconds
      setTimeout(() => setReanalyzeMessage(null), 5000);
    } catch (err) {
      console.error("Failed to reanalyze:", err);
      setReanalyzeMessage({
        type: "error",
        text: "Failed to re-analyze. Please try again."
      });
    } finally {
      setReanalyzing(false);
    }
  };
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "default", label: "Pending" },
      questionnaire_sent: { variant: "info", label: "Questionnaire Sent" },
      in_progress: { variant: "warning", label: "In Progress" },
      completed: { variant: "success", label: "Completed" },
      reviewed: { variant: "purple", label: "Reviewed" }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  const predictiveScores = assessment.predictive_scores || {};
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-500 rotate-180" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{assessment.candidate_name}</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Mail className="w-4 h-4" />{assessment.candidate_email}
              </span>
              {assessment.target_role && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />{assessment.target_role}
                </span>
              )}
              {assessment.target_location && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" />{assessment.target_location}
                </span>
              )}
              {getStatusBadge(assessment.status)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReanalyze} disabled={reanalyzing}>
            {reanalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Re-analyze
          </Button>
          {!assessment.questionnaire_completed && (
            <Button variant="outline" onClick={handleResendPreassessment} disabled={resending}>
              {resending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Resend Pre-Assessment
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowQuestionnaire(true)}>
            <FileText className="w-4 h-4" />Manual Questionnaire
          </Button>
          {/* Download Report Buttons */}
          <Button 
            variant="outline" 
            onClick={() => window.open(`${API}/trajectory/assessment/${assessment.id}/report/pdf`, '_blank')}
          >
            <Download className="w-4 h-4" />PDF Report
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open(`${API}/trajectory/assessment/${assessment.id}/report/docx`, '_blank')}
          >
            <Download className="w-4 h-4" />DOCX Report
          </Button>
        </div>
      </div>
      
      {/* Action Message */}
      {actionMessage && (
        <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
          actionMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {actionMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {actionMessage.text}
          <button onClick={() => setActionMessage(null)} className="ml-auto p-1 hover:bg-white/50 rounded">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Re-analyze Message */}
      {reanalyzeMessage && (
        <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
          reanalyzeMessage.type === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
          reanalyzeMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {reanalyzeMessage.type === 'info' && <Info className="w-4 h-4" />}
          {reanalyzeMessage.type === 'success' && <CheckCircle className="w-4 h-4" />}
          {reanalyzeMessage.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {reanalyzeMessage.text}
          <button onClick={() => setReanalyzeMessage(null)} className="ml-auto p-1 hover:bg-white/50 rounded">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Hiring Recommendation & Overall Score */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5 col-span-1 flex flex-col items-center justify-center">
          <ScoreRing score={assessment.overall_score || 0} size="md" />
          <p className="text-sm text-gray-500 mt-2">Overall Score</p>
        </Card>
        
        <Card className="p-5 col-span-1 flex flex-col items-center justify-center">
          {assessment.hiring_recommendation ? (
            <HiringRecommendationBadge recommendation={assessment.hiring_recommendation} />
          ) : (
            <Badge variant="default">Pending Analysis</Badge>
          )}
          <p className="text-sm text-gray-500 mt-2">AI Recommendation</p>
        </Card>
        
        <Card className="p-5 col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Predictive Scores</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <PredictiveGauge label="Joining Intent" score={predictiveScores.joining_intent || 0} icon={UserCheck} />
            <PredictiveGauge label="Counter-Offer Risk" score={predictiveScores.counter_offer_risk || 0} inverse icon={AlertTriangle} />
            <PredictiveGauge label="Stability" score={predictiveScores.stability_score || 0} icon={Shield} />
            <PredictiveGauge label="Location Fit" score={predictiveScores.location_fit || 0} icon={MapPin} />
            <PredictiveGauge label="Decline Risk" score={predictiveScores.offer_decline_risk || 0} inverse icon={ThumbsDown} />
            <PredictiveGauge label="Time to Join" score={predictiveScores.time_to_join || 0} icon={Timer} />
          </div>
        </Card>
      </div>
      
      {/* Non-Disclosure Alerts */}
      {assessment.non_disclosure_flags && assessment.non_disclosure_flags.length > 0 && (
        <NonDisclosureAlert flags={assessment.non_disclosure_flags} />
      )}
      
      {/* AI Summary */}
      {assessment.recruiter_summary && (
        <Card className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">AI Summary</h3>
              <p className="text-gray-700 text-sm">{assessment.recruiter_summary}</p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit flex-wrap">
        {[
          { id: "overview", label: "Overview" },
          { id: "indicators", label: "Indicators (12)" },
          { id: "hr_fitment", label: "HR Fitment (5)" },
          { id: "personal", label: "Personal Data" },
          { id: "employment", label: "Employment" },
          { id: "compensation", label: "Compensation" },
          { id: "recruiter", label: "Recruiter" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Indicator Summary */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4">All 12 Indicators</h3>
            <div className="grid grid-cols-2 gap-2">
              {assessment.indicator_results?.map((indicator, idx) => (
                <IndicatorBar key={idx} indicator={indicator} />
              ))}
            </div>
          </Card>
          
          {/* Flags Summary */}
          <div className="space-y-4">
            {assessment.green_flags?.length > 0 && (
              <Card className="p-4 border-emerald-200 bg-emerald-50/50">
                <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />Green Flags ({assessment.green_flags.length})
                </h3>
                <ul className="space-y-1">
                  {assessment.green_flags.slice(0, 4).map((flag, idx) => (
                    <li key={idx} className="text-xs text-emerald-700 flex items-start gap-2">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" />{flag}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            
            {assessment.yellow_flags?.length > 0 && (
              <Card className="p-4 border-amber-200 bg-amber-50/50">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4" />Yellow Flags ({assessment.yellow_flags.length})
                </h3>
                <ul className="space-y-1">
                  {assessment.yellow_flags.slice(0, 4).map((flag, idx) => (
                    <li key={idx} className="text-xs text-amber-700 flex items-start gap-2">
                      <Minus className="w-3 h-3 flex-shrink-0 mt-0.5" />{flag}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            
            {assessment.red_flags?.length > 0 && (
              <Card className="p-4 border-red-200 bg-red-50/50">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4" />Red Flags ({assessment.red_flags.length})
                </h3>
                <ul className="space-y-1">
                  {assessment.red_flags.slice(0, 4).map((flag, idx) => (
                    <li key={idx} className="text-xs text-red-700 flex items-start gap-2">
                      <X className="w-3 h-3 flex-shrink-0 mt-0.5" />{flag}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            
            {assessment.key_strengths?.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-indigo-600" />Key Strengths
                </h3>
                <div className="flex flex-wrap gap-1">
                  {assessment.key_strengths.map((s, idx) => (
                    <Badge key={idx} variant="info">{s}</Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
      
      {activeTab === "indicators" && (
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Detailed Indicator Analysis (12 Indicators)</h3>
          <div className="space-y-4">
            {assessment.indicator_results?.map((indicator, idx) => (
              <div key={idx} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FlagIndicator flag={indicator.flag} size="md" />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{indicator.indicator_name}</h4>
                      <p className="text-xs text-gray-500">Weight: {(indicator.weight * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{Math.round(indicator.score)}</p>
                    <p className="text-xs text-gray-500">/ 100</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {indicator.findings?.length > 0 && (
                    <div className="bg-emerald-50 p-2 rounded-lg">
                      <p className="text-xs font-medium text-emerald-800 mb-1">Findings</p>
                      <ul className="space-y-0.5">
                        {indicator.findings.slice(0, 2).map((f, i) => (
                          <li key={i} className="text-xs text-emerald-700">• {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {indicator.concerns?.length > 0 && (
                    <div className="bg-amber-50 p-2 rounded-lg">
                      <p className="text-xs font-medium text-amber-800 mb-1">Concerns</p>
                      <ul className="space-y-0.5">
                        {indicator.concerns.slice(0, 2).map((c, i) => (
                          <li key={i} className="text-xs text-amber-700">• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {indicator.recommendations?.length > 0 && (
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs font-medium text-blue-800 mb-1">Recommendations</p>
                      <ul className="space-y-0.5">
                        {indicator.recommendations.slice(0, 2).map((r, i) => (
                          <li key={i} className="text-xs text-blue-700">• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* HR Fitment Tab */}
      {activeTab === "hr_fitment" && (
        <div className="space-y-6">
          {/* HR Fitment Overall Score */}
          {assessment.hr_fitment_overall && (
            <Card className="p-5 border-purple-200 bg-purple-50/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  HR Fitment Overall
                </h3>
                <div className="flex items-center gap-3">
                  <div className={`text-2xl font-bold ${
                    assessment.hr_fitment_overall.flag === 'green' ? 'text-emerald-600' :
                    assessment.hr_fitment_overall.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {assessment.hr_fitment_overall.score}/100
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    assessment.hr_fitment_overall.flag === 'green' ? 'bg-emerald-100 text-emerald-700' :
                    assessment.hr_fitment_overall.flag === 'yellow' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {assessment.hr_fitment_overall.flag?.toUpperCase()}
                  </span>
                </div>
              </div>
              {assessment.hr_fitment_overall.summary && (
                <p className="text-sm text-gray-700 mb-4">{assessment.hr_fitment_overall.summary}</p>
              )}
              
              <div className="grid grid-cols-3 gap-4">
                {assessment.hr_fitment_overall.top_strengths?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> Top Strengths
                    </h4>
                    <ul className="space-y-1">
                      {assessment.hr_fitment_overall.top_strengths.slice(0, 3).map((s, i) => (
                        <li key={i} className="text-xs text-emerald-600">• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {assessment.hr_fitment_overall.key_concerns?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Key Concerns
                    </h4>
                    <ul className="space-y-1">
                      {assessment.hr_fitment_overall.key_concerns.slice(0, 3).map((c, i) => (
                        <li key={i} className="text-xs text-amber-600">• {c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {assessment.hr_fitment_overall.interview_focus_areas?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3" /> Interview Focus
                    </h4>
                    <ul className="space-y-1">
                      {assessment.hr_fitment_overall.interview_focus_areas.slice(0, 3).map((a, i) => (
                        <li key={i} className="text-xs text-blue-600">• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}
          
          {/* HR Fitment Indicators Grid */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              HR Fitment Analysis (5 Indicators)
            </h3>
            
            {assessment.hr_fitment_analysis?.length > 0 ? (
              <div className="space-y-4">
                {assessment.hr_fitment_analysis.map((indicator, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          indicator.flag === 'green' ? 'bg-emerald-100' :
                          indicator.flag === 'yellow' ? 'bg-amber-100' : 'bg-red-100'
                        }`}>
                          {indicator.indicator_id === 'hr_cultural_fit' && <Heart className={`w-5 h-5 ${indicator.flag === 'green' ? 'text-emerald-600' : indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'}`} />}
                          {indicator.indicator_id === 'hr_team_dynamics' && <Users className={`w-5 h-5 ${indicator.flag === 'green' ? 'text-emerald-600' : indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'}`} />}
                          {indicator.indicator_id === 'hr_role_metrics' && <Target className={`w-5 h-5 ${indicator.flag === 'green' ? 'text-emerald-600' : indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'}`} />}
                          {indicator.indicator_id === 'hr_soft_skills' && <Brain className={`w-5 h-5 ${indicator.flag === 'green' ? 'text-emerald-600' : indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'}`} />}
                          {indicator.indicator_id === 'hr_risk_summary' && <Shield className={`w-5 h-5 ${indicator.flag === 'green' ? 'text-emerald-600' : indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'}`} />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{indicator.indicator_name}</h4>
                          <span className="text-xs text-gray-500">Weight: {(indicator.weight * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-xl font-bold ${
                          indicator.flag === 'green' ? 'text-emerald-600' :
                          indicator.flag === 'yellow' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {indicator.score}/100
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          indicator.flag === 'green' ? 'bg-emerald-100 text-emerald-700' :
                          indicator.flag === 'yellow' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {indicator.flag?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Factor Scores */}
                    {indicator.factor_scores && Object.keys(indicator.factor_scores).length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">Factor Scores</h5>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(indicator.factor_scores).map(([key, value]) => (
                            <span key={key} className={`px-2 py-1 rounded text-xs ${
                              value >= 70 ? 'bg-emerald-50 text-emerald-700' :
                              value >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      {indicator.findings?.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-600 mb-1">Findings</h5>
                          <ul className="space-y-1">
                            {indicator.findings.slice(0, 2).map((f, i) => (
                              <li key={i} className="text-gray-600">• {f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {indicator.concerns?.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-amber-600 mb-1">Concerns</h5>
                          <ul className="space-y-1">
                            {indicator.concerns.slice(0, 2).map((c, i) => (
                              <li key={i} className="text-amber-600">• {c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {indicator.recommendations?.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-blue-600 mb-1">Recommendations</h5>
                          <ul className="space-y-1">
                            {indicator.recommendations.slice(0, 2).map((r, i) => (
                              <li key={i} className="text-blue-600">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>HR Fitment analysis not yet available.</p>
                <p className="text-sm">Run analysis to generate HR fitment indicators.</p>
              </div>
            )}
          </Card>
        </div>
      )}
      
      {activeTab === "personal" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Location & Mobility */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />Location & Mobility
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Native City</span>
                <span className="text-sm font-medium text-gray-900">{assessment.native_city || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Current City</span>
                <span className="text-sm font-medium text-gray-900">{assessment.current_city || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Target Location</span>
                <span className="text-sm font-medium text-gray-900">{assessment.target_location || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Relocation Willingness</span>
                <span className="text-sm font-medium text-gray-900">{assessment.relocation_willingness || "-"}</span>
              </div>
            </div>
          </Card>
          
          {/* Personal Commitment */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />Personal Commitment
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Family Status</span>
                <span className="text-sm font-medium text-gray-900">{assessment.family_status || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Spouse Employment</span>
                <span className="text-sm font-medium text-gray-900">{assessment.spouse_employment || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Children Schooling</span>
                <span className="text-sm font-medium text-gray-900">{assessment.children_schooling || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Residence Status</span>
                <span className="text-sm font-medium text-gray-900">{assessment.residence_status || "-"}</span>
              </div>
            </div>
          </Card>
          
          {/* Resignation Status */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />Resignation Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Status</span>
                <Badge variant={assessment.resignation_status?.includes("Yes") ? "success" : "default"}>
                  {assessment.resignation_status || "Not provided"}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Resignation Date</span>
                <span className="text-sm font-medium text-gray-900">{assessment.resignation_date || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Notice Period</span>
                <span className="text-sm font-medium text-gray-900">
                  {assessment.notice_period_days ? `${assessment.notice_period_days} days` : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Negotiable</span>
                <span className="text-sm font-medium text-gray-900">{assessment.notice_negotiable || "-"}</span>
              </div>
            </div>
          </Card>
          
          {/* Counter-Offer */}
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />Counter-Offer Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-500">Status</span>
                <Badge variant={assessment.counter_offer_status?.includes("Yes") ? "warning" : "default"}>
                  {assessment.counter_offer_status || "Not provided"}
                </Badge>
              </div>
              {assessment.counter_offer_details && (
                <>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-500">Offered CTC</span>
                    <span className="text-sm font-medium text-gray-900">
                      {assessment.counter_offer_details.ctc ? `₹${(assessment.counter_offer_details.ctc / 100000).toFixed(1)}L` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-500">Offered Role</span>
                    <span className="text-sm font-medium text-gray-900">{assessment.counter_offer_details.role || "-"}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Other Offers</span>
                <span className="text-sm font-medium text-gray-900">{assessment.has_other_offers || "-"}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === "employment" && (
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />Employment History
            </h3>
            {assessment.employment_history?.length > 0 ? (
              <div className="mt-4">
                {assessment.employment_history.map((job, idx) => (
                  <EmploymentHistoryCard key={idx} job={job} index={idx} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No employment history provided yet.</p>
            )}
          </Card>
          
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />Career Timeline
            </h3>
            {assessment.career_timeline?.length > 0 ? (
              <div className="space-y-3">
                {assessment.career_timeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.role}</p>
                      <p className="text-xs text-gray-500">{item.company} • {item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No career timeline available.</p>
            )}
          </Card>
        </div>
      )}
      
      {activeTab === "compensation" && (
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />Compensation Summary
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {assessment.current_ctc ? `₹${(assessment.current_ctc / 100000).toFixed(1)}L` : "-"}
                  </p>
                  <p className="text-xs text-gray-500">Current CTC</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {assessment.expected_ctc ? `₹${(assessment.expected_ctc / 100000).toFixed(1)}L` : "-"}
                  </p>
                  <p className="text-xs text-gray-500">Expected CTC</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {assessment.minimum_ctc ? `₹${(assessment.minimum_ctc / 100000).toFixed(1)}L` : "-"}
                  </p>
                  <p className="text-xs text-gray-500">Minimum CTC</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {assessment.offered_ctc ? `₹${(assessment.offered_ctc / 100000).toFixed(1)}L` : "-"}
                  </p>
                  <p className="text-xs text-gray-500">Offered CTC</p>
                </div>
              </div>
              
              {assessment.current_ctc && assessment.expected_ctc && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-700">Expected Hike</span>
                    <span className="text-lg font-bold text-purple-700">
                      {(((assessment.expected_ctc - assessment.current_ctc) / assessment.current_ctc) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />Compensation Trajectory
            </h3>
            {assessment.compensation_trajectory?.length > 0 ? (
              <div className="space-y-3">
                {assessment.compensation_trajectory.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{item.employer}</span>
                      <Badge variant={item.hike_percent > 20 ? "success" : "default"}>
                        +{item.hike_percent}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      ₹{(item.joining_ctc / 100000).toFixed(1)}L → ₹{(item.exit_ctc / 100000).toFixed(1)}L
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No compensation trajectory available.</p>
            )}
          </Card>
        </div>
      )}
      
      {activeTab === "recruiter" && (
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Recruiter Notes & Decision</h3>
          <div className="space-y-5">
            <TextArea label="Notes" value={recruiterNotes}
              onChange={(e) => setRecruiterNotes(e.target.value)}
              placeholder="Add observations, interview notes, or additional context..."
              rows={5}
            />
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Decision</label>
              <div className="flex gap-3">
                {[
                  { id: "proceed", label: "Proceed", icon: CheckCircle, color: "emerald" },
                  { id: "hold", label: "Hold", icon: Clock, color: "amber" },
                  { id: "reject", label: "Reject", icon: XCircle, color: "red" }
                ].map(decision => (
                  <button key={decision.id} onClick={() => setRecruiterDecision(decision.id)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      recruiterDecision === decision.id
                        ? decision.color === "emerald" ? "border-emerald-500 bg-emerald-50 text-emerald-700" :
                          decision.color === "amber" ? "border-amber-500 bg-amber-50 text-amber-700" :
                          "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <decision.icon className="w-5 h-5" />
                    <span className="font-medium">{decision.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveRecruiterInput} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Notes
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Manual Questionnaire Modal - Fallback option */}
      <Modal isOpen={showQuestionnaire} onClose={() => setShowQuestionnaire(false)} title="Manual Questionnaire Link">
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-sm text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <span>Use this manual option only if the system's auto-trigger failed or candidate didn't receive the email.</span>
          </div>
          <p className="text-gray-600">Share this link with <strong>{assessment.candidate_name}</strong>:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <input type="text" value={preassessmentLink} readOnly
                className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm text-gray-700" />
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <Info className="w-4 h-4 inline mr-2" />
            The pre-assessment form includes 42 quick-select questions covering 12 career indicators. Designed for completion in under 5 minutes.
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowQuestionnaire(false)}>Close</Button>
            <Button onClick={() => { handleCopyLink(); setShowQuestionnaire(false); }}>
              <Copy className="w-4 h-4" />Copy & Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Assessment Card for List
const AssessmentCard = ({ assessment, onClick }) => {
  const getFlagColor = (flag) => {
    if (flag === "green") return "border-l-emerald-500 bg-emerald-50/30";
    if (flag === "yellow") return "border-l-amber-500 bg-amber-50/30";
    if (flag === "red") return "border-l-red-500 bg-red-50/30";
    return "border-l-gray-300";
  };
  
  const predictiveScores = assessment.predictive_scores || {};
  
  return (
    <Card className={`p-4 cursor-pointer hover:shadow-md transition-all border-l-4 ${getFlagColor(assessment.overall_flag)}`}
      onClick={() => onClick(assessment)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ScoreRing score={assessment.overall_score || 0} size="sm" showLabel={false} />
          <div>
            <h4 className="font-medium text-gray-900">{assessment.candidate_name}</h4>
            <p className="text-sm text-gray-500">{assessment.target_role || assessment.candidate_email}</p>
          </div>
        </div>
        <div className="text-right">
          {assessment.hiring_recommendation && (
            <Badge variant={
              assessment.hiring_recommendation === "proceed" ? "success" :
              assessment.hiring_recommendation === "proceed_with_caution" ? "warning" :
              assessment.hiring_recommendation === "hold" ? "default" : "danger"
            }>
              {assessment.hiring_recommendation.replace(/_/g, " ")}
            </Badge>
          )}
          <p className="text-xs text-gray-400 mt-1">{new Date(assessment.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Predictive Scores Preview */}
      {Object.keys(predictiveScores).length > 0 && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs">
          <div className="flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-indigo-500" />
            <span className="text-gray-600">Intent: {Math.round(predictiveScores.joining_intent || 0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span className="text-gray-600">Risk: {Math.round(predictiveScores.counter_offer_risk || 0)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-gray-600">Stability: {Math.round(predictiveScores.stability_score || 0)}%</span>
          </div>
        </div>
      )}
    </Card>
  );
};

// Main Career Trajectory Component
const CareerTrajectory = () => {
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchAssessments = useCallback(async () => {
    try {
      const [assessmentsRes, statsRes] = await Promise.all([
        axios.get(`${API}/trajectory/assessments`, { params: filter !== "all" ? { status: filter } : {} }),
        axios.get(`${API}/trajectory/stats`)
      ]);
      setAssessments(assessmentsRes.data.assessments || []);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to fetch assessments:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  
  useEffect(() => { fetchAssessments(); }, [fetchAssessments]);
  
  const handleAssessmentCreated = (data) => {
    fetchAssessments();
    if (data.assessment_id) {
      axios.get(`${API}/trajectory/assessment/${data.assessment_id}`).then(res => {
        setSelectedAssessment(res.data);
      });
    }
  };
  
  const handleViewAssessment = async (assessment) => {
    try {
      const res = await axios.get(`${API}/trajectory/assessment/${assessment.id}`);
      setSelectedAssessment(res.data);
    } catch (err) {
      console.error("Failed to fetch assessment details:", err);
    }
  };
  
  const handleRefreshAssessment = async () => {
    if (selectedAssessment) {
      try {
        const res = await axios.get(`${API}/trajectory/assessment/${selectedAssessment.id}`);
        setSelectedAssessment(res.data);
      } catch (err) {
        console.error("Failed to refresh assessment:", err);
      }
    }
  };
  
  const filteredAssessments = assessments.filter(a => 
    a.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.candidate_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.target_role?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (selectedAssessment) {
    return <AssessmentDetailView assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} onRefresh={handleRefreshAssessment} />;
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Career Trajectory Indicator
          </h1>
          <p className="text-gray-500 mt-1">Predictive candidate fitment analysis with 12 indicators</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}><Send className="w-4 h-4" />Send Pre-Assessment</Button>
      </div>
      
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-6 gap-3">
          <Card className="p-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total_assessments}</p>
            <p className="text-xs text-gray-500">Total</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.by_status?.in_progress || 0}</p>
            <p className="text-xs text-gray-500">In Progress</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-emerald-600">{stats.by_flag?.green || 0}</p>
            <p className="text-xs text-gray-500">Green Zone</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-amber-600">{stats.by_flag?.yellow || 0}</p>
            <p className="text-xs text-gray-500">Yellow Zone</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-red-600">{stats.by_flag?.red || 0}</p>
            <p className="text-xs text-gray-500">Red Zone</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-bold text-purple-600">{stats.by_status?.completed || 0}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </Card>
        </div>
      )}
      
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {["all", "pending", "in_progress", "completed", "reviewed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "All" : f.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64"
          />
        </div>
      </div>
      
      {/* List */}
      {loading ? <LoadingSpinner /> : filteredAssessments.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredAssessments.map(assessment => (
            <AssessmentCard key={assessment.id} assessment={assessment} onClick={handleViewAssessment} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Pre-Assessments</h3>
          <p className="text-gray-500 mb-6">Send your first career trajectory pre-assessment to a candidate.</p>
          <Button onClick={() => setShowCreateModal(true)}><Send className="w-4 h-4" />Send Pre-Assessment</Button>
        </Card>
      )}
      
      <CreateAssessmentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={handleAssessmentCreated} />
    </div>
  );
};

export default CareerTrajectory;
