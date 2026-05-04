const express = require("express");
const cors = require("cors");
const runCode = require("./routes/runCode");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/run", runCode);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});