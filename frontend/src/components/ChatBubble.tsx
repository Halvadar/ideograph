"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatBubbleProps {
  onClose?: () => void;
}

export function ChatBubble({ onClose }: ChatBubbleProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // TODO: Implement API call to backend
    console.log("Submitted question:", question);
    setQuestion("");
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="min-h-[100px] resize-none"
        autoFocus
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!question.trim()}
          className="flex items-center gap-2"
        >
          Send
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
