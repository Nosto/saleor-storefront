import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Loader, ProductsFeatured, Placement } from "../../components";
import { ProductsList_categories } from "../../core/types/saleor";
import { generateCategoryUrl } from "../../core/utils";
import { ProductsList_shop_homepageCollection_backgroundImage } from "./types/ProductsList";

import noPhotoImg from "../../images/no-photo.svg";

class Page extends React.PureComponent<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
}> {

  componentDidMount() {
    window.nostojs = (cb) => {
      (window.nostojs.q = window.nostojs.q || [])
      .push(cb);
    };

    window.nostojs(api => api.loadRecommendations());
  }

  render() {
    const {
      loading,
      categories,
      backgroundImage
    } = this.props;

    return (
      <>
        <div
          className="home-page__hero"
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage.url})` }
              : null
          }
        >
          <div className="home-page__hero-text">
            <div>
              <span className="home-page__hero__title">
                <h1>Final reduction</h1>
              </span>
            </div>
            <div>
              <span className="home-page__hero__title">
                <h1>Up to 70% off sale</h1>
              </span>
            </div>
          </div>
          <div className="home-page__hero-action">
            {loading && !categories ? (
              <Loader />
            ) : (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button>Shop sale</Button>
              </Link>
            )}
          </div>
        </div>
        <Placement id="frontpage-nosto-1" />
        <Placement id="frontpage-nosto-2" />
        <Placement id="frontpage-nosto-3" />
        <Placement id="frontpage-nosto-4" />
        <div className="home-page__categories">
          <div className="container">
            <h3>Shop by category</h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id}>
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <div
                      className={classNames("home-page__categories__list__image", {
                        "home-page__categories__list__image--no-photo": !category.backgroundImage
                      })}
                      style={{
                        backgroundImage: `url(${
                          category.backgroundImage
                            ? category.backgroundImage.url
                            : noPhotoImg
                        })`
                      }}
                    />
                    <h3>{category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Page;
