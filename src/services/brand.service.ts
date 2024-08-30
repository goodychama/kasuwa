import { IBrand } from '../interfaces/category.interface';
import { BaseService } from './base.service';

export class BrandService extends BaseService {
    constructor() {
        super()
    }

    createBrand = async (data: IBrand) => {
        const { id, ...rest } = data;
        return this.prisma.brand.create({ data: rest });
    }
    brands = async () => {
        return this.prisma.brand.findMany();
    }

    getBrandById = async (id: string) => {
        return this.prisma.brand.findUnique({ where: { id } });
    }

    updateBrand = async (id: string, data: Partial<IBrand>) => {
        const { id: _, ...rest } = data;
        return this.prisma.brand.update({ where: { id }, data: rest });
      }
    
    deleteBrand = async (id: string) => {
        return this.prisma.brand.update({ where: { id }, data: { isDeleted: true } });
    }
}