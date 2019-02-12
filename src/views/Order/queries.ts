import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  Order,
  OrderVariables
} from "./types/Order";

const orderDetailsQuery = gql`
query Order($orderId: ID!) {
  order(id: $orderId) {
    id
    number
    user {
      firstName
      lastName
      email
    }
    userEmail
    shippingAddress {
      firstName
      lastName
    }
    shippingPrice {
      gross {
        amount
        currency
        localized
      }
    }
    subtotal {
      gross {
        amount
        currency
        localized
      }
    }
    total {
      gross {
        amount
        currency
        localized
      }
    }
    lines {
      id
      productName
      productSku
      quantity
      unitPrice {
        gross {
          amount
          currency
          localized
        }
      }
    }
  }
}
`;

export const TypedOrderDetailsQuery = TypedQuery<
  Order,
  OrderVariables
>(orderDetailsQuery);
