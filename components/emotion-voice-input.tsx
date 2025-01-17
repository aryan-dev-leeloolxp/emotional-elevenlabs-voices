import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle, Download } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import type { AudioState } from "@/types";

interface EmotionVoiceInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onRandomize: () => void;
  audioState: AudioState;
  onPlayPause: (playing: boolean) => void;
  isNormal?: boolean;
}

export function EmotionVoiceInput({
  text,
  onTextChange,
  onRandomize,
  audioState,
  onPlayPause,
  isNormal = false,
}: EmotionVoiceInputProps) {
  const handleDownload = async () => {
    if (!audioState.url) return;

    try {
      const response = await fetch(audioState.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audio-${Date.now()}.mp3`; // You can customize the filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {isNormal ? (
          <div className="flex-1 text-sm text-muted-foreground">
            Without added emotion
          </div>
        ) : (
          <>
            <Input
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" onClick={onRandomize} className="gap-2">
              <Shuffle size={16} />
              Randomize
            </Button>
          </>
        )}
        {audioState.url && (
          <>
            <AudioPlayer
              url={audioState.url}
              isPlaying={audioState.isPlaying}
              onPlayPause={onPlayPause}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDownload}
              className="bg-secondary"
            >
              <Download size={16} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
