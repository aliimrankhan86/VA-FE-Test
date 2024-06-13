'use client';

import React, { useState } from 'react';
import Overlay from '../overlay/overlay.component';
import styles from './search-filters.module.css';

interface SearchFiltersProps {
  initialFilters: { minPrice: number, maxPrice: number, facilities: string[], starRating: number };
  availableFacilities: string[];
  onFilterChange: (filters: { minPrice: number; maxPrice: number; facilities: string[]; starRating: number }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ initialFilters, availableFacilities, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [facilities, setFacilities] = useState<string[]>(initialFilters.facilities);
  const [starRating, setStarRating] = useState(initialFilters.starRating);

  const handleFacilityChange = (facility: string) => {
    setFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleFilterChange = () => {
    const newFilters = { minPrice, maxPrice, facilities, starRating };
    onFilterChange(newFilters);
    setIsOpen(false);
  };

  const handleClearFiltersClick = () => {
    const newFilters = { minPrice: 0, maxPrice: 10000, facilities: [], starRating: 0 };
    setMinPrice(newFilters.minPrice);
    setMaxPrice(newFilters.maxPrice);
    setFacilities(newFilters.facilities);
    setStarRating(newFilters.starRating);
    onFilterChange(newFilters);
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.filterButton} onClick={() => setIsOpen(true)}>
        Filters
      </button>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>
              Min Price:
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
            </label>
            <label>
              Max Price:
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </label>
          </div>
          <div className={styles.filterGroup}>
            <label>
              Star Rating:
              <input type="number" value={starRating} onChange={(e) => setStarRating(Number(e.target.value))} />
            </label>
          </div>
          <div className={styles.filterGroup}>
            <label>Facilities:</label>
            <div>
              {availableFacilities.map(facility => (
                <label key={facility}>
                  <input
                    type="checkbox"
                    onChange={() => handleFacilityChange(facility)}
                    checked={facilities.includes(facility)}
                  /> {facility}
                </label>
              ))}
            </div>
          </div>
          <button onClick={handleFilterChange}>Apply Filters</button>
          <button className={styles.clearButton} onClick={handleClearFiltersClick}>Clear Filters</button>
        </div>
      </Overlay>
    </>
  );
};

export default SearchFilters;