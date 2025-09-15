import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

interface SessionListProps {
  onSelect: (sessionId: string) => void;
  activeSession: string | null;
}

const PAGE_SIZE = 5;

export const SessionList: React.FC<SessionListProps> = ({ onSelect, activeSession }) => {
  const { data: sessions, isLoading, error } = trpc.chat.getSessions.useQuery();
  const [page, setPage] = useState(0);

  if (isLoading) return <div>Loading sessions...</div>;
  if (error) return <div>Error loading sessions.</div>;

  const pagedSessions = sessions?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) || [];
  const totalPages = sessions ? Math.ceil(sessions.length / PAGE_SIZE) : 1;

  return (
    <div className="session-list">
      <h2 style={{ 
        marginTop: '0', 
        marginBottom: '16px', 
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'var(--text-dark)'
      }}>Chat Sessions</h2>
      <ul style={{ 
        listStyle: 'none', 
        padding: '0', 
        margin: '0',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {pagedSessions.length > 0 ? pagedSessions.map((session) => (
          <li key={session.id}>
            <button 
              onClick={() => onSelect(session.id)}
              className={activeSession === session.id ? 'session-item active' : 'session-item'}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                border: '2px solid',
                borderColor: activeSession === session.id ? 'var(--primary)' : 'var(--border-color)',
                borderRadius: '8px',
                background: activeSession === session.id ? 'rgba(22, 119, 255, 0.15)' : 'var(--card-background)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: activeSession === session.id ? '500' : 'normal',
                color: activeSession === session.id ? 'var(--primary)' : 'var(--text-dark)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: activeSession === session.id ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <span style={{ 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                fontSize: '1rem',
                maxWidth: '85%',
                display: 'inline-block'
              }}>{session.topic || "Untitled Session"}</span>
              {activeSession === session.id && (
                <span style={{ 
                  background: 'var(--primary)', 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  marginLeft: '10px',
                  flexShrink: 0,
                  boxShadow: '0 0 0 2px rgba(22, 119, 255, 0.3)'
                }}></span>
              )}
            </button>
          </li>
        )) : (
          <li style={{ 
            textAlign: 'center', 
            color: 'var(--text-dark)',
            padding: '1.5rem 0',
            border: '2px dashed var(--border-color)',
            borderRadius: '8px',
            margin: '0.5rem 0',
            backgroundColor: 'rgba(22, 119, 255, 0.05)'
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '500' }}>No sessions yet</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Use the field above to start a new session
            </div>
            <div style={{
              marginTop: '15px',
              fontSize: '24px',
              color: 'var(--primary)',
            }}>
              ↑
            </div>
          </li>
        )}
      </ul>
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginTop: '1rem', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1rem'
      }}>
        <button 
          onClick={() => setPage((p) => Math.max(0, p - 1))} 
          disabled={page === 0}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: page === 0 ? 'var(--secondary)' : 'var(--primary)',
            color: page === 0 ? 'var(--text-muted)' : 'var(--text-light)',
            cursor: page === 0 ? 'default' : 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: page === 0 ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Prev
        </button>
        <span style={{ 
          alignSelf: 'center',
          color: 'var(--text-dark)',
          fontWeight: '600',
          fontSize: '0.9rem',
          padding: '5px 10px',
          background: 'rgba(0,0,0,0.03)',
          borderRadius: '4px',
          border: '1px solid var(--border-color)'
        }}>
          Page {page + 1} of {totalPages}
        </span>
        <button 
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} 
          disabled={page >= totalPages - 1}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: page >= totalPages - 1 ? 'var(--secondary)' : 'var(--primary)',
            color: page >= totalPages - 1 ? 'var(--text-muted)' : 'var(--text-light)',
            cursor: page >= totalPages - 1 ? 'default' : 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: page >= totalPages - 1 ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
