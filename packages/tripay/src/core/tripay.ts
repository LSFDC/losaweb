import { TripayConfig } from "../types/config.js";
import {
  CreateClosedPaymentPayload,
  FeeCalculator,
  PaymentMethodList,
  TransactionList,
} from "../types/tryipay.js";
import crypto from "crypto";

export class Tripay {
  private readonly baseUrl?: string;
  private apiKey: string;
  private apiSecret: string;
  private merchCode: string;

  constructor(config: TripayConfig) {
    if (config.sandbox) {
      this.baseUrl = "https://tripay.co.id/api-sandbox";
    } else {
      this.baseUrl = "https://tripay.co.id/api";
    }

    if (!config.api_key || !config.secret_key || !config.merchant_code) {
      throw new Error("API Key and API Secret must be provided");
    }

    this.apiKey = config.api_key;
    this.apiSecret = config.secret_key;
    this.merchCode = config.merchant_code;
  }

  async getPaymentMethod(): Promise<PaymentMethodList[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/merchant/payment-channel`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment method");
      }

      const data = await response.json();

      return data.data as PaymentMethodList[];
    } catch (error) {
      console.error(`Error getting payment method: ${error}`);
      throw error;
    }
  }

  async getTotalFee(code: string, amount: number): Promise<FeeCalculator> {
    try {
      const response = await fetch(
        `${this.baseUrl}/merchant/fee-calculator?code=${code}&amount=${amount}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch total fee");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error getting total fee: ${error}`);
      throw error;
    }
  }

  async getAllTransaction(
    page: number,
    per_page: number = 25
  ): Promise<TransactionList[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/merchant/transactions?page=${page}&per_page=${per_page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error getting total fee: ${error}`);
      throw error;
    }
  }

  private createSignature(merchant_ref: string, amount: number): string {
    return crypto
      .createHmac("sha256", this.apiSecret)
      .update(this.merchCode + merchant_ref + amount)
      .digest("hex");
  }

  async CreateClosedPayment({
    amount,
    customer_email,
    customer_name,
    customer_phone,
    expired_time,
    merchant_ref,
    method,
    order_items,
    return_url,
  }: CreateClosedPaymentPayload) {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          customer_email,
          customer_name,
          customer_phone,
          expired_time,
          merchant_ref,
          method,
          order_items,
          return_url,
          signature: this.createSignature(merchant_ref, amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error creating transaction: ${error}`);
      throw error;
    }
  }

  async GetTransactionStatus(reference: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/transaction/check-status?reference=${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get transaction status");
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(`Error getting transaction status: ${error}`);
      throw error;
    }
  }

  async getTransactionDetails(reference: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/transaction/detail?reference=${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get transaction details");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error getting transaction details: ${error}`);
      throw error;
    }
  }
}
