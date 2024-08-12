import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../src/page/home'; 
import AxiosInstance from '../../src/config/axiosInstance';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// Mock Axios to prevent actual API calls
vi.mock('../../src/config/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockProducts = [
  {
    _id: '1',
    name: 'Carrot',
    category: 'vegetable',
    description: 'Fresh carrot',
    image: 'carrot.png',
    unitPrice: 10,
  },
  {
    _id: '2',
    name: 'Potato',
    category: 'vegetable',
    description: 'Organic potato',
    image: 'potato.png',
    unitPrice: 20,
  },
  // Add more mock products as needed
];

describe('Home Component', () => {
  beforeEach(() => {
    (AxiosInstance.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: mockProducts },
    });
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test to ensure test isolation
  });

  test('renders the Home component correctly', async () => {
    render(<Home />);

    // Check that the component initially renders the static content
    expect(screen.getByText(/The Fasted Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Now/i)).toBeInTheDocument();

    // Wait for the product data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(/Carrot/i)).toBeInTheDocument();
      expect(screen.getByText(/Potato/i)).toBeInTheDocument();
    });
  });

  test('handles the next and previous product buttons', async () => {
    render(<Home />);

    // Wait for products to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Carrot/i)).toBeInTheDocument();
    });

    // Simulate clicking the next button
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Simulate clicking the previous button
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    // Check that the product list scrolls
    // You may need to test the scroll position if you use ref to manipulate it
  });

  test('calls deleteProduct function when a product is deleted', async () => {
    render(<Home />);

    // Wait for products to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Carrot/i)).toBeInTheDocument();
    });

    // Mock the delete API response
    (AxiosInstance.delete as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { message: 'Product deleted' },
    });

    // Simulate clicking the delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i }); // Assuming there's a delete button
    fireEvent.click(deleteButton);

    // Verify the delete request was made
    await waitFor(() => {
      expect(AxiosInstance.delete).toHaveBeenCalledWith('/products/delete-by-id/1'); // Adjust the ID as necessary
    });
  });
});
