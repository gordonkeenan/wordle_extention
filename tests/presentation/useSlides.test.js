import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSlides from '@/presentation/hooks/useSlides.js';

const mockSlides = [
  { id: 'slide1', title: 'Slide 1', content: 'Content 1', notes: [] },
  { id: 'slide2', title: 'Slide 2', content: 'Content 2', notes: [] },
  { id: 'slide3', title: 'Slide 3', content: 'Content 3', notes: [] },
];

describe('useSlides', () => {
  it('initializes with first slide', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    expect(result.current.currentSlideIndex).toBe(0);
    expect(result.current.currentSlide).toEqual(mockSlides[0]);
    expect(result.current.isPresentationStarted).toBe(false);
  });

  it('navigates to next slide', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    act(() => {
      result.current.goToNextSlide();
    });
    
    expect(result.current.currentSlideIndex).toBe(1);
    expect(result.current.currentSlide).toEqual(mockSlides[1]);
  });

  it('navigates to previous slide', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    act(() => {
      result.current.goToNextSlide();
    });
    
    expect(result.current.currentSlideIndex).toBe(1);
    
    act(() => {
      result.current.goToPreviousSlide();
    });
    
    expect(result.current.currentSlideIndex).toBe(0);
  });

  it('does not go past first slide', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    act(() => {
      result.current.goToPreviousSlide();
    });
    
    expect(result.current.currentSlideIndex).toBe(0);
  });

  it('does not go past last slide', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    act(() => {
      result.current.goToSlide(2);
    });
    
    expect(result.current.currentSlideIndex).toBe(2);
    
    act(() => {
      result.current.goToNextSlide();
    });
    
    expect(result.current.currentSlideIndex).toBe(2);
  });

  it('starts presentation', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    expect(result.current.isPresentationStarted).toBe(false);
    
    act(() => {
      result.current.startPresentation();
    });
    
    expect(result.current.isPresentationStarted).toBe(true);
  });

  it('returns correct canGoPrevious and canGoNext flags', () => {
    const { result } = renderHook(() => useSlides(mockSlides));
    
    // At first slide
    expect(result.current.canGoPrevious).toBe(false);
    expect(result.current.canGoNext).toBe(true);
    
    // At middle slide
    act(() => {
      result.current.goToSlide(1);
    });
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true);
    
    // At last slide
    act(() => {
      result.current.goToSlide(2);
    });
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(false);
  });
});
