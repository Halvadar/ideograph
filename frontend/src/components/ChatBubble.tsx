"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatBubbleProps {
  onClose?: () => void;
  onResponse?: (response: ChatResponse) => void;
}

interface ChatResponse {
  message: string;
  conversation_id: string;
  message_id: string;
  branches: string[];
}

export function ChatBubble({ onClose, onResponse }: ChatBubbleProps) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data: ChatResponse = await response.json();
      onResponse?.(data);
      setQuestion("");
      onClose?.();
    } catch (error) {
      console.error("Error sending message:", error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="min-h-[100px] resize-none"
        autoFocus
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? "Sending..." : "Send"}
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
