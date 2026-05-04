const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const analyzeError = require("../services/errorAnalyzer"); 

router.post("/", async (req, res) => {
  const { code, language } = req.body;

  let fileName = "";
  let command = "";

  // 🔥 unique file name
  const uniqueId = Date.now();

  if (language === "python") {
    fileName = `temp_${uniqueId}.py`;
    fs.writeFileSync(fileName, code);
    command = `python ${fileName}`;
  } 
  else if (language === "javascript") {
    fileName = `temp_${uniqueId}.js`;
    fs.writeFileSync(fileName, code);
    command = `node ${fileName}`;
  } 
  else {
    return res.json({ error: "Language not supported" });
  }

  exec(command, async (error, stdout, stderr) => {
    // 🧹 file delete
    try {
      fs.unlinkSync(fileName);
    } catch (e) {}

    // ❌ error aaya
    if (error) {
      const aiResponse = await analyzeError(stderr, code);

      return res.json({
        error: stderr || error.message,
        analysis: aiResponse
      });
    }

    // ✅ success
    return res.json({
      output: stdout,
    });
  });
});

module.exports = router;