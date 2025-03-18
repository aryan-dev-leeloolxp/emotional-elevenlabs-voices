export interface Voice {
  id: string;
  name: string;
}

export type Language = "en" | "es" | "fr" | "de";

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onRandomize: () => void;
  label: string;
}

export interface AudioState {
  url: string;
  isPlaying: boolean;
  audioData?: number[];
}
