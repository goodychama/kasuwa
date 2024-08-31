export interface IOrderItem {
    id?: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    isDeleted?: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
  }