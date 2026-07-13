import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle, Clock, Send, AlertCircle, ChevronRight, ChevronLeft,
  User, Briefcase, Target, FileText, Building2, MapPin, Calendar
} from "lucide-react";
import { RSCircleLogo } from "./RSLogo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UI Components ============

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
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
    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
  </div>
);

// Progress Bar
const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-purple-600 font-medium">Question {current} of {total}</span>
        <span className="text-gray-500">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Question Components
const TextareaQuestion = ({ question, value, onChange, required }) => (
  <div className="space-y-3">
    <label className="block text-lg font-medium text-gray-900">
      {question}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-900"
      placeholder="Type your answer here..."
      required={required}
    />
  </div>
);

const SelectQuestion = ({ question, options, value, onChange, required }) => (
  <div className="space-y-3">
    <label className="block text-lg font-medium text-gray-900">
      {question}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="space-y-2">
      {options.map((option, idx) => (
        <label
          key={idx}
          className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
            value === option 
              ? "border-purple-500 bg-purple-50 ring-2 ring-purple-500/20" 
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name={question}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
          />
          <span className="text-gray-900">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

// ============ Main Component ============

const PreAssessmentForm = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const [responseData, setResponseData] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // Extract response ID and token from URL
  const pathParts = window.location.pathname.split('/');
  const responseId = pathParts[pathParts.length - 1];
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  useEffect(() => {
    fetchPreAssessment();
  }, []);
  
  const fetchPreAssessment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/preassessment/response/${responseId}`, {
        params: { token }
      });
      
      setResponseData(response.data.response);
      setQuestionnaire(response.data.questionnaire);
      
      // Pre-fill answers if any exist
      if (response.data.response?.responses) {
        setAnswers(response.data.response.responses);
      }
      
      // Check if already completed
      if (response.data.response?.status === 'completed') {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load pre-assessment form");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questionnaire.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    // Validate all required questions are answered
    const unanswered = questionnaire.questions.filter(
      q => q.required && !answers[q.id]
    );
    
    if (unanswered.length > 0) {
      alert(`Please answer all required questions. Missing: ${unanswered.length} questions.`);
      // Navigate to first unanswered
      const firstUnansweredIndex = questionnaire.questions.findIndex(
        q => q.required && !answers[q.id]
      );
      setCurrentQuestionIndex(firstUnansweredIndex);
      return;
    }
    
    try {
      setSubmitting(true);
      await axios.post(`${API}/preassessment/response/${responseId}/submit`, answers, {
        params: { token }
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <LoadingSpinner />
          <p className="text-gray-500 mt-4">Loading your pre-assessment form...</p>
        </Card>
      </div>
    );
  }
  
  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Form</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact the recruitment team.
          </p>
        </Card>
      </div>
    );
  }
  
  // Already Submitted State
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pre-Assessment Completed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing your pre-assessment form. The recruitment team will review your responses and get back to you shortly.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Your responses have been securely submitted
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                HR team will review within 2-3 business days
              </li>
              <li className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                You may be contacted for further evaluation
              </li>
            </ul>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <RSCircleLogo size={24} />
            <span className="text-sm">Powered by Role<span className="text-purple-600">Sense</span></span>
          </div>
        </Card>
      </div>
    );
  }
  
  // Main Form
  const currentQuestion = questionnaire?.questions[currentQuestionIndex];
  const totalQuestions = questionnaire?.questions.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentAnswer = answers[currentQuestion?.id];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RSCircleLogo size={40} />
              <div>
                <h1 className="font-semibold text-gray-900">Role<span className="text-purple-600">Sense</span></h1>
                <p className="text-xs text-gray-500">HR Pre-Assessment</p>
              </div>
            </div>
            {responseData?.job_title && (
              <div className="hidden sm:flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-800 font-medium">{responseData.job_title}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        {currentQuestionIndex === 0 && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Welcome, {responseData?.candidate_name}!</h3>
                <p className="text-sm text-gray-600">
                  Please complete this HR pre-assessment form. Your responses will help us understand your profile better and ensure the best fit for the role.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Estimated time: 5-10 minutes
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Progress */}
        <Card className="p-4 mb-6">
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
        </Card>
        
        {/* Question Card */}
        <Card className="p-6 mb-6">
          <div className="mb-2 text-sm text-purple-600 font-medium">
            Question {currentQuestionIndex + 1}
            {currentQuestion?.category && (
              <span className="ml-2 text-gray-400">• {currentQuestion.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            )}
          </div>
          
          {currentQuestion?.type === 'select' ? (
            <SelectQuestion
              question={currentQuestion.question}
              options={currentQuestion.options || []}
              value={currentAnswer}
              onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              required={currentQuestion.required}
            />
          ) : (
            <TextareaQuestion
              question={currentQuestion?.question}
              value={currentAnswer}
              onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              required={currentQuestion?.required}
            />
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
          
          <div className="flex items-center gap-2">
            {questionnaire?.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentQuestionIndex 
                    ? "bg-purple-600 scale-125" 
                    : answers[questionnaire.questions[idx]?.id]
                      ? "bg-emerald-500"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          {isLastQuestion ? (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Send className="w-4 h-4" />
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
        
        {/* Answer Status */}
        <Card className="p-4 mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Answered: {Object.keys(answers).length} of {totalQuestions}
            </span>
            <span className={`font-medium ${
              Object.keys(answers).length === totalQuestions 
                ? "text-emerald-600" 
                : "text-amber-600"
            }`}>
              {Object.keys(answers).length === totalQuestions 
                ? "✓ All questions answered" 
                : `${totalQuestions - Object.keys(answers).length} remaining`}
            </span>
          </div>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>Your responses are confidential and used for recruitment purposes only.</p>
        <p className="mt-1">© 2025 RoleSense. A product of ALLY EXECUTIVE HR.</p>
      </footer>
    </div>
  );
};

export default PreAssessmentForm;
