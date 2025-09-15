"use client";
/**
 * Main Page Component
 * 
 * This component serves as the entry point for the career counseling chat application.
 * It integrates the following components:
 * - NewSession: For creating new chat sessions
 * - SessionList: For displaying and selecting existing sessions
 * - ChatWindow: For displaying messages and sending new ones in the active session
 * 
 * The layout is responsive and changes from a column layout on mobile to a row layout on desktop.
 */
import React, { useState } from 'react';
import { SessionList } from '../components/SessionList';
import { NewSession } from '../components/NewSession';
import { ChatWindow } from '../components/ChatWindow';

export default function Home() {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '2rem', 
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <style jsx global>{`
          @media (min-width: 768px) {
            .app-container {
              flex-direction: row !important;
            }
            .sidebar {
              min-width: 300px !important;
              max-width: 300px !important;
            }
          }
        `}</style>

        <div className="app-container" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
          gap: '2rem'
        }}>
          <div className="sidebar" style={{ 
            width: '100%',
            maxWidth: '100%'
          }}>
            <NewSession onCreated={setActiveSession} />
            <SessionList onSelect={setActiveSession} activeSession={activeSession} />
          </div>
          <div style={{ flex: 1 }}>
            {activeSession ? (
              <ChatWindow sessionId={activeSession} />
            ) : (
              <div style={{ 
                background: 'var(--card-background)',
                borderRadius: '12px',
                boxShadow: 'var(--card-shadow)',
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}>
                Select an existing session or start a new one to begin chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

