import * as braintree from "braintree-web";

interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
}

export interface ErrorData {
  cvv?: string;
  expirationMonth?: string;
  expirationYear?: string;
  nonFieldError?: string;
  number?: string;
}

export const braintreePayment = (paymentClientToken: string, creditCard: any) =>
  new Promise<PaymentData | ErrorData[]>((resolve, reject) => {
    const lastDigits = "4444";
    const ccType = "JCB";
    const token = "245255";
    resolve({ lastDigits, ccType, token });
  });
