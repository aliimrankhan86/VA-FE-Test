import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterStateManager from '../search-filters-manager.component';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('FilterStateManager', () => {
  const initialFilters = {
    minPrice: 0,
    maxPrice: 10000,
    facilities: ['Bar'],
    starRating: 5,
  };
  const initialSearchParams = {
    minPrice: '0',
    maxPrice: '10000',
    facilities: 'Bar',
    starRating: '5',
  };

  let mockRouterPush: jest.Mock;
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockSearchParams = new URLSearchParams(initialSearchParams as any);

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders correctly', () => {
    render(
      <FilterStateManager
        initialFilters={initialFilters}
        initialSearchParams={initialSearchParams}
      />
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('applies filters correctly and updates URL search params', () => {
    render(
      <FilterStateManager
        initialFilters={initialFilters}
        initialSearchParams={initialSearchParams}
      />
    );
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Apply Filters'));
    expect(mockRouterPush).toHaveBeenCalled();
    const queryString = mockRouterPush.mock.calls[0][0];
    expect(queryString).toContain('minPrice=0');
    expect(queryString).toContain('maxPrice=10000');
    expect(queryString).toContain('facilities=Bar');
    expect(queryString).toContain('starRating=5');
  });

  it('clears filters correctly and updates URL search params', () => {
    render(
      <FilterStateManager
        initialFilters={initialFilters}
        initialSearchParams={initialSearchParams}
      />
    );
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockRouterPush).toHaveBeenCalled();
    const queryString = mockRouterPush.mock.calls[0][0];
    expect(queryString).toContain('minPrice=0');
    expect(queryString).toContain('maxPrice=10000');
    expect(queryString).toContain('facilities=');
    expect(queryString).toContain('starRating=0');
  });
});