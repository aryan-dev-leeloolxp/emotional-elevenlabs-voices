"use server";

import genVoice from "@/lib/gen-voice";
import { AudioState } from "@/types";
import { Readable } from "stream";

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function generateAudioSequence(
  voiceId: string,
  mainText: string,
  emotionTexts: string[]
): Promise<AudioState[]> {
  const audioStates: AudioState[] = [];

  for (let i = 0; i < emotionTexts.length; i++) {
    try {
      const audio = await genVoice({
        voiceId,
        text: mainText,
        emotion: emotionTexts[i] || undefined,
      });

      if (audio) {
        const buffer = await streamToBuffer(audio);
        audioStates[i] = {
          url: "",
          audioData: Array.from(buffer),
          isPlaying: false,
        };
      } else {
        audioStates[i] = { url: "", isPlaying: false };
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      audioStates[i] = { url: "", isPlaying: false };
    }
  }

  return audioStates;
}
