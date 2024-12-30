import { GraphNode } from "@/components/GraphNode";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold">AI Discussion Graph</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Click the circle below to start a conversation
            </p>
          </header>

          <div className="flex justify-center mt-16">
            <GraphNode />
          </div>
        </div>
      </main>
    </div>
  );
}
