// import { render, screen, waitFor } from '@testing-library/react';
// import AllProduct from '../../src/components/allProduct';
// import AxiosInstance from '../../src/config/axiosInstance';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import React from 'react';

// // Correctly mock AxiosInstance and its get method
// vi.mock('../../src/config/axiosInstance', () => ({
//   default: {
//     get: vi.fn(), // Ensure `get` is recognized as a mock function
//   },
// }));

// describe('AllProduct Component', () => {
//   beforeEach(() => {
//     // Cast the mocked function to ensure TypeScript recognizes it as a mock
//     (AxiosInstance.get as jest.Mock).mockResolvedValueOnce({
//       data: {
//         data: [
//           { _id: '1', name: 'Product 1', category: 'Category 1', image: 'image1.jpg', price: 100 },
//           { _id: '2', name: 'Product 2', category: 'Category 2', image: 'image2.jpg', price: 200 },
//         ],
//       },
//     });
//   });

//   it('renders products correctly', async () => {
//     render(<AllProduct heading="Our Products" />);

//     await waitFor(() => {
//       expect(screen.getByText(/product 1/i)).toBeInTheDocument();
//       expect(screen.getByText(/product 2/i)).toBeInTheDocument();
//     });
//   });
// });
