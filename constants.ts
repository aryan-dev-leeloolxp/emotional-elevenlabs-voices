// constants.ts
import type { Voice } from "@/types";

export const BASE_TEXTS = [
  "The weather is beautiful today.",
  "I can't believe what just happened.",
  "This is the best day ever.",
  "We need to talk about something.",
];

export const EMOTION_TEXTS = [
  "they whispered softly.",
  "they shouted angrily.",
  "they said excitedly.",
  "they muttered nervously.",
];

export const VOICES: Voice[] = [
  { id: "voice1", name: "Rachel" },
  { id: "voice2", name: "John" },
  { id: "voice3", name: "Emma" },
];
