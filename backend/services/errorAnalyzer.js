const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAAI_API_KEY
});

async function analyzeError(error, code) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a coding assistant. Fix errors and explain simply."
        },
        {
          role: "user",
          content: `Code:\n${code}\n\nError:\n${error}\n\nGive fixed code and short explanation`
        }
      ],
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.log(err);
    return "AI failed, try again";
  }
}

module.exports = analyzeError;