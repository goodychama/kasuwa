import { IBrand } from '../interfaces/category.interface';
import { BaseService } from './base.service';
import { IBaseService } from '../interfaces/base.interface';
export class BrandService extends BaseService implements IBaseService<IBrand> {
    constructor() {
        super()
    }
    getById = (id: string): Promise<IBrand> => {
        return this.prisma.brand.findUnique({ where: { id } });
    }
    get = (): Promise<IBrand[]> => {
        return this.prisma.brand.findMany();
    }
    delete = (id: string): Promise<IBrand> => {
        return this.prisma.brand.update({ where: { id }, data: { isDeleted: true } });
    }
    createBrand = async (data: IBrand) => {
        const { id, ...rest } = data;
        return this.prisma.brand.create({ data: rest });
    }
    updateBrand = async (id: string, data: Partial<IBrand>) => {
        const { id: _, ...rest } = data;
        return this.prisma.brand.update({ where: { id }, data: rest });
    }
}