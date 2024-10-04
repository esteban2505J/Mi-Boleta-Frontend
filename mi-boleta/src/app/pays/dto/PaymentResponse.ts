// payment-response.model.ts

export interface PaymentResponse {
  error: boolean;
  data: {
    url: string;
    error: boolean;
  };
  message: string | null;
  errorCode: string | null;
  }
  