import { render, screen } from '@testing-library/react';
import CardFeature from '../../src/components/cardFeature';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import React from 'react';

describe('CardFeature Component', () => {
  it('renders product information correctly', () => {
    const productProps = {
      id: '1',
      image: 'image1.jpg',
      name: 'Product 1',
      category: 'Category 1',
      unitPrice: 100,
    };

    render(
      <BrowserRouter>
        <CardFeature {...productProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/category 1/i)).toBeInTheDocument();
    expect(screen.getByText(/rs: 100/i)).toBeInTheDocument();
  });

  it('renders Add to Cart button', () => {
    const productProps = {
      id: '1',
      image: 'image1.jpg',
      name: 'Product 1',
      category: 'Category 1',
      unitPrice: 100,
    };

    render(
      <BrowserRouter>
        <CardFeature {...productProps} />
      </BrowserRouter>
    );

    const button = screen.getByText(/add to cart/i);
    expect(button).toBeInTheDocument();
  });
});
