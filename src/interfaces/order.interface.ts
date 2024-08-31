// import { IOrderItem } from "./orderItem.interface"
import { OrderStatus } from '@prisma/client';

export interface IOrder {
  id?: string;
  customerId: string;
  products: IOrderItem[];
  totalAmount: number;
  status?: OrderStatus;
  paymentId?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
}

export interface ICreateOrder {
  customerId: string;
  items: IOrderItem[];
}
