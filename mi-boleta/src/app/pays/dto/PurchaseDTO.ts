import { EventVO } from "../../cart/dto/EventVO";

export interface PurchaseDTO{
    idOrder:String,
    idUser: String,
    emailUser:String,
    stateOrder: String,
    cart: EventVO[],
    transactionAmount: number,
    creationDate : Date
}