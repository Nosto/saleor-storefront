import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { CheckoutContextInterface } from "../../checkout/context";
import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { Button, OrderTable, EmptyCart, Loader } from "../../components";
import { checkoutLoginUrl } from "../../components/App/routes";
import { CartInterface } from "../../components/CartProvider/context";
import {
  OverlayContextInterface,
  OverlayType
} from "../../components/Overlay/context";
import { getShop_shop } from "../../components/ShopProvider/types/getShop";
import { UserContext } from "../../components/User/context";
import { maybe } from "../../core/utils";
import { TypedProductVariantsQuery } from "../Product/queries";
import { TypedOrderDetailsQuery } from "./queries";
import { Order_order } from "./types/Order";

class Page extends React.Component<{ order: Order_order }> {

  render() {
    const { order } = this.props;

    return (
      <div className="container order-page">
        <div className="nosto_page_type" style={{display: 'none' }}>order</div>
        <h1 className="checkout__header cart-page__header">Your Order</h1>
          <div className="nosto_purchase_order" style={{display: 'none' }}>
            <span className="order_number">{order.number}</span>
            <div className="buyer">
              <span className="email">{order.userEmail}</span>
              <span className="first_name">{order.shippingAddress.firstName}</span>
              <span className="last_name">{order.shippingAddress.lastName}</span>
              <span className="marketing_permission">true</span>
            </div>
            <div className="purchased_items">
              {order.lines.map((line, index) => (
                <div className="line_item" key={"nosto_order" + index}>
                  <span className="product_id">{line.id}</span>
                  <span className="quantity">{line.quantity}</span>
                  <span className="name">{line.productName}</span>
                  <span className="unit_price">{line.unitPrice.gross.amount}</span>
                  <span className="price_currency_code">{line.unitPrice.gross.currency}</span>
                </div>
              ))}
          </div>
        </div>
        <OrderTable
          lines={order.lines}
          subtotal={order.subtotal.gross.localized}
          deliveryCost={order.shippingPrice.gross.localized}
          totalCost={order.total.gross.localized}
        />
      </div>
    );
  }
}

export default Page;
