function detectInfiniteLoop(code) {
  if (code.includes("while(true)") || code.includes("for(;;)")) {
    return "⚠ Infinite loop ho sakta hai";
  }
  return null;
}

module.exports = detectInfiniteLoop;