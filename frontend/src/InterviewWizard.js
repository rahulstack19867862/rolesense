import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  X, FileText, Brain, MessageSquare, CheckCircle, AlertCircle,
  User, Mail, Phone, Briefcase, Award, Target, Sparkles,
  ChevronRight, ChevronDown, Plus, Trash2, Save, Download,
  Send, Bell, Clock, Edit3, Eye, Star, ThumbsUp, ThumbsDown,
  Loader2
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Status options for recruiter
const STATUS_OPTIONS = [
  { value: "under_evaluation", label: "Under Evaluation", color: "bg-blue-100 text-blue-800", icon: Clock },
  { value: "selected_next_round", label: "Selected for Next Round", color: "bg-green-100 text-green-800", icon: ThumbsUp },
  { value: "hold", label: "On Hold", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: ThumbsDown }
];

// Default custom questions
const DEFAULT_CUSTOM_QUESTIONS = [
  { question: "Tell us about your most challenging project and how you handled it?", category: "behavioral", required: true },
  { question: "What are your salary expectations for this role?", category: "general", required: true },
  { question: "What is your current notice period?", category: "general", required: true },
  { question: "Why are you looking to leave your current role?", category: "behavioral", required: true },
  { question: "What motivates you in your work?", category: "behavioral", required: true },
  { question: "Describe a situation where you had to work under pressure.", category: "situational", required: false },
  { question: "How do you handle disagreements with team members?", category: "behavioral", required: false },
  { question: "What are your career goals for the next 5 years?", category: "general", required: false },
  { question: "Do you have any questions about the role or company?", category: "general", required: false },
  { question: "Are you open to relocation if required?", category: "general", required: false }
];

// Interview Wizard Component
const InterviewWizard = ({ resumeId, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [wizardData, setWizardData] = useState(null);
  const [activeTab, setActiveTab] = useState("analysis"); // analysis, questions, responses, report
  const [customQuestions, setCustomQuestions] = useState(DEFAULT_CUSTOM_QUESTIONS);
  const [newQuestion, setNewQuestion] = useState({ question: "", category: "general", required: true });
  const [note, setNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("under_evaluation");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [sendNotification, setSendNotification] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    fetchWizardData();
  }, [resumeId]);

  const fetchWizardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/resume/${resumeId}/interview-wizard`);
      setWizardData(res.data);
      setSelectedStatus(res.data.status || "under_evaluation");
      
      // Load existing custom questions if any
      if (res.data.custom_questions?.length > 0) {
        setCustomQuestions(res.data.custom_questions.map(q => ({
          question: q.question || q.questions?.[0]?.question,
          category: q.category || "general",
          required: q.required !== false
        })).filter(q => q.question));
      }
    } catch (err) {
      console.error("Failed to fetch wizard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim()) return;
    setCustomQuestions([...customQuestions, { ...newQuestion }]);
    setNewQuestion({ question: "", category: "general", required: true });
  };

  const handleRemoveQuestion = (index) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  const handleSaveQuestions = async () => {
    try {
      setSaving(true);
      await axios.post(`${API}/resume/${resumeId}/custom-questions`, {
        custom_questions: customQuestions,
        include_ai_questions: true,
        max_ai_questions: 7
      });
      alert("Questions saved successfully!");
    } catch (err) {
      console.error("Failed to save questions:", err);
      alert("Failed to save questions");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setSaving(true);
      await axios.put(`${API}/resume/${resumeId}/recruiter-action`, {
        status,
        send_notification: sendNotification
      });
      setSelectedStatus(status);
      setShowStatusDropdown(false);
      onUpdate && onUpdate();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;
    try {
      setSaving(true);
      await axios.put(`${API}/resume/${resumeId}/recruiter-action`, {
        note: note,
        created_by: "recruiter"
      });
      setNote("");
      fetchWizardData(); // Refresh to show new note
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadReport = async (format) => {
    try {
      const response = await axios.get(`${API}/resume/${resumeId}/generate-report?format=${format}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `candidate_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download report:", err);
      alert("Failed to generate report");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading Interview Wizard...</p>
        </div>
      </div>
    );
  }

  const resume = wizardData?.resume || {};
  const aiAnalysis = wizardData?.ai_analysis || {};
  const aiQuestions = wizardData?.ai_questions || [];
  const candidateResponses = wizardData?.candidate_responses;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Interview Wizard</h2>
                <p className="text-indigo-200 text-sm">{resume.name} - {resume.applied_job_title || "General Application"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    STATUS_OPTIONS.find(s => s.value === selectedStatus)?.color || "bg-gray-100"
                  }`}
                >
                  {STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                    {STATUS_OPTIONS.map(status => (
                      <button
                        key={status.value}
                        onClick={() => handleStatusChange(status.value)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <status.icon className="w-4 h-4" />
                        <span>{status.label}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-200 px-4 py-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={sendNotification}
                          onChange={(e) => setSendNotification(e.target.checked)}
                          className="rounded text-indigo-600"
                        />
                        Send notification to candidate
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-white/10 rounded-lg p-1">
            {[
              { id: "analysis", label: "AI Analysis", icon: Brain },
              { id: "questions", label: "Interview Questions", icon: MessageSquare },
              { id: "responses", label: "Responses", icon: FileText },
              { id: "report", label: "Report & Actions", icon: Download }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id ? "bg-white text-indigo-600" : "text-white/80 hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* AI Analysis Tab */}
          {activeTab === "analysis" && (
            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Candidate Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{resume.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{resume.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium">{resume.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Applied For</p>
                    <p className="font-medium">{resume.applied_job_title || "General"}</p>
                  </div>
                </div>
              </div>

              {/* AI Assessment */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  AI Assessment Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-indigo-600">{aiAnalysis.ai_assessment?.overall_rating || "N/A"}<span className="text-lg">/10</span></p>
                    <p className="text-xs text-gray-500">Overall Rating</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-600">{(aiAnalysis.confidence_score * 100).toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">Confidence</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center col-span-2">
                    <p className={`text-xl font-bold ${
                      aiAnalysis.ai_assessment?.recommendation === "Highly Recommended" ? "text-green-600" :
                      aiAnalysis.ai_assessment?.recommendation === "Recommended" ? "text-blue-600" :
                      aiAnalysis.ai_assessment?.recommendation === "Consider" ? "text-yellow-600" : "text-gray-600"
                    }`}>
                      {aiAnalysis.ai_assessment?.recommendation || "Pending"}
                    </p>
                    <p className="text-xs text-gray-500">Recommendation</p>
                  </div>
                </div>

                {/* Strengths & Areas for Growth */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" /> Strengths
                    </h4>
                    <ul className="space-y-1">
                      {(aiAnalysis.ai_assessment?.strengths || []).map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-amber-700 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Areas for Growth
                    </h4>
                    <ul className="space-y-1">
                      {(aiAnalysis.ai_assessment?.areas_for_growth || []).map((a, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skill Match Scores */}
              {aiAnalysis.skill_match_scores && Object.keys(aiAnalysis.skill_match_scores).length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    Skill Match Analysis
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(aiAnalysis.skill_match_scores).map(([skill, score]) => (
                      <div key={skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{skill.replace("_", " ")}</span>
                          <span className="font-medium">{(score * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              score >= 0.7 ? "bg-green-500" : score >= 0.4 ? "bg-yellow-500" : "bg-red-400"
                            }`}
                            style={{ width: `${score * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Profile Data */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Professional Profile
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Current Role</p>
                    <p className="font-medium">{aiAnalysis.parsed_data?.current_role || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-medium">{aiAnalysis.parsed_data?.experience_years || 0} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Education</p>
                    <p className="font-medium">{aiAnalysis.parsed_data?.education || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Top Skills</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(aiAnalysis.parsed_data?.top_skills || []).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interview Questions Tab */}
          {activeTab === "questions" && (
            <div className="space-y-6">
              {/* AI Generated Questions */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Generated Interview Questions ({aiQuestions.length})
                </h3>
                <div className="space-y-3">
                  {aiQuestions.map((q, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{i + 1}. {q.question}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded">{q.skill_area}</span>
                            <span className={`px-2 py-0.5 rounded ${
                              q.difficulty === "hard" ? "bg-red-100 text-red-700" :
                              q.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}>{q.difficulty}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                          className="p-1 hover:bg-purple-100 rounded"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${expandedQuestion === i ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {expandedQuestion === i && (
                        <div className="mt-3 pt-3 border-t border-purple-100">
                          <p className="text-xs text-gray-500 mb-1">Expected Answer Guidelines:</p>
                          <p className="text-sm text-gray-700">{q.expected_answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Questions */}
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-600" />
                  Custom Interview Questions ({customQuestions.length}/10)
                </h3>
                
                {/* Existing Custom Questions */}
                <div className="space-y-2 mb-4">
                  {customQuestions.map((q, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 flex items-center justify-between border border-emerald-100">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{i + 1}. {q.question}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{q.category}</span>
                          {q.required && <span className="text-xs text-red-500">Required</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveQuestion(i)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Question */}
                {customQuestions.length < 10 && (
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <p className="text-sm font-medium mb-3">Add Custom Question</p>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      placeholder="Enter your custom interview question..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3"
                      rows={2}
                    />
                    <div className="flex items-center gap-3">
                      <select
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="general">General</option>
                        <option value="technical">Technical</option>
                        <option value="behavioral">Behavioral</option>
                        <option value="situational">Situational</option>
                      </select>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newQuestion.required}
                          onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                          className="rounded text-emerald-600"
                        />
                        Required
                      </label>
                      <button
                        onClick={handleAddQuestion}
                        disabled={!newQuestion.question.trim()}
                        className="ml-auto bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSaveQuestions}
                    disabled={saving}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Questions
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Responses Tab */}
          {activeTab === "responses" && (
            <div className="space-y-6">
              {candidateResponses ? (
                <>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Responses Submitted</span>
                      <span className="text-sm text-green-600 ml-auto">
                        {candidateResponses.submitted_at?.slice(0, 10)}
                      </span>
                    </div>
                  </div>

                  {/* AI Question Responses */}
                  {candidateResponses.ai_question_responses?.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">AI Question Responses</h3>
                      <div className="space-y-4">
                        {candidateResponses.ai_question_responses.map((resp, i) => (
                          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                            <p className="font-medium text-gray-900 mb-2">Q{i + 1}: {resp.question}</p>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{resp.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Question Responses */}
                  {candidateResponses.custom_question_responses?.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Custom Question Responses</h3>
                      <div className="space-y-4">
                        {candidateResponses.custom_question_responses.map((resp, i) => (
                          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                            <p className="font-medium text-gray-900 mb-2">Q{i + 1}: {resp.question}</p>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{resp.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-yellow-50 rounded-xl p-8 text-center border border-yellow-100">
                  <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Awaiting Candidate Responses</h3>
                  <p className="text-yellow-600 text-sm">
                    The candidate has not yet submitted their responses to the interview questions.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Report & Actions Tab */}
          {activeTab === "report" && (
            <div className="space-y-6">
              {/* Download Report */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-indigo-600" />
                  Generate Candidate Report
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Download a comprehensive report including CV analysis, AI assessment, interview questions, and candidate responses.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownloadReport("pdf")}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> Download PDF
                  </button>
                  <button
                    onClick={() => handleDownloadReport("docx")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> Download Word
                  </button>
                </div>
              </div>

              {/* Recruiter Notes */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-gray-600" />
                  Recruiter Notes
                </h3>
                
                {/* Existing Notes */}
                {wizardData?.recruiter_notes?.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {wizardData.recruiter_notes.map((n, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.created_at?.slice(0, 10)} by {n.created_by}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Note */}
                <div className="flex gap-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about this candidate..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    rows={2}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!note.trim() || saving}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50 self-end"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Status & Notifications */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600" />
                  Status & Notifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Current Status</p>
                    <div className={`inline-flex px-4 py-2 rounded-lg text-sm font-medium ${
                      STATUS_OPTIONS.find(s => s.value === selectedStatus)?.color
                    }`}>
                      {STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Quick Actions</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange("selected_next_round")}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
                        Select for Next Round
                      </button>
                      <button
                        onClick={() => handleStatusChange("hold")}
                        className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
                      >
                        Put on Hold
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewWizard;
