import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  RefreshCw,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { askAaharAI } from '../services/api';

interface AIAssistantPageProps {
  initialPrompt?: string;
  isHindi: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  initialPrompt,
  isHindi,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isHindi
        ? `नमस्ते! मैं **आहार AI** हूँ—नागरिक खाद्य सुरक्षा, स्वच्छता मानकों और भारतीय पोषण विज्ञान के लिए आपका विश्वसनीय सहायक।\n\nआप मुझसे तेल की शुद्धता, खाद्य सुरक्षा दिशा-निर्देश, FSSAI मानकों अथवा व्यंजनों के पोषण संतुलन के बारे में पूछ सकते हैं।`
        : `Greetings! I am **Aahar AI**—your calibrated assistant for food safety literacy, hygiene principles, and Indian culinary nutrition.\n\nAsk me about safe oil usage limits, temperature holding zones, understanding FSSAI markings, or balancing traditional Indian meals.`,
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'How can citizens identify degraded or overheated cooking oil?',
    'What temperature must cooked buffet food be held at to prevent bacteria?',
    'What are high-protein vegetarian combinations in Indian meals?',
    'What does the +F logo on milk and salt mean?',
    'How does AaharSetu handle unhygienic kitchen complaints?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await askAaharAI(text);
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (e) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Unable to connect to the knowledge engine at this moment. Please check your network and retry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#163828] text-white">
              <Sparkles className="w-4 h-4 text-[#E28738]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#163828]">
              {isHindi ? 'आहार AI सहायक' : 'Aahar AI Food Assistant'}
            </h1>
          </div>
          <p className="text-xs text-[#5F6E65]">
            Grounded food-safety literacy powered by Gemini. Ask about kitchen hygiene, storage
            temperatures, and nutrition science.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] border border-[#C8E6C9] text-xs font-bold text-[#1B5E20]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Calibrated Educational Model</span>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#717E77] uppercase tracking-wider block">
          Suggested Topics:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {samplePrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white border border-[#D5CBC0] text-[#163828] hover:bg-[#FAF8F5] hover:border-[#163828] transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Feed */}
      <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#163828] text-white flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-[#E28738]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#163828] text-white rounded-tr-none'
                    : 'bg-[#FAF8F5] text-[#163828] border border-[#E6DFD5] rounded-tl-none whitespace-pre-line'
                }`}
              >
                <div>{msg.text}</div>
                <div
                  className={`mt-2 flex items-center justify-between text-[10px] ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#85948B]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.source && <span>Source: {msg.source}</span>}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-[#163828] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#E28738] animate-spin" />
              </div>
              <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-2xl rounded-tl-none p-4 text-xs text-[#6B7971] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D97724]" />
                <span>Consulting food safety knowledge base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF8F5] border-t border-[#E6DFD5]">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder={
                isHindi
                  ? 'खाद्य सुरक्षा, पोषण या स्वच्छता संबंधी प्रश्न पूछें...'
                  : 'Ask about food hygiene, boiling safety, nutrient pairing...'
              }
              className="flex-1 px-4 py-2.5 bg-white rounded-xl border border-[#D5CBC0] text-sm text-[#163828] focus:outline-none focus:ring-2 focus:ring-[#163828]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-[#163828] text-white hover:bg-[#1f4a36] disabled:opacity-40 transition-colors shrink-0 shadow-xs"
              aria-label="Send query"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

          {/* Educational Disclaimer */}
          <div className="mt-2 text-center text-[10.5px] text-[#78857D] flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#D97724]" />
            <span>
              Aahar AI provides general educational awareness. Not medical advice or statutory
              inspection certification.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
