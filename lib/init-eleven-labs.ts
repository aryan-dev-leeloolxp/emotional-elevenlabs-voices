import { ElevenLabsClient } from "elevenlabs";

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error("Please pass in your ElevenLabs API Key or export ELEVENLABS_API_KEY in your environment.");
}

const elevenlabs = new ElevenLabsClient({
  apiKey,
});

export default elevenlabs;

