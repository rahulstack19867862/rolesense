import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { 
  ArrowRight, Check, ChevronRight, Brain, Target, Users, 
  Search, GitBranch, Sparkles, Shield, Zap, BarChart3,
  Quote, Play, ArrowUpRight, Menu, X, Building2, Briefcase,
  Mail, Lock, Eye, EyeOff, User, Phone, Globe, Loader2, AlertCircle,
  Settings, Clock, TrendingUp, ScanSearch, Focus
} from "lucide-react";
import { NetworkLogo, NetworkLogoMini } from "./NetworkLogo";
import { 
  LensLogoClassic, 
  LensLogoModern, 
  LensLogoBold, 
  LensLogoElegant, 
  LensLogoTarget, 
  LensLogoFocus, 
  LensLogoMinimal, 
  LensLogoInsight 
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Encryption key - loaded from environment variable
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "RoleSense2024SecureKey!@#$";

// Encrypt password before sending to server
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

// Auth Modal Component - MUST be defined outside LandingPage to prevent re-creation on each render
const AuthModal = ({ 
  showAuthModal, 
  setShowAuthModal, 
  authType, 
  authMode, 
  setAuthMode,
  showPassword, 
  setShowPassword, 
  formData, 
  setFormData, 
  handleAuth,
  handleEmailChange,
  signupSuccess,
  setSignupSuccess,
  authError,
  authLoading
}) => {
  if (!showAuthModal) return null;

  const isSignUp = authMode === 'signup';
  const isAdmin = authType === 'admin';

  // Get modal styling based on auth type
  const getModalStyle = () => {
    if (isAdmin) {
      return {
        gradient: 'from-indigo-900 to-purple-900',
        icon: <Settings className="w-6 h-6 text-white" />,
        iconBg: 'bg-indigo-500',
        title: 'Admin Portal',
        subtitle: 'System Administration Access'
      };
    } else if (authType === 'vendor') {
      return {
        gradient: 'from-emerald-900 to-teal-900',
        icon: <Briefcase className="w-6 h-6 text-white" />,
        iconBg: 'bg-emerald-500',
        title: 'Staffing Agency Portal',
        subtitle: 'Recruitment Agency Access'
      };
    } else {
      return {
        gradient: 'from-gray-900 to-gray-800',
        icon: <Building2 className="w-6 h-6 text-white" />,
        iconBg: 'bg-blue-500',
        title: 'Corporate Recruiter Portal',
        subtitle: 'In-house Hiring Team Access'
      };
    }
  };

  const modalStyle = getModalStyle();

  // Show success message after signup
  if (signupSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
          setShowAuthModal(false);
          setSignupSuccess(false);
        }} />
        <div className="relative z-[101] bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800">
            <button 
              onClick={() => {
                setShowAuthModal(false);
                setSignupSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-light text-white">Request Received!</h2>
                <p className="text-sm text-gray-400">We'll get back to you soon</p>
              </div>
            </div>
          </div>

          {/* Success Content */}
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Registration Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in RoleSense. Your organization registration request has been received.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-amber-800">
                <strong>What happens next?</strong><br/>
                Our team will review your request and create your organization account. You'll receive an invitation code via email to complete your registration.
              </p>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Already have an invitation code? <a href="/join" className="text-indigo-600 hover:underline">Join here</a>
            </p>
            <button
              onClick={() => {
                setSignupSuccess(false);
                setShowAuthModal(false);
              }}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Got it
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
      <div className="relative z-[101] bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header - Dynamic based on auth type */}
        <div className={`p-8 bg-gradient-to-r ${modalStyle.gradient}`}>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${modalStyle.iconBg}`}>
              {modalStyle.icon}
            </div>
            <div>
              <h2 className="text-xl font-light text-white">
                {modalStyle.title}
              </h2>
              <p className="text-sm text-gray-400">
                {isSignUp ? 'Create your account' : modalStyle.subtitle}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {isAdmin ? 'Secure admin access to RoleSense platform' : 'Access RoleSense platform solutions'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="p-8 space-y-5">
          {isSignUp && !isAdmin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company / Agency Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Email Domain</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="yourcompany.com"
                    value={formData.businessDomain}
                    onChange={(e) => setFormData(prev => ({...prev, businessDomain: e.target.value.toLowerCase().replace(/^@/, '')}))}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Your official company email domain (e.g., techjobs.in)</p>
              </div>
            </>
          )}

          {/* Success Message for Signup */}
          {signupSuccess && isSignUp && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Welcome to RoleSense!</p>
                  <p className="text-sm text-emerald-700">Your organization has been registered. Redirecting...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{authError}</p>
            </div>
          )}

          {!signupSuccess && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isSignUp ? 'Official Work Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder={isSignUp && formData.businessDomain ? `you@${formData.businessDomain}` : "you@company.com"}
                    value={formData.email}
                    onChange={handleEmailChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                    autoComplete="email"
                  />
                </div>
                {isSignUp && formData.businessDomain && (
                  <p className="text-xs text-gray-500 mt-1">Use your @{formData.businessDomain} email address</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    minLength={isSignUp ? 8 : undefined}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                )}
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-gray-900 hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading || signupSuccess}
                className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isAdmin 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : authType === 'vendor'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {authLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? 'Create Organization Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {!isAdmin && (
                <div className="text-center text-sm text-gray-500">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode(isSignUp ? 'signin' : 'signup')}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up your organization'}
                  </button>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const LandingPage = ({ onEnterApp, onAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState(null); // 'corporate', 'vendor', or 'admin'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    phone: '',
    businessDomain: ''
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openAuth = (type = 'corporate', mode = 'signin') => {
    setAuthType(type);
    setAuthMode(mode);
    setShowAuthModal(true);
    setFormData({ email: '', password: '', name: '', company: '', phone: '', businessDomain: '' });
    setSignupSuccess(false);
    setAuthError("");
  };

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Auto-extract domain from email
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData(prev => {
      const newData = {...prev, email};
      // Auto-fill business domain from email
      if (email.includes('@') && authMode === 'signup') {
        const domain = email.split('@')[1];
        if (domain && !domain.includes('gmail') && !domain.includes('yahoo') && !domain.includes('hotmail') && !domain.includes('outlook')) {
          newData.businessDomain = domain;
        }
      }
      return newData;
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    
    if (authMode === 'signup') {
      // Self-signup for new organizations
      if (!formData.businessDomain) {
        setAuthError("Please enter your company's email domain (e.g., yourcompany.com)");
        return;
      }
      
      // Validate email matches domain
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();
      if (emailDomain !== formData.businessDomain.toLowerCase()) {
        setAuthError(`Please use your official company email ending with @${formData.businessDomain}`);
        return;
      }
      
      setAuthLoading(true);
      try {
        const encryptedPassword = encryptPassword(formData.password);
        const response = await axios.post(`${API}/auth/signup`, {
          organization_name: formData.company,
          organization_type: authType === 'vendor' ? 'staffing_vendor' : 'corporate',
          business_domain: formData.businessDomain.toLowerCase(),
          contact_email: formData.email.toLowerCase(),
          contact_phone: formData.phone || null,
          contact_person: formData.name,
          password: encryptedPassword,
          encrypted: true
        });
        
        if (response.data.success) {
          // Store user info and login
          const { user, organization } = response.data;
          localStorage.setItem("rolesense_user_id", user.id);
          localStorage.setItem("rolesense_user_type", organization.type === 'corporate' ? 'corporate' : 'vendor');
          localStorage.setItem("rolesense_user_email", user.email);
          localStorage.setItem("rolesense_user_name", user.name);
          localStorage.setItem("rolesense_user_role", user.role);
          localStorage.setItem("rolesense_client_id", user.client_id);
          localStorage.setItem("rolesense_user_company", organization.name);
          localStorage.setItem("rolesense_org_type", organization.type);
          localStorage.setItem("rolesense_access_level", organization.access_level);
          localStorage.setItem("rolesense_logged_in", "true");
          localStorage.setItem("rolesense_token", response.data.token);
          // Store full user data including organization for subscription checks
          localStorage.setItem("rolesense_user_data", JSON.stringify({ user, organization }));
          
          setSignupSuccess(true);
          
          // Redirect after showing success message
          setTimeout(() => {
            onEnterApp(organization.type === 'corporate' ? 'corporate' : 'vendor');
          }, 2000);
        }
      } catch (error) {
        console.error("Signup error:", error);
        setAuthError(error.response?.data?.detail || "Signup failed. Please try again.");
      } finally {
        setAuthLoading(false);
      }
      return;
    }
    
    setAuthLoading(true);
    try {
      // Encrypt password before sending
      const encryptedPassword = encryptPassword(formData.password);
      
      // Different API endpoints for different user types
      if (authType === 'admin') {
        // Admin login
        const response = await axios.post(`${API}/admin/login`, {
          email: formData.email,
          password: encryptedPassword,
          encrypted: true
        });
        
        if (response.data.success) {
          const { admin } = response.data;
          localStorage.setItem("rolesense_admin_id", admin.id);
          localStorage.setItem("rolesense_admin_email", admin.email);
          localStorage.setItem("rolesense_admin_name", admin.name);
          localStorage.setItem("rolesense_admin_role", admin.role);
          localStorage.setItem("rolesense_admin_logged_in", "true");
          localStorage.setItem("rolesense_admin_token", response.data.token);
          
          // Call admin login callback
          if (onAdminLogin) {
            onAdminLogin(admin);
          }
          setShowAuthModal(false);
        }
      } else {
        // Corporate/Vendor login - client users API
        const response = await axios.post(`${API}/auth/login`, {
          email: formData.email,
          password: encryptedPassword,
          encrypted: true
        });
        
        if (response.data.success) {
          // Store user info in localStorage
          const { user, organization } = response.data;
          localStorage.setItem("rolesense_user_id", user.id);
          localStorage.setItem("rolesense_user_type", organization.type === 'corporate' ? 'corporate' : 'vendor');
          localStorage.setItem("rolesense_user_email", user.email);
          localStorage.setItem("rolesense_user_name", user.name);
          localStorage.setItem("rolesense_user_role", user.role);
          localStorage.setItem("rolesense_client_id", user.client_id);
          localStorage.setItem("rolesense_user_company", organization.name);
          localStorage.setItem("rolesense_org_type", organization.type);
          localStorage.setItem("rolesense_access_level", organization.access_level);
          localStorage.setItem("rolesense_logged_in", "true");
          localStorage.setItem("rolesense_token", response.data.token);
          // Store full user data including organization for subscription checks
          localStorage.setItem("rolesense_user_data", JSON.stringify({ user, organization }));
          
          // Pass the organization type to the app
          onEnterApp(organization.type === 'corporate' ? 'corporate' : 'vendor');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.response?.data?.detail || "Invalid email or password. Please check your credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "JD Intelligence & Analysis",
      description: "AI-powered job description analysis that extracts key requirements, skills, and role expectations for precise matching."
    },
    {
      icon: GitBranch,
      title: "Auto Routing Resume",
      description: "Intelligent resume routing and organization. Automatically categorize and structure CVs for efficient candidate management."
    },
    {
      icon: Target,
      title: "Career Trajectory Analysis",
      description: "Comprehensive career path evaluation with HR Fitment Analysis built-in. Human-driven insights on growth potential, cultural fit, and organizational alignment."
    },
    {
      icon: Shield,
      title: "Technical Assessment Indicators",
      description: "Real-time technical evaluation reports powered by both AI analysis and human expert reviews for accurate skill assessment."
    },
    {
      icon: BarChart3,
      title: "Comprehensive Report Generation",
      description: "Detailed human-driven reports on career trajectory, skills assessment, and fitment analysis - transparent, not black-box."
    },
    {
      icon: Sparkles,
      title: "Resume Repository & Smart Search",
      description: "Centralized candidate database with intelligent search. Find the right talent from your existing pool instantly."
    },
    {
      icon: Zap,
      title: "Recruitment Journey Analytics",
      description: "Track and analyze the complete recruitment lifecycle. Insights on time-to-hire, source effectiveness, and pipeline health."
    },
    {
      icon: Users,
      title: "Contract Staffing Support",
      description: "Specialized tools for contract staffing agencies - manage temporary placements, contract renewals, and compliance tracking."
    }
  ];

  const stats = [
    { value: "73%", label: "Reduction in time-to-hire" },
    { value: "2.4x", label: "Interview-to-offer improvement" },
    { value: "89%", label: "Recruiter satisfaction score" },
    { value: "340+", label: "Companies transformed" }
  ];

  const testimonials = [
    {
      quote: "The Career Trajectory Analysis gave us insights we never had before. The human-driven scoring is transparent and our hiring managers trust it completely.",
      author: "Sarah Chen",
      role: "VP of Talent Acquisition",
      company: "TechCorp India",
      type: "corporate"
    },
    {
      quote: "Contract staffing support changed our business. We now manage permanent and contract placements seamlessly with comprehensive assessment reports.",
      author: "Marcus Webb",
      role: "Managing Director",
      company: "Elite Staffing Solutions",
      type: "vendor"
    },
    {
      quote: "The HR Fitment and Technical Assessment indicators helped us reduce bad hires by 60%. The LinkedIn evaluation feature is a game-changer for sourcing.",
      author: "Elena Rodriguez",
      role: "Chief People Officer",
      company: "Global Systems Ltd",
      type: "corporate"
    }
  ];

  const logos = ["Meridian", "Altitude", "Nexus", "Horizon", "Apex", "Vertex"];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-light">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - RS Circle with Monospace font */}
            <div className="flex items-center gap-3">
              <RSCircleLogo size={40} />
              <span className="text-xl tracking-tight font-medium text-gray-900">Role<span className="text-purple-600">Sense</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-12">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="/jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Browse Jobs</a>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Sign In Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowSignInDropdown(!showSignInDropdown)}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 flex items-center gap-1"
                >
                  Sign in
                  <ChevronRight className={`w-4 h-4 transition-transform ${showSignInDropdown ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Dropdown Menu - Three Login Options */}
                {showSignInDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowSignInDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4">
                      <div className="text-center mb-4">
                          <div className="flex justify-center mb-2">
                            <RSCircleLogo size={48} />
                          </div>
                          <div className="text-sm font-medium text-gray-900">Role<span className="text-purple-600">Sense</span> Platform</div>
                          <div className="text-xs text-gray-500">Select your login type</div>
                        </div>
                        
                        {/* Corporate Login */}
                        <button
                          onClick={() => {
                            setShowSignInDropdown(false);
                            openAuth('corporate', 'signin');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors mb-2"
                        >
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <div className="text-left">
                            <div className="text-sm font-medium">Corporate Recruiter</div>
                            <div className="text-xs text-gray-500">In-house hiring teams</div>
                          </div>
                        </button>
                        
                        {/* Vendor Login */}
                        <button
                          onClick={() => {
                            setShowSignInDropdown(false);
                            openAuth('vendor', 'signin');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors mb-2"
                        >
                          <Briefcase className="w-5 h-5 text-emerald-600" />
                          <div className="text-left">
                            <div className="text-sm font-medium">Staffing Agency</div>
                            <div className="text-xs text-gray-500">Recruitment agencies</div>
                          </div>
                        </button>
                        
                        {/* Admin Login */}
                        <button
                          onClick={() => {
                            setShowSignInDropdown(false);
                            openAuth('admin', 'signin');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-900 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-indigo-600" />
                          <div className="text-left">
                            <div className="text-sm font-medium">Admin Portal</div>
                            <div className="text-xs text-indigo-600">System administration</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button 
                onClick={() => openAuth('corporate', 'signup')}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm hover:bg-gray-800 transition-colors"
              >
                Get started
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block text-gray-600">Features</a>
              <a href="#how-it-works" className="block text-gray-600">How it works</a>
              <a href="#testimonials" className="block text-gray-600">Testimonials</a>
              <a href="#pricing" className="block text-gray-600">Pricing</a>
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Sign In</p>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('corporate', 'signin'); }}
                  className="w-full bg-gray-100 text-gray-900 px-5 py-2.5 rounded-full text-sm flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  Corporate Sign In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('vendor', 'signin'); }}
                  className="w-full bg-gray-100 text-gray-900 px-5 py-2.5 rounded-full text-sm flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Staffing Agency Sign In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('admin', 'signin'); }}
                  className="w-full bg-indigo-100 text-indigo-900 px-5 py-2.5 rounded-full text-sm flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Admin Sign In
                </button>
                <p className="text-xs text-gray-500 uppercase tracking-wider pt-2">Sign Up</p>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('corporate', 'signup'); }}
                  className="w-full bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm"
                >
                  Corporate Sign Up
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('vendor', 'signup'); }}
                  className="w-full bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm"
                >
                  Staffing Agency Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Professional Grey/White Design */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-32 right-20 w-72 h-72 border border-gray-200 rounded-full opacity-30" />
        <div className="absolute top-40 right-32 w-48 h-48 border border-gray-200 rounded-full opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 mb-8">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-700 font-medium">Trusted by 340+ recruitment teams</span>
            </div>

            {/* Headline - Clean professional typography */}
            <h1 className="text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8 text-gray-900">
              Smart Recruiting
              <br />
              <span className="text-purple-600 font-normal">with Human-Driven</span>
              <br />
              Intelligence.
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mb-12">
              Hiring Made Simple, Talent-Simple.<br/>
              <span className="text-gray-500">A Contextual Intelligence evaluation combining 90% human and 10% AI insight.</span>
            </p>

            {/* Dual CTAs - Corporate & Vendor */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Choose your path</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Corporate CTA */}
                <button 
                  onClick={() => openAuth('corporate', 'signup')}
                  className="group bg-gray-900 text-white px-8 py-5 rounded-2xl text-base hover:bg-gray-800 transition-all flex items-center gap-4 shadow-lg shadow-gray-900/10"
                  data-testid="corporate-cta"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Corporate Recruiter</div>
                    <div className="text-sm text-gray-400">In-house hiring teams</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Vendor CTA */}
                <button 
                  onClick={() => openAuth('vendor', 'signup')}
                  className="group bg-gray-100 text-gray-900 px-8 py-5 rounded-2xl text-base hover:bg-gray-200 transition-all flex items-center gap-4 border border-gray-200"
                  data-testid="vendor-cta"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Staffing Agency</div>
                    <div className="text-sm text-gray-500">Recruitment agencies</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6 font-medium">Trusted by forward-thinking teams</p>
              <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                {logos.map((logo, i) => (
                  <div key={i} className="text-gray-400 text-lg tracking-widest uppercase font-medium">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-5xl font-extralight text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Type Benefits */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-6">
              Built for how you work.
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Whether you are building internal teams or placing candidates at scale, RoleSense adapts to your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Corporate */}
            <div className="bg-gray-900 rounded-3xl p-10 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-light mb-4">For Corporate Recruiters</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Build high-performing teams with comprehensive candidate evaluation combining AI insights and human expertise.
              </p>
              <ul className="space-y-4">
                {[
                  "JD Intelligence - Smart job description analysis",
                  "Auto Routing Resume for organized CV management",
                  "Career Trajectory Analysis (includes HR Fitment)",
                  "Technical Assessment with human + AI reports",
                  "External Technical evaluation support & fitment report",
                  "Comprehensive report generation",
                  "Resume Repository with smart search",
                  "Recruitment Journey Analytics",
                  "Post Active Jobs (Free) for quick candidate access",
                  "OnContract - A platform to support your contractual needs under one platform through RoleSense"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openAuth('corporate', 'signup')}
                className="mt-8 w-full bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Start as Corporate
              </button>
            </div>

            {/* Staffing Agencies */}
            <div className="bg-gray-800 rounded-3xl p-10 text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-light mb-4">For Staffing Agencies</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Scale your placements with comprehensive candidate assessment tools designed for permanent and contract staffing.
              </p>
              <ul className="space-y-4">
                {[
                  "Multi-client JD analysis & management",
                  "Auto Routing Resume for efficient CV handling",
                  "Career Trajectory insights (with HR Fitment)",
                  "Technical Assessment reports (AI + Human)",
                  "Comprehensive report generation",
                  "Resume Repository with smart search",
                  "OnContract - Empowering Contract Agencies to support RoleSense clients",
                  "Placement tracking & analytics",
                  "Post Active Jobs (Free) for quick candidate access"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openAuth('vendor', 'signup')}
                className="mt-8 w-full bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Start as Staffing Agency
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-6">
              Comprehensive Recruitment
              <br />
              <span className="text-gray-400">Intelligence Modules.</span>
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Human-driven assessments combined with AI insights—transparent scoring, not black-box algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-normal mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-6">
              Three steps to
              <br />
              <span className="text-gray-400">smarter hiring.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Add your context",
                description: "Paste job descriptions and candidate profiles. Our AI extracts structured insights while preserving nuance."
              },
              {
                step: "02",
                title: "Review the analysis",
                description: "See skills, experience, and potential—with clear explanations for every assessment."
              },
              {
                step: "03",
                title: "Make informed decisions",
                description: "Use match scores, interview guides, and gap analysis to guide conversations—not replace them."
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-extralight text-gray-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-light mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Quote className="w-12 h-12 text-gray-700 mb-8" />
            
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i}
                  className={`transition-all duration-500 ${
                    i === activeTestimonial 
                      ? "opacity-100" 
                      : "opacity-0 absolute inset-0"
                  }`}
                >
                  <blockquote className="text-2xl lg:text-3xl font-extralight leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-normal">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        testimonial.type === 'corporate' ? 'bg-white/10 text-gray-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {testimonial.type === 'corporate' ? 'Corporate' : 'Vendor'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeTestimonial ? "bg-white w-8" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
                <span className="text-sm text-gray-600">Our Story</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-6">
                Built by recruiters,
                <br />
                <span className="text-gray-400">for recruiters.</span>
              </h2>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p>
                  RoleSense was born from two decades of frontline recruitment experience—across 
                  corporate talent acquisition and staffing consultancies. We have lived the daily 
                  challenges: the endless Boolean strings, the keyword-obsessed ATS systems, and 
                  the disconnect between what technology promises and what recruiters actually need.
                </p>
                <p>
                  We noticed a gap. Despite advances in AI, parsing, and applicant tracking, the 
                  fundamentals of recruitment remained unsolved. Tools were either too automated 
                  (missing context and nuance) or too manual (wasting precious time). Neither 
                  approach respected the recruiter&apos;s expertise.
                </p>
                <p>
                  RoleSense is our answer—a middle path that combines intelligent automation with 
                  human judgment. We built it to be efficient without being expensive, fast without 
                  cutting corners, and smart without replacing the recruiter&apos;s role in the process.
                </p>
              </div>
            </div>

            {/* Right - Values */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-2">20+ Years of Expertise</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Our founding team brings over two decades of hands-on experience in talent 
                      acquisition, having worked with Fortune 500 companies and leading staffing firms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-2">Problem-First Approach</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      We did not build another ATS or AI scoring tool. We identified the real gaps 
                      in day-to-day recruiting and engineered solutions that actually address them.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-2">Efficiency at Minimal Cost</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Enterprise-grade intelligence without enterprise pricing. We believe powerful 
                      recruiting tools should be accessible to teams of all sizes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <RSCircleLogo size={48} />
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-2">Human-Intelligence First</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      AI assists, humans decide. We use automation for speed and efficiency (~10%), 
                      while keeping recruiters in full control of every decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-20 pt-16 border-t border-gray-100">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl lg:text-3xl font-extralight text-gray-900 leading-relaxed">
                &ldquo;We are not here to replace recruiters with AI. We are here to give recruiters 
                the intelligent tools they deserve—so they can focus on what truly matters: 
                <span className="text-gray-400"> finding the right people for the right roles.</span>&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-gray-900 font-normal">The Role<span className="text-purple-600">Sense</span> Team</p>
                <p className="text-sm text-gray-500">Recruitment Experts & Technologists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-6">
              Simple, transparent pricing.
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Start free. Scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "For individuals exploring RoleSense",
                features: ["5 JD analyses/month", "Basic Career Trajectory", "10 resume evaluations", "Email support"],
                cta: "Get started",
                featured: false
              },
              {
                name: "Professional",
                price: "$149",
                period: "/month",
                description: "For growing recruitment teams",
                features: ["Unlimited JD analyses", "Auto Routing Resume", "Full Career Trajectory (with HR Fitment)", "Technical Assessment Reports", "Resume Repository", "Priority support"],
                cta: "Start free trial",
                featured: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For agencies & large organizations",
                features: ["Everything in Professional", "Contract Staffing Support", "Multi-client management", "Custom report generation", "API access & integrations", "Dedicated success manager", "On-premise option"],
                cta: "Contact sales",
                featured: false
              }
            ].map((plan, i) => (
              <div 
                key={i}
                className={`rounded-2xl p-8 ${
                  plan.featured 
                    ? "bg-gray-900 text-white ring-2 ring-gray-900" 
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="text-sm font-medium mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extralight">{plan.price}</span>
                  {plan.period && <span className={plan.featured ? "text-gray-400" : "text-gray-500"}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-8 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 ${plan.featured ? "text-emerald-400" : "text-emerald-600"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openAuth('corporate', 'signup')}
                  className={`w-full py-3 rounded-full text-sm transition-colors ${
                    plan.featured 
                      ? "bg-white text-gray-900 hover:bg-gray-100" 
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Jobs Section - For Job Seekers */}
      <section id="jobs" className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              For Job Seekers
            </div>
            <h2 className="text-3xl lg:text-5xl font-extralight text-gray-900 tracking-tight mb-4">
              Browse Open Positions
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-8">
              Explore career opportunities from top corporate clients and staffing partners. 
              Apply directly with your resume.
            </p>
            <a 
              href="/jobs"
              className="group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-base hover:bg-blue-700 transition-all"
            >
              <Search className="w-5 h-5" />
              Browse All Jobs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Companies Hiring</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Industries</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Placed Candidates</div>
            </div>
          </div>
          
          {/* Benefits for Job Seekers */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Applications</h3>
              <p className="text-sm text-gray-600">Apply directly to jobs posted by corporate recruiters and staffing agencies.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-gray-600">Our system matches your skills to the right opportunities automatically.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">Your data is protected and shared only with potential employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-extralight text-white tracking-tight mb-6">
            Ready to hire smarter?
          </h2>
          <p className="text-lg text-gray-400 font-light mb-10 max-w-2xl mx-auto">
            Join hundreds of teams who have transformed their recruiting with contextual intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openAuth('corporate', 'signup')}
              className="group bg-white text-gray-900 px-8 py-4 rounded-full text-base hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-3"
            >
              <Building2 className="w-5 h-5" />
              Corporate Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => openAuth('vendor', 'signup')}
              className="group bg-gray-700 text-white px-8 py-4 rounded-full text-base hover:bg-gray-600 transition-all inline-flex items-center justify-center gap-3"
            >
              <Briefcase className="w-5 h-5" />
              Vendor Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About RoleSense */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <RSCircleLogo size={40} />
                <span className="text-xl tracking-tight font-medium">Role<span className="text-purple-400">Sense</span></span>
              </div>
              <h3 className="text-lg font-medium mb-4">About RoleSense</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                RoleSense is a talent intelligence and role-assessment platform built to bring clarity and accuracy to hiring decisions. Launched in 2024, the product is developed by HR professionals with over 20+ years of experience in talent acquisition and HR advisory.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                RoleSense is a product of <span className="text-white font-medium">ALLY EXECUTIVE HR</span>, a specialized executive search and advisory firm. Drawing from years of real-world hiring and leadership assessment experience, RoleSense addresses one core challenge—aligning role expectations with candidate capability and long-term fit.
              </p>
              <p className="text-sm text-gray-300 italic">
                Designed by practitioners, not theorists, RoleSense enables organizations to make faster, data-driven, and defensible hiring decisions.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-2">
                  <span className="text-gray-300">Contact:</span> info@rolesense.in
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-gray-300">Locations:</span> India | UAE
                </p>
              </div>
            </div>

            {/* Why RoleSense */}
            <div>
              <h3 className="text-lg font-medium mb-6">Why RoleSense</h3>
              <ul className="space-y-3">
                {[
                  "Built by experienced HR and recruitment leaders, not just technologists",
                  "Structured, indicator-based role and candidate evaluation",
                  "Reduces hiring risk and improves role-fit accuracy",
                  "Enables faster, objective, and explainable hiring decisions",
                  "Designed for enterprises, growing businesses, and search firms"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision & Mission + Links */}
            <div>
              <h3 className="text-lg font-medium mb-6">Vision & Mission</h3>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-emerald-400 mb-2">Our Vision</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  To redefine hiring by enabling organizations to make clear, confident, and insight-led talent decisions.
                </p>
              </div>
              <div className="mb-8">
                <h4 className="text-sm font-medium text-emerald-400 mb-2">Our Mission</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  To empower HR teams and businesses with structured role intelligence, predictive indicators, and practical assessment tools that improve hiring outcomes and long-term workforce success.
                </p>
              </div>
              
              {/* Quick Links */}
              <div className="pt-6 border-t border-gray-800">
                <h4 className="text-sm font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">Browse Jobs</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2025 RoleSense. A product of ALLY EXECUTIVE HR. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:info@rolesense.in" className="text-sm text-gray-500 hover:text-white transition-colors">Email Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authType={authType}
        authMode={authMode}
        setAuthMode={setAuthMode}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
        handleEmailChange={handleEmailChange}
        signupSuccess={signupSuccess}
        setSignupSuccess={setSignupSuccess}
        authError={authError}
        authLoading={authLoading}
      />
    </div>
  );
};

export default LandingPage;
