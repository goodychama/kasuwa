
import { BaseService } from './base.service';
import { RegisterMerchantDTO, UpdateMerchantDTO } from '../interfaces/auth.interface';



export class MerchantService extends BaseService {
    constructor() {
        super()
    }



    // Update an existing merchant profile
    public async updateMerchant(userId: string, data: UpdateMerchantDTO) {
        const updatedMerchant = await this.prisma.merchant.update({
            where: {
                userId,
            },
            data,
        });

        return updatedMerchant;
    }

    // Retrieve a merchant profile by user ID
    public async getMerchantByUserId(userId: string) {
        return this.prisma.merchant.findUnique({
            where: {
                userId,
            },
        });
    }

    public async deleteMerchant(userId: string) {
        return this.prisma.merchant.update({
            where: {
                userId,
            },
            data: {
                isDeleted: true
            }
        });
    }
}
