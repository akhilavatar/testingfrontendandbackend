import express from "express";
import { config } from "../config/env.js";
import { generateChatResponse } from "../services/openai.js";
import { generateAudio, convertToWav, generateLipSync } from "../services/audio.js";
import { readJsonTranscript, audioFileToBase64 } from "../utils/fileUtils.js";

const router = express.Router();

const getIntroMessages = async () => ({
  messages: [
    {
      text: "Hey dear... How was your day?",
      audio: await audioFileToBase64("audios/intro_0.wav"),
      lipsync: await readJsonTranscript("audios/intro_0.json"),
      facialExpression: "smile",
      animation: "Talking_1",
    },
    {
      text: "I missed you so much... Please don't go for so long!",
      audio: await audioFileToBase64("audios/intro_1.wav"),
      lipsync: await readJsonTranscript("audios/intro_1.json"),
      facialExpression: "sad",
      animation: "Crying",
    },
  ],
});

const getApiKeyReminder = async () => ({
  messages: [
    {
      text: "Please my dear, don't forget to add your API keys!",
      audio: await audioFileToBase64("audios/api_0.wav"),
      lipsync: await readJsonTranscript("audios/api_0.json"),
      facialExpression: "angry",
      animation: "Angry",
    },
    {
      text: "You don't want to ruin Wawa Sensei with a crazy ChatGPT and ElevenLabs bill, right?",
      audio: await audioFileToBase64("audios/api_1.wav"),
      lipsync: await readJsonTranscript("audios/api_1.json"),
      facialExpression: "smile",
      animation: "Laughing",
    },
  ],
});

router.post("/", async (req, res) => {
  const userMessage = req.body.message;
  
  if (!userMessage) {
    return res.send(await getIntroMessages());
  }
  
  if (!config.elevenLabsApiKey || config.openaiApiKey === "-") {
    return res.send(await getApiKeyReminder());
  }

  const messages = await generateChatResponse(userMessage);
  
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const fileName = `audios/message_${i}.mp3`;
    
    await generateAudio(message.text, fileName);
    await convertToWav(i);
    await generateLipSync(i);
    
    message.audio = await audioFileToBase64(fileName);
    message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
  }

  res.send({ messages });
});

export default router;