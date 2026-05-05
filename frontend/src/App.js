import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import logo from "./logo.png";

function App() {
  const [code, setCode] = useState('print("Hello Bhai")');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");

  const runCode = async () => {
    try {
      const res = await axios.post("https://code-debugger-1-gqqo.onrender.com/run", {
        code,
        language,
      });

      setOutput(res.data.output || "");
      setError(res.data.error || "");
    } catch (err) {
      setError("Server error / backend not running");
    }
  };

  return (
<div className="container" style={{ background: "#0d1117", minHeight: "100vh" }}>
  style={{
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  minHeight: "100vh"
}}

  <div className="header">
    <h1 className="title">⚡ CodeLab</h1>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img src={logo} alt="logo" width="40" />

</div>
    <span className="tag">Built by Avinash Singh </span>
  </div>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <select
          style={styles.select}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <button style={styles.button} onClick={runCode}>
          ▶ Run Code
        </button>
      </div>

      {/* Main Section */}
      <div style={styles.main}>
        
        {/* Monaco Editor */}
        <div style={styles.editor}>
          <Editor
            height="400px"
            language={language === "python" ? "python" : "javascript"}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* Output Panel */}
        <div style={styles.outputBox}>
          <h3>Output:</h3>
          <pre style={{ color: "#00ffcc" }}>{output}</pre>

          <h3>Error:</h3>
          <pre style={{ color: "red" }}>{error}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
  height: "100vh",
  padding: "20px",
  color: "#c9d1d9",        // 🔥 CHANGE THIS
  fontFamily: "Segoe UI, sans-serif",
},
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  select: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    background: "#ff4b2b",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  main: {
    display: "flex",
    gap: "20px",
  },

  editor: {
    width: "50%",
  },

  outputBox: {
    width: "50%",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    padding: "15px",
  },
};