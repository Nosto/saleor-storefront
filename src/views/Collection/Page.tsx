import "../Category/scss/index.scss";

import * as React from "react";

import { reloadNosto } from  "../../core/nosto/utils";

import {
  Breadcrumbs,
  Filters,
  ProductFilters,
  ProductsFeatured,
  ProductsList,
  Placement
} from "../../components";
import { getDBIdFromGraphqlId, maybe } from "../../core/utils";
import {
  Collection_attributes_edges_node,
  Collection_collection,
  Collection_products
} from "./types/Collection";

interface PageProps {
  attributes: Collection_attributes_edges_node[];
  collection: Collection_collection;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Collection_products;
  onLoadMore: () => void;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

class Page extends React.PureComponent<PageProps> {

  componentDidMount() {
    reloadNosto();
  }

  render() {
    const {
      attributes,
      collection,
      displayLoader,
      filters,
      hasNextPage,
      onLoadMore,
      products,
      onAttributeFiltersChange,
      onPriceChange,
      onOrder
    } = this.props;

    const canDisplayProducts = maybe(
      () => products.edges && products.totalCount !== undefined,
      false
    );
    const hasProducts = canDisplayProducts && !!products.totalCount;
    const breadcrumbs = [
      {
        link: [
          `/collection`,
          `/${collection.slug}`,
          `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`
        ].join(""),
        value: collection.name
      }
    ];

    return (
      <div className="category">
        <div className="nosto_page_type" style={{display: 'none' }}>category</div>
        <div className="nosto_category" style={{display: 'none' }}>{collection.name}</div>
        <div
          className="category__header"
          style={
            collection.backgroundImage
              ? { backgroundImage: `url(${collection.backgroundImage.url})` }
              : undefined
          }
        >
          <span className="category__header__title">
            <h1>{collection.name}</h1>
          </span>
        </div>

        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
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
  }
};

export default Page;
