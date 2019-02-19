import * as React from "react";

import { CartInterface } from "../../components/CartProvider/context";
import { reloadNosto } from  "../../core/nosto/utils";
import { TypedProductVariantsQuery } from "../../views/Product/queries";
import { VariantList } from "../../views/Product/types/VariantList";
import { extractCartLines } from "../CartProvider/uitls";

export interface CartProps {
  id: string;
}

class NostoCart extends React.Component<{ cart: CartInterface; }> {

  static getDerivedStateFromProps(props, state) {
    if (!state || props.cart !== state.cart) {
      reloadNosto();
      return {
        cart: props.cart,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  render() {
    return (this.props.cart.lines.length ? (
        <TypedProductVariantsQuery
          displayLoader={false}
          variables={{ ids: this.props.cart.lines.map(line => line.variantId) }}
          skip={!this.props.cart.lines.length}
          alwaysRender
        >
          {({ data, loading, error }) => {
            if (loading) {
              return '';
            }

            return (
              <div className="nosto_cart" style={{display: 'none' }}>
                {extractCartLines(data, this.props.cart.lines).map((line, index) => (
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
      )
    );
  };
};

export default NostoCart;
