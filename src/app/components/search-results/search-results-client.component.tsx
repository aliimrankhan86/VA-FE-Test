import React from 'react';
import { BookingResponse } from "@/types/booking";
import Image from 'next/image';
import styles from "./search-results.module.css";

interface SearchResultsClientComponentProps {
  results: BookingResponse;
}

const SearchResultsClientComponent: React.FC<SearchResultsClientComponentProps> = ({ results }) => {
  return (
    <section>
      <h2>{results.holidays.length} results found</h2>
      <div className={styles.container}>
        {results.holidays.map((holiday, index) => (
          <div key={`${holiday.departureDate}-${holiday.hotel.id}-${index}`} className={styles.card}>
            {holiday.hotel.content.images.length > 0 && (
              <div className={styles.imageWrapper}>
                <Image
                  src={`https:${holiday.hotel.content.images[0].RESULTS_CAROUSEL.url}`}
                  alt={holiday.hotel.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.hotelImage}
                />
              </div>
            )}
            <div className={styles.cardContent}>
              <h3>{holiday.hotel.name}</h3>
              <p>Price per Person: ${holiday.pricePerPerson.toFixed(2)}</p>
              <p>Departure Date: {holiday.departureDate}</p>
              <p>Selected Date: {holiday.selectedDate}</p>
              <p>Rating: {holiday.hotel.content.starRating}</p>
              <p className={styles.facilities}>
                Facilities: {holiday.hotel.content.hotelFacilities.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResultsClientComponent;