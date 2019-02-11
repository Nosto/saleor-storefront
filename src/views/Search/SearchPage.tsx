import "./scss/index.scss";

import * as React from "react";

import { TextField } from "../../components";

interface SearchPageProps {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  children,
  query,
  onQueryChange
}) => {
  return (
    <>
      <div className="search-page">
      <div className="nosto_page_type" style={{display: 'none' }}>search</div>
      <div className="nosto_search_term" style={{display: 'none' }}>{query}</div>
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <TextField
              autoFocus
              label="Search term:"
              onChange={onQueryChange}
              value={query}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
export default SearchPage;
