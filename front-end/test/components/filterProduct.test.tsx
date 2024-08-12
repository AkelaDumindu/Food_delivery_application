import { render, screen, fireEvent } from '@testing-library/react';
import FilterProduct from '../../src/components/filterProduct';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';

describe('FilterProduct Component', () => {
  it('renders category button correctly', () => {
    const mockProps = {
      category: 'Category 1',
      isActive: false,
      onClick: vi.fn(),
    };

    render(<FilterProduct {...mockProps} />);

    expect(screen.getByText(/category 1/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockProps = {
      category: 'Category 1',
      isActive: false,
      onClick: vi.fn(),
    };

    render(<FilterProduct {...mockProps} />);

    fireEvent.click(screen.getByText(/category 1/i));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
