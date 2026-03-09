import * as React from "react";
import { Send } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = "Ask something...",
  disabled = false,
  className,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center gap-3", className)}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-12 flex-1 rounded-full border border-[var(--portfolio-border)] bg-white px-4 text-sm outline-none focus:border-[var(--portfolio-accent)]"
      />
      <Button type="submit" size="icon" className="h-12 w-12 rounded-full">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
