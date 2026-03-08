import React, { useState, useRef, useEffect } from 'react';

const SearchSection = ({ onSearch, onOpenDatabaseSidebar, currentDatabase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const textareaRef = useRef(null);
  const hiddenDivRef = useRef(null);
  const aiTextareaRef = useRef(null);
  const aiHiddenDivRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && hiddenDivRef.current) {
      hiddenDivRef.current.textContent = searchTerm || ' ';
      const baseHeight = hiddenDivRef.current.scrollHeight;
      textareaRef.current.style.height = Math.max(baseHeight, 30) + 'px';
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isAiOpen && aiTextareaRef.current && aiHiddenDivRef.current) {
      aiHiddenDivRef.current.textContent = aiPrompt || ' ';
      const baseHeight = aiHiddenDivRef.current.scrollHeight;
      aiTextareaRef.current.style.height = Math.max(baseHeight, 30) + 'px';
    }
  }, [aiPrompt, isAiOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInput = (e) => setSearchTerm(e.target.value);
  const handleAiPromptInput = (e) => setAiPrompt(e.target.value);

  const getLineNumbers = (text) => {
    const lines = text ? text.split('\n').length : 1;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  };

  const toggleAiMenu = () => {
    setIsAiOpen(!isAiOpen);
    if (!isAiOpen) setAiPrompt('');
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSearch} className="search-form">
        <div className="main-search-wrapper">
          {/* Database Button - показывает текущую БД */}
          <button
            type="button"
            className="db-menu-toggle"
            onClick={onOpenDatabaseSidebar}
            title="Open Database Manager"
          >
            <span className="db-icon">🗄</span>
            <span className="db-text">{currentDatabase}</span>
          </button>

          {/* AI Menu Toggle */}
          <div className="ai-menu-toggle" onClick={toggleAiMenu}>
            <span className="ai-menu-text">AI Query</span>
            <span className={`ai-menu-arrow ${isAiOpen ? 'open' : ''}`}>▼</span>
          </div>

          {/* Query Input */}
          <div className="textarea-wrapper">
            <div className="line-numbers" aria-hidden="true">
              {getLineNumbers(searchTerm)}
            </div>
            <textarea
              ref={textareaRef}
              value={searchTerm}
              onInput={handleInput}
              placeholder="Enter your Cypher query here..."
              className="search-textarea"
            />
            <div ref={hiddenDivRef} className="hidden-textarea" />
          </div>

          <button type="submit" className="search-button">
            Search
          </button>
        </div>

        {/* AI Prompt Section */}
        {isAiOpen && (
          <div className="ai-prompt-section">
            <div className="ai-input-wrapper">
              <div className="line-numbers" aria-hidden="true">
                {getAiLineNumbers(aiPrompt)}
              </div>
              <textarea
                ref={aiTextareaRef}
                value={aiPrompt}
                onInput={handleAiPromptInput}
                placeholder="Enter a natural language description..."
                className="search-textarea ai-prompt-textarea"
              />
              <div ref={aiHiddenDivRef} className="hidden-textarea" />
            </div>
            <button
              type="button"
              className="generate-query-button"
              onClick={async () => {
                // ... логика генерации ...
              }}
            >
              Generate Query
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchSection;