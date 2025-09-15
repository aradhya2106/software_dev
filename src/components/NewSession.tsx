import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

interface NewSessionProps {
  onCreated: (sessionId: string) => void;
}

export const NewSession: React.FC<NewSessionProps> = ({ onCreated }) => {
  const [topic, setTopic] = useState('');
  const createSession = trpc.chat.createSession.useMutation({
    onSuccess: (data) => {
      setTopic('');
      onCreated(data.id);
    },
  });

  const handleCreate = () => {
    if (topic.trim()) {
      createSession.mutate({ topic });
    }
  };

  return (
    <div className="new-session" style={{
      background: 'var(--card-background)',
      borderRadius: '12px',
      boxShadow: 'var(--card-shadow)',
      padding: '16px',
      border: '1px solid var(--border-color)',
      marginBottom: '20px',
    }}>
      <div style={{ position: 'relative' }}>
        <input
          id="session-topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter career topic or question..."
          style={{
            width: '100%',
            padding: '12px',
            paddingRight: '100px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            boxSizing: 'border-box',
            fontSize: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            color: 'var(--text-dark)',
            backgroundColor: 'white',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <button 
          onClick={handleCreate}
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            padding: '7px 12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'var(--primary)',
            color: 'var(--text-light)',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem',
            transition: 'background-color 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New
        </button>
      </div>
    </div>
  );
};
