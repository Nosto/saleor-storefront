import "./scss/index.scss";

import * as React from "react";

import { Placement, TextField } from "../../components";
import { reloadNosto } from  "../../core/nosto/utils";

interface SearchPageProps {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class Page extends React.PureComponent<SearchPageProps> {

  componentDidMount() {
    reloadNosto();
  }

  render() {
    const {
      children,
      query,
      onQueryChange
    } = this.props;

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
        <Placement id="searchpage-nosto-1" />
        <Placement id="searchpage-nosto-2" />
      </>
    )
  }
};

export default Page;
