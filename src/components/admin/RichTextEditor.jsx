import React, { useState, useEffect, useRef } from 'react';
import ResponsiveImage from '../ui/ResponsiveImage';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image, 
  Video, 
  Code, 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Undo,
  Redo,
  Eye,
  EyeOff
} from 'lucide-react';

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Start writing...', 
  className = '',
  height = '400px',
  showPreview = false
}) => {
  const [content, setContent] = useState(value);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleContentChange = (e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange({ target: editorRef.current });
  };

  const insertHTML = (html) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const div = document.createElement('div');
      div.innerHTML = html;
      const fragment = document.createDocumentFragment();
      let node;
      while ((node = div.firstChild)) {
        fragment.appendChild(node);
      }
      range.insertNode(fragment);
      selection.removeAllRanges();
    }
    handleContentChange({ target: editorRef.current });
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertHTML(`<ResponsiveImage src="${url}" alt="Image" />`);
    }
  };

  const insertVideo = () => {
    const url = prompt('Enter video URL (YouTube, Vimeo, etc.):');
    if (url) {
      let embedCode = '';
      
      // YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be') 
          ? url.split('/').pop() 
          : url.split('v=')[1]?.split('&')[0];
        if (videoId) {
          embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="max-width: 100%;"></iframe>`;
        }
      }
      // Vimeo
      else if (url.includes('vimeo.com')) {
        const videoId = url.split('/').pop();
        embedCode = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allowfullscreen style="max-width: 100%;"></iframe>`;
      }
      // Direct video link
      else {
        embedCode = `<video controls style="max-width: 100%;"><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
      }
      
      if (embedCode) {
        insertHTML(`<div class="video-wrapper" style="margin: 1rem 0;">${embedCode}</div>`);
      }
    }
  };

  const formatHeading = (level) => {
    executeCommand('formatBlock', `h${level}`);
  };

  const getSelection = () => {
    const selection = window.getSelection();
    return selection.toString();
  };

  const toolbarButtons = [
    {
      group: 'format',
      buttons: [
        { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
        { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
        { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)' }
      ]
    },
    {
      group: 'headings',
      buttons: [
        { icon: Type, onClick: () => formatHeading(1), title: 'Heading 1', text: 'H1' },
        { icon: Type, onClick: () => formatHeading(2), title: 'Heading 2', text: 'H2' },
        { icon: Type, onClick: () => formatHeading(3), title: 'Heading 3', text: 'H3' }
      ]
    },
    {
      group: 'lists',
      buttons: [
        { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
        { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
        { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' }
      ]
    },
    {
      group: 'align',
      buttons: [
        { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
        { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
        { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
        { icon: AlignJustify, command: 'justifyFull', title: 'Justify' }
      ]
    },
    {
      group: 'media',
      buttons: [
        { icon: Link, onClick: insertLink, title: 'Insert Link' },
        { icon: Image, onClick: insertImage, title: 'Insert Image' },
        { icon: Video, onClick: insertVideo, title: 'Insert Video' },
        { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' }
      ]
    },
    {
      group: 'history',
      buttons: [
        { icon: Undo, command: 'undo', title: 'Undo (Ctrl+Z)' },
        { icon: Redo, command: 'redo', title: 'Redo (Ctrl+Y)' }
      ]
    }
  ];

  const renderPreview = () => {
    return (
      <div 
        className={`prose prose-lg max-w-none p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg`}
        style={{ minHeight: height }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="toolbar bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-t-lg p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.buttons.map((button, buttonIndex) => {
              const Icon = button.icon;
              return (
                <button
                  key={buttonIndex}
                  type="button"
                  onClick={() => {
                    if (button.onClick) {
                      button.onClick();
                    } else if (button.command) {
                      executeCommand(button.command, button.value);
                    }
                  }}
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                  title={button.title}
                >
                  {button.text ? (
                    <span className="text-sm font-bold">{button.text}</span>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </button>
              );
            })}
            {groupIndex < toolbarButtons.length - 1 && (
              <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
            )}
          </React.Fragment>
        ))}
        
        {showPreview && (
          <>
            <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2 rounded transition-colors duration-200 flex items-center justify-center ${
                isPreview 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={isPreview ? 'Show Editor' : 'Show Preview'}
            >
              {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </>
        )}
      </div>

      {/* Editor/Preview */}
      {isPreview ? (
        renderPreview()
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="editor p-4 bg-white dark:bg-gray-800 border-l border-r border-b border-gray-300 dark:border-gray-600 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 prose prose-lg max-w-none"
          style={{ minHeight: height }}
          onInput={handleContentChange}
          onPaste={(e) => {
            // Allow pasting but clean it up
            setTimeout(() => handleContentChange({ target: editorRef.current }), 10);
          }}
          onKeyDown={(e) => {
            // Handle keyboard shortcuts
            if (e.ctrlKey || e.metaKey) {
              switch (e.key) {
                case 'b':
                  e.preventDefault();
                  executeCommand('bold');
                  break;
                case 'i':
                  e.preventDefault();
                  executeCommand('italic');
                  break;
                case 'u':
                  e.preventDefault();
                  executeCommand('underline');
                  break;
                case 'z':
                  e.preventDefault();
                  executeCommand('undo');
                  break;
                case 'y':
                  e.preventDefault();
                  executeCommand('redo');
                  break;
              }
            }
          }}
          dangerouslySetInnerHTML={{ __html: content }}
          data-placeholder={placeholder}
        />
      )}

      {/* Editor Styles */}
      <style>{`
        .editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        .editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        .editor p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        .editor ul, .editor ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }
        
        .editor blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .editor pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }
        
        .editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .editor .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
        }
        
        .editor .video-wrapper iframe,
        .editor .video-wrapper video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
