import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Add this for Link to work
import HomeCard from "../../src/components/homeCard";
import { describe, expect, it } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';


describe("HomeCard", () => {
  it("should render the name, category, and price correctly", () => {
    const props = {
      name: "Delicious Pizza",
      description: "Tasty and cheesy pizza",
      category: "Food",
      price: 500,
      image: "/path/to/pizza.jpg",
      id: "1",
    };

    render(
      <BrowserRouter>
        <HomeCard {...props} />
      </BrowserRouter>
    );

    const nameElement = screen.getByText(/delicious pizza/i);
    expect(nameElement).toBeInTheDocument();

    const categoryElement = screen.getByText(/food/i);
    expect(categoryElement).toBeInTheDocument();

    const priceElement = screen.getByText(/500/);
    expect(priceElement).toBeInTheDocument();
  });

  it("should display the image with the correct alt text", () => {
    const props = {
      name: "Delicious Pizza",
      description: "Tasty and cheesy pizza",
      category: "Food",
      price: 500,
      image: "/path/to/pizza.jpg",
      id: "1",
    };

    render(
      <BrowserRouter>
        <HomeCard {...props} />
      </BrowserRouter>
    );

    const imgElement = screen.getByAltText(/delicious pizza/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/path/to/pizza.jpg");
  });
});
