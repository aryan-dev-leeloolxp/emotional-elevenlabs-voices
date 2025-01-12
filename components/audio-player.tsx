import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";

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
    <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
      <Button size="icon" variant="ghost" onClick={handlePlayPause}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <div className="flex-1">
        <input
          type="range"
          className="w-full"
          onChange={(e) => {
            if (!audioRef.current) return;
            audioRef.current.currentTime =
              (Number(e.target.value) / 100) * audioRef.current.duration;
          }}
        />
      </div>
      <Volume2 size={20} className="text-muted-foreground" />
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
