import { IProduct } from '../interfaces/product.interface';
import { BaseService } from './base.service';

export class ProductService extends BaseService {
  protected inclusion;
  constructor() {
    super()
    this.inclusion = {
      merchant: true,
      category: true,
      brand: true,
    }
  }

  createProduct = async (data: IProduct) => {
    const { id, merchantId, categoryId, brandId, quantity, unit, price, ...rest } = data;

    return this.prisma.product.create({
      data: {
        ...rest,
        quantity: Number(quantity),
        unit: Number(unit),
        price: Number(price),
        merchant: { connect: { id: merchantId } },
        category: { connect: { id: categoryId } },
        brand: { connect: { id: brandId } }
      }
    });
  }

  getProducts = async (id: string) => {
    return this.prisma.product.findMany({ where: { isDeleted: false }, include:this.inclusion });
  }
  getProductById = async (id: string) => {
    return this.prisma.product.findUnique({ where: { id } });
  }

  updateProduct = async (id: string, data: Partial<IProduct>) => {
    return this.prisma.product.update({ where: { id }, data });
  }

  deleteProduct = async (id: string) => {
    // return this.prisma.product.delete({ where: { id } });
    return this.prisma.product.update({ where: { id }, data: { isDeleted: true } });
  }
}


