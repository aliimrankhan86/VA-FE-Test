'use client';

import React, { useState } from 'react';
import SearchFilters from './search-filters.component';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterStateManagerProps {
  initialFilters: { minPrice: number, maxPrice: number, facilities: string[], starRating: number };
  initialSearchParams: { [key: string]: string | string[] | undefined };
}

const availableFacilities = [
  'Restaurant', 'Bar', 'Free Parking', 'Night Club', 'Room Service', 'Valet parking',
  'Safety Deposit Box', 'Fitness Centre/Gym', 'Laundry Service', 'Games Room', 'Internet Access',
  'Free transport to theme parks', 'Swimming Pool', 'Whirlpool'
];

const FilterStateManager: React.FC<FilterStateManagerProps> = ({ initialFilters, initialSearchParams }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (newFilters: { minPrice: number; maxPrice: number; facilities: string[]; starRating: number }) => {
    setFilters(newFilters);
    const query = new URLSearchParams(searchParams.toString());
    query.set('minPrice', newFilters.minPrice.toString());
    query.set('maxPrice', newFilters.maxPrice.toString());
    query.set('facilities', newFilters.facilities.join(','));
    query.set('starRating', newFilters.starRating.toString());
    router.push(`?${query.toString()}`);
  };


  return (
    <SearchFilters
      initialFilters={filters}
      availableFacilities={availableFacilities}
      onFilterChange={handleFilterChange}
    />
  );
};

export default FilterStateManager;