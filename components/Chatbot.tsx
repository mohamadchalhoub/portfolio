"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw, ShieldCheck, Sparkles, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const initial: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hi - I'm Mohamad's portfolio assistant. I can explain his engineering approach, application-security work, case studies, or how to start a project.",
};

const suggestions = [
  "What can Mohamad build?",
  "What security bugs has he found?",
  "How does he approach security?",
  "How can we work together?",
];

function ChatbotIcon({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn("relative grid place-items-center overflow-hidden rounded-full", className)}
      aria-hidden="true"
    >
      {failed ? (
        <ShieldCheck className="h-[48%] w-[48%] text-engineering" strokeWidth={1.8} />
      ) : (
        <video
          src="/ai-bot.webm"
          className="h-full w-full object-cover"
          autoPlay={!reduced}
          loop={!reduced}
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initial]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }, [messages, loading, reduced]);

  useEffect(() => {
    if (open) window.setTimeout(() => field.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (open) {
      setShowNudge(false);
      return;
    }

    const timer = window.setTimeout(() => setShowNudge(true), 3500);
    return () => window.clearTimeout(timer);
  }, [open]);

  function openAssistant() {
    setShowNudge(false);
    setOpen(true);
  }

  async function send(value = input) {
    const text = value.trim();
    if (!text || loading) return;

    const user: Message = { id: crypto.randomUUID(), role: "user", text };
    const next = [...messages, user];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: next.slice(-8).map(({ role, text }) => ({ role, content: text })),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Request failed");
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", text: data.reply || "I couldn't produce a useful answer." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "The assistant is temporarily unavailable. You can still use the contact form below to reach Mohamad.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-24 sm:right-8">
          {showNudge && (
            <div className="relative border border-engineering/25 bg-[#080a1d]/95 px-3.5 py-2.5 text-left shadow-[0_16px_50px_rgba(0,0,0,.42),0_0_28px_rgba(0,212,200,.12)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setShowNudge(false)}
                className="absolute right-1.5 top-1.5 p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Dismiss assistant welcome"
              >
                <X className="h-3 w-3" />
              </button>
              <button type="button" onClick={openAssistant} className="block pr-5 text-left">
                <span className="block text-sm font-semibold leading-5 text-foreground">
                  Need a quick brief?
                </span>
              </button>
              <span className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-engineering/25 bg-[#080a1d]/95" />
            </div>
          )}
          <button
            onClick={openAssistant}
            aria-label="Open portfolio assistant"
            className="group grid h-20 w-20 place-items-center rounded-full transition-transform hover:-translate-y-0.5 hover:scale-105 sm:h-24 sm:w-24"
          >
            <span className="relative grid h-[4.5rem] w-[4.5rem] place-items-center sm:h-[5.5rem] sm:w-[5.5rem]">
              <ChatbotIcon className="h-[4.5rem] w-[4.5rem] sm:h-[5.5rem] sm:w-[5.5rem]" />
              <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-[#080a1d] bg-emerald-400 sm:h-3.5 sm:w-3.5" />
            </span>
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-end bg-black/35 p-0 backdrop-blur-[2px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio assistant"
        >
          <button className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} aria-label="Close assistant" />
          <section className="tech-panel relative flex h-[min(720px,92dvh)] w-full flex-col overflow-hidden border border-white/10 bg-[#080a1d]/95 shadow-[0_32px_120px_rgba(0,0,0,.65)] backdrop-blur-2xl sm:max-w-[430px]">
            <header className="flex items-center gap-3 border-b border-white/[0.08] p-4">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-engineering/25 bg-engineering/[0.06]">
                <ChatbotIcon className="h-9 w-9" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Portfolio assistant</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                  <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready to help
                </p>
              </div>
              <button
                onClick={() => setMessages([initial])}
                className="ml-auto p-2 text-muted-foreground hover:text-engineering"
                aria-label="Reset conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5" aria-live="polite">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] px-3.5 py-3 text-sm leading-6",
                      message.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-engineering text-[#061315]"
                        : "tech-panel border border-white/[0.08] bg-white/[0.035] text-foreground/85",
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-engineering" />
                  <span>Reviewing the portfolio...</span>
                </div>
              )}
              <div ref={end} />
            </div>

            {messages.length === 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-white/[0.06] px-4 py-3">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => send(item)}
                    className="shrink-0 border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[10px] text-foreground/70 transition-colors hover:border-engineering/30 hover:text-engineering"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
              className="border-t border-white/[0.08] p-4"
            >
              <div className="flex items-end gap-2 border border-white/[0.09] bg-white/[0.025] p-2">
                <input
                  ref={field}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={1000}
                  placeholder="Ask about the work..."
                  className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="grid h-10 w-10 shrink-0 place-items-center bg-engineering text-[#061315] transition-opacity disabled:opacity-30"
                  aria-label="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground/50">
                Portfolio context only - no personal data disclosed
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
