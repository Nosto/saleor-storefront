import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CheckoutContext } from "../../checkout/context";
import { CartContext } from "../../components/CartProvider/context";
import { OverlayContext } from "../../components/Overlay/context";
import { ShopContext } from "../../components/ShopProvider/context";
import Page from "./Page";

const View: React.SFC<RouteComponentProps<{ token?: string }>> = ({
  match: {
    params: { token }
  }
}) => {
  return (
    <div className="container order-page">
      <div className="nosto_page_type" style={{display: 'none' }}>order</div>
      <h1 className="checkout__header cart-page__header">Your Order</h1>
      <CheckoutContext.Consumer>
        {checkout => (
          <CartContext.Consumer>
            {cart => (
              <OverlayContext.Consumer>
                {overlay => (
                  <ShopContext.Consumer>
                    {shop => (
                      <Page
                        overlay={overlay}
                        checkout={checkout}
                        cart={cart}
                        shop={shop}
                      />
                    )}
                  </ShopContext.Consumer>
                )}
              </OverlayContext.Consumer>
            )}
          </CartContext.Consumer>
        )}
      </CheckoutContext.Consumer>
    </div>
  );
};

export default View;
