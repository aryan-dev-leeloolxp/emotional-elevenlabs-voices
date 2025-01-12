import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TextInputProps } from "@/types";
import { Shuffle } from "lucide-react";

export function TextInput({
  value,
  onChange,
  onRandomize,
  label,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <Button variant="secondary" onClick={onRandomize} className="gap-2">
          <Shuffle size={16} />
          Randomize
        </Button>
      </div>
    </div>
  );
}

