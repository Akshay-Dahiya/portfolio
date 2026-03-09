import * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { MessageLoading } from "./message-loading";

export function ChatBubble({
  variant = "received",
  className,
  children,
}: {
  variant?: "sent" | "received";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mb-4 flex items-start gap-3", variant === "sent" && "flex-row-reverse", className)}>
      {children}
    </div>
  );
}

export function ChatBubbleMessage({
  variant = "received",
  isLoading,
  className,
  children,
}: {
  variant?: "sent" | "received";
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
    return (
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm",
          variant === "sent"
            ? "bg-[var(--portfolio-text)] text-white"
            : "bg-[var(--portfolio-surface)] text-[var(--portfolio-text)] border border-[var(--portfolio-border)]",
          className
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <MessageLoading />
          </div>
        ) : (
          children
        )}
      </div>
    );
}

export function ChatBubbleAvatar({
  src,
  fallback = "AI",
}: {
  src?: string;
  fallback?: string;
}) {
  return (
    <Avatar className="h-9 w-9">
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export function ChatBubbleAction({
  icon,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={onClick} title={title}>
      {icon}
    </Button>
  );
}

export function ChatBubbleActionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-1 flex gap-1">{children}</div>;
}
