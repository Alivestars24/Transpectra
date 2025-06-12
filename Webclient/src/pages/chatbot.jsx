import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

// Simple markdown parser that supports tables
const parseMarkdown = (text) => {
  // Split text into sections
  const sections = [];
  const lines = text.split('\n');
  let currentSection = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a table row (contains |)
    if (line.trim().includes('|') && line.trim() !== '') {
      if (!inTable) {
        // Save any accumulated non-table content
        if (currentSection.length > 0) {
          sections.push({ type: 'text', content: currentSection.join('\n') });
          currentSection = [];
        }
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
    } else {
      if (inTable) {
        // End of table, save it
        sections.push({ type: 'table', content: tableRows });
        inTable = false;
        tableRows = [];
      }
      currentSection.push(line);
    }
  }

  // Handle remaining content
  if (inTable && tableRows.length > 0) {
    sections.push({ type: 'table', content: tableRows });
  } else if (currentSection.length > 0) {
    sections.push({ type: 'text', content: currentSection.join('\n') });
  }

  return sections;
};

// Parse table rows
const parseTable = (tableLines) => {
  const rows = tableLines.filter(line => line.trim() !== '');
  if (rows.length === 0) return null;

  // Parse header
  const headerCells = rows[0].split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  
  // Skip separator row (usually row 1)
  const dataRows = rows.slice(2).map(row => 
    row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
  );

  return { headers: headerCells, rows: dataRows };
};

// Simple text formatting
const formatText = (text) => {
  // Handle bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle route names with special styling
  text = text.replace(/\*\*(Fastest|Most Economical|Compromise)(.*?)\*\*/g, 
    '<div class="font-bold text-blue-700 text-base mb-2 mt-3 first:mt-0 flex items-center"><span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span><strong>$1$2</strong>:</div>');
  
  // Handle italic text
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Handle inline code
  text = text.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-slate-800 border border-slate-200">$1</code>');
  
  return text;
};

const MarkdownRenderer = ({ content }) => {
  const sections = parseMarkdown(content);

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        if (section.type === 'table') {
          const tableData = parseTable(section.content);
          if (!tableData) return null;

          return (
            <div key={index} className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-slate-300 bg-white rounded-lg shadow-sm">
                <thead className="bg-blue-50">
                  <tr>
                    {tableData.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-800"
                      >
                        <span dangerouslySetInnerHTML={{ __html: formatText(header) }} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-slate-300 px-4 py-3 text-sm text-slate-700"
                        >
                          <span dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } else {
          // Handle regular text with basic formatting
          const paragraphs = section.content.split('\n\n').filter(p => p.trim() !== '');
          
          return (
            <div key={index} className="space-y-2">
              {paragraphs.map((paragraph, pIndex) => {
                const trimmed = paragraph.trim();
                if (trimmed === '') return null;

                // Handle headings
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={pIndex} className="text-base font-semibold text-slate-700 mt-3 mb-2 first:mt-0">
                      {trimmed.substring(4)}
                    </h3>
                  );
                } else if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={pIndex} className="text-lg font-semibold text-slate-800 mt-3 mb-2 first:mt-0">
                      {trimmed.substring(3)}
                    </h2>
                  );
                } else if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={pIndex} className="text-xl font-bold text-slate-800 mt-4 mb-3 first:mt-0">
                      {trimmed.substring(2)}
                    </h1>
                  );
                }

                // Handle lists
                const lines = trimmed.split('\n');
                if (lines.some(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
                  return (
                    <ul key={pIndex} className="space-y-1 my-2">
                      {lines
                        .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))
                        .map((line, lineIndex) => (
                          <li key={lineIndex} className="text-sm ml-4 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span dangerouslySetInnerHTML={{ __html: formatText(line.substring(2).trim()) }} />
                          </li>
                        ))}
                    </ul>
                  );
                }

                // Regular paragraph
                return (
                  <p key={pIndex} className="text-sm leading-relaxed mb-2 last:mb-0">
                    <span dangerouslySetInnerHTML={{ __html: formatText(trimmed) }} />
                  </p>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Transpectra logistics assistant. I can help you find the best routes, calculate transportation costs, and provide logistics solutions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId] = useState('2');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://transpectra-ai.onrender.com/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          prompt: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || 'Sorry, I couldn\'t process your request.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Transpectra Assistant</h1>
              <p className="text-sm text-slate-600">Your intelligent logistics and transportation helper</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                    : message.isError 
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : 'bg-gradient-to-r from-slate-600 to-slate-700'
                } p-2 rounded-lg shadow-sm`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-2xl ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block px-4 py-3 rounded-xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : message.isError
                      ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                  }`}>
                    {message.sender === 'bot' && !message.isError ? (
                      <MarkdownRenderer content={message.text} />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    )}
                  </div>
                  <p className={`text-xs text-slate-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-2 rounded-lg shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-xl px-4 py-3 shadow-md border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-slate-600">Processing your request...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about routes, logistics, or transportation needs..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-slate-700"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Chat ID: {chatId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;