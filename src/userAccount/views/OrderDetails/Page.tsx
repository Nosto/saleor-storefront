import * as React from "react";
import { Link } from "react-router-dom";

import { AddressSummary, CartTable, NotFound, Placement } from "../../../components";
import { LineI } from "../../../components/CartTable/ProductRow";
import { priceToString } from "../../../core/utils";
import { OrderById_order, OrderById_order_lines } from "./types/OrderById";
import {
  OrderByToken_orderByToken,
  OrderByToken_orderByToken_lines
} from "./types/OrderByToken";

import { reloadNosto } from  "../../../core/nosto/utils";
import { orderHistoryUrl } from "../../routes";

const extractOrderLines = (
  lines: Array<OrderById_order_lines | OrderByToken_orderByToken_lines>
): LineI[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      currency: line.unitPrice.currency,
      unitPrice: line.unitPrice.gross.amount,
      totalPrice: priceToString({
        amount: line.quantity * line.unitPrice.gross.amount,
        currency: line.unitPrice.currency
      }),
      ...line.variant,
      name: line.productName
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

class Page extends React.PureComponent<{
  guest: boolean;
  order: OrderById_order | OrderByToken_orderByToken;
}> {
  shippingAddressRef: React.RefObject<HTMLParagraphElement> = React.createRef();

  componentDidMount() {
    reloadNosto();
  }

  render() {
    const {
      guest,
      order
    } = this.props;

    return (
      order ? (
        <>
          <div className="nosto_page_type" style={{display: 'none' }}>order</div>
          <div className="nosto_purchase_order" style={{display: 'none' }}>
            <span className="order_number">{order.number}</span>
            <div className="buyer">
              <span className="email">{order.userEmail}</span>
              <span className="first_name">{order.shippingAddress.firstName}</span>
              <span className="last_name">{order.shippingAddress.lastName}</span>
              <span className="marketing_permission">true</span>
            </div>
            <div className="purchased_items">
              {extractOrderLines(order.lines).map((line, index) => (
                <div className="line_item" key={"nosto_order" + index}>
                  <span className="product_id">{line.id}</span>
                  <span className="quantity">{line.quantity}</span>
                  <span className="name">{line.name}</span>
                  <span className="unit_price">{line.unitPrice}</span>
                  <span className="price_currency_code">{line.currency}</span>
                </div>
              ))}
          </div>
        </div>
          {!guest && (
            <Link className="order-details__link" to={orderHistoryUrl}>
              Go back to Order History
            </Link>
          )}
          <h3>Your order nr: {order.number}</h3>
          <p className="order-details__status">
            {order.paymentStatusDisplay} / {order.statusDisplay}
          </p>
          <CartTable
            lines={extractOrderLines(order.lines)}
            totalCost={order.total.gross.localized}
            deliveryCost={order.shippingPrice.gross.localized}
            subtotal={order.subtotal.gross.localized}
          />
          <div className="order-details__summary">
            <div>
              <h4>Shipping Address</h4>
              <AddressSummary
                address={order.shippingAddress}
                email={order.userEmail}
                paragraphRef={this.shippingAddressRef}
              />
            </div>
          </div>
          <Placement id="thankyou-nosto-1" />
          <Placement id="thankyou-nosto-2" />
        </>
      ) : (
        <NotFound />
      )
    );
  }
}

export default Page;
