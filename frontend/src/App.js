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
<div
  className="container"
  style={{
    background: "linear-gradient(135deg, #fbcfe8, #e0e7ff)",
    minHeight: "100vh",
    padding: "20px"
  }}
>
  <div className="header">
    <h1 className="title">⚡ ᑕOᗪE ᒪᗩᗷ</h1>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img src={logo} alt="logo" width="40" />

</div>
    <span className="tag">Built by 𝔸𝕧𝕚𝕟𝕒𝕤𝕙 𝕊𝕚𝕟𝕘𝕙 </span>
  </div>
      {/* Top Bar */}
      <div style={styles.topBar} className="topBar">
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

    
      <div style={styles.main} className="main">
        
        
        <div style={styles.editor} className="editorBox">
          <Editor
            height="400px"
            language={language === "python" ? "python" : "javascript"}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
          />
        </div>

        <div style={styles.outputBox} className="output-box">
          <h3>Output:</h3>
                 <pre className="outputText" style={{ color: "#00ffcc" }}>
  {output}
</pre>


          <h3>Error:</h3>
          <pre id="error">{error}</pre>

<pre className="errorText" style={{ color: "red" }}>
  {error}
</pre>
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
  color: "#c9d1d9",      
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
  background: "rgba(255,255,255,0.6)", // increase opacity
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
}

};