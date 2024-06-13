import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsClientComponent from '../search-results-client.component';
import { BookingResponse } from '@/types/booking';

const mockResults: BookingResponse = {
  holidays: [
    {
      totalPrice: 1000,
      pricePerPerson: 500,
      flyingClubMiles: 2000,
      virginPoints: 1000,
      tierPoints: 10,
      departureDate: '2023-06-01',
      selectedDate: '2023-06-01',
      hotel: {
        id: '1',
        name: 'Hotel One',
        boardBasis: 'All Inclusive',
        content: {
          name: 'Hotel One',
          vRating: 5,
          hotelDescription: 'A beautiful hotel',
          atAGlance: ['Beachfront', 'Free WiFi'],
          parentLocation: 'Location One',
          images: [
            {
              RESULTS_CAROUSEL: {
                url: '/image1.jpg',
              },
            },
          ],
          holidayType: ['Family', 'Couples'],
          boardBasis: ['All Inclusive'],
          hotelLocation: ['Beachfront'],
          accommodationType: ['Hotel'],
          hotelFacilities: ['Bar', 'Restaurant'],
          starRating: 5,
          propertyType: 'Hotel',
        },
      },
    },
    {
      totalPrice: 4000,
      pricePerPerson: 2000,
      flyingClubMiles: 8000,
      virginPoints: 4000,
      tierPoints: 20,
      departureDate: '2023-06-01',
      selectedDate: '2023-06-01',
      hotel: {
        id: '2',
        name: 'Hotel Two',
        boardBasis: 'Bed and Breakfast',
        content: {
          name: 'Hotel Two',
          vRating: 3,
          hotelDescription: 'A cozy hotel',
          atAGlance: ['City Center', 'Free Parking'],
          parentLocation: 'Location Two',
          images: [
            {
              RESULTS_CAROUSEL: {
                url: '/image2.jpg',
              },
            },
          ],
          holidayType: ['Business', 'Solo'],
          boardBasis: ['Bed and Breakfast'],
          hotelLocation: ['City Center'],
          accommodationType: ['Hotel'],
          hotelFacilities: ['Free Parking', 'Gym'],
          starRating: 3,
          propertyType: 'Hotel',
        },
      },
    },
  ],
};

describe('SearchResultsClientComponent', () => {
  it('renders correctly with results', () => {
    render(<SearchResultsClientComponent results={mockResults} />);

    expect(screen.getByText('2 results found')).toBeInTheDocument();

    mockResults.holidays.forEach(holiday => {
      expect(screen.getByText(holiday.hotel.name)).toBeInTheDocument();
      expect(screen.getByText(`Price per Person: $${holiday.pricePerPerson.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${holiday.hotel.content.starRating}`)).toBeInTheDocument();
      expect(screen.getByText(`Facilities: ${holiday.hotel.content.hotelFacilities.join(", ")}`)).toBeInTheDocument();
    });
  });

  it('renders images correctly', () => {
    render(<SearchResultsClientComponent results={mockResults} />);

    mockResults.holidays.forEach(holiday => {
      if (holiday.hotel.content.images.length > 0) {
        const image = screen.getByAltText(holiday.hotel.name);
        expect(image).toBeInTheDocument();
      }
    });
  });
});