import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchResultsClientComponent from './search-results-client.component';
import React from 'react';

async function getData(params: { [key: string]: string | string[] | undefined }): Promise<BookingResponse> {
  const body = {
    bookingType: params.bookingType,
    direct: false,
    location: params.location,
    departureDate: params.departureDate,
    duration: params.duration,
    gateway: params.gateway,
    partyCompositions: Rooms.parseAndConvert([params.partyCompositions as string]),
  };

  const res = await fetch(
    "https://www.virginholidays.co.uk/cjs-search-api/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface SearchResultsServerComponentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchResultsServerComponent({ searchParams }: SearchResultsServerComponentProps) {
  try {
    const results: BookingResponse = await getData(searchParams);

    const filters = {
      minPrice: Number(searchParams.minPrice) || 0,
      maxPrice: Number(searchParams.maxPrice) || 10000,
      facilities: searchParams.facilities ? (searchParams.facilities as string).split(',') : [],
      starRating: Number(searchParams.starRating) || 0,
    };
    
    const filteredResults = results.holidays.filter(holiday => {
      const meetsPriceCriteria = holiday.pricePerPerson >= filters.minPrice && holiday.pricePerPerson <= filters.maxPrice;
      const meetsStarRatingCriteria = Number(holiday.hotel.content.starRating) >= filters.starRating;
      const meetsFacilitiesCriteria = filters.facilities.every(facility =>
        holiday.hotel.content.hotelFacilities.includes(facility)
      );
      return meetsPriceCriteria && meetsStarRatingCriteria && meetsFacilitiesCriteria;
    });

    return <SearchResultsClientComponent results={{ holidays: filteredResults }} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading search results. Please try again later.</div>;
  }
}