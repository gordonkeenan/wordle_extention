import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/presentation/components/Navigation.jsx';

describe('Navigation', () => {
  it('renders Previous and Next buttons', () => {
    render(
      <Navigation 
        onPrevious={() => {}} 
        onNext={() => {}} 
        canGoPrevious={true} 
        canGoNext={true} 
      />
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Previous button when canGoPrevious is false', () => {
    render(
      <Navigation 
        onPrevious={() => {}} 
        onNext={() => {}} 
        canGoPrevious={false} 
        canGoNext={true} 
      />
    );
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button when canGoNext is false', () => {
    render(
      <Navigation 
        onPrevious={() => {}} 
        onNext={() => {}} 
        canGoPrevious={true} 
        canGoNext={false} 
      />
    );
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPrevious when Previous button is clicked', () => {
    let called = false;
    const handlePrevious = () => { called = true; };
    
    render(
      <Navigation 
        onPrevious={handlePrevious} 
        onNext={() => {}} 
        canGoPrevious={true} 
        canGoNext={true} 
      />
    );
    
    fireEvent.click(screen.getByText('Previous'));
    expect(called).toBe(true);
  });

  it('calls onNext when Next button is clicked', () => {
    let called = false;
    const handleNext = () => { called = true; };
    
    render(
      <Navigation 
        onPrevious={() => {}} 
        onNext={handleNext} 
        canGoPrevious={true} 
        canGoNext={true} 
      />
    );
    
    fireEvent.click(screen.getByText('Next'));
    expect(called).toBe(true);
  });
});
