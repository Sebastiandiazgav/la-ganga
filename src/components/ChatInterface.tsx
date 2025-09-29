'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import Spinner from './Spinner';
import MessageContent from './MessageContent';

interface ChatInterfaceProps {
  translations: {
    chatPlaceholder: string;
    chatStartMessage: string;
  };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ translations }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setInput('');
    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.content) {
        const assistantMessage: Message = { role: 'assistant', content: data.content };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('No hubo contenido en la respuesta.');
      }
    } catch (err: any) {
      setError(`Falló la respuesta: ${err.message || 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (messages.length === 0) return;
    setIsSummaryLoading(true);
    setError(null);
    setSummary(null);
    const chatHistory = messages.map(msg => `${msg.role === 'user' ? 'Cliente' : 'VentaBot'}: ${msg.content}`).join('\n');

    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatHistory }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.content) setSummary(data.content);
      else throw new Error('La IA no generó un resumen.');
    } catch (err: any) {
      setError(`Falló la generación del resumen: ${err.message || 'Error desconocido'}`);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading && messages.length === 0 && ( <div className="flex justify-center items-center h-full"><Spinner /></div> )}
        {!isLoading && messages.length === 0 && !error && ( <div className="flex justify-center items-center h-full"><p className="text-gray-400 text-center">{translations.chatStartMessage}</p></div> )}
        {messages.map((msg, index) => ( <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-lg px-4 py-3 rounded-xl shadow-md ${msg.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-200'}`}><div style={{ whiteSpace: 'pre-wrap' }}><MessageContent text={msg.content} /></div></div></div> ))}
        {isLoading && messages.length > 0 && ( <div className="flex justify-start"><div className="bg-gray-800 text-gray-200 rounded-lg p-2"><Spinner /></div></div> )}
        <div ref={messagesEndRef} />
      </div>
      {isSummaryLoading && ( <div className="p-4 text-center text-gray-400"><Spinner /><p>Alex está analizando la conversación...</p></div> )}
      {summary && ( <div className="p-4 mx-6 mb-4 border border-cyan-500/30 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold text-white mb-2">Análisis de la Conversación</h3><div className="text-gray-300 prose prose-invert prose-sm max-w-none"><MessageContent text={summary} /></div></div> )}
      {error && <div className="p-4 text-red-400 bg-red-900/50 border-t border-red-500/30 text-center">{error}</div>}
      <div className="border-t border-cyan-500/20 p-4">
        <div className="flex justify-center mb-4">
          <button onClick={handleGenerateSummary} disabled={isLoading || isSummaryLoading || messages.length === 0} className="btn btn-secondary text-sm disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">Generar Resumen para Agente</button>
        </div>
        <div className="relative">
          <textarea className="w-full p-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none placeholder-gray-500" placeholder={translations.chatPlaceholder} rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} disabled={isLoading || !!error} />
          <button onClick={handleSend} disabled={isLoading || !!error} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg></button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
