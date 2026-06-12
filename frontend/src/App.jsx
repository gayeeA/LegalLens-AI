import { useState } from "react";
import axios from "axios";

function App() {
  const API_URL = "http://127.0.0.1:8000";

  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");

  const [summary, setSummary] = useState("");
  const [risk, setRisk] = useState("");
  const [obligations, setObligations] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Upload PDF
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_URL}/upload`,
        formData
      );

      setDocumentId(response.data.document_id);

      setMessage("PDF Uploaded Successfully");
    } catch (error) {
      console.error(error);
      setMessage("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // Summary
  const getSummary = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/summary/${documentId}.pdf`
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      setMessage("Summary Failed");
    } finally {
      setLoading(false);
    }
  };

  // Risk Analysis
  const getRiskAnalysis = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/risk-analysis`,
        {
          document_id: documentId,
        }
      );

      setRisk(response.data.risk_analysis);
    } catch (error) {
      console.error(error);
      setMessage("Risk Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  // Obligations
  const getObligations = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/obligations`,
        {
          document_id: documentId,
        }
      );

      setObligations(response.data.obligations);
    } catch (error) {
      console.error(error);
      setMessage("Obligation Extraction Failed");
    } finally {
      setLoading(false);
    }
  };

  // Chat
  const askQuestion = async () => {
    if (!question) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/chat`,
        {
          document_id: documentId,
          question: question,
        }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setMessage("Question Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>⚖️ LegalLens AI</h1>

      <p>
        Upload legal documents and get:
      </p>

      <ul>
        <li>Document Summary</li>
        <li>Risk Analysis</li>
        <li>Obligation Extraction</li>
        <li>Legal Q&A</li>
      </ul>

      <hr />

      {/* Upload */}

      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        style={{
          marginLeft: "10px",
        }}
      >
        Upload
      </button>

      <p>
        <strong>Document ID:</strong>{" "}
        {documentId}
      </p>

      <hr />

      {/* Summary */}

      <h2>Summary</h2>

      <button onClick={getSummary}>
        Generate Summary
      </button>

      <div
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "10px",
        }}
      >
        {summary}
      </div>

      <hr />

      {/* Risk */}

      <h2>Risk Analysis</h2>

      <button onClick={getRiskAnalysis}>
        Analyze Risks
      </button>

      <div
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "10px",
        }}
      >
        {risk}
      </div>

      <hr />

      {/* Obligations */}

      <h2>Obligations</h2>

      <button onClick={getObligations}>
        Extract Obligations
      </button>

      <div
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "10px",
        }}
      >
        {obligations}
      </div>

      <hr />

      {/* Chat */}

      <h2>Ask Questions</h2>

      <input
        type="text"
        placeholder="Ask about the document..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        style={{
          width: "70%",
          padding: "10px",
        }}
      />

      <button
        onClick={askQuestion}
        style={{
          marginLeft: "10px",
        }}
      >
        Ask
      </button>

      <div
        style={{
          marginTop: "20px",
          whiteSpace: "pre-wrap",
        }}
      >
        <strong>Answer:</strong>

        <br />

        {answer}
      </div>

      <hr />

      {loading && (
        <p>Loading...</p>
      )}

      {message && (
        <p>
          <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}

export default App;