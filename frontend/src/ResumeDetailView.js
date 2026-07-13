import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  X, FileText, Brain, Download, Send, Eye, Edit3, Plus, Clock,
  CheckCircle, AlertCircle, User, Mail, Phone, Briefcase, Award,
  Target, Sparkles, ChevronRight, Lock, Star, ThumbsUp, ThumbsDown,
  Loader2, MessageSquare, TrendingUp, ExternalLink, Trash2
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Status options
const STATUS_OPTIONS = [
  { value: "under_evaluation", label: "Under Evaluation", color: "bg-blue-100 text-blue-800" },
  { value: "selected_next_round", label: "Selected for Next Round", color: "bg-green-100 text-green-800" },
  { value: "hold", label: "On Hold", color: "bg-yellow-100 text-yellow-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" }
];

// Default pre-assessment questions for staffing
const DEFAULT_PRE_ASSESSMENT_QUESTIONS = [
  { question: "What is your expected CTC for this role?", required: true },
  { question: "What is your current notice period?", required: true },
  { question: "Are you open to relocation if required?", required: true },
  { question: "Why are you interested in this opportunity?", required: false },
  { question: "What is your availability for interviews?", required: false }
];

// Resume Detail View Component
const ResumeDetailView = ({ resumeId, organizationId, organizationType, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("analysis"); // analysis, pre-assessment, career-trajectory
  const [note, setNote] = useState("");
  const [verbalEval, setVerbalEval] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [preAssessmentQuestions, setPreAssessmentQuestions] = useState(DEFAULT_PRE_ASSESSMENT_QUESTIONS);
  const [newQuestion, setNewQuestion] = useState("");
  const [careerPreview, setCareerPreview] = useState(null);

  const isStaffing = organizationType === "staffing" || organizationType === "staffing_vendor";

  useEffect(() => {
    fetchAnalysis();
  }, [resumeId]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/resume/${resumeId}/basic-analysis`, {
        params: { organization_id: organizationId }
      });
      setAnalysis(res.data);
      setVerbalEval(res.data.verbal_evaluation || "");
    } catch (err) {
      console.error("Failed to fetch analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCompetencyReport = async () => {
    try {
      const response = await axios.get(`${API}/resume/${resumeId}/competency-report`, {
        params: { organization_id: organizationId, format: "pdf" },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `competency_report_${analysis?.candidate_name || 'candidate'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download report:", err);
      alert("Failed to generate report");
    }
  };

  const handleDownloadFullReport = async () => {
    try {
      const response = await axios.get(`${API}/resume/${resumeId}/full-report`, {
        params: { organization_id: organizationId, format: "pdf" },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `full_report_${analysis?.candidate_name || 'candidate'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download full report:", err);
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
      fetchAnalysis();
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVerbalEval = async () => {
    try {
      setSaving(true);
      await axios.post(`${API}/resume/${resumeId}/verbal-evaluation`, {
        text: verbalEval
      });
      alert("Verbal evaluation saved");
    } catch (err) {
      console.error("Failed to save evaluation:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setSaving(true);
      await axios.put(`${API}/resume/${resumeId}/recruiter-action`, { status });
      fetchAnalysis();
      onUpdate && onUpdate();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSendPreAssessment = async () => {
    if (!analysis?.candidate_email) {
      alert("Candidate email not available");
      return;
    }
    try {
      setSaving(true);
      await axios.post(`${API}/resume/${resumeId}/pre-assessment/send`, {
        questions: preAssessmentQuestions,
        candidate_email: analysis.candidate_email,
        custom_message: "Please complete this pre-assessment for your application."
      }, {
        params: { organization_id: organizationId }
      });
      alert("Pre-assessment sent to candidate!");
      fetchAnalysis();
    } catch (err) {
      console.error("Failed to send pre-assessment:", err);
      alert("Failed to send pre-assessment");
    } finally {
      setSaving(false);
    }
  };

  const handleAddPreAssessmentQuestion = () => {
    if (!newQuestion.trim()) return;
    setPreAssessmentQuestions([...preAssessmentQuestions, { question: newQuestion, required: true }]);
    setNewQuestion("");
  };

  const handleRemovePreAssessmentQuestion = (index) => {
    setPreAssessmentQuestions(preAssessmentQuestions.filter((_, i) => i !== index));
  };

  const handleCareerTrajectoryClick = async () => {
    try {
      const res = await axios.get(`${API}/resume/${resumeId}/career-trajectory-preview`, {
        params: { organization_id: organizationId }
      });
      setCareerPreview(res.data);
      if (!res.data.has_full_access) {
        setShowSubscriptionModal(true);
      } else {
        setActiveTab("career-trajectory");
      }
    } catch (err) {
      console.error("Failed to get career trajectory:", err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading Resume Analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load resume analysis</p>
          <button onClick={onClose} className="mt-4 text-emerald-600">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{analysis.candidate_name}</h2>
                <p className="text-emerald-100 text-sm">{analysis.applied_job?.title || "General Application"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Status Dropdown */}
              <select
                value={analysis.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  STATUS_OPTIONS.find(s => s.value === analysis.status)?.color || "bg-gray-100"
                }`}
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === "analysis" ? "bg-white text-emerald-600" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Brain className="w-4 h-4" /> Analysis & Report
            </button>
            {isStaffing && (
              <button
                onClick={() => setActiveTab("pre-assessment")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                  activeTab === "pre-assessment" ? "bg-white text-emerald-600" : "text-white/80 hover:bg-white/10"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Pre-Assessment
                {analysis.pre_assessment_completed && <CheckCircle className="w-3 h-3 text-green-400" />}
              </button>
            )}
            <button
              onClick={handleCareerTrajectoryClick}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === "career-trajectory" ? "bg-white text-emerald-600" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Career Trajectory
              {!analysis.career_trajectory_available && <Lock className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Analysis Tab */}
          {activeTab === "analysis" && (
            <div className="space-y-6">
              {/* Download Reports Section */}
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600" /> Download Reports
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadCompetencyReport}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" /> Download Competency Report (Basic)
                  </button>
                  {(analysis.pre_assessment_completed || !isStaffing) && (
                    <button
                      onClick={handleDownloadFullReport}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                    >
                      <FileText className="w-5 h-5" /> Download Full Report
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Basic competency report is free. Full report includes all analysis and pre-assessment responses.
                </p>
              </div>

              {/* Candidate Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" /> Candidate Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-sm">{analysis.candidate_email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-sm">{analysis.candidate_phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Role</p>
                    <p className="font-medium text-sm">{analysis.parsed_profile?.current_role || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-medium text-sm">{analysis.parsed_profile?.experience_years || 0} years</p>
                  </div>
                </div>
              </div>

              {/* Skill Match Analysis */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" /> Skill Match Analysis
                </h3>
                
                {/* Match Percentage */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Match</span>
                    <span className={`text-lg font-bold ${
                      analysis.skill_analysis?.match_percentage >= 70 ? "text-green-600" :
                      analysis.skill_analysis?.match_percentage >= 40 ? "text-yellow-600" : "text-red-500"
                    }`}>
                      {analysis.skill_analysis?.match_percentage || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        analysis.skill_analysis?.match_percentage >= 70 ? "bg-green-500" :
                        analysis.skill_analysis?.match_percentage >= 40 ? "bg-yellow-500" : "bg-red-400"
                      }`}
                      style={{ width: `${analysis.skill_analysis?.match_percentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Matched Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {(analysis.skill_analysis?.matched_skills || []).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {(analysis.skill_analysis?.missing_skills || []).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Competency Summary */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" /> Competency Summary
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                      {(analysis.competency_summary?.confidence_score * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500">Confidence Score</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {analysis.competency_summary?.primary_function}
                    </p>
                    <p className="text-xs text-gray-500">Primary Function</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {analysis.competency_summary?.sub_function}
                    </p>
                    <p className="text-xs text-gray-500">Sub-Function</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 bg-white p-3 rounded-lg">
                  <strong>Routing Reason:</strong> {analysis.competency_summary?.routing_reason}
                </p>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-gray-600" /> Notes
                </h3>
                
                {/* Existing Notes */}
                {analysis.recruiter_notes?.length > 0 && (
                  <div className="space-y-2 mb-4 max-h-32 overflow-auto">
                    {analysis.recruiter_notes.map((n, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p>{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.created_at?.slice(0, 10)}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Note */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!note.trim() || saving}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Verbal Evaluation (Staffing) */}
              {isStaffing && (
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-600" /> Verbal Evaluation
                  </h3>
                  <textarea
                    value={verbalEval}
                    onChange={(e) => setVerbalEval(e.target.value)}
                    placeholder="Add verbal evaluation notes here... (this will be included in the final report)"
                    className="w-full border border-amber-200 rounded-lg px-4 py-3 text-sm mb-3 bg-white"
                    rows={3}
                  />
                  <button
                    onClick={handleSaveVerbalEval}
                    disabled={saving}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Save Evaluation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pre-Assessment Tab (Staffing Only) */}
          {activeTab === "pre-assessment" && isStaffing && (
            <div className="space-y-6">
              {analysis.pre_assessment_completed ? (
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Pre-Assessment Completed</h3>
                      <p className="text-sm text-green-600">Candidate has submitted their responses</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    The pre-assessment responses are included in the full competency report.
                  </p>
                  <button
                    onClick={handleDownloadFullReport}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Download Final Report with Pre-Assessment
                  </button>
                </div>
              ) : analysis.pre_assessment_sent ? (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">Pre-Assessment Sent</h3>
                      <p className="text-sm text-yellow-600">Waiting for candidate response</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" /> Send Pre-Assessment (Optional)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Send custom questions to the candidate for additional information before finalizing the report.
                    </p>
                  </div>

                  {/* Questions List */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium mb-4">Pre-Assessment Questions ({preAssessmentQuestions.length})</h4>
                    <div className="space-y-2 mb-4">
                      {preAssessmentQuestions.map((q, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex-1">
                            <p className="text-sm">{i + 1}. {q.question}</p>
                            {q.required && <span className="text-xs text-red-500">Required</span>}
                          </div>
                          <button
                            onClick={() => handleRemovePreAssessmentQuestion(i)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Question */}
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Add custom question..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        onClick={handleAddPreAssessmentQuestion}
                        disabled={!newQuestion.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={handleSendPreAssessment}
                      disabled={saving || preAssessmentQuestions.length === 0}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      Send Pre-Assessment to Candidate
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Career Trajectory Tab */}
          {activeTab === "career-trajectory" && careerPreview?.has_full_access && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" /> Career Trajectory Analysis
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Progression Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {careerPreview.full_analysis?.progression_score?.toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Leadership Potential</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {careerPreview.full_analysis?.leadership_potential}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {careerPreview.full_analysis?.strengths?.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-amber-700 mb-2">Growth Areas</h4>
                    <ul className="space-y-1">
                      {careerPreview.full_analysis?.growth_areas?.map((a, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <Target className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlock Career Trajectory</h3>
              <p className="text-gray-500">
                Get detailed career progression analysis, leadership potential assessment, and growth recommendations.
              </p>
            </div>

            {/* Preview Teaser */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-purple-800 mb-2">Preview for {careerPreview?.candidate_name}:</p>
              <ul className="space-y-1">
                {careerPreview?.teaser_insights?.map((insight, i) => (
                  <li key={i} className="text-sm text-purple-600 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.open("/pricing", "_blank")}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium"
              >
                Upgrade to Professional
              </button>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeDetailView;
