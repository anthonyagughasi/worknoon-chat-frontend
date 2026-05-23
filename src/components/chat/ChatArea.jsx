'use client';
import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';

export default function ChatArea({ activeRoomId, currentUser }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!socket || !activeRoomId) return;

    socket.emit('join_room', { roomId: activeRoomId });

    socket.on('message_received', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('user_typing', ({ user, roomId }) => {
      if (roomId === activeRoomId && user !== currentUser.name) {
        setTypingUser(user);
        setIsTyping(true);
      }
    });

    socket.on('user_stop_typing', ({ roomId }) => {
      if (roomId === activeRoomId) setIsTyping(false);
    });

    return () => {
      socket.off('message_received');
      socket.off('user_typing');
      socket.off('user_stop_typing');
    };
  }, [socket, activeRoomId, currentUser.name]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!socket) return;

    socket.emit('typing_start', { roomId: activeRoomId, user: currentUser.name });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing_stop', { roomId: activeRoomId });
    }, 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    const messagePayload = {
      roomId: activeRoomId,
      senderId: currentUser.id,
      text: input,
      timestamp: new Date().toISOString()
    };

    socket.emit('send_message', messagePayload);
    setMessages((prev) => [...prev, messagePayload]);
    setInput('');
    socket.emit('typing_stop', { roomId: activeRoomId });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
              msg.senderId === currentUser.id 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded-tl-none border border-slate-100 dark:border-zinc-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <p className="text-xs text-slate-400 dark:text-zinc-500 animate-pulse italic">
            {typingUser} is typing...
          </p>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-zinc-800 border-t border-slate-100 dark:border-zinc-700 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Write your message..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-600 bg-slate-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-zinc-100"
        />
        <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors duration-150 shadow-md shadow-indigo-600/10">
          Send
        </button>
      </form>
    </div>
  );
}
