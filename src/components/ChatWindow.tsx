import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

interface ChatWindowProps {
  sessionId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ sessionId }) => {
  const { data: session, refetch, isLoading, error } = trpc.chat.getSession.useQuery(sessionId);
  const [message, setMessage] = useState('');
  const sendMessage = trpc.chat.addMessage.useMutation({
    onSuccess: () => {
      setMessage('');
      refetch();
    },
  });

  const handleSend = () => {
    if (message.trim()) {
      sendMessage.mutate({ sessionId, sender: 'user', content: message });
    }
  };

  if (isLoading) return <div>Loading chat...</div>;
  if (error) return <div>Error loading chat.</div>;

  return (
    <div className="chat-window">
      <div className="messages" style={{ 
        minHeight: '300px', 
        maxHeight: '500px', 
        overflowY: 'auto', 
        marginBottom: '1rem',
        padding: '10px'
      }}>
        {session?.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={msg.sender === 'user' ? 'user-msg' : 'ai-msg'} 
            style={{ 
              marginBottom: '1rem',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: msg.sender === 'user' ? '#1677ff' : '#f0f0f0',
              color: msg.sender === 'user' ? '#ffffff' : '#333333',
              maxWidth: '80%',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              marginRight: msg.sender === 'user' ? '0' : 'auto',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              fontSize: '0.85em', 
              color: msg.sender === 'user' ? 'rgba(255,255,255,0.8)' : '#888', 
              marginBottom: '4px' 
            }}>
              {msg.sender === 'user' ? 'You' : 'AI'} · {new Date(msg.timestamp).toLocaleString()}
            </div>
            <div style={{ 
              wordBreak: 'break-word',
              fontWeight: '400',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="input-row" style={{
        display: 'flex',
        gap: '8px',
        marginTop: '10px'
      }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button 
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#1677ff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
