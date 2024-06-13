import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '../search-filters.component';

describe('SearchFilters', () => {
  const initialFilters = {
    minPrice: 0,
    maxPrice: 10000,
    facilities: ['Bar'],
    starRating: 5,
  };
  const availableFacilities = [
    'Restaurant', 'Bar', 'Free Parking', 'Night Club', 'Room Service', 'Valet parking',
    'Safety Deposit Box', 'Fitness Centre/Gym', 'Laundry Service', 'Games Room', 'Internet Access',
    'Free transport to theme parks', 'Swimming Pool', 'Whirlpool'
  ];
  const onFilterChange = jest.fn();

  it('renders correctly', () => {
    render(
      <SearchFilters
        initialFilters={initialFilters}
        availableFacilities={availableFacilities}
        onFilterChange={onFilterChange}
      />
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('opens the overlay and applies filters correctly', () => {
    render(
      <SearchFilters
        initialFilters={initialFilters}
        availableFacilities={availableFacilities}
        onFilterChange={onFilterChange}
      />
    );
    fireEvent.click(screen.getByText('Filters')); 
    fireEvent.click(screen.getByText('Apply Filters'));
    expect(onFilterChange).toHaveBeenCalled();
  });

  it('opens the overlay and clears filters correctly', () => {
    render(
      <SearchFilters
        initialFilters={initialFilters}
        availableFacilities={availableFacilities}
        onFilterChange={onFilterChange}
      />
    );
    fireEvent.click(screen.getByText('Filters')); 
    fireEvent.click(screen.getByText('Clear Filters'));
    expect(onFilterChange).toHaveBeenCalledWith({
      minPrice: 0,
      maxPrice: 10000,
      facilities: [],
      starRating: 0,
    });
  });
});