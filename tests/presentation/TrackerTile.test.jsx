import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrackerTile from '@/presentation/components/TrackerTile.jsx';

describe('TrackerTile', () => {
  it('renders a letter correctly', () => {
    render(
      <TrackerTile 
        letter="A" 
        index={0} 
        colorClass="bg-wordle-green text-white" 
      />
    );
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <TrackerTile 
        letter="B" 
        index={1} 
        colorClass="bg-wordle-yellow text-white" 
        outline="border-2 border-blue-500"
        animationClass="animated-tile"
      />
    );
    
    const tile = container.querySelector('.tracker-tile');
    expect(tile).toHaveClass('bg-wordle-yellow');
    expect(tile).toHaveClass('text-white');
    expect(tile).toHaveClass('border-2');
    expect(tile).toHaveClass('animated-tile');
  });

  it('applies animation delay correctly', () => {
    const { container } = render(
      <TrackerTile 
        letter="C" 
        index={2} 
        colorClass="bg-wordle-gray text-white" 
        delay={0.5}
      />
    );
    
    const tile = container.querySelector('.tracker-tile');
    expect(tile).toHaveStyle({ animationDelay: '0.5s' });
  });

  it('applies infinite animation when specified', () => {
    const { container } = render(
      <TrackerTile 
        letter="D" 
        index={3} 
        colorClass="bg-wordle-green text-white" 
        infinite={true}
      />
    );
    
    const tile = container.querySelector('.tracker-tile');
    expect(tile).toHaveStyle({ animationIterationCount: 'infinite' });
  });
});
