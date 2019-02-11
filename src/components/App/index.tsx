import "./scss/index.scss";

import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import { CartContext } from "../CartProvider/context";
import CartProvider from "../CartProvider";
import { Routes } from "./routes";
import { TypedProductVariantsQuery } from "../../views/Product/queries";
import { ShopContext } from "../ShopProvider/context";
import { UserContext } from "../User/context";
import { maybe } from "../../core/utils";
import { extractCartLines } from "../CartProvider/uitls";

const App: React.FC = () => (
  <>
    <MetaConsumer />
    <CartContext.Consumer>
      {cart => cart.lines.length ? (
        <TypedProductVariantsQuery
          displayLoader={false}
          variables={{ ids: cart.lines.map(line => line.variantId) }}
          skip={!cart.lines.length}
          alwaysRender
        >
          {({ data, loading, error }) => {
            if (loading) {
              return '';
            }

            return (
              <div className="nosto_cart" style={{display: 'none' }}>
                {extractCartLines(data, cart.lines).map((line, index) => (
                  <div className="line_item" key={"nosto_cart" + index}>
                    <span className="product_id">{line.id}</span>
                    <span className="quantity">{line.quantity}</span>
                    <span className="name">{line.name}</span>
                    <span className="unit_price">{line.price.amount}</span>
                    <span className="price_currency_code">{line.price.currency}</span>
                  </div>
                ))}
              </div>
            );
          }}
        </TypedProductVariantsQuery>
      ) : (
        <div className="nosto_cart" style={{display: 'none' }}>
        </div>
      )}
    </CartContext.Consumer>
    <UserContext.Consumer>
      {({ user }) =>
        user ? (
          <div className="nosto_customer" style={{display: 'none' }}>
            <span className="email">{user.email}</span>
            <span className="first_name">{user.firstName}</span>
            <span className="last_name">{user.lastName}</span>
            <span className="customer_reference">{user.id}</span>
            <span className="marketing_permission">true</span>
          </div>
        ) : (
          <div className="nosto_customer" style={{display: 'none' }}>
          </div>
        )
      }
    </UserContext.Consumer>
    <header>
      <MainMenu />
    </header>
    <Routes />
    <Footer />
    <OverlayManager />
  </>
);

export default App;
