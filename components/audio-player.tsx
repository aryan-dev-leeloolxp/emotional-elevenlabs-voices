import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  url: string;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

export function AudioPlayer({ url, isPlaying, onPlayPause }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex items-center gap-2 bg-secondary rounded-md">
      <Button size="icon" variant="ghost" onClick={handlePlayPause}>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      <audio
        ref={audioRef}
        src={url}
        onPlay={() => onPlayPause(true)}
        onPause={() => onPlayPause(false)}
        onEnded={() => onPlayPause(false)}
      />
    </div>
  );
}

