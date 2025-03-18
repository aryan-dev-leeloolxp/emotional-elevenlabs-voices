// constants.ts
import type { Voice, Language } from "@/types";

export const BASE_TEXTS = [
  "noooooooooooo, run run run nooooo, go away, oooo",
  "Everything will change after this",
  "They never told me the truth",
  "Let's keep this between us",
  "It's not what you think",
  "You won't believe what I found",
];

export const EMOTION_TEXTS = [
  "they shouted angrily",
  "they confessed quietly",
  "they said sarcastically",
  "they said slowly, with confusion",
  "they pleaded desperately",
  "they announced proudly",
  "they said excitedly",
  "they muttered nervously",
  "they declared confidently",
  "they revealed hesitantly",
  "they responded coldly",
  "they teased playfully",
];

export const VOICES: Voice[] = [
  { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },
  { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
];

export const LANGUAGES: { id: Language; name: string }[] = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
  { id: "fr", name: "French" },
  { id: "de", name: "German" },
];

