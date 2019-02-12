/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Order
// ====================================================

export interface Order_order_user {
  __typename: "User";
  firstName: string;
  lastName: string;
  email: string;
}

export interface Order_order_shippingAddress {
  __typename: "Address";
  firstName: string;
  lastName: string;
}

export interface Order_order_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Order_order_shippingPrice {
  __typename: "TaxedMoney";
  gross: Order_order_shippingPrice_gross;
}

export interface Order_order_subtotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Order_order_subtotal {
  __typename: "TaxedMoney";
  gross: Order_order_subtotal_gross;
}

export interface Order_order_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Order_order_total {
  __typename: "TaxedMoney";
  gross: Order_order_total_gross;
}

export interface Order_order_lines_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Order_order_lines_unitPrice {
  __typename: "TaxedMoney";
  gross: Order_order_lines_unitPrice_gross;
}

export interface Order_order_lines {
  __typename: "OrderLine";
  id: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: Order_order_lines_unitPrice | null;
}

export interface Order_order {
  __typename: "Order";
  id: string;
  number: string | null;
  user: Order_order_user | null;
  userEmail: string | null;
  shippingAddress: Order_order_shippingAddress | null;
  shippingPrice: Order_order_shippingPrice | null;
  subtotal: Order_order_subtotal | null;
  total: Order_order_total | null;
  lines: (Order_order_lines | null)[];
}

export interface Order {
  order: Order_order | null;
}

export interface OrderVariables {
  orderId: string;
}
