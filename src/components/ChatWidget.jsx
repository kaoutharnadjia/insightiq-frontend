import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Database, Sparkles } from 'lucide-react';
import axios from 'axios';
import api from '../api/config';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatWidget = ({ erpType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'assistant', 
      content: 'أهلاً بك! أنا مساعد **InsightIQ** الذكي. كيف يمكنني مساعدتك في تحليل بياناتك اليوم؟' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [chatHistory, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.post('/api/chat/message', {
        message: userMessage,
        erpType: erpType
      });

      setChatHistory(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndexData = async () => {
    if (isIndexing) return;
    setIsIndexing(true);
    try {
      setChatHistory(prev => [...prev, { role: 'assistant', content: '### 🔄 جاري التحديث\nجاري الاتصال بالمحرك الذكي وتحديث البيانات... يرجى الانتظار.' }]);
      const response = await api.post('/api/chat/index', { erpType });
      setChatHistory(prev => [...prev, { role: 'assistant', content: `### ✅ تم بنجاح\nتمت معالجة **${response.data.count}** سجل بيانات وتغذية الشاتبوت بها بنجاح.` }]);
    } catch (error) {
      console.error('Indexing error:', error);
      let errorMsg = '### ❌ فشل التحديث\n';
      if (error.code === 'ERR_NETWORK') {
        errorMsg += 'لا يمكن الاتصال بالخادم. تأكد من تشغيل الـ Backend.';
      } else {
        errorMsg += error.message;
      }
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsIndexing(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent-red hover:bg-accent-soft text-white p-4 rounded-full shadow-lg glow-red transition-all transform hover:scale-110 flex items-center justify-center border border-white/20"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-morphism rounded-2xl shadow-2xl w-85 sm:w-100 h-[550px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 border-white/10">
          {/* Header */}
          <div className="bg-accent-red/10 backdrop-blur-md p-4 text-white flex justify-between items-center border-b border-accent-red/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent-red/20 rounded-lg border border-accent-red/30">
                <Sparkles size={18} className="text-accent-soft" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">InsightIQ Intelligence</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-text-secondary uppercase">Active Agent</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleIndexData}
                disabled={isIndexing}
                className="hover:bg-white/10 p-2 rounded-xl transition-colors text-text-secondary hover:text-white border border-transparent hover:border-white/10"
                title="تحديث البيانات"
              >
                {isIndexing ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors text-text-secondary hover:text-white border border-transparent hover:border-white/10">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent-red text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-text-primary rounded-tl-none'
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-accent-soft prose-strong:text-white prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-td:border-white/10">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent-soft rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-accent-soft rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-accent-soft rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-bg-secondary/50 backdrop-blur-xl border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اسأل عن المبيعات، المخزون..."
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-red/50 text-white placeholder:text-text-muted transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-accent-red text-white p-3 rounded-xl hover:bg-accent-soft disabled:opacity-50 transition-all glow-red active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
