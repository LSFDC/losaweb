export interface PaymentMethodList {
  group: string;
  code: string;
  name: string;
  type: string;
  fee_merchant: FeePayment;
  fee_customer: FeePayment;
  total_fee: TotalFee;
  minimum_fee: number;
  maximum_fee: number;
  minimum_amount: number;
  maximum_amount: number;
  icon_url: string;
  active: boolean;
}

interface FeePayment {
  flat: number;
  percent: number;
}

interface TotalFee {
  flat: number;
  percent: string;
}

export interface FeeCalculator {
  code: string;
  name: string;
  fee: {
    flat: number;
    percent: string;
    min: number | null;
    max: number | null;
  };
  total_fee: {
    merchant: number;
    customer: number;
  };
}

export interface TransactionList {
  reference: string;
  merchant_ref: string;
  payment_selection_type: string;
  payment_method: string;
  payment_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  callback_url: string | null;
  return_url: string | null;
  amount: number;
  fee_merchant: number;
  fee_customer: number;
  total_fee: number;
  amount_received: number;
  pay_code: number;
  pay_url: string | null;
  checkout_url: string;
  order_items: {
    sku: string | null;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  status: string;
  note: string | null;
  created_at: number;
  expired_at: number;
  paid_at: number | null;
}

export interface CreateClosedPaymentPayload {
  method: string;
  merchant_ref: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_items: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    product_url: string;
    image_url: string;
  }[];
  return_url: string;
  expired_time: number;
}
