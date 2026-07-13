import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  Users, Building2, BarChart3, MessageSquare, Settings,
  Plus, Search, Filter, Eye, Edit, Trash2, RefreshCw,
  ChevronRight, ChevronDown, Check, X, AlertCircle,
  Shield, Clock, DollarSign, TrendingUp, Activity,
  Mail, Phone, Calendar, Lock, Unlock, Download,
  FileText, Target, Award, UserPlus, LogOut, Home,
  CheckCircle, XCircle, AlertTriangle, Info, Send, Brain
} from "lucide-react";
import { RSCircleLogo } from "./RSLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Encryption key - loaded from environment variable
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "RoleSense2024SecureKey!@#$";

// Encrypt password before sending to server
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

// ============ UI Components ============
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", size = "md", disabled = false, className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input {...props} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <select {...props} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// ============ Admin Login Component ============
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@rolesense.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Encrypt password before sending
      const encryptedPassword = encryptPassword(password);
      const response = await axios.post(`${API}/admin/login`, { 
        email, 
        password: encryptedPassword,
        encrypted: true
      });
      if (response.data.success) {
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("admin_user", JSON.stringify(response.data.admin));
        onLogin(response.data.admin);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <RSCircleLogo size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Role<span className="text-purple-600">Sense</span> Admin</h1>
          <p className="text-gray-500 mt-1">Sign in to access the admin panel</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@rolesense.in" required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Contact system administrator for credentials
        </div>
      </Card>
    </div>
  );
};

// ============ Stats Card Component ============
const StatCard = ({ icon: Icon, label, value, subValue, trend, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    blue: "bg-blue-50 text-blue-600"
  };
  
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
        {subValue && <p className="text-xs text-gray-400 mt-0.5">{subValue}</p>}
      </div>
    </Card>
  );
};

// ============ Create Client Modal ============
const CreateClientModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "corporate",
    business_domain: "",
    contact_email: "",
    contact_phone: "",
    contact_person: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/admin/clients`, formData);
      setResult(response.data);
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Onboard New Client</h2>
            <p className="text-sm text-gray-500 mt-1">Create a new client organization with 90-day trial</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {result ? (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Client Created Successfully!</h3>
              <p className="text-gray-500 mt-2">{result.client.organization_name} has been onboarded</p>
            </div>
            
            <Card className="p-4 bg-amber-50 border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Login Credentials (Save These!)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-amber-700">Email:</span>
                  <span className="font-mono font-medium text-amber-900">{result.admin_credentials.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Password:</span>
                  <span className="font-mono font-medium text-amber-900">{result.admin_credentials.password}</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Trial Period
              </h4>
              <div className="text-sm text-blue-700">
                <p>Start: {new Date(result.trial_period.start).toLocaleDateString()}</p>
                <p>End: {new Date(result.trial_period.end).toLocaleDateString()}</p>
                <p className="font-medium mt-1">90 Days Free Trial - Full Access</p>
              </div>
            </Card>
            
            <Button onClick={onClose} className="w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Organization Name *" value={formData.organization_name} 
                onChange={(e) => setFormData({...formData, organization_name: e.target.value})} required />
              <Select label="Organization Type *" value={formData.organization_type}
                onChange={(e) => setFormData({...formData, organization_type: e.target.value})}
                options={[
                  { value: "corporate", label: "Corporate Recruiter" },
                  { value: "staffing_vendor", label: "Staffing Vendor" }
                ]} />
            </div>
            
            <Input label="Business Domain *" value={formData.business_domain} 
              onChange={(e) => setFormData({...formData, business_domain: e.target.value})} 
              placeholder="company.com" required />
            
            <div className="grid grid-cols-2 gap-4">
              <Input label="Contact Person *" value={formData.contact_person} 
                onChange={(e) => setFormData({...formData, contact_person: e.target.value})} required />
              <Input label="Contact Email *" type="email" value={formData.contact_email} 
                onChange={(e) => setFormData({...formData, contact_email: e.target.value})} required />
            </div>
            
            <Input label="Contact Phone" value={formData.contact_phone} 
              onChange={(e) => setFormData({...formData, contact_phone: e.target.value})} />
            
            <Input label="Address" value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} />
            
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                {loading ? "Creating..." : "Create Client"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

// ============ Client Detail Modal ============
const ClientDetailModal = ({ client, onClose, onUpdate }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessLevel, setAccessLevel] = useState(client?.access_level || "full");
  const [subscriptionStatus, setSubscriptionStatus] = useState(client?.subscription_status || "trial");
  const [modulesEnabled, setModulesEnabled] = useState({
    jd_intelligence: true,
    resume_repository: true,
    career_trajectory: true,
    hr_fitment: true
  });
  const [assessmentLimit, setAssessmentLimit] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (client) {
      loadClientDetails();
    }
  }, [client]);

  const loadClientDetails = async () => {
    try {
      const response = await axios.get(`${API}/admin/clients/${client.id}`);
      setDetails(response.data);
      setAccessLevel(response.data.client.access_level);
      setSubscriptionStatus(response.data.client.subscription_status);
      setModulesEnabled(response.data.client.modules_enabled || {
        jd_intelligence: true,
        resume_repository: true,
        career_trajectory: true,
        hr_fitment: true
      });
      setAssessmentLimit(response.data.client.monthly_assessment_limit);
      
      // Load invitations
      try {
        const invRes = await axios.get(`${API}/admin/clients/${client.id}/invitations`);
        setDetails(prev => ({...prev, invitations: invRes.data.invitations}));
      } catch (e) {
        console.log("No invitations loaded");
      }
    } catch (err) {
      console.error("Failed to load client details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccess = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/clients/${client.id}/access`, {
        access_level: accessLevel,
        subscription_status: subscriptionStatus,
        modules_enabled: modulesEnabled,
        monthly_assessment_limit: assessmentLimit
      });
      onUpdate();
      alert("Access settings updated successfully");
    } catch (err) {
      alert("Failed to update access");
    } finally {
      setSaving(false);
    }
  };

  const toggleModule = (module) => {
    setModulesEnabled(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{client.organization_name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={client.organization_type === 'corporate' ? 'info' : 'purple'}>
                {client.organization_type === 'corporate' ? 'Corporate' : 'Staffing Vendor'}
              </Badge>
              <Badge variant={client.subscription_status === 'trial' ? 'warning' : client.subscription_status === 'active' ? 'success' : 'danger'}>
                {client.subscription_status.toUpperCase()}
              </Badge>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
            <p className="mt-2 text-gray-500">Loading...</p>
          </div>
        ) : details && (
          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{details.stats.users}</div>
                <div className="text-sm text-gray-500">Users</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{details.stats.resumes}</div>
                <div className="text-sm text-gray-500">Resumes</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{details.stats.assessments}</div>
                <div className="text-sm text-gray-500">Assessments</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{details.stats.jds}</div>
                <div className="text-sm text-gray-500">JDs Created</div>
              </div>
            </div>
            
            {/* Contact Info */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{client.contact_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{client.contact_phone || '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{client.contact_person}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{client.business_domain}</span>
                </div>
              </div>
            </Card>
            
            {/* Access Control */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Access Control & Module Permissions
              </h3>
              
              {/* Subscription Status */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Subscription Status</label>
                  <Select 
                    value={subscriptionStatus}
                    onChange={(e) => setSubscriptionStatus(e.target.value)}
                    options={[
                      { value: "trial", label: "🟡 Trial (90 days)" },
                      { value: "active", label: "🟢 Active (Paid)" },
                      { value: "expired", label: "🔴 Expired" },
                      { value: "suspended", label: "⚫ Suspended" }
                    ]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Access Level</label>
                  <Select 
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    options={[
                      { value: "full", label: "Full Access (All Modules)" },
                      { value: "limited", label: "Limited Access (Basic Only)" }
                    ]}
                  />
                </div>
              </div>
              
              {/* Module-Level Access */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Module Access</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* JD Intelligence */}
                  <div 
                    onClick={() => toggleModule('jd_intelligence')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      modulesEnabled.jd_intelligence 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className={`w-5 h-5 ${modulesEnabled.jd_intelligence ? 'text-emerald-600' : 'text-red-600'}`} />
                      <span className="font-medium text-sm">JD Intelligence</span>
                    </div>
                    {modulesEnabled.jd_intelligence ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  {/* Resume Repository */}
                  <div 
                    onClick={() => toggleModule('resume_repository')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      modulesEnabled.resume_repository 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className={`w-5 h-5 ${modulesEnabled.resume_repository ? 'text-emerald-600' : 'text-red-600'}`} />
                      <span className="font-medium text-sm">Resume Repository</span>
                    </div>
                    {modulesEnabled.resume_repository ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  {/* Career Trajectory - Premium */}
                  <div 
                    onClick={() => toggleModule('career_trajectory')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      modulesEnabled.career_trajectory 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-5 h-5 ${modulesEnabled.career_trajectory ? 'text-emerald-600' : 'text-red-600'}`} />
                      <div>
                        <span className="font-medium text-sm">Career Trajectory</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">PREMIUM</span>
                      </div>
                    </div>
                    {modulesEnabled.career_trajectory ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  {/* HR Fitment - Premium */}
                  <div 
                    onClick={() => toggleModule('hr_fitment')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      modulesEnabled.hr_fitment 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Target className={`w-5 h-5 ${modulesEnabled.hr_fitment ? 'text-emerald-600' : 'text-red-600'}`} />
                      <div>
                        <span className="font-medium text-sm">HR Fitment</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">PREMIUM</span>
                      </div>
                    </div>
                    {modulesEnabled.hr_fitment ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Click on a module to toggle access. Premium modules (Career Trajectory, HR Fitment) can be time-limited based on subscription.
                </p>
              </div>
              
              {/* Assessment Limit */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Monthly Assessment Limit</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={assessmentLimit || ''}
                    onChange={(e) => setAssessmentLimit(e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="Unlimited"
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-500">assessments/month (leave empty for unlimited)</span>
                </div>
              </div>
              
              {/* Save Button */}
              <Button onClick={handleUpdateAccess} disabled={saving} className="w-full">
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Access Settings
              </Button>
            </Card>
            
            {/* Users List */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Users ({details.users.length})</h3>
              <div className="space-y-2">
                {details.users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                        {user.invited_by && (
                          <div className="text-xs text-indigo-500">Joined via invitation</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' ? 'purple' : 'default'}>{user.role}</Badge>
                      <Badge variant={user.is_active ? 'success' : 'danger'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Invitation Management */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  Invite Consultants
                </h3>
                <Button 
                  size="sm" 
                  onClick={async () => {
                    const email = prompt("Restrict to specific email (leave empty for any):");
                    const role = prompt("Role (user/viewer):", "user");
                    const maxUses = prompt("Max uses:", "1");
                    try {
                      const res = await axios.post(`${API}/admin/clients/${client.id}/invitations`, {
                        client_id: client.id,
                        email_restricted: email || null,
                        role: role || "user",
                        max_uses: parseInt(maxUses) || 1,
                        expires_in_days: 7
                      });
                      alert(`Invitation created!\n\nCode: ${res.data.invitation.code}\nJoin URL: ${window.location.origin}${res.data.invitation.join_url}\n\nShare this with the consultant.`);
                      loadClientDetails();
                    } catch (e) {
                      alert("Failed to create invitation: " + (e.response?.data?.detail || e.message));
                    }
                  }}
                >
                  <Plus className="w-3 h-3" />Generate Invite Code
                </Button>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                <p>Generate invitation codes to securely onboard staffing consultants.</p>
                <p className="text-xs text-gray-500 mt-1">• Domain restriction: Only {client.business_domain} emails allowed by default</p>
              </div>
              {details?.invitations?.length > 0 ? (
                <div className="space-y-2">
                  {details.invitations.slice(0, 5).map(inv => (
                    <div key={inv.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <code className="font-mono text-indigo-600">{inv.code}</code>
                        <div className="text-xs text-gray-500">
                          {inv.email_restricted || inv.domain_restricted || 'Any email'} • 
                          {inv.uses_count}/{inv.max_uses} used
                        </div>
                      </div>
                      <Badge variant={inv.is_active ? 'success' : 'danger'}>
                        {inv.is_active ? 'Active' : 'Revoked'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No invitation codes created yet
                </div>
              )}
            </Card>
            
            {/* Security & Audit Log */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                Security & Access Controls
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Domain Restriction</span>
                  <Badge variant="info">{client.business_domain}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Organization Type</span>
                  <Badge variant={client.organization_type === 'corporate' ? 'info' : 'purple'}>
                    {client.organization_type === 'corporate' ? 'Corporate' : 'Staffing Vendor'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Data Isolation</span>
                  <Badge variant="success">✓ Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Audit Logging</span>
                  <Badge variant="success">✓ Active</Badge>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={async () => {
                  try {
                    const res = await axios.get(`${API}/admin/clients/${client.id}/security-logs`);
                    const logs = res.data.logs;
                    if (logs.length > 0) {
                      alert(`Recent Security Events:\n\n${logs.slice(0, 5).map(l => `• ${l.action}: ${new Date(l.created_at).toLocaleString()}`).join('\n')}`);
                    } else {
                      alert("No security events logged yet.");
                    }
                  } catch (e) {
                    alert("Failed to load logs");
                  }
                }}
              >
                <Eye className="w-3 h-3" />View Security Logs
              </Button>
            </Card>
            
            {/* Trial Info */}
            {client.subscription_status === 'trial' && (
              <Card className="p-4 bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Trial Period
                </h3>
                <div className="text-sm text-amber-700">
                  <p>Started: {new Date(client.trial_start_date).toLocaleDateString()}</p>
                  <p>Ends: {new Date(client.trial_end_date).toLocaleDateString()}</p>
                  {client.trial_days_remaining !== undefined && (
                    <p className="font-semibold mt-1">{client.trial_days_remaining} days remaining</p>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

// ============ Main Admin Panel Component ============
const AdminPanel = () => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [clients, setClients] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const savedAdmin = localStorage.getItem("admin_user");
    if (token && savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`);
      setDashboard(response.data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    }
  }, []);

  const loadClients = useCallback(async () => {
    try {
      let url = `${API}/admin/clients?`;
      if (filterStatus) url += `status=${filterStatus}&`;
      if (filterType) url += `org_type=${filterType}&`;
      const response = await axios.get(url);
      setClients(response.data.clients);
    } catch (err) {
      console.error("Failed to load clients:", err);
    }
  }, [filterStatus, filterType]);

  const loadFeedback = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/admin/feedback`);
      setFeedback(response.data.feedback);
    } catch (err) {
      console.error("Failed to load feedback:", err);
    }
  }, []);

  useEffect(() => {
    if (admin) {
      loadDashboard();
      loadClients();
      loadFeedback();
      setLoading(false);
    }
  }, [admin, loadDashboard, loadClients, loadFeedback]);

  useEffect(() => {
    if (admin) {
      loadClients();
    }
  }, [filterStatus, filterType, admin, loadClients]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdmin(null);
  };

  if (!admin) {
    return <AdminLogin onLogin={setAdmin} />;
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clients", label: "Clients", icon: Building2 },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <RSCircleLogo size={40} />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Role<span className="text-purple-600">Sense</span> Admin</h1>
                <p className="text-xs text-gray-500">Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                <div className="text-xs text-gray-500">{admin.email}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && dashboard && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                <p className="text-gray-500 text-sm">Platform health at a glance</p>
              </div>
              <Button variant="outline" onClick={loadDashboard}>
                <RefreshCw className="w-4 h-4" />Refresh Data
              </Button>
            </div>
            
            {/* ========== 1. BUSINESS HEALTH KPIs ========== */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  1. Business Health KPIs
                </h3>
                <p className="text-indigo-100 text-sm">Platform growth indicators</p>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Metric</th>
                      <th className="text-right text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Value</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Total Active Jobs</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-indigo-600">{dashboard.kpis?.total_active_jobs || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">Open positions across all clients</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Total Applications Received</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-emerald-600">{dashboard.kpis?.total_applications || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">MTD: {dashboard.kpis?.applications_mtd || 0}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Candidates in Pre-Assessment</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-amber-600">{dashboard.kpis?.candidates_preassessment || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">Awaiting completion</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Shortlisted / Rejected</td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-xl font-bold text-emerald-600">{dashboard.kpis?.candidates_shortlisted || 0}</span>
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-xl font-bold text-red-600">{dashboard.kpis?.candidates_rejected || 0}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">Selection ratio</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Active Clients / Staffing Partners</td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-xl font-bold text-blue-600">{dashboard.kpis?.active_clients || 0}</span>
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-xl font-bold text-purple-600">{dashboard.kpis?.staffing_partners || 0}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">Corporate / Vendors</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Monthly Placements</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-emerald-600">{dashboard.kpis?.placements_mtd || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">This month</td>
                    </tr>
                    <tr className="hover:bg-emerald-50 bg-emerald-50/50">
                      <td className="px-6 py-3 font-medium text-gray-900">Revenue Snapshot</td>
                      <td className="px-6 py-3 text-right">
                        <div className="text-xl font-bold text-emerald-600">₹{(dashboard.kpis?.revenue_mtd || 0).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">MTD</div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">QTD: ₹{(dashboard.kpis?.revenue_qtd || 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* ========== 2. JOB & DEMAND CONTROL ========== */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  2. Job & Demand Control Panel
                </h3>
                <p className="text-blue-100 text-sm">Where demand is coming from</p>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Jobs by Status</th>
                      <th className="text-right text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Count</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Open
                      </td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-emerald-600">{dashboard.jobs?.by_status?.open || 0}</td>
                      <td className="px-6 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${Math.min(((dashboard.jobs?.by_status?.open || 0) / Math.max(dashboard.jobs?.total || 1, 1)) * 100, 100)}%`}}></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span> Draft
                      </td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-amber-600">{dashboard.jobs?.by_status?.draft || 0}</td>
                      <td className="px-6 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{width: `${Math.min(((dashboard.jobs?.by_status?.draft || 0) / Math.max(dashboard.jobs?.total || 1, 1)) * 100, 100)}%`}}></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span> On Hold
                      </td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-orange-600">{dashboard.jobs?.by_status?.on_hold || 0}</td>
                      <td className="px-6 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: `${Math.min(((dashboard.jobs?.by_status?.on_hold || 0) / Math.max(dashboard.jobs?.total || 1, 1)) * 100, 100)}%`}}></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-500"></span> Closed
                      </td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-gray-600">{dashboard.jobs?.by_status?.closed || 0}</td>
                      <td className="px-6 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-500 h-2 rounded-full" style={{width: `${Math.min(((dashboard.jobs?.by_status?.closed || 0) / Math.max(dashboard.jobs?.total || 1, 1)) * 100, 100)}%`}}></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Jobs by Client */}
                {dashboard.jobs?.by_client?.length > 0 && (
                  <div className="border-t p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Clients by Job Volume</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {dashboard.jobs.by_client.slice(0, 6).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700 truncate">{item._id || 'Unknown'}</span>
                          <Badge variant="info">{item.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* ========== 3. CANDIDATE FUNNEL ========== */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  3. Candidate Funnel & Indicator Intelligence
                </h3>
                <p className="text-purple-100 text-sm">Where RoleSense differentiates</p>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Metric</th>
                      <th className="text-right text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Value</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Total Candidates Parsed</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-purple-600">{dashboard.candidates?.total_resumes || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">MTD: {dashboard.candidates?.resumes_mtd || 0}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Pre-Assessment Completion Rate</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-emerald-600">{dashboard.candidates?.assessments?.completion_rate || 0}%</td>
                      <td className="px-6 py-3">
                        <Badge variant={dashboard.candidates?.assessments?.completion_rate >= 80 ? 'success' : dashboard.candidates?.assessments?.completion_rate >= 50 ? 'warning' : 'danger'}>
                          {dashboard.candidates?.assessments?.completion_rate >= 80 ? '✓ Healthy' : dashboard.candidates?.assessments?.completion_rate >= 50 ? '⚠ Needs Attention' : '✗ Critical'}
                        </Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Assessments Pending</td>
                      <td className="px-6 py-3 text-right text-2xl font-bold text-amber-600">{dashboard.candidates?.assessments?.pending || 0}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">Out of {dashboard.candidates?.assessments?.total || 0} total</td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Resume Categories */}
                {dashboard.candidates?.by_category?.length > 0 && (
                  <div className="border-t p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Resumes by Category</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {dashboard.candidates.by_category.map((cat, idx) => (
                        <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{cat.count}</div>
                          <div className="text-xs text-gray-500 uppercase">{cat._id || 'Other'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* ========== 4 & 5. CLIENTS & PARTNERS ========== */}
            <div className="grid grid-cols-2 gap-6">
              {/* Clients */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    4. Client Analytics
                  </h3>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-2 text-gray-600">Total Clients</td>
                        <td className="py-2 text-right font-bold">{dashboard.clients?.total || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Active</td>
                        <td className="py-2 text-right font-bold text-emerald-600">{dashboard.clients?.active || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Trial</td>
                        <td className="py-2 text-right font-bold text-amber-600">{dashboard.clients?.trial || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Paid</td>
                        <td className="py-2 text-right font-bold text-emerald-600">{dashboard.clients?.paid || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Expired</td>
                        <td className="py-2 text-right font-bold text-red-600">{dashboard.clients?.expired || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              
              {/* Partners */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    5. Partner Performance
                  </h3>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-2 text-gray-600">Total Users</td>
                        <td className="py-2 text-right font-bold">{dashboard.partners?.total_users || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Active Users</td>
                        <td className="py-2 text-right font-bold text-emerald-600">{dashboard.partners?.active_users || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Staffing Partners</td>
                        <td className="py-2 text-right font-bold text-purple-600">{dashboard.clients?.staffing_vendor || 0}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Corporate Clients</td>
                        <td className="py-2 text-right font-bold text-blue-600">{dashboard.clients?.corporate || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            {/* ========== 6. SYSTEM HEALTH ========== */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  6. Platform Usage & System Health
                </h3>
              </div>
              <div className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">System Metric</th>
                      <th className="text-right text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Value</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-3 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Resume Parsing Success Rate</td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-emerald-600">{dashboard.system?.resume_parsing_success_rate || 0}%</td>
                      <td className="px-6 py-3"><Badge variant="success">Healthy</Badge></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">Avg Assessment Time</td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-blue-600">{dashboard.system?.avg_assessment_time || 'N/A'}</td>
                      <td className="px-6 py-3"><Badge variant="success">≤5 min goal</Badge></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">API Status</td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-emerald-600">{dashboard.system?.api_status || 'Unknown'}</td>
                      <td className="px-6 py-3"><Badge variant="success">Operational</Badge></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">System Uptime</td>
                      <td className="px-6 py-3 text-right text-xl font-bold text-emerald-600">{dashboard.system?.uptime || '99.9%'}</td>
                      <td className="px-6 py-3"><Badge variant="success">Excellent</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* ========== 7. ALERTS ========== */}
            {(dashboard.alerts?.trial_ending_soon?.length > 0 || dashboard.alerts?.pending_feedback > 0) && (
              <Card className="overflow-hidden border-amber-200">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    7. Alerts & Action Items
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {dashboard.alerts?.trial_ending_soon?.length > 0 && (
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <span className="font-semibold text-amber-900">Trials Ending Soon</span>
                        </div>
                        <div className="space-y-2">
                          {dashboard.alerts.trial_ending_soon.slice(0, 3).map((client, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{client.organization_name}</span>
                              <span className="text-amber-600 font-medium">{new Date(client.trial_end_date).toLocaleDateString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {dashboard.alerts?.pending_feedback > 0 && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-900">Pending Feedback</span>
                        </div>
                        <div className="text-3xl font-bold text-red-600">{dashboard.alerts.pending_feedback}</div>
                        <div className="text-sm text-red-700">Requires attention</div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
            
            {/* Recent Clients */}
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Client Onboarding</h3>
              <div className="space-y-2">
                {dashboard.recent_clients?.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{client.organization_name}</div>
                        <div className="text-sm text-indigo-600 font-mono">{client.business_domain}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={client.organization_type === 'corporate' ? 'info' : 'purple'}>
                        {client.organization_type === 'corporate' ? 'Corporate' : 'Staffing'}
                      </Badge>
                      <Badge variant={client.subscription_status === 'trial' ? 'warning' : 'success'}>
                        {client.subscription_status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setSelectedClient(client)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        
        {/* Clients Tab */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
              <Button onClick={() => setShowCreateClient(true)}>
                <Plus className="w-4 h-4" />Onboard New Client
              </Button>
            </div>
            
            {/* Filters */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  options={[
                    { value: "", label: "All Status" },
                    { value: "trial", label: "Trial" },
                    { value: "active", label: "Active/Paid" },
                    { value: "expired", label: "Expired" }
                  ]}
                />
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  options={[
                    { value: "", label: "All Types" },
                    { value: "corporate", label: "Corporate" },
                    { value: "staffing_vendor", label: "Staffing Vendor" }
                  ]}
                />
                <Button variant="outline" onClick={loadClients}>
                  <RefreshCw className="w-4 h-4" />Refresh
                </Button>
              </div>
            </Card>
            
            {/* Clients List */}
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Organization</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Type</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Modules</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Users</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Created</th>
                    <th className="text-right text-sm font-semibold text-gray-900 px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {clients.map(client => {
                    const modules = client.modules_enabled || {};
                    const enabledCount = Object.values(modules).filter(Boolean).length;
                    return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{client.organization_name}</div>
                        <div className="text-sm text-indigo-600 font-mono">{client.business_domain}</div>
                        <div className="text-xs text-gray-400">{client.contact_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={client.organization_type === 'corporate' ? 'info' : 'purple'}>
                          {client.organization_type === 'corporate' ? 'Corporate' : 'Staffing Vendor'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          client.subscription_status === 'trial' ? 'warning' :
                          client.subscription_status === 'active' ? 'success' : 'danger'
                        }>
                          {client.subscription_status}
                        </Badge>
                        {client.trial_days_remaining !== undefined && client.subscription_status === 'trial' && (
                          <div className="text-xs text-amber-600 mt-1">{client.trial_days_remaining} days left</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${modules.jd_intelligence ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400 line-through'}`}>JD</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${modules.resume_repository ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400 line-through'}`}>Resume</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${modules.career_trajectory ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400 line-through'}`}>CT</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${modules.hr_fitment ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400 line-through'}`}>HR</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{enabledCount}/4 modules</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{client.total_users}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(client.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" onClick={() => setSelectedClient(client)}>
                          <Eye className="w-3 h-3" />Manage
                        </Button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              {clients.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No clients found. Click "Onboard New Client" to get started.</p>
                </div>
              )}
            </Card>
          </div>
        )}
        
        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
              <Button variant="outline" onClick={loadFeedback}>
                <RefreshCw className="w-4 h-4" />Refresh
              </Button>
            </div>
            
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Organization</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Type</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Subject</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Priority</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {feedback.map(fb => (
                    <tr key={fb.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{fb.organization_name}</div>
                        <div className="text-sm text-gray-500">{fb.user_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          fb.feedback_type === 'issue' ? 'danger' :
                          fb.feedback_type === 'improvement' ? 'warning' :
                          fb.feedback_type === 'feature_request' ? 'info' : 'default'
                        }>
                          {fb.feedback_type.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{fb.subject}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{fb.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          fb.priority === 'critical' ? 'danger' :
                          fb.priority === 'high' ? 'warning' : 'default'
                        }>
                          {fb.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          fb.status === 'resolved' ? 'success' :
                          fb.status === 'in_progress' ? 'info' : 'warning'
                        }>
                          {fb.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(fb.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {feedback.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No feedback received yet.</p>
                </div>
              )}
            </Card>
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            <Card className="p-12 text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Advanced analytics coming soon...</p>
              <p className="text-sm mt-2">Track usage patterns, feature adoption, and more.</p>
            </Card>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Admin Account</h3>
              <div className="space-y-4">
                <Input label="Name" value={admin.name} disabled />
                <Input label="Email" value={admin.email} disabled />
                <Input label="Role" value={admin.role} disabled />
              </div>
            </Card>
          </div>
        )}
      </main>
      
      {/* Modals */}
      <CreateClientModal 
        isOpen={showCreateClient} 
        onClose={() => setShowCreateClient(false)} 
        onSuccess={() => { loadClients(); loadDashboard(); }}
      />
      
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdate={() => { loadClients(); loadDashboard(); }}
        />
      )}
    </div>
  );
};

export default AdminPanel;
