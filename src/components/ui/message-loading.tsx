import { cn } from "../../lib/utils";

export function MessageLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></span>
    </div>
  );
}