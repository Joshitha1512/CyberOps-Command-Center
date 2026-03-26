import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const exampleQueries = [
  "Show high risk Linux servers exposed on port 3389",
  "List all assets with risk score above 80",
  "Which countries generate the most threats?",
  "Find critical MITRE techniques in the last 24h",
];

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to CyberOps AI Agent. I can help you query security data, analyze threats, and identify vulnerabilities. Try asking a question about your network.", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Analyzing your query: "${input}"\n\nI've identified the relevant filters and data sources. To provide live results, connect this dashboard to your Lovable Cloud backend. The AI Agent will then:\n\n• Parse natural language into structured queries\n• Execute against your database views\n• Return formatted results with visualizations\n\nThis feature requires backend integration.`,
        timestamp: new Date(),
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">AI Agent</h1>
        <p className="text-sm text-muted-foreground font-mono">Natural language security intelligence</p>
      </div>

      {/* Example queries */}
      <div className="flex flex-wrap gap-2 mb-4">
        {exampleQueries.map(q => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-[11px] font-mono text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <ScrollArea className="flex-1 glass-card rounded-xl border border-border p-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-xl p-4 ${msg.role === "user" ? "bg-primary/10 border border-primary/20" : "bg-muted/50 border border-border"}`}>
                <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
                <p className="mt-2 text-[10px] font-mono text-muted-foreground">{msg.timestamp.toLocaleTimeString()}</p>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                  <User className="h-4 w-4 text-secondary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask about your security posture..."
          className="bg-muted border-border font-mono text-sm"
        />
        <Button onClick={handleSend} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
