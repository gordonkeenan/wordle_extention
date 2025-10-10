import { useState } from 'react';
import type { Theme } from '@preso/core';
import './ThemeEditor.css';

export interface ThemeEditorProps {
  theme: Theme;
  onUpdateTheme: (theme: Theme) => void;
}

export function ThemeEditor({ theme, onUpdateTheme }: ThemeEditorProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('colors');

  const handleColorChange = (key: string, value: string) => {
    const newTheme: Theme = {
      ...theme,
      vars: {
        ...theme.vars,
        colors: {
          ...theme.vars.colors,
          [key]: value,
        },
      },
    };
    onUpdateTheme(newTheme);
  };

  const handleFontChange = (key: string, value: string) => {
    const newTheme: Theme = {
      ...theme,
      vars: {
        ...theme.vars,
        fonts: {
          ...theme.vars.fonts,
          [key]: value,
        },
      },
    };
    onUpdateTheme(newTheme);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="theme-editor">
      {/* Colors Section */}
      <div className="theme-category">
        <button
          className="theme-category-header"
          onClick={() => toggleCategory('colors')}
        >
          <span>Colors</span>
          <span>{expandedCategory === 'colors' ? '▼' : '▶'}</span>
        </button>
        {expandedCategory === 'colors' && (
          <div className="theme-category-content">
            {theme.vars.colors && Object.entries(theme.vars.colors).map(([key, value]) => (
              <div key={key} className="theme-field">
                <label>{key}</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fonts Section */}
      <div className="theme-category">
        <button
          className="theme-category-header"
          onClick={() => toggleCategory('fonts')}
        >
          <span>Fonts</span>
          <span>{expandedCategory === 'fonts' ? '▼' : '▶'}</span>
        </button>
        {expandedCategory === 'fonts' && (
          <div className="theme-category-content">
            {theme.vars.fonts && Object.entries(theme.vars.fonts).map(([key, value]) => (
              <div key={key} className="theme-field">
                <label>{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleFontChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
