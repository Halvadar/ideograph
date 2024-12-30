"use client";

import { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function GraphNode() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Circle Node */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-24 h-24 rounded-full p-0 hover:scale-105 transition-transform
                  shadow-lg hover:shadow-xl"
        size="lg"
      >
        Start Here
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Start a New Discussion</DialogTitle>
          </DialogHeader>
          <ChatBubble onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
