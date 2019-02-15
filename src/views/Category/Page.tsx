import "./scss/index.scss";

import * as React from "react";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
  ProductsList,
  Placement
} from "../../components";
import { Filters, ProductFilters } from "../../components/ProductFilters";

import { maybe } from "../../core/utils";
import {
  Category_attributes_edges_node,
  Category_category,
  Category_products
} from "./types/Category";

interface PageProps {
  attributes: Category_attributes_edges_node[];
  category: Category_category;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Category_products;
  onLoadMore: () => void;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

class Page extends React.PureComponent<PageProps> {

  componentDidMount() {
    if (!window.nostojs.q) {
      window.nostojs = (cb) => {
        (window.nostojs.q = window.nostojs.q || [])
        .push(cb);
      };
    }

    window.nostojs(api => api.loadRecommendations());
  }

  render() {
    const {
      products,
      category,
      filters,
      attributes,
      onAttributeFiltersChange,
      onPriceChange,
      displayLoader,
      hasNextPage,
      onLoadMore,
      onOrder
    } = this.props;

    const canDisplayProducts = maybe(
      () => !!products.edges && products.totalCount !== undefined
    );
    const hasProducts = canDisplayProducts && !!products.totalCount;

    return (
      <div className="category">
        <div className="nosto_page_type" style={{display: 'none' }}>category</div>
        <div className="nosto_category" style={{display: 'none' }}>{category.name}</div>
        <div
          className="category__header"
          style={
            category.backgroundImage
              ? { backgroundImage: `url(${category.backgroundImage.url})` }
              : undefined
          }
        >
          <span className="category__header__title">
            <h1>{category.name}</h1>
          </span>
        </div>

        <div className="container">
          <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
        </div>

        {hasProducts && (
          <ProductFilters
            filters={filters}
            attributes={attributes}
            onAttributeFiltersChange={onAttributeFiltersChange}
            onPriceChange={onPriceChange}
          />
        )}

        {canDisplayProducts && (
          <ProductsList
            displayLoader={displayLoader}
            filters={filters}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
            onOrder={onOrder}
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount}
          />
        )}
        <Placement id="categorypage-nosto-1" />
        <Placement id="categorypage-nosto-2" />
      </div>
    );
  };
};

export default Page;
