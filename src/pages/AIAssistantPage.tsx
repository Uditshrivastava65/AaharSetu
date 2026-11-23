import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  RefreshCw,
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
        : `Greetings! I am **Aahar AI**—your calibrated public advisory assistant for food safety literacy, kitchen sanitation standards, and Indian nutrition science.\n\nAsk about cooking oil TPM limits, safe holding temperatures, FSSAI fortified (+F) markings, or balanced regional meal planning.`,
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
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Unable to reach the advisory service at this moment. Please verify network connectivity and retry.',
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
      <div className="bg-[#0B2545] text-white rounded-xl border border-[#1E3A5F] p-6 shadow-md gov-grid-pattern flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#071A33] border border-[#1E3A5F] text-white">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {isHindi ? 'आहार AI नागरिक सलाहकार' : 'Aahar AI Public Advisory Desk'}
            </h1>
          </div>
          <p className="text-xs text-[#CBD5E1]">
            Food-safety literacy grounded in FSSAI Schedule 4 and ICMR-NIN guidelines.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ECFDF5] border border-[#86EFAC] text-xs font-bold text-[#14532D] shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Public Literacy Engine</span>
        </div>
      </div>

      {/* Suggestion Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider block">
          Common Citizen Queries:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {samplePrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B2545] font-medium hover:bg-white hover:border-[#0B2545] transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Feed */}
      <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#F8FAFC]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-1 border border-[#1E3A5F]">
                  <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0B2545] text-white rounded-tr-none'
                    : 'bg-white text-[#0F172A] border border-[#CBD5E1] rounded-tl-none whitespace-pre-line shadow-xs'
                }`}
              >
                <div>{msg.text}</div>
                <div
                  className={`mt-2 flex items-center justify-between text-[10px] ${
                    msg.sender === 'user' ? 'text-[#CBD5E1]' : 'text-[#64748B]'
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
              <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#FBBF24] animate-spin" />
              </div>
              <div className="bg-white border border-[#CBD5E1] rounded-xl rounded-tl-none p-4 text-xs text-[#475569] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B45309]" />
                <span>Consulting food safety knowledge base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#EEF2F6] border-t border-[#CBD5E1]">
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
                  : 'Ask about food hygiene, storage temperatures, nutrient pairing...'
              }
              className="flex-1 px-4 py-2.5 bg-white rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 px-4 rounded-lg bg-[#0B2545] text-white hover:bg-[#13315C] disabled:opacity-40 transition-colors shrink-0 shadow-xs"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Educational Disclaimer */}
          <div className="mt-2 text-center text-[10.5px] text-[#475569] flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#B45309]" />
            <span>
              Aahar AI provides general public food literacy. Not medical advice or statutory inspection certification.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
