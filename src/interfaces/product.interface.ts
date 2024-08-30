import { DiscountType } from '@prisma/client';

export interface IProduct {
    id?: string;
    merchantId: string;
    categoryId: string;
    brandId: string;
    quantity: number;
    unit: number;
    image?: string[];
    discountValue?: number;
    discountType?: DiscountType;
    stock: number;
    color?: string;
    price: number;
    name: string;
    location?: string;
    description?: string;
  }