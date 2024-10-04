import { PurchaseDTO } from "./PurchaseDTO";

export interface PaymentRequest {
    purchaseOrderDTO: PurchaseDTO; // Esta propiedad debe estar definida
    strategyId: string;       // Esta propiedad también
}