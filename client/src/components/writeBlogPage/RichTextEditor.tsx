import React, { useState, useRef, useEffect } from 'react';
import { Type, Highlighter } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface FormatButtonProps {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const COLORS = [
  { value: 'inherit', label: 'No Color' },
  { value: '#000000', label: 'Black' },
  { value: '#e60000', label: 'Red' },
  { value: '#ff9900', label: 'Orange' },
  { value: '#ffff00', label: 'Yellow' },
  { value: '#008a00', label: 'Green' },
  { value: '#0066cc', label: 'Blue' },
  { value: '#9933ff', label: 'Purple' },
  { value: '#facccc', label: 'Light Red' },
  { value: '#ffebcc', label: 'Light Orange' },
  { value: '#ffffcc', label: 'Light Yellow' },
  { value: '#cce8cc', label: 'Light Green' },
  { value: '#cce0f5', label: 'Light Blue' },
  { value: '#ebd6ff', label: 'Light Purple' },
  { value: '#bbbbbb', label: 'Gray' },
];

const HEADING_OPTIONS = [
  { value: 'p', label: 'Normal' },
  { value: '2', label: 'Heading 2' },
  { value: '3', label: 'Heading 3' },
] as const;

const FormatButton: React.FC<FormatButtonProps> = ({
  active,
  onClick,
  title,
  children,
  disabled,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`
      px-3 py-1.5 rounded text-2xl font-medium transition-colors
      ${
        active
          ? 'bg-info text-white'
          : 'bg-bgSecondary hover:bg-bgTertiary text-textSecondary'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      mr-2
    `}
  >
    {children}
  </button>
);

const ColorButton = ({
  onColorSelect,
  icon,
  title,
  type = 'text',
}: {
  onColorSelect: (color: string) => void;
  icon: React.ReactNode;
  title: string;
  type?: 'text' | 'highlight';
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        className="p-2 rounded font-medium transition-colors
        hover:bg-bgTertiary bg-bgSecondary text-textSecondary mr-2"
        title={title}
      >
        {icon}
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-max p-8 bg-bgCard">
      <div className="grid grid-cols-10 gap-3">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorSelect(color.value)}
            className="w-9 h-9 rounded border border-inputBorder focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            style={{ backgroundColor: color.value || 'transparent' }}
            title={color.label}
          >
            {color.value === '' && type === 'highlight' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-red-500 rotate-45 transform origin-center" />
                <div className="absolute w-full h-0.5 bg-red-500 -rotate-45 transform origin-center" />
              </div>
            )}
          </button>
        ))}
      </div>
    </PopoverContent>
  </Popover>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  value,
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  className = '',
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && !isDirty) {
      editorRef.current.innerHTML = value || '';
    }

    if (isDirty) {
      const handleBeforeUnload = () => {
        return false;
      };

      window.onbeforeunload = handleBeforeUnload;
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [value, isDirty]);

  const handleHeadingFormat = (
    value: string,
    range: Range,
    selection: Selection
  ) => {
    const heading = document.createElement(`h${value || '1'}`);
    range.surroundContents(heading);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleListFormat = (
    value: string,
    range: Range,
    selection: Selection
  ) => {
    const list = document.createElement(value === 'ordered' ? 'ol' : 'ul');
    const listItem = document.createElement('li');
    list.appendChild(listItem);
    range.surroundContents(listItem);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const applyFormatting = (format: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');

    switch (format) {
      case 'bold':
        span.style.fontWeight = 'bold';
        break;
      case 'italic':
        span.style.fontStyle = 'italic';
        break;
      case 'underline':
        span.style.textDecoration = 'underline';
        break;
      case 'color':
        if (value) span.style.color = value;
        break;
      case 'highlight':
        if (value) span.style.backgroundColor = value;
        break;
      case 'heading':
        handleHeadingFormat(value || '1', range, selection);
        return;
      case 'list':
        handleListFormat(value || 'unordered', range, selection);
        return;
      default:
        return;
    }

    range.surroundContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleContentChange = () => {
    if (onChange && editorRef.current) {
      onChange(name, editorRef.current.innerHTML);
      setIsDirty(true);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  };

  return (
    <div className={`${className} border-solid border-borderLight`}>
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-solid border-borderLight p-6 bg-bgCard space-x-1 flex flex-wrap gap-5 items-center">
          <Select
            disabled={disabled}
            onValueChange={(value) => applyFormatting('heading', value)}
            defaultValue="p"
          >
            <SelectTrigger className="w-40 h-11">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {HEADING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormatButton
            onClick={() => applyFormatting('bold')}
            title="Bold"
            disabled={disabled}
          >
            B
          </FormatButton>

          <FormatButton
            onClick={() => applyFormatting('italic')}
            title="Italic"
            disabled={disabled}
          >
            I
          </FormatButton>

          <FormatButton
            onClick={() => applyFormatting('underline')}
            title="Underline"
            disabled={disabled}
          >
            U
          </FormatButton>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <ColorButton
            onColorSelect={(color) => applyFormatting('color', color)}
            icon={<Type className="w-[1.7rem] h-[1.7rem]" />}
            title="Text Color"
            type="text"
          />

          <ColorButton
            onColorSelect={(color) => applyFormatting('highlight', color)}
            icon={<Highlighter className="w-[1.7rem] h-[1.7rem]" />}
            title="Highlight Color"
            type="highlight"
          />

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <FormatButton
            onClick={() => applyFormatting('list', 'unordered')}
            title="Bullet List"
            disabled={disabled}
          >
            • List
          </FormatButton>

          <FormatButton
            onClick={() => applyFormatting('list', 'ordered')}
            title="Numbered List"
            disabled={disabled}
          >
            1. List
          </FormatButton>
        </div>

        <div
          ref={editorRef}
          className={`p-6 min-h-[300px] focus:outline-none bg-bgCard${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          contentEditable={!disabled}
          onInput={handleContentChange}
          onBlur={handleContentChange}
          onPaste={handlePaste}
          role="textbox"
          aria-multiline="true"
          aria-label="Rich text editor"
          aria-placeholder={placeholder}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>

      <style>
        {`
          [contenteditable=true]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }

          .rich-text-editor h2 { font-size: 1.4em; font-weight: bold; margin: 0.83em 0; }
          .rich-text-editor h3 { font-size: 1.1em; font-weight: bold; margin: 1em 0; }
          .rich-text-editor ul { list-style-type: disc; margin: 1em 0; padding-left: 40px; }
          .rich-text-editor ol { list-style-type: decimal; margin: 1em 0; padding-left: 40px; }
          .rich-text-editor a { color: #2563eb; text-decoration: underline; }
        `}
      </style>
    </div>
  );
};

export default RichTextEditor;
