import { BaseService } from './base.service';
import { IPayment } from '../interfaces/payment.interface';


export class PaymentService extends BaseService{
    constructor() {
      super()
    }
    async createPayment(data: IPayment) {
        return this.prisma.payment.create({ data });
    }

    async getPaymentById(id: string) {
        return this.prisma.payment.findUnique({ where: { id } });
    }

    async updatePayment(id: string, data: Partial<IPayment>) {
        return this.prisma.payment.update({ where: { id }, data });
    }

    async deletePayment(id: string) {
        return this.prisma.payment.delete({ where: { id } });
    }
}