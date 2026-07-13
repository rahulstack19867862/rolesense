import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Shield, CheckCircle, AlertCircle, Loader2, Building2, 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, Users
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JoinPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const [validating, setValidating] = useState(false);
  const [invitationInfo, setInvitationInfo] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Enter code, 2: Register
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Check for code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setInvitationCode(code);
      validateCode(code);
    }
  }, []);

  const validateCode = async (code) => {
    setValidating(true);
    setError("");
    try {
      const response = await axios.get(`${API}/invitation/${code}/validate`);
      setInvitationInfo(response.data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid or expired invitation code");
      setInvitationInfo(null);
    } finally {
      setValidating(false);
    }
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (invitationCode.trim()) {
      validateCode(invitationCode.trim());
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setSubmitting(true);
    try {
      await axios.post(`${API}/invitation/join`, {
        invitation_code: invitationCode,
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to join. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to RoleSense!</h1>
            <p className="text-gray-600 mb-6">
              You've successfully joined <strong>{invitationInfo?.organization_name}</strong>
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>
      
      <div className="max-w-md w-full relative">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900 tracking-tight">Role<span className="text-purple-600">Sense</span></span>
          </a>
          <h1 className="text-3xl font-extralight text-gray-900 tracking-tight">
            Join Your Team
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your invitation code to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Step Indicator */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200'
                }`}>1</div>
                <span className="text-sm font-medium">Verify Code</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200'
                }`}>2</div>
                <span className="text-sm font-medium">Create Account</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {/* Step 1: Enter Code */}
            {step === 1 && (
              <form onSubmit={handleValidate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invitation Code
                  </label>
                  <input
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                    placeholder="RS-XXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all font-mono text-lg text-center tracking-wider"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enter the code shared by your organization admin
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={validating || !invitationCode.trim()}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {validating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: Register */}
            {step === 2 && invitationInfo && (
              <>
                {/* Organization Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      invitationInfo.organization_type === 'corporate' 
                        ? 'bg-blue-100' 
                        : 'bg-purple-100'
                    }`}>
                      {invitationInfo.organization_type === 'corporate' ? (
                        <Building2 className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Users className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{invitationInfo.organization_name}</div>
                      <div className="text-sm text-gray-600 capitalize">{invitationInfo.organization_type?.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center gap-2 text-sm text-emerald-700">
                    <Shield className="w-4 h-4" />
                    <span>You'll join as: <strong className="capitalize">{invitationInfo.role}</strong></span>
                  </div>
                </div>

                <form onSubmit={handleJoin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                        placeholder={invitationInfo.domain_restricted ? `you@${invitationInfo.domain_restricted}` : "you@company.com"}
                        required
                      />
                    </div>
                    {invitationInfo.domain_restricted && (
                      <p className="text-xs text-amber-600 mt-1">
                        Only @{invitationInfo.domain_restricted} emails allowed
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                        placeholder="Create a strong password"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Join Organization
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-gray-900 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default JoinPage;
