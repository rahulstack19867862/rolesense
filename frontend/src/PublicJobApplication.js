import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Briefcase, MapPin, Building2, Clock, CheckCircle, 
  AlertCircle, Upload, User, Mail, Phone, FileText,
  Loader2, ExternalLink, Activity
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Reusable UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>{children}</div>
);

const Button = ({ children, variant = "primary", disabled, className = "", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700"
  };
  
  return (
    <button 
      className={`${variants[variant]} px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <input 
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <textarea 
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
      {...props}
    />
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
  </div>
);

const PublicJobApplication = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume_text: "",
    source: "job_link"
  });
  
  // Extract job ID from URL
  const pathParts = window.location.pathname.split('/');
  const jobIdIndex = pathParts.indexOf('jobs') + 1;
  const jobId = pathParts[jobIdIndex];
  
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setError("Invalid job link");
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${API}/jobs/${jobId}/public`);
        setJob(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("This job posting is no longer available or has been closed.");
        } else {
          setError("Unable to load job details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [jobId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resume_text) {
      alert("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/apply/${jobId}`, {
        ...formData,
        source: "job_link"
      });
      
      setSubmitResult(response.data);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error && !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </Card>
      </div>
    );
  }
  
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Application Received!</h2>
          <p className="text-gray-600 mb-6">
            {submitResult?.acknowledgment || `Thank you for applying to ${job?.title}. Your resume has been received.`}
          </p>
          
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-left mb-4">
            <h3 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Submission Confirmed
            </h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Resume received and processed</li>
              <li>• Routed to: {submitResult?.routed_to?.function} &gt; {submitResult?.routed_to?.sub_function}</li>
              <li>• Application ID: {submitResult?.application_id?.slice(0, 8).toUpperCase()}</li>
            </ul>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-left mb-4">
            <h3 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Next Steps
            </h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• A <strong>Pre-Assessment Form</strong> has been sent to your email</li>
              <li>• Please complete the form within 48 hours</li>
              <li>• Once submitted, your application will be under evaluation</li>
              <li>• You will be notified about next steps within 5-7 business days</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Please check your email ({formData.email}) for the Pre-Assessment Form link.
          </p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Role<span className="text-purple-600">Sense</span></h1>
              <p className="text-xs text-gray-500">Job Application Portal</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job Details */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{job?.title}</h2>
              
              <div className="space-y-3 text-sm">
                {job?.company_name && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {job.company_name}
                  </div>
                )}
                {job?.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                  </div>
                )}
                {job?.employment_type && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {job.employment_type}
                  </div>
                )}
                {job?.requisition_number && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Req# {job.requisition_number}
                  </div>
                )}
              </div>
              
              {job?.description && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-2">About the Role</h3>
                  <p className="text-sm text-gray-600 line-clamp-6">{job.description}</p>
                </div>
              )}
              
              {job?.must_have_skills && job.must_have_skills.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-2">Key Skills Required</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {job.must_have_skills.slice(0, 6).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Apply for this Position</h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    label="Full Name *"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                  <Input 
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <Input 
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
                
                <TextArea 
                  label="Resume / CV *"
                  value={formData.resume_text}
                  onChange={(e) => setFormData({ ...formData, resume_text: e.target.value })}
                  placeholder="Paste your resume content here...

Include your:
• Work Experience
• Education
• Skills
• Achievements"
                  rows={12}
                  required
                />
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-800">
                  <p className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      After submitting your application, you will receive a <strong>Pre-Assessment Form</strong> via email. 
                      Please complete it within 48 hours to proceed with your application.
                    </span>
                  </p>
                </div>
                
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          Powered by RoleSense - JD Intelligence Dashboard
        </div>
      </footer>
    </div>
  );
};

export default PublicJobApplication;
