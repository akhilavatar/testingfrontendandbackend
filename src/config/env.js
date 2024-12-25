import dotenv from "dotenv";
dotenv.config();

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY || "-",
  elevenLabsApiKey: process.env.ELEVEN_LABS_API_KEY,
  voiceId: "kgG7dCoKCfLehAPWkJOE",
  port: 3000
};