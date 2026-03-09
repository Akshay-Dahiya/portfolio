import { Bot, MessageCircle, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatInput from "../components/ui/chat-input";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../components/ui/chat-bubble";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  createdAt: number;
  loading?: boolean;
  suggestions?: string[];
};

type Intent =
  | "greeting"
  | "internships"
  | "education"
  | "skills"
  | "leadership"
  | "achievements"
  | "contact"
  | "schedule"
  | "cv"
  | "moments"
  | "testimonials";

type ReplyPayload = {
  text: string;
  suggestions: string[];
};

const STORAGE_KEY = "priyal-assistant-chat-v3";

const QUICK_PROMPTS = [
  "What is Priyal's strongest internship exposure?",
  "Summarize Priyal's leadership roles at SGT University.",
  "What are her core legal skills?",
  "How can I schedule a Zoom meeting?",
];

const intentKeywords: Record<Intent, string[]> = {
  greeting: ["hi", "hello", "hey", "good morning", "good evening"],
  internships: ["internship", "intern", "judge", "mohit", "dgs", "abhimanyu", "nyayasarthak"],
  education: ["education", "study", "college", "university", "degree", "bba", "llb", "cgpa"],
  skills: ["skills", "strength", "drafting", "research", "communication", "public speaking"],
  leadership: ["leadership", "president", "convenor", "volunteer", "yuva sansad", "synergy"],
  achievements: ["achievement", "accomplishment", "highlight", "best", "impressive", "milestone"],
  contact: ["contact", "email", "phone", "linkedin", "reach", "connect"],
  schedule: ["schedule", "meeting", "zoom", "appointment", "call", "book"],
  cv: ["cv", "resume", "download", "profile"],
  moments: ["moment", "photo", "gallery", "highlights", "defining"],
  testimonials: ["testimonial", "mentor", "feedback", "reference", "review"],
};

const intentResponses: Record<Exclude<Intent, "greeting">, string> = {
  internships:
    "Priyal's most impressive internship exposure is under Shri Mohit Kumar Prasad, where she strengthened judicial reasoning through assignment-led legal research and court workflow observation.\n\nOther internships include:\n- Mr. Abhimanyu Mahajan (research and drafting)\n- Adv. Manik Goyal / Nyayasarthak (procedural drafting)\n- DGS Associates (client-facing legal support)\n- SMCEC ESG Centre (policy and sustainability law exposure)",
  education:
    "Education snapshot:\n- BBA LL.B (H), SGT University\n- Current CGPA: 8.12\n- Focus areas: legal drafting, legal research, structured argument, and public communication",
  skills:
    "Core legal strengths:\n- Legal drafting (affidavits, notices, pleadings)\n- Legal research and case analysis\n- Public speaking and advocacy communication\n- Team coordination and event leadership\n- Professional documentation discipline",
  leadership:
    "Key leadership roles at SGT University:\n- President, Rashtriya Yuva Sansad 2024\n- Convenor, International Trial Advocacy Competition 2025\n- Volunteer, SYNERGY Inter-University Tecno Fest '24\n- Member, SMCEC ESG / Environmental Law & Climate Change",
  achievements:
    "High-impact milestones:\n- Led a national youth parliament at SGT University with policy dialogue stakeholders\n- Consistent mentorship-backed internship performance across litigation and drafting roles\n- Built a strong profile blending legal academics, leadership execution, and communication",
  contact:
    "Professional contact options:\n- Email: priyalsanjeevkumar@gmail.com\n- Phone: +91 8287419392\n- LinkedIn: Priyal Sanjeev Kumar profile\n\nYou can also use the sticky quick-action buttons on screen.",
  schedule:
    "To schedule a meeting:\n- Use the 'Schedule Meeting' button at the top hero section, or\n- Open the Contact section and use the Zoom appointment scheduler.\n\nBoth routes open Zoom scheduling directly.",
  cv:
    "CV access is enabled from:\n- Hero section ('Download CV')\n- Contact section ('Download CV')\n- Sticky quick actions ('Download CV')",
  moments:
    "The Defining Moments section highlights Priyal's leadership and advocacy progression, led by her Rashtriya Yuva Sansad presidency and supported by communication and academic legal forum milestones.",
  testimonials:
    "Mentor testimonials are now presented with verification context, showing feedback from internship supervisors across drafting, research, judicial exposure, and litigation support.",
};

const suggestionMap: Record<Intent, string[]> = {
  greeting: QUICK_PROMPTS,
  internships: [
    "Show Priyal's internship timeline summary.",
    "What did she learn under the judicial internship?",
    "Which internship improved drafting most?",
  ],
  education: [
    "What are Priyal's strongest legal subjects?",
    "Summarize her academic profile in 3 points.",
    "What leadership roles support her legal journey?",
  ],
  skills: [
    "How strong is Priyal in legal drafting?",
    "What communication strengths does she have?",
    "Give a recruiter-ready skills summary.",
  ],
  leadership: [
    "Tell me about Rashtriya Yuva Sansad 2024.",
    "What was her role in Trial Advocacy Competition 2025?",
    "How does leadership reflect in her profile?",
  ],
  achievements: [
    "Which moment is the strongest highlight?",
    "Give a short profile pitch for Priyal.",
    "What makes her portfolio stand out?",
  ],
  contact: [
    "How can I schedule a Zoom call?",
    "Where can I download her CV?",
    "Share Priyal's email and phone.",
  ],
  schedule: [
    "What meeting slots are available?",
    "How do I contact her directly?",
    "Where is the Zoom scheduler on the site?",
  ],
  cv: [
    "How can I schedule a meeting?",
    "Give me her internship summary.",
    "Where is contact information?",
  ],
  moments: [
    "Explain the defining moments section.",
    "Which photo moment is most significant?",
    "Summarize leadership highlights from moments.",
  ],
  testimonials: [
    "Summarize mentor feedback in one paragraph.",
    "Which mentors gave feedback?",
    "How does feedback support her profile?",
  ],
};

function createId() {
  return Date.now() + Math.floor(Math.random() * 100_000);
}

function createWelcomeMessage(): Message {
  return {
    id: createId(),
    sender: "bot",
    text: "Hi! I can give recruiter-ready answers about Priyal's internships, achievements, skills, and meeting availability.",
    createdAt: Date.now(),
    suggestions: QUICK_PROMPTS.slice(0, 3),
  };
}

function detectIntents(query: string): Intent[] {
  const normalized = query.toLowerCase().trim();

  if (!normalized) return [];

  const greetingOnly =
    /^(hi|hello|hey)\b/.test(normalized) ||
    normalized === "good morning" ||
    normalized === "good evening";

  if (greetingOnly) return ["greeting"];

  const scored = (Object.keys(intentKeywords) as Intent[])
    .map((intent) => ({
      intent,
      score: intentKeywords[intent].reduce(
        (score, keyword) => score + (normalized.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 2).map((entry) => entry.intent);
}

function buildReply(input: string): ReplyPayload {
  const intents = detectIntents(input);

  if (intents.length === 0) {
    return {
      text: "I can help with internships, education, skills, achievements, testimonials, and Zoom scheduling. Ask me anything specific and I will give a concise summary.",
      suggestions: QUICK_PROMPTS.slice(0, 3),
    };
  }

  if (intents[0] === "greeting") {
    return {
      text: "Hello! Ask me for a concise summary of Priyal's internships, leadership roles, legal strengths, or how to schedule a Zoom call.",
      suggestions: QUICK_PROMPTS.slice(0, 3),
    };
  }

  const primaryIntent = intents[0] as Exclude<Intent, "greeting">;
  const primary = intentResponses[primaryIntent];

  if (intents.length === 1 || intents[1] === "greeting") {
    return {
      text: primary,
      suggestions: suggestionMap[primaryIntent].slice(0, 3),
    };
  }

  const secondaryIntent = intents[1] as Exclude<Intent, "greeting">;

  return {
    text: `${primary}\n\nAlso relevant:\n${intentResponses[secondaryIntent]}`,
    suggestions: suggestionMap[secondaryIntent].slice(0, 3),
  };
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PriyalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage()]);
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      setMessages([createWelcomeMessage()]);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    const persistable = messages.filter((message) => !message.loading).slice(-35);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  }, [messages]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  function sendMessage(prefilled?: string) {
    const messageText = (prefilled ?? input).trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: createId(),
      sender: "user",
      text: messageText,
      createdAt: Date.now(),
    };

    const loadingMessageId = createId();
    const botLoadingMessage: Message = {
      id: loadingMessageId,
      sender: "bot",
      text: "",
      createdAt: Date.now(),
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, botLoadingMessage]);
    setInput("");

    const delay = 550 + Math.floor(Math.random() * 450);
    const timeoutId = window.setTimeout(() => {
      const response = buildReply(messageText);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessageId
            ? {
                ...message,
                loading: false,
                text: response.text,
                suggestions: response.suggestions,
              }
            : message,
        ),
      );
    }, delay);

    timeoutsRef.current.push(timeoutId);
  }

  function clearConversation() {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    setMessages([createWelcomeMessage()]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80]">
      {isOpen ? (
        <div className="pointer-events-auto w-[min(94vw,420px)] rounded-2xl border border-[var(--portfolio-border)] bg-[var(--portfolio-card)] shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur">
          <div className="border-b border-[var(--portfolio-border)] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--portfolio-surface)] text-[var(--portfolio-accent)]">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--portfolio-text)]">
                    Priyal AI Assistant
                  </p>
                  <p className="text-xs text-[var(--portfolio-muted)]">
                    Portfolio copilot for internships and profile Q&A
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <LiquidButton
                  type="button"
                  size="icon"
                  variant="subtle"
                  onClick={clearConversation}
                  className="h-8 w-8"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </LiquidButton>
                <LiquidButton
                  type="button"
                  size="icon"
                  variant="subtle"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" />
                </LiquidButton>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_PROMPTS.slice(0, 3).map((prompt) => (
                <LiquidButton
                  key={prompt}
                  type="button"
                  variant="subtle"
                  size="xs"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </LiquidButton>
              ))}
            </div>
          </div>

          <div ref={messagesRef} className="max-h-[56vh] overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatBubble variant={message.sender === "user" ? "sent" : "received"}>
                  <ChatBubbleAvatar fallback={message.sender === "user" ? "You" : "AI"} />
                  <div
                    className={`flex max-w-[85%] flex-col ${
                      message.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <ChatBubbleMessage
                      variant={message.sender === "user" ? "sent" : "received"}
                      isLoading={message.loading}
                    >
                      {message.text}
                    </ChatBubbleMessage>
                    <span className="mt-1 text-[10px] text-[var(--portfolio-muted)]">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </ChatBubble>

                {message.sender === "bot" &&
                  !message.loading &&
                  message.suggestions &&
                  message.suggestions.length > 0 && (
                    <div className="mb-4 ml-11 flex flex-wrap gap-2">
                      {message.suggestions.map((prompt) => (
                        <LiquidButton
                          key={`${message.id}-${prompt}`}
                          type="button"
                          variant="subtle"
                          size="xs"
                          onClick={() => sendMessage(prompt)}
                          className="text-[11px]"
                        >
                          {prompt}
                        </LiquidButton>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--portfolio-border)] p-3">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => sendMessage()}
              placeholder="Ask for internship, achievements, or meeting details..."
            />
          </div>
        </div>
      ) : (
        <LiquidButton
          type="button"
          size="default"
          variant="subtle"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto px-4 py-3"
          aria-label="Open AI assistant"
        >
          <MessageCircle className="h-4 w-4 text-[var(--portfolio-accent)]" />
          Ask AI
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
            <Sparkles className="h-3 w-3" />
            Online
          </span>
        </LiquidButton>
      )}
    </div>
  );
}
