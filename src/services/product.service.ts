import { IProduct } from '../interfaces/product.interface';
import { BaseService } from './base.service';
import { IBaseService } from '../interfaces/base.interface';
export class ProductService extends BaseService implements IBaseService<IProduct> {
  protected inclusion;
  constructor() {
    super()
    this.inclusion = {
      merchant: true,
      category: true,
      brand: true,
    }
  }
  getById = (id: string): Promise<IProduct> => {
    return this.prisma.product.findUnique({ where: { id } });
  }
  get(): Promise<IProduct[]> {
    return this.prisma.product.findMany({ where: { isDeleted: false }, include: this.inclusion });
  }
  delete(id: string): Promise<IProduct> {
    return this.prisma.product.update({ where: { id }, data: { isDeleted: true } });
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



  updateProduct = async (id: string, data: Partial<IProduct>) => {
    return this.prisma.product.update({ where: { id }, data });
  }

}


