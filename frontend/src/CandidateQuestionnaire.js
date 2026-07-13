import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle, Clock, Send, AlertCircle,
  ChevronRight, ChevronLeft, Brain, Activity,
  User, Briefcase, Target, Sparkles, AlertTriangle
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UI Components ============

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white"
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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
  </div>
);

// Progress Bar with Categories
const ProgressBar = ({ current, total, category }) => {
  const progress = (current / total) * 100;
  
  const categoryLabels = {
    candidate_overview: "Candidate Overview",
    personal_data: "Personal Data",
    employment_data: "Employment Data",
    compensation_data: "Compensation Data",
    job_stability_details: "Job Stability",
    resignation_status: "Resignation Status"
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-indigo-600 font-medium">{categoryLabels[category] || category}</span>
        <span className="text-gray-500">{current} of {total} • {Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Single Select Question (Dropdown Style)
const SingleSelectQuestion = ({ question, value, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-start gap-2">
      <label className="block text-lg font-medium text-gray-900 flex-1">{question.question}</label>
      {question.mandatory && <span className="text-red-500 text-sm">*Required</span>}
    </div>
    <div className="grid grid-cols-1 gap-2">
      {question.options?.map((option, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onChange(option)}
          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
            value === option
              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
              : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              value === option ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
            }`}>
              {value === option && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm">{option}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Main Pre-Assessment Questionnaire Component
const CandidateQuestionnaire = () => {
  const [assessment, setAssessment] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);
  
  // Get token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const pathParts = window.location.pathname.split("/");
  const assessmentId = pathParts[pathParts.length - 1];
  
  // Flatten questions from categories with category info
  const flattenQuestions = (categories) => {
    const questions = [];
    Object.entries(categories).forEach(([category, categoryQuestions]) => {
      categoryQuestions.forEach(q => {
        questions.push({ ...q, category });
      });
    });
    return questions;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assessment info
        const assessmentRes = await axios.get(`${API}/trajectory/assessment/token/${token}`);
        setAssessment(assessmentRes.data);
        
        if (assessmentRes.data.questionnaire_completed) {
          setSubmitted(true);
        }
        
        // Fetch questionnaire
        const questionnaireRes = await axios.get(`${API}/trajectory/questionnaire`);
        setQuestionnaire(questionnaireRes.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to load pre-assessment form");
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    } else {
      setError("Invalid access link. Please check your URL.");
      setLoading(false);
    }
  }, [token]);
  
  const questions = questionnaire ? flattenQuestions(questionnaire.categories) : [];
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleResponseChange = (value) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value
    });
    setValidationError(null);
  };
  
  const validateCurrentQuestion = () => {
    if (currentQuestion.mandatory && !responses[currentQuestion.id]) {
      setValidationError("This question is required. Please select an option.");
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (!validateCurrentQuestion()) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setValidationError(null);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setValidationError(null);
    }
  };
  
  const handleSubmit = async () => {
    // Validate all mandatory questions
    const unansweredMandatory = questions.filter(q => q.mandatory && !responses[q.id]);
    if (unansweredMandatory.length > 0) {
      setValidationError(`Please answer all required questions. ${unansweredMandatory.length} question(s) remaining.`);
      return;
    }
    
    setSubmitting(true);
    try {
      // Format responses with question text
      const formattedResponses = {};
      questions.forEach(q => {
        if (responses[q.id]) {
          formattedResponses[q.question] = responses[q.id];
        }
      });
      
      await axios.post(`${API}/trajectory/assessment/${assessmentId}/questionnaire`, {
        responses: formattedResponses
      });
      
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit pre-assessment");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Calculate completion stats
  const answeredCount = Object.keys(responses).length;
  const mandatoryCount = questions.filter(q => q.mandatory).length;
  const mandatoryAnswered = questions.filter(q => q.mandatory && responses[q.id]).length;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Application Complete!</h2>
          <p className="text-gray-600 mb-6">
            Your resume with pre-assessment form has been successfully submitted and is now under evaluation for the next round.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-left mb-4">
            <h3 className="font-medium text-emerald-900 mb-2">✓ Submission Confirmed</h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Resume accepted and locked to job requisition</li>
              <li>• Pre-assessment form completed</li>
              <li>• Application now under evaluation</li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-left">
            <h3 className="font-medium text-indigo-900 mb-2">What's Next?</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• First-level evaluation has been initiated</li>
              <li>• You will be notified about next steps within 5-7 business days</li>
              <li>• If shortlisted, you will receive details for the next round</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            You may close this window. An acknowledgement email has been sent to your registered email address.
          </p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Pre-Assessment Form</h1>
                <p className="text-xs text-gray-500">RoleSense Career Trajectory</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{mandatoryAnswered}/{mandatoryCount} Required</p>
              <p className="text-xs text-gray-500">{answeredCount} of {questions.length} answered</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Welcome Banner - First question only */}
        {currentQuestionIndex === 0 && (
          <Card className="p-5 mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Welcome, {assessment?.candidate_name}!</h2>
                <p className="text-indigo-100 text-sm">
                  Complete this mandatory pre-assessment to proceed with your application. 
                  All questions are quick single-select and should take under 5 minutes.
                </p>
                {assessment?.target_role && (
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Target className="w-4 h-4" />
                    <span>Applying for: {assessment.target_role}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
        
        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            <strong>Important:</strong> This assessment is mandatory. Failure to complete will result in automatic rejection of your application.
          </p>
        </div>
        
        {/* Progress */}
        <Card className="p-4 mb-4">
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
            category={currentQuestion?.category}
          />
        </Card>
        
        {/* Question Card */}
        <Card className="p-6 mb-4">
          <SingleSelectQuestion
            question={currentQuestion}
            value={responses[currentQuestion?.id]}
            onChange={handleResponseChange}
          />
          
          {validationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {validationError}
            </div>
          )}
        </Card>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          <div>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                variant="success"
                onClick={handleSubmit}
                disabled={submitting || mandatoryAnswered < mandatoryCount}
              >
                {submitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Pre-Assessment
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <Card className="p-4 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{answeredCount}</p>
              <p className="text-xs text-gray-500">Answered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{mandatoryAnswered}/{mandatoryCount}</p>
              <p className="text-xs text-gray-500">Required Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-400">{questions.length - answeredCount}</p>
              <p className="text-xs text-gray-500">Remaining</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CandidateQuestionnaire;
