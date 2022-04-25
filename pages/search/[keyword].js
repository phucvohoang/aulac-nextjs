import { useRouter } from 'next/router';
import React from 'react';
import SearchResult from '../../containers/SearchResult/SearchResult.container';
import ClientOnly from '../../components/Wrapper/fetchingClient';

const SearchPage = () => {
  const router = useRouter();
  const {
    query: { keyword = '' },
  } = router;
  return (
    <ClientOnly>
      <SearchResult keyword={keyword} />
    </ClientOnly>
  );
};

export default SearchPage;
