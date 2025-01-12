"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { TextInput } from "@/components/text-input";
import { EmotionVoiceInput } from "@/components/emotion-voice-input";
import { BASE_TEXTS, EMOTION_TEXTS, VOICES } from "@/constants";
import type { AudioState } from "@/types";
import { generateAudioSequence } from "./actions";

export default function VoiceDemo() {
  const [mainText, setMainText] = useState(BASE_TEXTS[0]);
  const [emotionTexts, setEmotionTexts] = useState([
    "",
    ...EMOTION_TEXTS.slice(0, 3),
  ]);
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].id);
  const [audioStates, setAudioStates] = useState<AudioState[]>(
    Array(4).fill({ url: "", isPlaying: false })
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const getRandomText = () =>
    BASE_TEXTS[Math.floor(Math.random() * BASE_TEXTS.length)];
  const getRandomEmotion = () =>
    EMOTION_TEXTS[Math.floor(Math.random() * EMOTION_TEXTS.length)];

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    try {
      const results = await generateAudioSequence(
        selectedVoice,
        mainText,
        emotionTexts
      );

      results.forEach((result, index) => {
        if (result.audioData?.length) {
          const blob = new Blob([new Uint8Array(result.audioData)], {
            type: "audio/mpeg",
          });
          const url = URL.createObjectURL(blob);
          setAudioStates((prev) => {
            const newStates = [...prev];
            newStates[index] = { url, isPlaying: false };
            return newStates;
          });
        }
      });
    } catch (error) {
      console.error("Error generating voices:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Emotion Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextInput
            value={mainText}
            onChange={setMainText}
            onRandomize={() => setMainText(getRandomText())}
            label="Base Text"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Voice</label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {VOICES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {emotionTexts.map((text, index) => (
            <EmotionVoiceInput
              key={index}
              text={text}
              onTextChange={(newText) =>
                setEmotionTexts((prev) => {
                  const newTexts = [...prev];
                  newTexts[index] = newText;
                  return newTexts;
                })
              }
              onRandomize={() =>
                setEmotionTexts((prev) => {
                  const newTexts = [...prev];
                  newTexts[index] = index === 0 ? "" : getRandomEmotion();
                  return newTexts;
                })
              }
              audioState={audioStates[index]}
              onPlayPause={(playing) =>
                setAudioStates((prev) => {
                  const newStates = [...prev];
                  newStates[index] = {
                    ...newStates[index],
                    isPlaying: playing,
                  };
                  return newStates;
                })
              }
              isNormal={index === 0}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerateAll}
            className="w-full flex gap-2 items-center"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Wand2 size={16} />
            )}
            {isGenerating ? "Generating..." : "Generate All Variations"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
