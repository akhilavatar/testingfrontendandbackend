import voice from "elevenlabs-node";
import { exec } from "child_process";
import { config } from "../config/env.js";
import { promisify } from "util";

const execAsync = promisify(exec);

export const generateAudio = async (text, fileName) => {
  await voice.textToSpeech(config.elevenLabsApiKey, config.voiceId, fileName, text);
};

export const convertToWav = async (message) => {
  await execAsync(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
  );
};

export const generateLipSync = async (message) => {
  await execAsync(
    `./bin/rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
};