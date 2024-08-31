
import { IOrder, ICreateOrder } from '../interfaces/order.interface';
import { BaseService } from './base.service';

export class OrderService extends BaseService {
  constructor() {
    super()
  }
  createOrderX = async (data: IOrder) => {
    // return this.prisma.order.create({ data });

  }
  async createOrder(data: ICreateOrder) {

    const { customerId, items } = data;

    // Fetch product details and calculate total amount
    const productIds = items.map(item => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, isDeleted: false }
    });

    if (products.length !== items.length) {
      throw new Error('Some products are not found or have been deleted.');
    }

    let totalAmount = 0;

    const orderItemsData = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      const itemTotal = Number(product.price) * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      };
    });

    // Create order and order items in a transaction
    const order = await this.prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          customerId,
          totalAmount,
          status: 'PENDING',
        }
      });

      await prisma.orderItem.createMany({
        data: orderItemsData.map(item => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      });

      return newOrder;
    });

    return order;
  }

  getOrderById = async (id: string) => {
    return this.prisma.order.findUnique({ where: { id } });
  }
  getOrders = async () => {
    return this.prisma.order.findMany({
      where: { isDeleted: false },
      include: {
        customer: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }

  updateOrder = async (id: string, data: Partial<IOrder>) => {
    return this.prisma.order.update({ where: { id }, data });
  }

  deleteOrder = async (id: string) => {
    return this.prisma.order.update({ where: { id }, data: { isDeleted: true } });
  }
}
