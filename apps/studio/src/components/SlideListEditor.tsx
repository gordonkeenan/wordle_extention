import type { Slide } from '@preso/core';
import './SlideListEditor.css';

export interface SlideListEditorProps {
  slides: Slide[];
  currentSlide: number;
  onUpdateSlides: (slides: Slide[]) => void;
  onSelectSlide: (index: number) => void;
}

export function SlideListEditor({
  slides,
  currentSlide,
  onUpdateSlides,
  onSelectSlide,
}: SlideListEditorProps) {
  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide-${slides.length + 1}`,
      title: `New Slide ${slides.length + 1}`,
      blocks: [],
    };
    onUpdateSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    onUpdateSlides(newSlides);
    if (currentSlide >= newSlides.length) {
      onSelectSlide(Math.max(0, newSlides.length - 1));
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSlides = [...slides];
    [newSlides[index - 1], newSlides[index]] = [newSlides[index], newSlides[index - 1]];
    onUpdateSlides(newSlides);
    onSelectSlide(index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index === slides.length - 1) return;
    const newSlides = [...slides];
    [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
    onUpdateSlides(newSlides);
    onSelectSlide(index + 1);
  };

  return (
    <div className="slide-list-editor">
      <div className="slide-list">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-item ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onSelectSlide(index)}
          >
            <div className="slide-item-content">
              <div className="slide-number">{index + 1}</div>
              <div className="slide-title">{slide.title || 'Untitled Slide'}</div>
            </div>
            <div className="slide-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveUp(index);
                }}
                disabled={index === 0}
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveDown(index);
                }}
                disabled={index === slides.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSlide(index);
                }}
                className="delete"
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-slide-button" onClick={handleAddSlide}>
        + Add Slide
      </button>
    </div>
  );
}
