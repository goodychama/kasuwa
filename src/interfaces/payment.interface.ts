import { PaymentStatus } from '@prisma/client';

export interface IPayment {
    id?: string;
    paymentDate?: Date;
    amount: number;
    status: PaymentStatus;
    transactionId: string;
    paymentMethod: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
  }