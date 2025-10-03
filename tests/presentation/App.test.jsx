import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/presentation/App.jsx';

describe('App Integration', () => {
  it('renders the presentation app', () => {
    render(<App config="full" />);
    
    // Should show the start screen initially
    expect(screen.getByAltText('Couch Coder (AI Development)')).toBeInTheDocument();
    expect(screen.getByText(/trials and tribulations/i)).toBeInTheDocument();
  });

  it('starts presentation when clicking the start button', () => {
    render(<App config="full" />);
    
    // Click the start image
    fireEvent.click(screen.getByAltText('Couch Coder (AI Development)'));
    
    // Should show the first slide
    expect(screen.getByText('The Plan')).toBeInTheDocument();
    expect(screen.getByText(/Building a Wordle Extension/i)).toBeInTheDocument();
  });

  it('navigates between slides', () => {
    render(<App config="full" />);
    
    // Start presentation
    fireEvent.click(screen.getByAltText('Couch Coder (AI Development)'));
    
    // First slide
    expect(screen.getByText('The Plan')).toBeInTheDocument();
    
    // Navigate to next slide
    fireEvent.click(screen.getByText('Next'));
    
    // Should be on a different slide
    expect(screen.queryByText('The Plan')).not.toBeInTheDocument();
    
    // Navigate back
    fireEvent.click(screen.getByText('Previous'));
    
    // Should be back on first slide
    expect(screen.getByText('The Plan')).toBeInTheDocument();
  });

  it('disables navigation buttons appropriately', () => {
    render(<App config="full" />);
    
    // Start presentation
    fireEvent.click(screen.getByAltText('Couch Coder (AI Development)'));
    
    // Previous button should be disabled on first slide
    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('shows slide counter', () => {
    render(<App config="full" />);
    
    // Start presentation
    fireEvent.click(screen.getByAltText('Couch Coder (AI Development)'));
    
    // Should show slide counter - text is split across elements
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Gordon Keenan — 2025/)).toBeInTheDocument();
  });
});
