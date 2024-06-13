import { Suspense } from 'react';
import FilterStateManager from '../components/search-filters/search-filters-manager.component';
import SearchResultsServerComponent from '../components/search-results/search-results-server.component';
import Loading from './loading';
import styles from './page.module.css';

export default function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const filters = {
    minPrice: Number(searchParams.minPrice) || 0,
    maxPrice: Number(searchParams.maxPrice) || 10000,
    facilities: searchParams.facilities ? (searchParams.facilities as string).split(',') : [],
    starRating: Number(searchParams.starRating) || 0,
  };

  return (
    <>
      <div className={styles.header}>
        <h1>SEARCH RESULTS</h1>
        <FilterStateManager initialFilters={filters} initialSearchParams={searchParams} />
      </div>
      <Suspense fallback={<Loading />}>
        <SearchResultsServerComponent searchParams={searchParams} />
      </Suspense>
    </>
  );
}