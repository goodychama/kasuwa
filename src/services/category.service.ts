import { ICategory } from '../interfaces/category.interface';
import { BaseService } from './base.service';
import { IBaseService } from '../interfaces/base.interface';


export class CategoryService extends BaseService implements IBaseService<ICategory> {
    constructor() {
        super();
    }
    getById = (id: string): Promise<ICategory> =>{
        return this.prisma.category.findUnique({ where: { id } });
    }
    get = (): Promise<ICategory[]> =>{
        return this.prisma.category.findMany();
    }
    delete = (id: string): Promise<ICategory> =>{
        return this.prisma.category.update({ where: { id }, data: { isDeleted: true } });
    }

    // Additional methods specific to CategoryService
    createCategory = async (data: ICategory) => {
        const { id, ...rest } = data;
        return this.prisma.category.create({ data: rest });
    }
    updateCategory = async (id: string, data: Partial<ICategory>) => {
        const { id: _, ...rest } = data;
        return this.prisma.category.update({ where: { id }, data: rest });
    }
}