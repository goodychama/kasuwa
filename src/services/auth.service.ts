import { CreateUserDTO, LoginDTO, CreateCustomerInput, RegisterMerchantDTO, UpdateCustomerDTO } from '../interfaces/auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Customer } from '@prisma/client';
import { BaseService } from './base.service';
import { JWT_SECRET } from "../secrets";


export class AuthService extends BaseService {
    protected inclusion
    constructor() {
        super()
        this.inclusion = {
            Admin: true,
            Merchant: true,
            Customer: true
        }
    }

    createUser = async (data: CreateUserDTO) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
        return user;
    }
    checkexistance = async (obj: object) => {
        const user = await this.prisma.user.findFirst({
            where: { ...obj },
            select: {
                id: true,
                Customer: { select: { id: true } },
                Admin: { select: { id: true } },
                Merchant: { select: { id: true } },
            }
        });
        // Dynamically build the inclusion object
        if (user.Admin) this.inclusion.Admin = true;
        if (user.Merchant) this.inclusion.Merchant = true;
        if (user.Customer) this.inclusion.Customer = true;
        return user
    }
    findAUserById = async (userId: string) => {
        // Find the user first to check if related entities exist
        const user = await this.checkexistance({ id: String(userId) })
        if (!user) {
            throw new Error('User not found');
        }
        return await this.prisma.user.findFirst({
            where: { id: String(userId) },
            include: this.inclusion,
        });
    }
    findUserByEmail = async (email: string) => {
        // Find the user first to check if related entities exist
        const checkUser = await this.checkexistance({ email })
        if (!checkUser) {
            throw new Error('User not found');
        }
        return await this.prisma.user.findFirst({
            where: { email },
            include: this.inclusion,
        });

    }
    // Create a new customer profile
    createCustomer = async (data: CreateCustomerInput): Promise<Customer> => {
        const hashedPassword = await bcrypt.hash(data?.password, 10);
        return await this.prisma.customer.create({
            data: {
                address: data?.address,
                firstName: data?.firstName,
                lastName: data?.lastName,
                bio: data?.bio,
                dob: data?.dob,
                image: data?.image,
                user: {
                    create: {
                        email: data?.email,
                        password: hashedPassword,
                        username: data?.username,
                    },
                },
            },
            include: {
                user: true,
            },
        });
    }

    createMerchant = async (data: RegisterMerchantDTO) => {
        const { email, password, username, bio, image, country, address, businessAddress, businessCred } = data;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.merchant.create({
            data: {
                bio,
                image: image[0],
                country,
                address,
                businessAddress,
                businessCred,
                user: {
                    create: {
                        email,
                        password: hashedPassword,
                        username,
                        role: 'MERCHANT',
                    },
                },
            },
        });

        return user;
    }
    // Update an existing customer profile
    updateCustomer = async (userId: string, data: UpdateCustomerDTO): Promise<Customer> => {
        return this.prisma.customer.update({
            where: { userId },
            data,
        });
    }

    login = async (data: LoginDTO) => {
        const currentUser = await this.findUserByEmail(data.email)
        if (!currentUser || !(await bcrypt.compare(data.password, currentUser.password))) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: currentUser.id, role: currentUser.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        const { password, ...user } = currentUser
        return { token, ...user };
    }

    approveMerchant = async (userId: string) => {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { role: 'MERCHANT' },
        });
        const merchant = await this.prisma.merchant.update({
            where: { userId },
            data: { approved: true },
        });

        return { user, merchant };
    }
}
