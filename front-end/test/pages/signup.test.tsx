// src/__tests__/Signup.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../../src/page/Signup';
import AxiosInstance from '../../src/config/axiosInstance';

vi.mock('../../src/config/axiosInstance', () => ({
  post: vi.fn(),
}));

describe('Signup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form correctly', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const togglePasswordButton = screen.getByRole('button', { name: /show/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    fireEvent.click(togglePasswordButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  it('calls signup API on form submission', async () => {
    const mockResponse = { data: { message: 'User registered successfully' } };
    (AxiosInstance.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() => {
      expect(AxiosInstance.post).toHaveBeenCalledWith('/users/register', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        confirmPassword: 'password',
        image: null,
      });
    });

    expect(AxiosInstance.post).toHaveBeenCalledTimes(1);
  });
});
