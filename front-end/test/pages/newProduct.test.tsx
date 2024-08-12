import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '../../src/page/NewProduct';
import AxiosInstance from '../../src/config/axiosInstance';
import { afterEach, describe, expect, test, vi } from 'vitest';

// Mock the Axios instance to prevent actual API calls during testing
vi.mock('../../src/config/axiosInstance', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Product Component', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test to ensure test isolation
  });

  test('renders the Product form', () => {
    render(<Product />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('displays an error message if required fields are missing on form submission', async () => {
    render(<Product />);
    const saveButton = screen.getByText(/save/i);

    fireEvent.click(saveButton);

    expect(await screen.findByText(/please fill in all required fields/i)).toBeInTheDocument();
  });

  test('submits the form successfully when all required fields are filled', async () => {
    // Mock the Axios post request to return a successful response
    (AxiosInstance.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        _id: '1',
        name: 'Test Product',
        description: 'Test Description',
        category: 'fruits',
        unitPrice: 100,
        image: 'data:image/png;base64,...',
      },
    });

    render(<Product />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'fruits' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/product uploaded successfully/i)).toBeInTheDocument();
    });

    // Verify that the mock Axios post was called with the correct data
    expect(AxiosInstance.post).toHaveBeenCalledWith('/products/save-product', {
      name: 'Test Product',
      description: 'Test Description',
      category: 'fruits',
      unitPrice: 100,
      image: null, // Assuming image upload is not tested in this case
    });
  });

  test('displays the uploaded image preview when an image is selected', async () => {
    render(<Product />);

    const fileInput = screen.getByLabelText(/image/i).querySelector('input[type="file"]');
    const file = new File(['image content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput!, { target: { files: [file] } });

    // Assuming ImagetoBase64 returns a base64 string for the selected image
    // Mock the ImagetoBase64 function or ensure it returns a base64 string in the test

    await waitFor(() => {
      expect(screen.getByAltText('Product')).toBeInTheDocument();
    });
  });
});
