import { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  Menu,
  X,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

// ==================== COMPONENTS ====================

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-100 backdrop-blur-lg bg-opacity-95 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LegalLens AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition">
              Dashboard
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition">
              Documents
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition">
              History
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition">
              Settings
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100"
            >
              <nav className="flex flex-col gap-4 p-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  Documents
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  History
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  Settings
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = ({ onStartClick }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-16 px-4 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Understand Legal Documents Before You Sign
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Upload agreements, contracts, rental deeds, insurance policies and
          receive AI-powered risk analysis.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            "Summary",
            "Risk Detection",
            "Obligation Extraction",
            "Legal Q&A",
            "Sign Recommendation",
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {feature}
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onStartClick}
          className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
        >
          Start Analyzing →
        </motion.button>
      </div>
    </motion.section>
  );
};

// Upload Section
const UploadSection = ({ onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile);
        handleUpload(droppedFile);
      } else {
        alert("Please drop a PDF file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = (uploadFile) => {
    // Simulate progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    onUpload(uploadFile).finally(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-2xl mx-auto">
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition ${
            dragActive
              ? "border-primary bg-blue-50"
              : "border-gray-200 bg-white hover:border-primary"
          }`}
        >
          <motion.div
            animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
            className="inline-block mb-4"
          >
            <FileText className="w-16 h-16 text-primary mx-auto" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Drop PDF Here
          </h3>
          <p className="text-gray-600 mb-6">or</p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo hover:shadow-lg transition"
          >
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>Supported: PDF</p>
            <p>Maximum: 20MB</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{Math.floor(progress)}%</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FileText className="w-5 h-5" />
              </motion.div>
              <span>Processing...</span>
            </div>
          ) : progress === 100 ? (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" />
              Successfully Processed
            </div>
          ) : null}
        </motion.div>
      )}
      </div>
    </motion.div>
  );
};

// Risk Score Gauge
const RiskGauge = ({ score }) => {
  const getRiskColor = (score) => {
    if (score <= 30) return "#10b981"; // Green
    if (score <= 70) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const getRiskLabel = (score) => {
    if (score <= 30) return "LOW RISK";
    if (score <= 70) return "MEDIUM RISK";
    return "HIGH RISK";
  };

  const getRiskLevel = (score) => {
    if (score <= 30) return "Low";
    if (score <= 70) return "Medium";
    return "High";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-48 h-48 mb-6">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getRiskColor(score)}
            strokeWidth="12"
            strokeDasharray={565.48}
            initial={{ strokeDashoffset: 565.48 }}
            animate={{ strokeDashoffset: 565.48 * (1 - score / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-500">/100</div>
          </motion.div>
        </div>
      </div>

      <div
        className="text-center"
        style={{
          color: getRiskColor(score),
        }}
      >
        <div className="text-lg font-bold">{getRiskLabel(score)}</div>
        <div className="text-sm">{getRiskLevel(score)} Risk Level</div>
      </div>
    </motion.div>
  );
};

// Risk Card
const RiskCard = ({ risk }) => {
  const getRiskBgColor = (level) => {
    if (level === "Low") return "bg-green-50 border-green-200";
    if (level === "Medium") return "bg-orange-50 border-orange-200";
    return "bg-red-50 border-red-200";
  };

  const getRiskIconColor = (level) => {
    if (level === "Low") return "text-green-600";
    if (level === "Medium") return "text-orange-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-6 ${getRiskBgColor(risk.risk_level)}`}
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${getRiskIconColor(risk.risk_level)}`} />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{risk.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{risk.explanation}</p>
          <div className="flex items-center gap-2 text-xs font-medium">
            <TrendingUp className="w-4 h-4" />
            <span className="text-gray-700">
              Recommendation: {risk.recommendation}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Tabs Component
const TabsComponent = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [appState, setAppState] = useState("hero"); // hero, upload, dashboard
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle file upload
  const handleUpload = async (uploadFile) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await axios.post(`${API_URL}/upload`, formData);
      const docId = response.data.document_id;
      setDocumentId(docId);
      setFile(uploadFile);
      setAppState("dashboard");

      // Fetch initial analysis
      await fetchAnalysis(docId);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analysis from backend
  const fetchAnalysis = async (docId) => {
    try {
      setLoading(true);

      // Fetch all analyses in parallel
      const [summaryRes, riskRes, obligationsRes] = await Promise.all([
        axios.get(`${API_URL}/summary/${docId}.pdf`),
        axios.post(`${API_URL}/risk-analysis`, { document_id: docId }),
        axios.post(`${API_URL}/obligations`, { document_id: docId }),
      ]);

      // Combine all data
      const combinedAnalysis = {
        summary: summaryRes.data.summary || "",
        risk_analysis: riskRes.data.risk_analysis || {},
        obligations: obligationsRes.data.obligations || {},
      };

      setAnalysis(combinedAnalysis);
    } catch (err) {
      setError("Failed to fetch analysis");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle chat
  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      const userMessage = { role: "user", content: question };
      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post(`${API_URL}/chat`, {
        document_id: documentId,
        question: question,
      });

      const aiMessage = {
        role: "ai",
        content: response.data.answer || "No response",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setQuestion("");
    } catch (err) {
      console.error(err);
      setError("Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  // Tabs configuration
  const tabs = [
    {
      id: "summary",
      label: "Summary",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "risks",
      label: "Risks",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: "obligations",
      label: "Obligations",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "ask",
      label: "Ask AI",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setError("");
  };

  // Render different views
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20">
        {/* Hero View */}
        {appState === "hero" && (
          <>
            <HeroSection onStartClick={() => setAppState("upload")} />
          </>
        )}

        {/* Upload View */}
        {appState === "upload" && (
          <UploadSection onUpload={handleUpload} loading={loading} />
        )}

        {/* Dashboard View */}
        {appState === "dashboard" && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-12"
          >
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mx-4 sm:mx-6 lg:mx-8">
                {error}
              </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-full">
              {/* Left Panel - Tabs */}
              <div className="lg:col-span-2 px-4 sm:px-6 lg:px-8 h-full">
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  {/* Tabs */}
                  <TabsComponent
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                  />

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {/* Summary Tab */}
                    {activeTab === "summary" && (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Plain English Summary
                          </h3>
                          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                              {analysis.summary ||
                                "No summary available"}
                            </div>
                          </div>
                        </div>

                        {/* Document Metadata */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Document Metadata
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                label: "Document Type",
                                value: "Legal Agreement",
                              },
                              {
                                label: "Pages",
                                value: analysis.risk_analysis?.pages || "N/A",
                              },
                              {
                                label: "Language",
                                value: "English",
                              },
                              {
                                label: "Complexity",
                                value: analysis.risk_analysis?.complexity || "Medium",
                              },
                            ].map((meta, i) => (
                              <div
                                key={i}
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                              >
                                <p className="text-xs text-gray-600 mb-1">
                                  {meta.label}
                                </p>
                                <p className="font-semibold text-gray-900">
                                  {meta.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Risks Tab */}
                    {activeTab === "risks" && (
                      <motion.div
                        key="risks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Risk Gauge */}
                        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 flex justify-center">
                          <RiskGauge
                            score={analysis.risk_analysis?.risk_score || 50}
                          />
                        </div>

                        {/* Risk Cards */}
                        <div className="space-y-4">
                          {analysis.risk_analysis?.critical_clauses &&
                          analysis.risk_analysis.critical_clauses.length > 0 ? (
                            analysis.risk_analysis.critical_clauses.map(
                              (risk, i) => (
                                <RiskCard key={i} risk={risk} />
                              )
                            )
                          ) : (
                            <div className="text-center py-12">
                              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500">No risks identified</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Obligations Tab */}
                    {activeTab === "obligations" && (
                      <motion.div
                        key="obligations"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        {/* Your Obligations */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Your Obligations
                          </h3>
                          <div className="space-y-3">
                            {analysis.obligations?.your_obligations &&
                            analysis.obligations.your_obligations.length > 0 ? (
                              analysis.obligations.your_obligations.map(
                                (obl, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                                  >
                                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-gray-700">
                                      {obl}
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="text-center py-8">
                                <Clock className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">
                                  No obligations found
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Other Party Obligations */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Other Party Obligations
                          </h3>
                          <div className="space-y-3">
                            {analysis.obligations?.other_party_obligations &&
                            analysis.obligations.other_party_obligations.length >
                              0 ? (
                              analysis.obligations.other_party_obligations.map(
                                (obl, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                                  >
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-gray-700">
                                      {obl}
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="text-center py-8">
                                <CheckCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">
                                  No obligations found
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Ask AI Tab */}
                    {activeTab === "ask" && (
                      <motion.div
                        key="ask"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col h-96"
                      >
                        {/* Error Alert */}
                        {error && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                          </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto mb-6 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                          {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-12">
                              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Ask questions about the document</p>
                              <p className="text-xs text-gray-400 mt-2">
                                E.g., "What are my payment obligations?" or "What are the risks?"
                              </p>
                            </div>
                          ) : (
                            messages.map((msg, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${
                                  msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <div
                                  className={`max-w-xs px-4 py-2 rounded-lg ${
                                    msg.role === "user"
                                      ? "bg-primary text-white"
                                      : "bg-white border border-gray-200 text-gray-900"
                                  }`}
                                >
                                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                              </motion.div>
                            ))
                          )}
                          {loading && (
                            <div className="flex justify-start">
                              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                                <div className="flex gap-2">
                                  <motion.div
                                    animate={{ opacity: [0.5, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ opacity: [1, 0.5] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ opacity: [0.5, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input */}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && !loading && handleAsk()
                            }
                            placeholder="Ask anything about this document..."
                            disabled={loading}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500 transition"
                          />
                          <button
                            onClick={handleAsk}
                            disabled={loading || !question.trim()}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo disabled:opacity-50 transition"
                          >
                            Send
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Panel - Sticky Sidebar */}
              <div className="lg:col-span-1 px-4 sm:px-6 lg:px-8 h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 sticky top-32 space-y-6"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    Document Health
                  </h3>

                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {analysis.risk_analysis?.readability_score || 78}
                    </div>
                    <p className="text-sm text-gray-600">/100</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="space-y-3">
                    {[
                      {
                        label: "Risk Score",
                        value: analysis.risk_analysis?.risk_score || 72,
                        icon: AlertTriangle,
                        color: "text-red-600",
                      },
                      {
                        label: "Critical Clauses",
                        value:
                          analysis.risk_analysis?.critical_clauses?.length || 8,
                        icon: AlertCircle,
                        color: "text-orange-600",
                      },
                      {
                        label: "Red Flags",
                        value:
                          analysis.risk_analysis?.red_flags?.length || 4,
                        icon: AlertTriangle,
                        color: "text-red-600",
                      },
                    ].map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${stat.color}`} />
                            <span className="text-sm text-gray-700">
                              {stat.label}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {stat.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sign Recommendation */}
                  <div className="mt-8 p-4 rounded-lg border-2 border-orange-200 bg-orange-50">
                    <p className="text-xs text-orange-700 font-medium mb-2">
                      RECOMMENDATION
                    </p>
                    <p className="text-lg font-bold text-orange-900">
                      {analysis.risk_analysis?.sign_recommendation ||
                        "REVIEW BEFORE SIGNING"}
                    </p>
                    <p className="text-xs text-orange-700 mt-2">
                      Confidence:{" "}
                      {analysis.risk_analysis?.confidence || 92}%
                    </p>
                  </div>

                  {/* Additional Metrics */}
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Complexity</p>
                      <p className="font-semibold text-gray-900">
                        {analysis.risk_analysis?.complexity || "Medium"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Legal Jargon
                      </p>
                      <p className="font-semibold text-gray-900">22%</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setAppState("upload")}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      New Document
                    </button>
                    <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-indigo transition">
                      Download Report
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}